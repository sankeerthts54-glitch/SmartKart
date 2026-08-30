"""
gemini_service.py
Generates an AI verdict for live search results using the Gemini API.
Falls back gracefully if the key is missing or the call fails.
"""
from __future__ import annotations

import os
import logging
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

GEMINI_KEY = os.getenv("GEMINI_API_KEY", "")

def generate_verdict(product_name: str, platforms: list[dict]) -> str:
    """
    Given a product name and a list of platform listings (dicts with price, platform, etc.),
    asks Gemini for a concise shopping verdict (2–3 sentences).
    Returns a plain English string, or a sensible default on failure.
    """
    if not GEMINI_KEY:
        return _default_verdict(product_name, platforms)

    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_KEY)

        platform_lines = "\n".join(
            f"- {p.get('platform_display', p.get('platform'))}: ₹{p.get('price', 0):,}"
            for p in sorted(platforms, key=lambda x: x.get("price", 999999))[:6]
        )

        prompt = (
            f"You are an AI shopping assistant for Indian consumers. "
            f"Given the following real-time price data for '{product_name}', "
            f"write a 2-sentence verdict (max 40 words) on the best time and place to buy it. "
            f"Be specific, confident and helpful.\n\nPlatform prices:\n{platform_lines}\n\nVerdict:"
        )

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={"max_output_tokens": 100, "temperature": 0.4},
        )
        verdict = response.text.strip().replace("\n", " ")
        return verdict if verdict else _default_verdict(product_name, platforms)

    except Exception as e:
        logger.warning(f"Gemini verdict failed for '{product_name}': {e}")
        return _default_verdict(product_name, platforms)


def _default_verdict(product_name: str, platforms: list[dict]) -> str:
    """Rule-based fallback verdict when Gemini is unavailable."""
    if not platforms:
        return f"Compare prices for {product_name} across platforms to find the best deal."
    cheapest = min(platforms, key=lambda x: x.get("price", 999999))
    platform_name = cheapest.get("platform_display", cheapest.get("platform", "Amazon"))
    price = cheapest.get("price", 0)
    return (
        f"Best price for {product_name} is currently ₹{price:,} on {platform_name}. "
        f"Check all platforms below for delivery time and offers before buying."
    )
