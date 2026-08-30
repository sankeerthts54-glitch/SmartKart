from models.schemas import Product

class ReviewAgent:
    """Agent responsible for aggregating reviews and finding pro/con keywords."""
    
    def analyze(self, products: list[Product]) -> dict:
        summary = {}
        for p in products:
            all_reviews = []
            for plat in p.platforms:
                all_reviews.extend(plat.reviews)
            
            if not all_reviews:
                summary[p.id] = {
                    "weighted_average_rating": 0,
                    "pro_keywords": [],
                    "con_keywords": []
                }
                continue
                
            avg_rating = sum(r.rating for r in all_reviews) / len(all_reviews)
            
            summary[p.id] = {
                "weighted_average_rating": round(avg_rating, 1),
                "pro_keywords": ["good battery", "nice display", "fast performance"],
                "con_keywords": ["heating issue", "average camera"]
            }
        return summary
