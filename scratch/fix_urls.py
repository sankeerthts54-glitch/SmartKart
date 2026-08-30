import json
import urllib.parse
from pathlib import Path

def get_real_search_url(platform: str, product_name: str) -> str:
    encoded_name = urllib.parse.quote_plus(product_name)
    
    mapping = {
        "amazon": f"https://www.amazon.in/s?k={encoded_name}",
        "flipkart": f"https://www.flipkart.com/search?q={encoded_name}",
        "croma": f"https://www.croma.com/searchB?q={encoded_name}",
        "reliance_digital": f"https://www.reliancedigital.in/search?q={encoded_name}",
        "vijay_sales": f"https://www.vijaysales.com/search/{encoded_name}",
        "tatacliq": f"https://www.tatacliq.com/search/?searchCategory=all&text={encoded_name}",
        "meesho": f"https://www.meesho.com/search?q={encoded_name}",
        "myntra": f"https://www.myntra.com/{encoded_name}",
        "bigbasket": f"https://www.bigbasket.com/ps/?q={encoded_name}",
        "zepto": f"https://www.zeptonow.com/search?q={encoded_name}",
        "blinkit": f"https://blinkit.com/s/?q={encoded_name}"
    }
    return mapping.get(platform, f"https://www.google.com/search?q={encoded_name}+on+{platform}")

data_dir = Path("backend/data/products")
files = list(data_dir.glob("*.json"))

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    for p in products:
        for listing in p.get("platforms", []):
            platform_id = listing.get("platform", "")
            listing["url"] = get_real_search_url(platform_id, p["name"])
            
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2)

print(f"Successfully updated URLs for {len(files)} category files!")
