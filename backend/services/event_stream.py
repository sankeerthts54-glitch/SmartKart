import json
import asyncio
from typing import AsyncGenerator
from models.schemas import AgentEvent, Product
from agents.search_agent import SearchAgent
from agents.price_agent import PriceAgent
from agents.review_agent import ReviewAgent
from agents.deals_agent import DealsAgent
from agents.price_history_agent import PriceHistoryAgent
from services.data_service import DataService
from services.live_search_service import search_live
from services.gemini_service import generate_verdict

async def generate_search_events(query: str) -> AsyncGenerator[str, None]:
    """SSE pipeline: preloaded first, live fallback if nothing found."""
    data_service = DataService()

    def yield_event(agent: str, status: str, message: str, progress: float) -> str:
        event = AgentEvent(agent=agent, status=status, message=message, progress=progress)
        return event.model_dump_json()

    # ── STEP 1: Preloaded dataset search ─────────────────────────────────────
    yield yield_event("search", "working", f"Searching for '{query}'...", 0.1)
    await asyncio.sleep(0.4)

    search_agent = SearchAgent()
    products = search_agent.search(query, data_service)
    is_live = False

    # ── STEP 2: Live fallback via SerpApi ─────────────────────────────────────
    if not products:
        yield yield_event("live_search", "working",
                          f"No preloaded results — fetching live prices from the web...", 0.15)
        await asyncio.sleep(0.3)

        raw_live = await asyncio.get_event_loop().run_in_executor(
            None, search_live, query
        )

        if raw_live:
            # Parse raw dicts into Product objects
            live_products: list[Product] = []
            for raw in raw_live:
                try:
                    live_products.append(Product(**raw))
                except Exception:
                    pass

            # Merge products that have the same name onto a single Product card
            # (different sources = different PlatformListings on the same product)
            merged: dict[str, Product] = {}
            for p in live_products:
                key = p.name.lower().strip()[:60]
                if key not in merged:
                    merged[key] = p
                else:
                    # Add the new platform listing(s) to the existing product
                    existing = merged[key]
                    existing.platforms.extend(p.platforms)
                    # Keep the best price updated
                    if p.best_price and (not existing.best_price or p.best_price < existing.best_price):
                        existing.best_price = p.best_price
                        existing.best_platform = p.best_platform

            products = list(merged.values())[:10]
            is_live = True

            yield yield_event("live_search", "complete",
                              f"Found {len(products)} live results across the web.", 0.2)

            # Enrich each merged product with best_price / lowest_ever
            for p in products:
                if p.platforms:
                    cheapest = min(p.platforms, key=lambda pl: pl.price)
                    p.best_price = cheapest.price
                    p.best_platform = cheapest.platform
                    p.lowest_ever_price = cheapest.price
                    p.lowest_ever_date = "2026-08-01"
        else:
            yield yield_event("live_search", "complete",
                              "No live results found either.", 0.2)
            yield yield_event("complete", "complete", json.dumps([]), 1.0)
            return
    else:
        yield yield_event("search", "complete",
                          f"Found {len(products)} products.", 0.2)

    # ── STEP 3: Price analysis ────────────────────────────────────────────────
    yield yield_event("price", "working", "Analyzing prices across platforms...", 0.35)
    await asyncio.sleep(0.4)
    PriceAgent().analyze(products)
    yield yield_event("price", "complete", "Price analysis complete.", 0.5)

    # ── STEP 4: Review analysis ───────────────────────────────────────────────
    yield yield_event("reviews", "working", "Aggregating reviews...", 0.55)
    await asyncio.sleep(0.3)
    ReviewAgent().analyze(products)
    yield yield_event("reviews", "complete", "Review analysis complete.", 0.65)

    # ── STEP 5: Deals analysis ────────────────────────────────────────────────
    yield yield_event("deals", "working", "Finding best deals and offers...", 0.7)
    await asyncio.sleep(0.4)
    DealsAgent().analyze(products)
    yield yield_event("deals", "complete", "Deals analysis complete.", 0.8)

    # ── STEP 6: Price history ─────────────────────────────────────────────────
    yield yield_event("price_history", "working", "Checking price trends...", 0.85)
    await asyncio.sleep(0.2)
    history_agent = PriceHistoryAgent()
    for p in products:
        history_agent.analyze(p)
    yield yield_event("price_history", "complete", "Price history complete.", 0.9)

    # ── STEP 7: Gemini AI verdicts for live results ───────────────────────────
    if is_live:
        yield yield_event("ai_ranker", "working",
                          "Generating AI verdicts with Gemini...", 0.93)
        await asyncio.sleep(0.2)
        for p in products:
            if not p.ai_verdict:
                platform_dicts = [pl.model_dump() for pl in p.platforms]
                p.ai_verdict = await asyncio.get_event_loop().run_in_executor(
                    None, generate_verdict, p.name, platform_dicts
                )
        yield yield_event("ai_ranker", "complete",
                          "AI verdicts ready.", 0.97)

    # ── FINAL: Emit all products ──────────────────────────────────────────────
    products_json = json.dumps([p.model_dump() for p in products])
    yield yield_event("complete", "complete", products_json, 1.0)
