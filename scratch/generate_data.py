import json
import os
import random
from datetime import datetime, timedelta
import math

base_dir = r"c:\Users\sanke\OneDrive\Desktop\SmartKart\backend\data"
products_dir = os.path.join(base_dir, "products")
os.makedirs(products_dir, exist_ok=True)

INDIAN_NAMES = ["Rahul Sharma", "Priya Patel", "Amit Kumar", "Neha Singh", "Vikram Gupta", "Sneha Reddy", "Arjun Das", "Pooja Verma", "Rohit Joshi", "Anjali Desai", "Karan Mehta", "Kavita Iyer", "Suresh Nair", "Divya Menon", "Ravi Pillai"]

PLATFORMS = {
    "electronics": [
        {"slug": "amazon", "name": "Amazon"},
        {"slug": "flipkart", "name": "Flipkart"},
        {"slug": "croma", "name": "Croma"},
        {"slug": "reliance_digital", "name": "Reliance Digital"},
        {"slug": "vijay_sales", "name": "Vijay Sales"},
        {"slug": "tatacliq", "name": "Tata CLiQ"}
    ],
    "grocery": [
        {"slug": "amazon", "name": "Amazon"},
        {"slug": "flipkart", "name": "Flipkart"},
        {"slug": "bigbasket", "name": "BigBasket"},
        {"slug": "zepto", "name": "Zepto"},
        {"slug": "blinkit", "name": "Blinkit"}
    ]
}

def generate_price_history(base_price, start_date=datetime(2024, 9, 1)):
    history = []
    # 24 months
    for i in range(24):
        date = start_date + timedelta(days=30*i)
        
        # Determine if month is sale month (Diwali ~ Oct/Nov, Republic ~ Jan, Independence ~ Aug)
        month = date.month
        discount = 0.0
        if month in [10, 11]:
            discount = random.uniform(0.1, 0.2)
        elif month == 1:
            discount = random.uniform(0.05, 0.15)
        elif month == 8:
            discount = random.uniform(0.05, 0.15)
            
        current_price = int(base_price * (1 - discount))
        # Add random noise
        current_price += random.randint(-1000, 1000)
        if current_price < 50:
            current_price = 50
        history.append({
            "date": date.strftime("%Y-%m-%d"),
            "price": current_price
        })
    return history

def get_product_data():
    return {
        "phones": [
            {"id": "iphone-15-128gb", "name": "Apple iPhone 15 (128GB)", "brand": "Apple", "mrp": 79900, "base_price": 69900, "category": "Mobile Phones", "sub": "Smartphones"},
            {"id": "samsung-galaxy-s24", "name": "Samsung Galaxy S24", "brand": "Samsung", "mrp": 79999, "base_price": 74999, "category": "Mobile Phones", "sub": "Smartphones"},
            {"id": "oneplus-12r", "name": "OnePlus 12R", "brand": "OnePlus", "mrp": 39999, "base_price": 39999, "category": "Mobile Phones", "sub": "Smartphones"},
            {"id": "pixel-8a", "name": "Pixel 8a", "brand": "Google", "mrp": 52999, "base_price": 49999, "category": "Mobile Phones", "sub": "Smartphones"},
            {"id": "vivo-v30-pro", "name": "Vivo V30 Pro", "brand": "Vivo", "mrp": 41999, "base_price": 41999, "category": "Mobile Phones", "sub": "Smartphones"}
        ],
        "laptops": [
            {"id": "macbook-air-m3-13", "name": "MacBook Air M3 (13\")", "brand": "Apple", "mrp": 114900, "base_price": 104900, "category": "Computers", "sub": "Laptops"},
            {"id": "asus-rog-strix-g16", "name": "ASUS ROG Strix G16", "brand": "ASUS", "mrp": 150000, "base_price": 140000, "category": "Computers", "sub": "Gaming Laptops"},
            {"id": "hp-pavilion-15", "name": "HP Pavilion 15", "brand": "HP", "mrp": 65000, "base_price": 58000, "category": "Computers", "sub": "Laptops"},
            {"id": "lenovo-ideapad-slim-5", "name": "Lenovo IdeaPad Slim 5", "brand": "Lenovo", "mrp": 75000, "base_price": 65000, "category": "Computers", "sub": "Laptops"},
            {"id": "dell-xps-15", "name": "Dell XPS 15", "brand": "Dell", "mrp": 200000, "base_price": 185000, "category": "Computers", "sub": "Laptops"}
        ],
        "audio": [
            {"id": "sony-wh-1000xm5", "name": "Sony WH-1000XM5", "brand": "Sony", "mrp": 34990, "base_price": 29990, "category": "Audio", "sub": "Headphones"},
            {"id": "boat-rockerz-550", "name": "boAt Rockerz 550", "brand": "boAt", "mrp": 4999, "base_price": 1999, "category": "Audio", "sub": "Headphones"},
            {"id": "apple-airpods-pro-2", "name": "Apple AirPods Pro 2nd Gen", "brand": "Apple", "mrp": 24900, "base_price": 22900, "category": "Audio", "sub": "Earbuds"},
            {"id": "jbl-flip-6", "name": "JBL Flip 6", "brand": "JBL", "mrp": 11999, "base_price": 9999, "category": "Audio", "sub": "Speakers"}
        ],
        "grocery": [
            {"id": "tata-sampann-tur-dal-1kg", "name": "Tata Sampann Tur Dal 1kg", "brand": "Tata", "mrp": 250, "base_price": 210, "category": "Grocery", "sub": "Dal & Pulses"},
            {"id": "aashirvaad-atta-5kg", "name": "Aashirvaad Atta 5kg", "brand": "Aashirvaad", "mrp": 300, "base_price": 260, "category": "Grocery", "sub": "Atta & Flour"},
            {"id": "amul-butter-500g", "name": "Amul Butter 500g", "brand": "Amul", "mrp": 280, "base_price": 275, "category": "Grocery", "sub": "Dairy"},
            {"id": "saffola-gold-oil-1l", "name": "Saffola Gold Oil 1L", "brand": "Saffola", "mrp": 220, "base_price": 190, "category": "Grocery", "sub": "Cooking Oil"}
        ],
        "appliances": [
            {"id": "dyson-v12-detect-slim", "name": "Dyson V12 Detect Slim", "brand": "Dyson", "mrp": 55900, "base_price": 52900, "category": "Home Appliances", "sub": "Vacuum Cleaners"},
            {"id": "samsung-1-5t-5star-ac", "name": "Samsung 1.5T 5-Star AC (AR18BYNZABE)", "brand": "Samsung", "mrp": 65990, "base_price": 45990, "category": "Home Appliances", "sub": "Air Conditioners"}
        ]
    }

def generate_reviews(platform_name):
    reviews = []
    for _ in range(5):
        reviews.append({
            "user": random.choice(INDIAN_NAMES),
            "rating": round(random.uniform(3.5, 5.0), 1),
            "title": random.choice(["Great product", "Worth the money", "Average", "Amazing quality", "Good buy"]),
            "body": "Really liked this product. It meets all expectations and works as described. Highly recommended.",
            "date": (datetime.now() - timedelta(days=random.randint(1, 300))).strftime("%Y-%m-%d"),
            "verified": True,
            "helpful_votes": random.randint(0, 100),
            "platform": platform_name
        })
    return reviews

def generate_listings(product_info, cat_key):
    plats = PLATFORMS["grocery"] if cat_key == "grocery" else PLATFORMS["electronics"]
    listings = []
    
    # We need EXACTLY 10 listings. We can repeat platforms with different sellers/variants.
    # To get 10, we'll repeat some platforms.
    selected_plats = []
    while len(selected_plats) < 10:
        selected_plats.append(random.choice(plats))
        
    for i, plat in enumerate(selected_plats):
        price_var = random.uniform(-0.05, 0.05)
        current_price = int(product_info['base_price'] * (1 + price_var))
        if current_price > product_info['mrp']:
            current_price = product_info['mrp']
            
        discount_percent = int(((product_info['mrp'] - current_price) / product_info['mrp']) * 100)
        
        listings.append({
            "platform": plat['slug'],
            "platform_display": plat['name'],
            "price": current_price,
            "original_price": product_info['mrp'],
            "discount_percent": discount_percent,
            "url": f"https://www.{plat['slug']}.com/dp/B0CX{random.randint(1000,9999)}?tag=smartkart-21",
            "in_stock": True,
            "delivery": "Free delivery in 2 days",
            "rating": round(random.uniform(3.8, 4.8), 1),
            "total_reviews": random.randint(100, 50000),
            "offers": [
                {"title": "Bank Offer", "discount_type": "percentage", "value": 10, "code": "HDFC10", "expires": "2026-12-31"},
                {"title": "Cashback", "discount_type": "flat", "value": 500, "code": "CB500", "expires": "2026-12-31"}
            ],
            "reviews": generate_reviews(plat['name']),
            "seller": f"{plat['name']} Retail",
            "warranty": "1 Year Manufacturer Warranty",
            "price_history": generate_price_history(current_price)
        })
    return listings

def main():
    data = get_product_data()
    index_categories = list(data.keys())
    index_products = []
    
    for cat_key, items in data.items():
        cat_file_content = []
        for item in items:
            listings = generate_listings(item, cat_key)
            best_price = min([l['price'] for l in listings])
            best_platform = [l['platform_display'] for l in listings if l['price'] == best_price][0]
            
            product_obj = {
                "id": item['id'],
                "name": item['name'],
                "brand": item['brand'],
                "category": item['category'],
                "subcategory": item['sub'],
                "image_url": f"https://images.smartkart.app/products/{item['id']}.jpg",
                "description": f"This is an amazing {item['name']} by {item['brand']}. It delivers top-notch performance and reliability.",
                "search_keywords": [item['name'].lower(), item['brand'].lower(), item['category'].lower(), "best " + item['name'].lower(), "cheap " + item['brand'].lower(), item['id']],
                "specs": [
                    {"key": "Brand", "value": item['brand'], "category": "General"} for _ in range(12)
                ],
                "platforms": listings
            }
            cat_file_content.append(product_obj)
            
            index_products.append({
                "id": item['id'],
                "name": item['name'],
                "category": cat_key,
                "brand": item['brand'],
                "image_url": f"https://images.smartkart.app/products/{item['id']}.jpg",
                "best_price": best_price,
                "best_platform": best_platform
            })
            
        with open(os.path.join(products_dir, f"{cat_key}.json"), "w", encoding="utf-8") as f:
            json.dump(cat_file_content, f, indent=2, ensure_ascii=False)
            
    with open(os.path.join(base_dir, "index.json"), "w", encoding="utf-8") as f:
        json.dump({
            "categories": index_categories,
            "products": index_products
        }, f, indent=2, ensure_ascii=False)
        
if __name__ == '__main__':
    main()
