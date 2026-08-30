import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse

from models.schemas import CompareRequest, CompareResponse
from services.data_service import DataService
from services.event_stream import generate_search_events

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DataService on startup
    logger.info("Initializing DataService...")
    DataService()
    yield
    logger.info("Shutting down...")

app = FastAPI(lifespan=lifespan)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Request logging middleware."""
    logger.info(f"Incoming Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response Status: {response.status_code}")
    return response

@app.get("/")
def root():
    """Redirect root to the SmartKart frontend."""
    return RedirectResponse(url="http://localhost:3000")

@app.get("/api/health")
def health_check():
    """Health check endpoint."""
    return {"status": "ok"}

@app.get("/api/categories")
def get_categories():
    """List all categories with product counts."""
    ds = DataService()
    counts = {}
    for p in ds.products:
        counts[p.category] = counts.get(p.category, 0) + 1
    return [{"category": k, "count": v} for k, v in counts.items()]

@app.get("/api/trending")
def get_trending():
    """Get 6 trending products."""
    ds = DataService()
    return ds.get_trending()

@app.get("/api/search")
async def search(q: str):
    """SSE stream returning AgentEvents and final products."""
    return EventSourceResponse(generate_search_events(q))

@app.get("/api/product/{id}")
def get_product(id: str):
    """Get full product detail."""
    ds = DataService()
    p = ds.get_product(id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p

@app.get("/api/product/{id}/price-history")
def get_price_history(id: str, platform: str | None = None):
    """Get price history for a product."""
    ds = DataService()
    history = ds.get_price_history(id, platform)
    if not history and not ds.get_product(id):
        raise HTTPException(status_code=404, detail="Product not found")
    return history

@app.post("/api/compare", response_model=CompareResponse)
def compare_products(req: CompareRequest):
    """Compare multiple products."""
    ds = DataService()
    products = [ds.get_product(pid) for pid in req.product_ids if ds.get_product(pid)]
    return CompareResponse(
        products=products,
        ai_verdict="All selected products have great features. Consider your budget and brand preference."
    )

@app.get("/api/category/{cat}")
def get_category_products(cat: str):
    """Get all products in a specific category."""
    ds = DataService()
    return ds.get_by_category(cat)

# Trigger reload
