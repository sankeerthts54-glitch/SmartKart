from models.schemas import Product

class DealsAgent:
    """Agent responsible for collecting deals and determining effective price."""
    
    def analyze(self, products: list[Product]) -> dict:
        summary = {}
        for p in products:
            best_eff_price = p.best_price
            all_offers = []
            for plat in p.platforms:
                for offer in plat.offers:
                    all_offers.append(offer.title)
                    # Simple heuristic deduction based on offers for demonstration
                    if "flat" in offer.title.lower() or "off" in offer.title.lower():
                        # Just a dummy effective price logic
                        best_eff_price = min(best_eff_price, p.best_price * 0.9)
                        
            summary[p.id] = {
                "best_effective_price": round(best_eff_price),
                "top_offers": all_offers[:3]  # top 3 offers across all platforms
            }
        return summary
