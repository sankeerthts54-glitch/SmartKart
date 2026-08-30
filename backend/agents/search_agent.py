from models.schemas import Product

class SearchAgent:
    """Agent responsible for identifying category and searching products."""
    
    def search(self, query: str, data_service) -> list[Product]:
        # Detect category based on simple keywords (for demonstration)
        q = query.lower()
        category = "all"
        if any(kw in q for kw in ["phone", "mobile", "smartphone", "poco", "oneplus", "pixel", "redmi", "galaxy s2"]):
            category = "phones"
        elif any(kw in q for kw in ["laptop", "macbook", "macbook pro", "rog", "legion", "loq", "tuf gaming", "ideapad", "xps"]):
            category = "laptops"
        elif any(kw in q for kw in ["grocery", "food", "snack", "dal", "atta", "rice", "oil", "ghee", "amul", "butter"]):
            category = "grocery"
        elif any(kw in q for kw in ["vegetable", "fruit", "leafy", "dairy", "spice", "frozen", "kitchen", "dinnerware", "storage container", "cookware", "staple", "grain", "canned"]):
            category = "groceries_kitchen"
        elif any(kw in q for kw in ["shoe", "racket", "bat", "cricket", "badminton", "tennis", "squash", "protein", "whey", "mass gainer", "vitamin", "supplement", "yoga", "dumbbell", "resistance band", "fitness ball", "pull-up", "workout", "running shoe", "trail", "sport"]):
            category = "sports"
        elif any(kw in q for kw in ["headphone", "earphone", "earbud", "airpod", "iem", "tws", "hearable", "sennheiser", "jbl tune", "boat ear", "64 audio"]):
            category = "electronics"

        products = data_service.search(query)
        # Limit to 10 results
        return products[:10]

