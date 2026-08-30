from models.schemas import Product

class PriceHistoryAgent:
    """Agent responsible for checking price trends and providing buy recommendation."""
    
    def analyze(self, product: Product, platform: str | None = None) -> dict:
        history = product.price_history
        if platform:
            history = [h for h in history if h.platform == platform]
            
        if not history:
            return {}
            
        prices = [h.price for h in history]
        lowest_ever = min(prices)
        highest_ever = max(prices)
        current = product.best_price or lowest_ever
        
        current_vs_lowest_pct = ((current - lowest_ever) / lowest_ever) * 100 if lowest_ever else 0
        trend = "stable"
        if current > lowest_ever * 1.1:
            trend = "rising"
        elif current < highest_ever * 0.9:
            trend = "falling"
            
        rec = "buy_now" if current <= lowest_ever * 1.05 else "consider_waiting"
        product.buy_recommendation = rec  # Modifying product in place
        
        return {
            "lowest_ever": lowest_ever,
            "highest_ever": highest_ever,
            "current_vs_lowest_pct": round(current_vs_lowest_pct, 2),
            "trend": trend,
            "buy_recommendation": rec
        }
