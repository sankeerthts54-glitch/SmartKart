"""
SmartKart — Pydantic schemas shared across the entire backend.
"""
from __future__ import annotations
from typing import Optional
from pydantic import BaseModel, HttpUrl


# ---------------------------------------------------------------------------
# Review
# ---------------------------------------------------------------------------
class Review(BaseModel):
    user: str
    rating: float          # 1–5
    title: str
    body: str
    date: str              # ISO 8601 date string
    verified: bool
    helpful_votes: int
    platform: str


# ---------------------------------------------------------------------------
# Offer / Discount
# ---------------------------------------------------------------------------
class Offer(BaseModel):
    title: str             # e.g. "10% off with HDFC Bank cards"
    discount_type: str     # "bank", "coupon", "exchange", "emi", "cashback"
    value: Optional[str] = None   # e.g. "₹3,000 off", "10%"
    code: Optional[str] = None    # coupon code if applicable
    expires: Optional[str] = None # date string


# ---------------------------------------------------------------------------
# Platform listing for a product
# ---------------------------------------------------------------------------
class PlatformListing(BaseModel):
    platform: str          # "amazon", "flipkart", "croma", etc.
    platform_display: str  # "Amazon", "Flipkart", "Croma"
    price: int             # current price in INR
    original_price: int    # MRP / strike-through price
    discount_percent: int
    url: str               # redirect link (affiliate-ready)
    in_stock: bool
    delivery: str          # e.g. "Free delivery, 2 days"
    rating: float
    total_reviews: int
    offers: list[Offer]
    reviews: list[Review]
    seller: Optional[str] = None
    warranty: Optional[str] = None


# ---------------------------------------------------------------------------
# Price History Point
# ---------------------------------------------------------------------------
class PricePoint(BaseModel):
    date: str              # ISO 8601
    platform: str
    price: int


# ---------------------------------------------------------------------------
# Spec entry (key-value, flexible)
# ---------------------------------------------------------------------------
class Spec(BaseModel):
    key: str
    value: str
    category: Optional[str] = None  # "display", "performance", "camera", etc.


# ---------------------------------------------------------------------------
# Full Product
# ---------------------------------------------------------------------------
class Product(BaseModel):
    id: str                     # slug e.g. "iphone-15-128gb"
    name: str
    brand: str
    category: str               # "phones", "laptops", "grocery", "audio", "appliances"
    subcategory: Optional[str] = None
    image_url: str
    thumbnail_url: Optional[str] = None
    description: str
    search_keywords: list[str]  # for fuzzy matching
    specs: list[Spec]
    platforms: list[PlatformListing]  # 10 results (platform × variant combos)
    price_history: list[PricePoint]
    # Derived / computed fields (populated by data service)
    best_price: Optional[int] = None
    best_platform: Optional[str] = None
    lowest_ever_price: Optional[int] = None
    lowest_ever_date: Optional[str] = None
    ai_verdict: Optional[str] = None
    buy_recommendation: Optional[str] = None  # "buy_now", "wait", "good_deal"
    is_live: Optional[bool] = False           # True when fetched from SerpApi live search


# ---------------------------------------------------------------------------
# Search / API response shapes
# ---------------------------------------------------------------------------
class SearchResult(BaseModel):
    products: list[Product]
    query: str
    category_detected: str
    total_found: int
    is_preloaded: bool


class CompareRequest(BaseModel):
    product_ids: list[str]   # 2–3 product IDs


class CompareResponse(BaseModel):
    products: list[Product]
    ai_verdict: Optional[str] = None


class AgentEvent(BaseModel):
    agent: str
    status: str      # "idle" | "working" | "complete" | "error"
    message: str
    progress: float  # 0.0–1.0
