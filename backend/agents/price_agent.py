from models.schemas import Product

class PriceAgent:
    """Agent responsible for analyzing prices across platforms."""
    
    def analyze(self, products: list[Product]) -> dict:
        summary = {}
        for p in products:
            if not p.platforms:
                continue
            cheapest = min(p.platforms, key=lambda x: x.price)
            max_savings = max((x.original_price - x.price) for x in p.platforms if x.original_price > x.price) if any(x.original_price > x.price for x in p.platforms) else 0
            
            sorted_plats = sorted(p.platforms, key=lambda x: x.price)
            ranking = [x.platform for x in sorted_plats]
            
            summary[p.id] = {
                "best_overall": cheapest.platform,
                "ranking": ranking,
                "savings_summary": f"Save up to ₹{max_savings}" if max_savings else "No direct discount available"
            }
        return summary
