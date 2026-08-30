import json
import logging
from pathlib import Path
from thefuzz import fuzz
from models.schemas import Product, PricePoint

logger = logging.getLogger(__name__)

class DataService:
    """
    Singleton DataService for SmartKart.
    Loads products and index from JSON files and provides querying methods.
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DataService, cls).__new__(cls)
            cls._instance._load_data()
        return cls._instance

    def _load_data(self):
        self.products: list[Product] = []
        base_dir = Path(__file__).parent.parent / "data"
        products_dir = base_dir / "products"

        # Each category file is a JSON array of product objects
        if products_dir.exists():
            for filepath in sorted(products_dir.glob("*.json")):
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    # Support both a single product dict and a list of products
                    items = data if isinstance(data, list) else [data]
                    for item in items:
                        try:
                            product = Product(**item)
                            self._enrich_product(product)
                            self.products.append(product)
                        except Exception as e:
                            logger.error(f"Error parsing product in {filepath}: {e}")
                except Exception as e:
                    logger.error(f"Error loading {filepath}: {e}")

        logger.info(f"Loaded {len(self.products)} products from {products_dir}")


    def _enrich_product(self, product: Product):
        if product.platforms:
            best_platform_listing = min(product.platforms, key=lambda p: p.price)
            product.best_price = best_platform_listing.price
            product.best_platform = best_platform_listing.platform
        
        if product.price_history:
            lowest_point = min(product.price_history, key=lambda p: p.price)
            product.lowest_ever_price = lowest_point.price
            product.lowest_ever_date = lowest_point.date

    def search(self, query: str) -> list[Product]:
        """Fuzzy search against product name, brand, and keywords."""
        matches = []
        query_lower = query.lower().strip()

        for product in self.products:
            name_lower = product.name.lower()
            brand_lower = product.brand.lower()
            keywords_str = " ".join(product.search_keywords).lower()
            
            # Create a combined searchable string for token_set_ratio
            # This is extremely effective because token_set_ratio ignores word order and duplicate words
            combined_text = f"{name_lower} {brand_lower} {keywords_str}"

            # Exact matches (if user types exact brand or is a strong substring of name)
            exact_name = 100 if query_lower in name_lower else 0
            exact_brand = 100 if query_lower == brand_lower else (90 if query_lower in brand_lower else 0)

            # Token set ratio handles partial word matches extremely well without the partial_ratio keyword flaws
            token_set_score = fuzz.token_set_ratio(query_lower, combined_text)
            
            # Token sort ratio just to have a strict metric
            token_sort_score = fuzz.token_sort_ratio(query_lower, name_lower)

            # Final score is the maximum of our confidence signals
            best_score = max(exact_name, exact_brand, token_set_score, token_sort_score)

            # Higher threshold to avoid false positives
            if best_score >= 70:
                matches.append((best_score, product))

        # Sort matches by score descending. For ties (e.g. both are 100), prefer the shorter name (more exact match)
        matches.sort(key=lambda x: (x[0], -len(x[1].name)), reverse=True)
        return [m[1] for m in matches]

    def get_product(self, id: str) -> Product | None:
        """Get product by ID."""
        return next((p for p in self.products if p.id == id), None)

    def get_by_category(self, category: str) -> list[Product]:
        """Get all products in a specific category."""
        return [p for p in self.products if p.category.lower() == category.lower()]

    def get_price_history(self, id: str, platform: str | None = None) -> list[PricePoint]:
        """Get price history for a product, optionally filtered by platform."""
        product = self.get_product(id)
        if not product:
            return []
        if platform:
            return [p for p in product.price_history if p.platform.lower() == platform.lower()]
        return product.price_history

    def get_trending(self) -> list[Product]:
        """Returns 6 trending products (one from each category ideally)."""
        trending = []
        seen_categories = set()
        for p in self.products:
            if p.category not in seen_categories:
                trending.append(p)
                seen_categories.add(p.category)
            if len(trending) == 6:
                break
        
        # fill up to 6 if categories are fewer
        for p in self.products:
            if len(trending) == 6:
                break
            if p not in trending:
                trending.append(p)
        return trending
