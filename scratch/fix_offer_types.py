"""Fix: Offer.value must be a string per the Pydantic schema. Convert all int values to str."""
import json
from pathlib import Path

data_dir = Path("backend/data/products")
files = ["fashion.json", "bags.json", "music.json"]

for fname in files:
    fpath = data_dir / fname
    if not fpath.exists():
        print(f"MISSING: {fname}")
        continue
    
    with open(fpath, "r", encoding="utf-8") as f:
        products = json.load(f)
    
    for product in products:
        for platform in product.get("platforms", []):
            for offer in platform.get("offers", []):
                if "value" in offer and not isinstance(offer["value"], str):
                    offer["value"] = str(offer["value"])
    
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"Fixed: {fname}")

print("Done!")
