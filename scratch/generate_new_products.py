import json
from pathlib import Path

# ── Nike Air Force 1 ─────────────────────────────────────────────────────────
nike_af1 = {
  "id": "nike-air-force-1-white",
  "name": "Nike Air Force 1 '07 (White)",
  "brand": "Nike",
  "category": "fashion",
  "subcategory": "sneakers",
  "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/af53d117-9c39-4e21-a898-e5c3d5a5a7a6/air-force-1-07-shoes-WrLlWX.png",
  "description": "The Nike Air Force 1 '07 is a timeless icon, built on the same lines as the original 1982 design. Premium leather upper, Nike Air cushioning, and the classic low-top silhouette make it perfect for everyday wear.",
  "search_keywords": ["nike", "air force 1", "af1", "white sneakers", "nike shoes", "casual shoes", "nike af1", "leather sneakers", "men shoes", "women shoes"],
  "best_price": 7495,
  "best_platform": "amazon",
  "specs": [
    {"key": "Brand", "value": "Nike", "category": "General"},
    {"key": "Model", "value": "Air Force 1 '07", "category": "General"},
    {"key": "Colorway", "value": "White/White", "category": "General"},
    {"key": "Upper Material", "value": "Premium Leather", "category": "Material"},
    {"key": "Sole", "value": "Rubber Outsole", "category": "Material"},
    {"key": "Closure", "value": "Lace-Up", "category": "Design"},
    {"key": "Cushioning", "value": "Nike Air Unit", "category": "Technology"},
    {"key": "Toe Box", "value": "Perforated Leather", "category": "Design"},
    {"key": "Ankle Height", "value": "Low-Top", "category": "Design"},
    {"key": "Sizes Available", "value": "UK 6 – UK 11", "category": "Sizing"},
    {"key": "Weight (per shoe)", "value": "Approx. 420g", "category": "General"},
    {"key": "Country of Origin", "value": "Indonesia / Vietnam", "category": "General"},
    {"key": "Style Code", "value": "CW2288-111", "category": "General"},
    {"key": "Year of Original Design", "value": "1982", "category": "General"}
  ],
  "platforms": [
    {
      "platform": "amazon",
      "platform_display": "Amazon",
      "price": 7495,
      "original_price": 8495,
      "discount_percent": 12,
      "url": "https://www.amazon.in/s?k=Nike+Air+Force+1+White",
      "in_stock": True,
      "delivery": "FREE delivery Tomorrow",
      "rating": 4.4,
      "total_reviews": 12800,
      "seller": "NK Footwear Store",
      "warranty": "6 Months Brand Warranty",
      "offers": [
        {"title": "10% off with HDFC Credit Card", "discount_type": "bank", "value": 10, "code": "HDFC10", "expires": "2026-09-30"},
        {"title": "Free Returns within 30 days", "discount_type": "policy", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Arjun Mehta", "rating": 5, "title": "Classic that never goes out of style", "body": "Got the white AF1s and they look absolutely premium. Leather is soft yet sturdy. The Nike Air cushioning makes it comfortable for all-day wear.", "date": "2026-07-15", "verified": True, "helpful_votes": 342, "platform": "amazon"},
        {"user": "Priya Nair", "rating": 4, "title": "Great shoe but runs slightly big", "body": "Order half a size down. The shoe is beautiful and the leather quality is excellent. Arrived in 1 day via Prime.", "date": "2026-06-22", "verified": True, "helpful_votes": 218, "platform": "amazon"},
        {"user": "Rohan Desai", "rating": 5, "title": "Perfect for daily use", "body": "Wearing these to college every day. Super comfortable, looks great with jeans or joggers. Highly recommended!", "date": "2026-05-10", "verified": True, "helpful_votes": 195, "platform": "amazon"},
        {"user": "Sneha Pillai", "rating": 3, "title": "Good but sole yellowed fast", "body": "Love the design but the sole started yellowing within 3 months of use. Otherwise a great shoe.", "date": "2026-04-01", "verified": True, "helpful_votes": 167, "platform": "amazon"},
        {"user": "Vikram Sharma", "rating": 5, "title": "Nike quality as expected", "body": "Ordered for my birthday, very impressed. The box, the tissue paper, the shoe — everything feels premium.", "date": "2026-03-14", "verified": True, "helpful_votes": 284, "platform": "amazon"}
      ]
    },
    {
      "platform": "myntra",
      "platform_display": "Myntra",
      "price": 7695,
      "original_price": 8495,
      "discount_percent": 9,
      "url": "https://www.myntra.com/shoes?rawQuery=Nike+Air+Force+1",
      "in_stock": True,
      "delivery": "Free delivery in 2-3 days",
      "rating": 4.5,
      "total_reviews": 21400,
      "seller": "Nike Official Store",
      "warranty": "6 Months Brand Warranty",
      "offers": [
        {"title": "15% off on Myntra Insider Plus", "discount_type": "membership", "value": 15, "code": "INSIDER15", "expires": "2026-09-15"},
        {"title": "Extra 5% off with Kotak Card", "discount_type": "bank", "value": 5, "code": "KOTAK5", "expires": "2026-08-31"}
      ],
      "reviews": [
        {"user": "Divya Krishnan", "rating": 5, "title": "Myntra delivered in 2 days!", "body": "Ordered Sunday evening, got it Tuesday morning. The shoe is exactly as described — super clean white and premium leather.", "date": "2026-07-05", "verified": True, "helpful_votes": 398, "platform": "myntra"},
        {"user": "Karan Patel", "rating": 4, "title": "Authentic Nike product", "body": "Bought from Nike Official Store on Myntra. QR code verified authentic. Will shop here again.", "date": "2026-06-10", "verified": True, "helpful_votes": 211, "platform": "myntra"},
        {"user": "Ananya Iyer", "rating": 5, "title": "Best sneaker ever made", "body": "AF1s are just timeless. Got them in white for my sister's birthday and she loved them. Very comfortable and stylish.", "date": "2026-05-22", "verified": True, "helpful_votes": 187, "platform": "myntra"},
        {"user": "Rahul Kumar", "rating": 4, "title": "Good quality, easy returns", "body": "The shoe was slightly tight but Myntra's return policy made it easy to exchange for a bigger size. Great service!", "date": "2026-04-17", "verified": False, "helpful_votes": 144, "platform": "myntra"},
        {"user": "Pooja Menon", "rating": 5, "title": "Iconic sneaker", "body": "I've had 3 pairs of AF1s over the years. This one feels the best quality wise. The leather is thicker and more premium.", "date": "2026-03-29", "verified": True, "helpful_votes": 267, "platform": "myntra"}
      ]
    },
    {
      "platform": "ajio",
      "platform_display": "AJIO",
      "price": 7295,
      "original_price": 8495,
      "discount_percent": 14,
      "url": "https://www.ajio.com/s/nike-air-force-1",
      "in_stock": True,
      "delivery": "Free delivery in 3-4 days",
      "rating": 4.3,
      "total_reviews": 8700,
      "seller": "AJIO Sneakers",
      "warranty": "6 Months Brand Warranty",
      "offers": [
        {"title": "Buy 2 Get Extra 10% Off", "discount_type": "combo", "value": 10, "code": "BUY2", "expires": "2026-09-30"},
        {"title": "Free Gift Wrapping", "discount_type": "service", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Siddharth Rao", "rating": 4, "title": "Good deal on AJIO", "body": "Got it during AJIO sale at 14% off. The shoe is original and well packed. Delivery was 3 days.", "date": "2026-07-01", "verified": True, "helpful_votes": 154, "platform": "ajio"},
        {"user": "Meera Joshi", "rating": 5, "title": "Beautiful white sneakers", "body": "Love how clean they look. Paired with white socks they're stunning. AJIO packaging was also great.", "date": "2026-06-08", "verified": True, "helpful_votes": 132, "platform": "ajio"},
        {"user": "Aditya Singh", "rating": 4, "title": "Authentic product", "body": "Verified authenticity using Nike website. AJIO is legit for Nike. Happy with the purchase!", "date": "2026-05-12", "verified": True, "helpful_votes": 119, "platform": "ajio"},
        {"user": "Shreya Das", "rating": 3, "title": "Delivery was slow", "body": "Took 5 days instead of 3-4. The shoe itself is great but delivery was disappointing.", "date": "2026-04-05", "verified": True, "helpful_votes": 98, "platform": "ajio"},
        {"user": "Nikhil Verma", "rating": 5, "title": "Perfect budget buy", "body": "Best priced AF1s I found online in India. No compromise on quality. Highly recommend!", "date": "2026-03-20", "verified": True, "helpful_votes": 203, "platform": "ajio"}
      ]
    },
    {
      "platform": "flipkart",
      "platform_display": "Flipkart",
      "price": 7899,
      "original_price": 8495,
      "discount_percent": 7,
      "url": "https://www.flipkart.com/search?q=Nike+Air+Force+1",
      "in_stock": True,
      "delivery": "Free delivery in 2 days",
      "rating": 4.2,
      "total_reviews": 9600,
      "seller": "RetailNet",
      "warranty": "6 Months Brand Warranty",
      "offers": [
        {"title": "Extra 8% off with Flipkart Axis Card", "discount_type": "bank", "value": 8, "code": "FKAXIS8", "expires": "2026-09-30"},
        {"title": "5% off with SuperCoins", "discount_type": "loyalty", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Gaurav Tiwari", "rating": 4, "title": "Good buy", "body": "Shoe is authentic and came well packaged. Flipkart's 10-day return window also gave me peace of mind.", "date": "2026-07-09", "verified": True, "helpful_votes": 176, "platform": "flipkart"},
        {"user": "Anjali Sharma", "rating": 5, "title": "Love my new sneakers!", "body": "First Nike purchase and I'm amazed. The comfort, the look, everything is perfect. Will buy more Nike shoes!", "date": "2026-06-14", "verified": True, "helpful_votes": 223, "platform": "flipkart"},
        {"user": "Ravi Kumar", "rating": 3, "title": "Slightly overpriced vs Amazon", "body": "Same shoe, slightly higher price. But Flipkart's SuperCoin discount helped. Delivery was fast though!", "date": "2026-05-30", "verified": True, "helpful_votes": 134, "platform": "flipkart"},
        {"user": "Sona Reddy", "rating": 5, "title": "Excellent sneakers", "body": "The leather quality is top notch and the Air cushioning is very comfortable. Great all-day shoe.", "date": "2026-04-23", "verified": True, "helpful_votes": 189, "platform": "flipkart"},
        {"user": "Manish Gupta", "rating": 4, "title": "Solid classic", "body": "AF1s look great and feel premium. Wish they came with an extra pair of laces like international versions.", "date": "2026-03-07", "verified": True, "helpful_votes": 141, "platform": "flipkart"}
      ]
    },
    {
      "platform": "tatacliq",
      "platform_display": "Tata CLiQ",
      "price": 7999,
      "original_price": 8495,
      "discount_percent": 6,
      "url": "https://www.tatacliq.com/searchCategory?searchCategory=all&text=Nike+Air+Force+1",
      "in_stock": True,
      "delivery": "Free delivery in 3-5 days",
      "rating": 4.4,
      "total_reviews": 5200,
      "seller": "Tata CLiQ Fashion",
      "warranty": "6 Months Brand Warranty",
      "offers": [
        {"title": "5% Cashback with Tata Neu Card", "discount_type": "cashback", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Kabir Malhotra", "rating": 5, "title": "Authenticated and genuine", "body": "Tata CLiQ sells genuine Nike products. Very happy with the authenticity and packaging.", "date": "2026-07-02", "verified": True, "helpful_votes": 165, "platform": "tatacliq"},
        {"user": "Rashmi Bansal", "rating": 4, "title": "Good delivery", "body": "Came in 4 days. Shoe is genuine and looks great. Will shop more fashion from Tata CLiQ.", "date": "2026-06-18", "verified": True, "helpful_votes": 132, "platform": "tatacliq"},
        {"user": "Amit Saxena", "rating": 5, "title": "Great for gifting", "body": "Bought for my girlfriend's birthday. The packaging was premium and she loved it!", "date": "2026-05-20", "verified": True, "helpful_votes": 118, "platform": "tatacliq"},
        {"user": "Zara Khan", "rating": 4, "title": "Comfortable and stylish", "body": "These shoes are super comfortable for long walks. The white leather stays clean if you maintain it.", "date": "2026-04-11", "verified": False, "helpful_votes": 97, "platform": "tatacliq"},
        {"user": "Deepak Nair", "rating": 5, "title": "Worth every penny", "body": "Premium Nike quality. The Air unit cushioning is genuinely comfortable. Highly recommend!", "date": "2026-03-25", "verified": True, "helpful_votes": 214, "platform": "tatacliq"}
      ]
    },
    {
      "platform": "meesho",
      "platform_display": "Meesho",
      "price": 6999,
      "original_price": 8495,
      "discount_percent": 18,
      "url": "https://www.meesho.com/search?q=Nike+Air+Force+1",
      "in_stock": True,
      "delivery": "Free delivery in 5-7 days",
      "rating": 3.8,
      "total_reviews": 34600,
      "seller": "Sneakers Hub",
      "warranty": "Seller Warranty",
      "offers": [
        {"title": "Extra 10% off — First Order", "discount_type": "first_order", "value": 10, "code": "FIRST10", "expires": "2026-12-31"}
      ],
      "reviews": [
        {"user": "Tarun Batra", "rating": 4, "title": "Good for the price", "body": "Not 100% sure if original but looks and feels good. For this price, very satisfied.", "date": "2026-07-18", "verified": True, "helpful_votes": 287, "platform": "meesho"},
        {"user": "Preeti Singh", "rating": 3, "title": "Might not be original", "body": "Quality is decent but I'm skeptical. Buy from Nike authorized sellers for guaranteed authenticity.", "date": "2026-06-05", "verified": False, "helpful_votes": 412, "platform": "meesho"},
        {"user": "Saurav Ghosh", "rating": 4, "title": "Looks great", "body": "For casual wear this is perfect. Looks like AF1, feels comfortable, got it super cheap.", "date": "2026-05-14", "verified": True, "helpful_votes": 195, "platform": "meesho"},
        {"user": "Komal Yadav", "rating": 5, "title": "Amazing value", "body": "Can't believe I got AF1 style shoes at this price. Very happy with the purchase!", "date": "2026-04-29", "verified": True, "helpful_votes": 321, "platform": "meesho"},
        {"user": "Harish Pandey", "rating": 2, "title": "Not original", "body": "The logo looks slightly off. Return process was easy though. Buy from branded stores instead.", "date": "2026-03-11", "verified": True, "helpful_votes": 532, "platform": "meesho"}
      ]
    },
    {
      "platform": "snapdeal",
      "platform_display": "Snapdeal",
      "price": 7299,
      "original_price": 8495,
      "discount_percent": 14,
      "url": "https://www.snapdeal.com/search?keyword=Nike+Air+Force+1",
      "in_stock": True,
      "delivery": "Free delivery in 4-6 days",
      "rating": 3.9,
      "total_reviews": 6800,
      "seller": "Brand Factory",
      "warranty": "6 Months Warranty",
      "offers": [
        {"title": "Additional 5% off with Snapdeal UPI", "discount_type": "payment", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Prakash Reddy", "rating": 4, "title": "Decent buy", "body": "Good quality sneakers for the price. Delivery was 5 days. Snapdeal packaging was okay.", "date": "2026-07-22", "verified": True, "helpful_votes": 98, "platform": "snapdeal"},
        {"user": "Neha Jain", "rating": 3, "title": "Average experience", "body": "The shoe is okay, delivery was slow. Would prefer buying from Amazon or Myntra next time.", "date": "2026-06-27", "verified": True, "helpful_votes": 87, "platform": "snapdeal"},
        {"user": "Rajesh Kumar", "rating": 5, "title": "Great value", "body": "Very happy with this purchase. Looks stylish and comfortable. Good deal!", "date": "2026-05-08", "verified": False, "helpful_votes": 113, "platform": "snapdeal"},
        {"user": "Alka Sharma", "rating": 4, "title": "Comfortable sneakers", "body": "The Air cushioning is noticeable. Good for daily walks and casual outings.", "date": "2026-04-14", "verified": True, "helpful_votes": 76, "platform": "snapdeal"},
        {"user": "Suresh Pillai", "rating": 4, "title": "Good quality leather", "body": "Leather feels premium. A bit concerned about authenticity but product looks and feels great.", "date": "2026-03-03", "verified": True, "helpful_votes": 89, "platform": "snapdeal"}
      ]
    },
    {
      "platform": "nykaa_fashion",
      "platform_display": "Nykaa Fashion",
      "price": 7999,
      "original_price": 8495,
      "discount_percent": 6,
      "url": "https://www.nykaafashion.com/search?q=Nike+Air+Force+1",
      "in_stock": True,
      "delivery": "Free delivery in 3-5 days",
      "rating": 4.3,
      "total_reviews": 4100,
      "seller": "Nykaa Fashion",
      "warranty": "6 Months Brand Warranty",
      "offers": [
        {"title": "10% off on Nykaa HDFC Card", "discount_type": "bank", "value": 10, "code": "NYKAAHDFC10", "expires": "2026-09-30"}
      ],
      "reviews": [
        {"user": "Riya Mehta", "rating": 5, "title": "Nykaa for shoes too!", "body": "Was surprised to find Nike here. Product is genuine, packaging beautiful. Great experience!", "date": "2026-07-10", "verified": True, "helpful_votes": 134, "platform": "nykaa_fashion"},
        {"user": "Shalini Gupta", "rating": 4, "title": "Good platform", "body": "Easy shopping experience. The shoe arrived in good condition. Will buy more here!", "date": "2026-06-15", "verified": True, "helpful_votes": 112, "platform": "nykaa_fashion"},
        {"user": "Monika Choudhary", "rating": 5, "title": "Authentic Nike", "body": "Bought for my husband. He loves them! Nykaa Fashion is now my go-to for branded shoes.", "date": "2026-05-28", "verified": True, "helpful_votes": 98, "platform": "nykaa_fashion"},
        {"user": "Prashant Tiwari", "rating": 4, "title": "Premium feel", "body": "The leather is butter soft and the shoe looks stunning. Perfect with jeans.", "date": "2026-04-19", "verified": True, "helpful_votes": 87, "platform": "nykaa_fashion"},
        {"user": "Vandana Singh", "rating": 3, "title": "Slightly expensive", "body": "Same shoe is cheaper on AJIO. But Nykaa's service was better. Mixed feelings.", "date": "2026-03-08", "verified": True, "helpful_votes": 73, "platform": "nykaa_fashion"}
      ]
    },
    {
      "platform": "reliance_trends",
      "platform_display": "Reliance Trends",
      "price": 7799,
      "original_price": 8495,
      "discount_percent": 8,
      "url": "https://www.relianceretail.com/brands/nike.html",
      "in_stock": True,
      "delivery": "Free delivery or in-store pickup in 3-4 days",
      "rating": 4.1,
      "total_reviews": 2900,
      "seller": "Reliance Retail",
      "warranty": "6 Months Brand Warranty",
      "offers": [
        {"title": "5% off on Jio Finance Card", "discount_type": "bank", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Arun Shetty", "rating": 4, "title": "Good in-store experience", "body": "Bought in-store at Reliance Trends. Staff was helpful and the shoe fits perfectly. Good experience.", "date": "2026-07-03", "verified": True, "helpful_votes": 67, "platform": "reliance_trends"},
        {"user": "Deepa Nambiar", "rating": 5, "title": "Original Nike guaranteed", "body": "When you buy from Reliance Retail, you know it's authentic. Very happy with the shoe!", "date": "2026-06-21", "verified": True, "helpful_votes": 89, "platform": "reliance_trends"},
        {"user": "Nitin Malhotra", "rating": 4, "title": "Comfortable and stylish", "body": "Great everyday sneaker. The Air unit makes it comfortable for long hours.", "date": "2026-05-16", "verified": True, "helpful_votes": 76, "platform": "reliance_trends"},
        {"user": "Sunita Rao", "rating": 3, "title": "Limited stock", "body": "Only a few sizes available online. Had to go to the store. But shoe quality is great.", "date": "2026-04-08", "verified": True, "helpful_votes": 54, "platform": "reliance_trends"},
        {"user": "Vijay Krishnamurthy", "rating": 5, "title": "Classic design", "body": "AF1s are legendary for a reason. This pair is perfect quality and looks stunning.", "date": "2026-03-22", "verified": False, "helpful_votes": 92, "platform": "reliance_trends"}
      ]
    },
    {
      "platform": "shopclues",
      "platform_display": "ShopClues",
      "price": 6799,
      "original_price": 8495,
      "discount_percent": 20,
      "url": "https://www.shopclues.com/search?q=Nike+Air+Force+1",
      "in_stock": False,
      "delivery": "Delivery in 5-8 days",
      "rating": 3.5,
      "total_reviews": 3200,
      "seller": "Sport Zone",
      "warranty": "Seller Warranty",
      "offers": [
        {"title": "Extra 15% off on ShopClues Select", "discount_type": "membership", "value": 15, "code": "SELECT15", "expires": "2026-08-31"}
      ],
      "reviews": [
        {"user": "Irfan Khan", "rating": 3, "title": "Risky buy", "body": "Wouldn't recommend for authentic Nike. Shoe looks okay but authenticity doubtful. Buy from branded stores.", "date": "2026-07-14", "verified": True, "helpful_votes": 287, "platform": "shopclues"},
        {"user": "Pallavi Mishra", "rating": 4, "title": "Budget option", "body": "If you want the look for less, this works. Quality is decent for the price.", "date": "2026-06-03", "verified": False, "helpful_votes": 198, "platform": "shopclues"},
        {"user": "Sanjay Bose", "rating": 2, "title": "Not what was shown", "body": "Sole material felt cheap and logo didn't look right. Returned immediately.", "date": "2026-05-18", "verified": True, "helpful_votes": 412, "platform": "shopclues"},
        {"user": "Kavya Reddy", "rating": 4, "title": "Looks great", "body": "Happy with the purchase. May not be 100% original but looks and feels good for casual use.", "date": "2026-04-06", "verified": True, "helpful_votes": 143, "platform": "shopclues"},
        {"user": "Mohit Kapoor", "rating": 3, "title": "Average quality", "body": "Acceptable for the price. Not original Nike quality. Buyer beware.", "date": "2026-03-16", "verified": True, "helpful_votes": 321, "platform": "shopclues"}
      ]
    }
  ],
  "price_history": [
    {"date": "2024-09", "price": 8495, "platform": "amazon"},
    {"date": "2024-10", "price": 7295, "platform": "amazon"},
    {"date": "2024-11", "price": 6999, "platform": "amazon"},
    {"date": "2024-12", "price": 7495, "platform": "amazon"},
    {"date": "2025-01", "price": 7199, "platform": "amazon"},
    {"date": "2025-02", "price": 7799, "platform": "amazon"},
    {"date": "2025-03", "price": 7995, "platform": "amazon"},
    {"date": "2025-04", "price": 8495, "platform": "amazon"},
    {"date": "2025-05", "price": 8495, "platform": "amazon"},
    {"date": "2025-06", "price": 7999, "platform": "amazon"},
    {"date": "2025-07", "price": 7795, "platform": "amazon"},
    {"date": "2025-08", "price": 7395, "platform": "amazon"},
    {"date": "2025-09", "price": 8495, "platform": "amazon"},
    {"date": "2025-10", "price": 7195, "platform": "amazon"},
    {"date": "2025-11", "price": 6795, "platform": "amazon"},
    {"date": "2025-12", "price": 7495, "platform": "amazon"},
    {"date": "2026-01", "price": 7195, "platform": "amazon"},
    {"date": "2026-02", "price": 7795, "platform": "amazon"},
    {"date": "2026-03", "price": 7995, "platform": "amazon"},
    {"date": "2026-04", "price": 8495, "platform": "amazon"},
    {"date": "2026-05", "price": 8295, "platform": "amazon"},
    {"date": "2026-06", "price": 7795, "platform": "amazon"},
    {"date": "2026-07", "price": 7595, "platform": "amazon"},
    {"date": "2026-08", "price": 7495, "platform": "amazon"},
    {"date": "2024-09", "price": 8495, "platform": "flipkart"},
    {"date": "2024-10", "price": 7499, "platform": "flipkart"},
    {"date": "2024-11", "price": 7099, "platform": "flipkart"},
    {"date": "2024-12", "price": 7699, "platform": "flipkart"},
    {"date": "2025-01", "price": 7299, "platform": "flipkart"},
    {"date": "2025-02", "price": 7899, "platform": "flipkart"},
    {"date": "2025-03", "price": 8295, "platform": "flipkart"},
    {"date": "2025-04", "price": 8495, "platform": "flipkart"},
    {"date": "2025-05", "price": 8495, "platform": "flipkart"},
    {"date": "2025-06", "price": 8099, "platform": "flipkart"},
    {"date": "2025-07", "price": 7899, "platform": "flipkart"},
    {"date": "2025-08", "price": 7599, "platform": "flipkart"},
    {"date": "2025-09", "price": 8495, "platform": "flipkart"},
    {"date": "2025-10", "price": 7399, "platform": "flipkart"},
    {"date": "2025-11", "price": 6999, "platform": "flipkart"},
    {"date": "2025-12", "price": 7699, "platform": "flipkart"},
    {"date": "2026-01", "price": 7399, "platform": "flipkart"},
    {"date": "2026-02", "price": 7899, "platform": "flipkart"},
    {"date": "2026-03", "price": 8199, "platform": "flipkart"},
    {"date": "2026-04", "price": 8495, "platform": "flipkart"},
    {"date": "2026-05", "price": 8295, "platform": "flipkart"},
    {"date": "2026-06", "price": 7999, "platform": "flipkart"},
    {"date": "2026-07", "price": 7799, "platform": "flipkart"},
    {"date": "2026-08", "price": 7899, "platform": "flipkart"}
  ]
}

# ── Safari Laptop Bag ─────────────────────────────────────────────────────────
safari_bag = {
  "id": "safari-laptop-backpack-35l",
  "name": "Safari Thorium 35L Laptop Backpack",
  "brand": "Safari",
  "category": "bags",
  "subcategory": "laptop_bags",
  "image_url": "https://images.meesho.com/images/products/178652011/r6ghj_1200.jpg",
  "description": "The Safari Thorium 35L Laptop Backpack is built for professionals and students with a dedicated 15.6\" laptop compartment, multiple organiser pockets, and water-resistant material. Ergonomic padded shoulder straps and back support make it comfortable for daily commutes.",
  "search_keywords": ["safari bag", "laptop backpack", "safari laptop bag", "35l backpack", "office bag", "college bag", "travel backpack", "shoulder bag", "safari thorium", "waterproof laptop bag"],
  "best_price": 1299,
  "best_platform": "amazon",
  "specs": [
    {"key": "Brand", "value": "Safari", "category": "General"},
    {"key": "Model", "value": "Thorium 35L", "category": "General"},
    {"key": "Capacity", "value": "35 Litres", "category": "Dimensions"},
    {"key": "Laptop Compartment", "value": "Fits up to 15.6\" laptops", "category": "Compatibility"},
    {"key": "Material", "value": "600D Polyester with Water-Resistant Coating", "category": "Material"},
    {"key": "Dimensions", "value": "47 x 32 x 16 cm", "category": "Dimensions"},
    {"key": "Weight", "value": "850g", "category": "Dimensions"},
    {"key": "Number of Compartments", "value": "3 Main + 2 Front Pockets + 2 Side Pockets", "category": "Design"},
    {"key": "Shoulder Straps", "value": "Padded Adjustable with Ergonomic Curve", "category": "Comfort"},
    {"key": "Back Support", "value": "Ventilated Padded Back Panel", "category": "Comfort"},
    {"key": "USB Charging Port", "value": "Yes (External + Internal Cable)", "category": "Features"},
    {"key": "Colour", "value": "Navy Blue / Grey / Black", "category": "Design"},
    {"key": "Closure", "value": "YKK Zippers", "category": "Design"},
    {"key": "Warranty", "value": "3 Years Manufacturer Warranty", "category": "Warranty"}
  ],
  "platforms": [
    {
      "platform": "amazon",
      "platform_display": "Amazon",
      "price": 1299,
      "original_price": 2499,
      "discount_percent": 48,
      "url": "https://www.amazon.in/s?k=Safari+Laptop+Backpack+35L",
      "in_stock": True,
      "delivery": "FREE delivery Tomorrow",
      "rating": 4.3,
      "total_reviews": 18700,
      "seller": "SafariBags Official",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "Extra 10% off with ICICI Credit Card", "discount_type": "bank", "value": 10, "code": "ICICI10", "expires": "2026-09-30"},
        {"title": "Buy 2 bags get 5% off", "discount_type": "combo", "value": 5, "code": "2BAGS5", "expires": "2026-08-31"}
      ],
      "reviews": [
        {"user": "Suresh Babu", "rating": 5, "title": "Best laptop bag under 1500!", "body": "Excellent quality for the price. Fits my 15.6\" Lenovo perfectly. The USB charging port is very handy. Shoulder straps are padded and comfortable even for 1 hour commutes.", "date": "2026-07-20", "verified": True, "helpful_votes": 567, "platform": "amazon"},
        {"user": "Pooja Iyer", "rating": 4, "title": "Sturdy and spacious", "body": "Using this daily for office. Fits laptop, charger, lunch box and water bottle easily. Water resistant coating works well in light rain.", "date": "2026-06-14", "verified": True, "helpful_votes": 423, "platform": "amazon"},
        {"user": "Amit Pandey", "rating": 5, "title": "Great value for money", "body": "Was skeptical buying a bag under 1500 but Safari never disappoints. Zipper quality is excellent and the back padding is comfortable.", "date": "2026-05-09", "verified": True, "helpful_votes": 389, "platform": "amazon"},
        {"user": "Kritika Sharma", "rating": 3, "title": "Good but stitching could be better", "body": "The bag is good overall but noticed some loose stitching near the side pockets. Otherwise satisfied.", "date": "2026-04-22", "verified": True, "helpful_votes": 234, "platform": "amazon"},
        {"user": "Varun Nair", "rating": 5, "title": "Perfect for travel and office", "body": "Used this on a 5-day trip. Fits cabin baggage size and has space for everything. The organization pockets are very useful.", "date": "2026-03-18", "verified": True, "helpful_votes": 478, "platform": "amazon"}
      ]
    },
    {
      "platform": "flipkart",
      "platform_display": "Flipkart",
      "price": 1349,
      "original_price": 2499,
      "discount_percent": 46,
      "url": "https://www.flipkart.com/search?q=Safari+Laptop+Backpack",
      "in_stock": True,
      "delivery": "Free delivery in 2 days",
      "rating": 4.2,
      "total_reviews": 24300,
      "seller": "Cloudtail India",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "10% off with Flipkart Axis Bank Card", "discount_type": "bank", "value": 10, "code": "FKAXIS10", "expires": "2026-09-30"},
        {"title": "Extra 5% off with Flipkart Pay Later", "discount_type": "payment", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Deepak Verma", "rating": 4, "title": "Good quality bag", "body": "Using for 6 months now and still holds up well. The compartments are very organized. Happy with the purchase.", "date": "2026-07-12", "verified": True, "helpful_votes": 312, "platform": "flipkart"},
        {"user": "Lakshmi Venkat", "rating": 5, "title": "College bag perfect", "body": "Perfect for college. Fits 15.6 inch laptop, books, tiffin and water bottle. Very comfortable to carry.", "date": "2026-06-25", "verified": True, "helpful_votes": 278, "platform": "flipkart"},
        {"user": "Rahul Agarwal", "rating": 4, "title": "Durable and water resistant", "body": "Got caught in heavy rain and my laptop was completely safe. The material really is water resistant!", "date": "2026-05-31", "verified": True, "helpful_votes": 445, "platform": "flipkart"},
        {"user": "Priya Kapoor", "rating": 3, "title": "Shoulder strap issue after 4 months", "body": "The left shoulder strap started fraying after 4 months of daily use. Safari's warranty replaced it though.", "date": "2026-04-16", "verified": True, "helpful_votes": 198, "platform": "flipkart"},
        {"user": "Vinay Joshi", "rating": 5, "title": "Best bag for this price", "body": "Was comparing many options. Safari Thorium is clearly the best build quality for under 1500. Highly recommend.", "date": "2026-03-05", "verified": True, "helpful_votes": 367, "platform": "flipkart"}
      ]
    },
    {
      "platform": "meesho",
      "platform_display": "Meesho",
      "price": 999,
      "original_price": 2499,
      "discount_percent": 60,
      "url": "https://www.meesho.com/search?q=Safari+Laptop+Bag",
      "in_stock": True,
      "delivery": "Free delivery in 5-7 days",
      "rating": 3.9,
      "total_reviews": 48900,
      "seller": "Bag Zone",
      "warranty": "Seller Warranty",
      "offers": [
        {"title": "Extra 15% off — First Order", "discount_type": "first_order", "value": 15, "code": "FIRST15", "expires": "2026-12-31"}
      ],
      "reviews": [
        {"user": "Shankar Pillai", "rating": 4, "title": "Budget buy, decent quality", "body": "Good bag for the price. Don't expect brand new quality but for everyday use this is more than enough.", "date": "2026-07-08", "verified": True, "helpful_votes": 412, "platform": "meesho"},
        {"user": "Renu Srivastava", "rating": 3, "title": "Okay for the price", "body": "Zippers feel a bit cheap but the overall bag is decent. Fits my laptop and essentials.", "date": "2026-06-19", "verified": True, "helpful_votes": 287, "platform": "meesho"},
        {"user": "Bala Krishnan", "rating": 5, "title": "Exceeded expectations", "body": "For under 1000 this bag is amazing. Looks good, spacious and durable. Very happy!", "date": "2026-05-27", "verified": True, "helpful_votes": 356, "platform": "meesho"},
        {"user": "Sunita Tiwari", "rating": 4, "title": "Good for daily use", "body": "Using for college. Comfortable to carry even when full. The USB port is a great bonus.", "date": "2026-04-13", "verified": True, "helpful_votes": 234, "platform": "meesho"},
        {"user": "Manoj Sharma", "rating": 3, "title": "Product differs from images", "body": "The colour was slightly different from the website images. Quality is okay but not as shown.", "date": "2026-03-28", "verified": True, "helpful_votes": 198, "platform": "meesho"}
      ]
    },
    {
      "platform": "myntra",
      "platform_display": "Myntra",
      "price": 1499,
      "original_price": 2499,
      "discount_percent": 40,
      "url": "https://www.myntra.com/bags?rawQuery=Safari+laptop+backpack",
      "in_stock": True,
      "delivery": "Free delivery in 3-4 days",
      "rating": 4.1,
      "total_reviews": 8900,
      "seller": "Safari Official",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "Additional 10% off with Myntra HDFC Card", "discount_type": "bank", "value": 10, "code": "MYNHDFC10", "expires": "2026-09-30"}
      ],
      "reviews": [
        {"user": "Kavita Menon", "rating": 5, "title": "Great office bag", "body": "Perfect for office use. Fits everything I need. The back padding is very comfortable for long commutes.", "date": "2026-07-16", "verified": True, "helpful_votes": 189, "platform": "myntra"},
        {"user": "Arjun Pillai", "rating": 4, "title": "Stylish and functional", "body": "Looks professional and has great organization. The laptop fits snugly with good padding protection.", "date": "2026-06-30", "verified": True, "helpful_votes": 156, "platform": "myntra"},
        {"user": "Smita Kulkarni", "rating": 4, "title": "Good for travel", "body": "Used this on a business trip. Very spacious and organized. Fits airline overhead cabin easily.", "date": "2026-05-24", "verified": True, "helpful_votes": 143, "platform": "myntra"},
        {"user": "Rohit Bansal", "rating": 3, "title": "Slightly overpriced on Myntra", "body": "Same bag cheaper on Amazon. Myntra's delivery was fast but the price difference is noticeable.", "date": "2026-04-07", "verified": True, "helpful_votes": 112, "platform": "myntra"},
        {"user": "Divya Krishnaswamy", "rating": 5, "title": "College essential", "body": "Best bag for college students. Very spacious, comfortable and looks professional. Love it!", "date": "2026-03-15", "verified": True, "helpful_votes": 224, "platform": "myntra"}
      ]
    },
    {
      "platform": "tatacliq",
      "platform_display": "Tata CLiQ",
      "price": 1599,
      "original_price": 2499,
      "discount_percent": 36,
      "url": "https://www.tatacliq.com/searchCategory?searchCategory=all&text=Safari+Laptop+Bag",
      "in_stock": True,
      "delivery": "Free delivery in 3-5 days",
      "rating": 4.2,
      "total_reviews": 4200,
      "seller": "Tata CLiQ",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "5% Cashback with Tata Neu HDFC Card", "discount_type": "cashback", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Pradeep Nair", "rating": 5, "title": "Genuine product, fast delivery", "body": "Bought for my son's college. Arrived in 4 days. The bag quality is great and very spacious.", "date": "2026-07-04", "verified": True, "helpful_votes": 143, "platform": "tatacliq"},
        {"user": "Manjula Suresh", "rating": 4, "title": "Good quality", "body": "The stitching and material quality are both good. Happy with the 3-year warranty from Safari.", "date": "2026-06-18", "verified": True, "helpful_votes": 119, "platform": "tatacliq"},
        {"user": "Arun Krishnan", "rating": 5, "title": "Perfect for professionals", "body": "Using for office. Very organized with multiple pockets. Fits 15.6 inch Dell perfectly.", "date": "2026-05-11", "verified": True, "helpful_votes": 132, "platform": "tatacliq"},
        {"user": "Geeta Sharma", "rating": 4, "title": "Good bag overall", "body": "Comfortable, spacious, good zippers. A reliable daily companion.", "date": "2026-04-25", "verified": False, "helpful_votes": 98, "platform": "tatacliq"},
        {"user": "Karthik Raja", "rating": 4, "title": "Value for money", "body": "36% off MRP is a great deal. The bag quality justifies even the full price. Happy with this purchase.", "date": "2026-03-10", "verified": True, "helpful_votes": 167, "platform": "tatacliq"}
      ]
    },
    {
      "platform": "ajio",
      "platform_display": "AJIO",
      "price": 1199,
      "original_price": 2499,
      "discount_percent": 52,
      "url": "https://www.ajio.com/s/safari-laptop-bag",
      "in_stock": True,
      "delivery": "Free delivery in 3-4 days",
      "rating": 4.0,
      "total_reviews": 6700,
      "seller": "AJIO Bags",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "Buy 2 Get Extra 10% Off", "discount_type": "combo", "value": 10, "code": "BUY2BAGS", "expires": "2026-09-30"}
      ],
      "reviews": [
        {"user": "Sameera Khan", "rating": 4, "title": "Good deal on AJIO", "body": "52% off is a great deal! Bag looks premium and the organization is excellent. Highly recommend.", "date": "2026-07-25", "verified": True, "helpful_votes": 213, "platform": "ajio"},
        {"user": "Vikas Yadav", "rating": 5, "title": "Best buy of the year", "body": "Perfect bag for college and travel. Very spacious, comfortable, and stylish. Couldn't be happier!", "date": "2026-06-09", "verified": True, "helpful_votes": 287, "platform": "ajio"},
        {"user": "Shweta Mishra", "rating": 4, "title": "Decent quality for price", "body": "Good bag, all features work as described. USB port, multiple pockets, all present and functional.", "date": "2026-05-22", "verified": True, "helpful_votes": 178, "platform": "ajio"},
        {"user": "Rajan Mehta", "rating": 3, "title": "Took longer than expected", "body": "Delivery took 6 days instead of 3-4. Bag quality is good though.", "date": "2026-04-14", "verified": True, "helpful_votes": 134, "platform": "ajio"},
        {"user": "Lalitha Devi", "rating": 5, "title": "Happy purchase", "body": "Safari bags are always reliable. This one is spacious, comfortable and looks professional.", "date": "2026-03-28", "verified": True, "helpful_votes": 198, "platform": "ajio"}
      ]
    },
    {
      "platform": "snapdeal",
      "platform_display": "Snapdeal",
      "price": 1150,
      "original_price": 2499,
      "discount_percent": 54,
      "url": "https://www.snapdeal.com/search?keyword=Safari+Laptop+Backpack",
      "in_stock": True,
      "delivery": "Delivery in 4-6 days",
      "rating": 3.8,
      "total_reviews": 9800,
      "seller": "BagMart",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "5% off on UPI Payment", "discount_type": "payment", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Tarun Sharma", "rating": 4, "title": "Good but slow delivery", "body": "Bag quality is solid. Delivery was 6 days. Otherwise satisfied with the purchase.", "date": "2026-07-19", "verified": True, "helpful_votes": 156, "platform": "snapdeal"},
        {"user": "Nisha Patel", "rating": 3, "title": "Mixed experience", "body": "Bag is okay but customer support was slow. Snapdeal needs to improve their service.", "date": "2026-06-07", "verified": True, "helpful_votes": 123, "platform": "snapdeal"},
        {"user": "Abhishek Rao", "rating": 5, "title": "Excellent value", "body": "Best price I found for this bag. Snapdeal delivered it in 5 days. Very happy!", "date": "2026-05-16", "verified": True, "helpful_votes": 189, "platform": "snapdeal"},
        {"user": "Ritu Gupta", "rating": 4, "title": "Good daily bag", "body": "Using for daily office commute. Comfortable straps and good laptop protection.", "date": "2026-04-03", "verified": False, "helpful_votes": 98, "platform": "snapdeal"},
        {"user": "Mohan Das", "rating": 4, "title": "Solid build quality", "body": "The zippers are smooth, material feels durable. Good bag overall.", "date": "2026-03-12", "verified": True, "helpful_votes": 134, "platform": "snapdeal"}
      ]
    },
    {
      "platform": "croma",
      "platform_display": "Croma",
      "price": 1799,
      "original_price": 2499,
      "discount_percent": 28,
      "url": "https://www.croma.com/searchB?q=Safari+Laptop+Bag",
      "in_stock": True,
      "delivery": "Free delivery in 2-3 days or same-day in select cities",
      "rating": 4.4,
      "total_reviews": 3400,
      "seller": "Croma Retail",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "Extra 5% off on Croma Pay", "discount_type": "payment", "value": 5, "code": None, "expires": None},
        {"title": "Buy now pay later with No-cost EMI", "discount_type": "emi", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Srinivas Reddy", "rating": 5, "title": "Premium experience at Croma", "body": "Bought in-store. Staff helped choose the right model. The bag quality is excellent and warranty is guaranteed.", "date": "2026-07-11", "verified": True, "helpful_votes": 145, "platform": "croma"},
        {"user": "Padma Krishnan", "rating": 4, "title": "Reliable purchase", "body": "Croma always delivers genuine products. Bag is comfortable and spacious. Happy with the purchase.", "date": "2026-06-23", "verified": True, "helpful_votes": 123, "platform": "croma"},
        {"user": "Girish Mehta", "rating": 5, "title": "Great bag, great service", "body": "In-store experience was excellent. Bag quality is top-notch. The USB port feature is very useful.", "date": "2026-05-18", "verified": True, "helpful_votes": 178, "platform": "croma"},
        {"user": "Anjana Sharma", "rating": 4, "title": "Good but expensive on Croma", "body": "Same bag is cheaper online. But Croma's in-store warranty and service are worth the premium.", "date": "2026-04-08", "verified": True, "helpful_votes": 112, "platform": "croma"},
        {"user": "Ramesh Agarwal", "rating": 4, "title": "Solid everyday bag", "body": "Using for 2 months now. Very comfortable and spacious. The padded back support is excellent.", "date": "2026-03-20", "verified": True, "helpful_votes": 167, "platform": "croma"}
      ]
    },
    {
      "platform": "reliance_digital",
      "platform_display": "Reliance Digital",
      "price": 1699,
      "original_price": 2499,
      "discount_percent": 32,
      "url": "https://www.reliancedigital.in/search?q=Safari+Laptop+Bag",
      "in_stock": True,
      "delivery": "Free delivery in 2-3 days",
      "rating": 4.2,
      "total_reviews": 2800,
      "seller": "Reliance Digital",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "5% off with Jio Finance Card", "discount_type": "bank", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Aditya Kumar", "rating": 4, "title": "Good buy at Reliance Digital", "body": "Genuine product, 3 year warranty, fast delivery. Happy with the purchase from Reliance Digital.", "date": "2026-07-06", "verified": True, "helpful_votes": 87, "platform": "reliance_digital"},
        {"user": "Usha Ramachandran", "rating": 5, "title": "Comfortable and spacious", "body": "The ergonomic back support makes it very comfortable even when carrying heavy load. Love it!", "date": "2026-06-21", "verified": True, "helpful_votes": 112, "platform": "reliance_digital"},
        {"user": "Satish Patil", "rating": 4, "title": "Good quality", "body": "Solid build, reliable zippers, good laptop protection. Very satisfied.", "date": "2026-05-15", "verified": True, "helpful_votes": 98, "platform": "reliance_digital"},
        {"user": "Kamala Nair", "rating": 3, "title": "Decent but not the cheapest", "body": "Amazon has it cheaper. But Reliance Digital's service is reliable and warranty is guaranteed.", "date": "2026-04-09", "verified": True, "helpful_votes": 76, "platform": "reliance_digital"},
        {"user": "Suraj Bose", "rating": 5, "title": "Great gifting option", "body": "Bought for my college-going nephew. He loves it! Great bag at a good price.", "date": "2026-03-14", "verified": False, "helpful_votes": 134, "platform": "reliance_digital"}
      ]
    },
    {
      "platform": "vijay_sales",
      "platform_display": "Vijay Sales",
      "price": 1750,
      "original_price": 2499,
      "discount_percent": 30,
      "url": "https://www.vijaysales.com/search/Safari+Laptop+Bag",
      "in_stock": True,
      "delivery": "Free delivery in 3-5 days or store pickup",
      "rating": 4.1,
      "total_reviews": 1900,
      "seller": "Vijay Sales",
      "warranty": "3 Years Manufacturer Warranty",
      "offers": [
        {"title": "No-cost EMI on 3 months", "discount_type": "emi", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Nilesh Shah", "rating": 4, "title": "Good quality bag", "body": "Bought from Vijay Sales store. Good quality, fits all my essentials. Happy with the purchase.", "date": "2026-07-17", "verified": True, "helpful_votes": 65, "platform": "vijay_sales"},
        {"user": "Hema Patel", "rating": 5, "title": "Trusted store, great product", "body": "Always trust Vijay Sales for electronics accessories. The bag is exactly as described. Excellent!", "date": "2026-06-28", "verified": True, "helpful_votes": 89, "platform": "vijay_sales"},
        {"user": "Ranjit Kulkarni", "rating": 4, "title": "Good everyday bag", "body": "Comfortable straps, spacious compartments, good laptop protection. Reliable daily companion.", "date": "2026-05-20", "verified": True, "helpful_votes": 78, "platform": "vijay_sales"},
        {"user": "Swati Desai", "rating": 4, "title": "Good service at store", "body": "Friendly staff helped me choose the right bag. Quality is great. 3 year warranty gives peace of mind.", "date": "2026-04-12", "verified": True, "helpful_votes": 56, "platform": "vijay_sales"},
        {"user": "Prakash Joshi", "rating": 4, "title": "Value for money", "body": "Good bag for the price. Durable material and comfortable to carry even when heavy.", "date": "2026-03-06", "verified": True, "helpful_votes": 91, "platform": "vijay_sales"}
      ]
    }
  ],
  "price_history": [
    {"date": "2024-09", "price": 2499, "platform": "amazon"},
    {"date": "2024-10", "price": 1699, "platform": "amazon"},
    {"date": "2024-11", "price": 1399, "platform": "amazon"},
    {"date": "2024-12", "price": 1799, "platform": "amazon"},
    {"date": "2025-01", "price": 1499, "platform": "amazon"},
    {"date": "2025-02", "price": 1899, "platform": "amazon"},
    {"date": "2025-03", "price": 1999, "platform": "amazon"},
    {"date": "2025-04", "price": 2499, "platform": "amazon"},
    {"date": "2025-05", "price": 2199, "platform": "amazon"},
    {"date": "2025-06", "price": 1799, "platform": "amazon"},
    {"date": "2025-07", "price": 1599, "platform": "amazon"},
    {"date": "2025-08", "price": 1399, "platform": "amazon"},
    {"date": "2025-09", "price": 2499, "platform": "amazon"},
    {"date": "2025-10", "price": 1499, "platform": "amazon"},
    {"date": "2025-11", "price": 1199, "platform": "amazon"},
    {"date": "2025-12", "price": 1699, "platform": "amazon"},
    {"date": "2026-01", "price": 1399, "platform": "amazon"},
    {"date": "2026-02", "price": 1799, "platform": "amazon"},
    {"date": "2026-03", "price": 1999, "platform": "amazon"},
    {"date": "2026-04", "price": 2299, "platform": "amazon"},
    {"date": "2026-05", "price": 1999, "platform": "amazon"},
    {"date": "2026-06", "price": 1599, "platform": "amazon"},
    {"date": "2026-07", "price": 1399, "platform": "amazon"},
    {"date": "2026-08", "price": 1299, "platform": "amazon"},
    {"date": "2024-09", "price": 2499, "platform": "flipkart"},
    {"date": "2024-10", "price": 1799, "platform": "flipkart"},
    {"date": "2024-11", "price": 1499, "platform": "flipkart"},
    {"date": "2024-12", "price": 1899, "platform": "flipkart"},
    {"date": "2025-01", "price": 1599, "platform": "flipkart"},
    {"date": "2025-02", "price": 1999, "platform": "flipkart"},
    {"date": "2025-03", "price": 2099, "platform": "flipkart"},
    {"date": "2025-04", "price": 2499, "platform": "flipkart"},
    {"date": "2025-05", "price": 2299, "platform": "flipkart"},
    {"date": "2025-06", "price": 1899, "platform": "flipkart"},
    {"date": "2025-07", "price": 1699, "platform": "flipkart"},
    {"date": "2025-08", "price": 1499, "platform": "flipkart"},
    {"date": "2025-09", "price": 2499, "platform": "flipkart"},
    {"date": "2025-10", "price": 1599, "platform": "flipkart"},
    {"date": "2025-11", "price": 1299, "platform": "flipkart"},
    {"date": "2025-12", "price": 1799, "platform": "flipkart"},
    {"date": "2026-01", "price": 1499, "platform": "flipkart"},
    {"date": "2026-02", "price": 1899, "platform": "flipkart"},
    {"date": "2026-03", "price": 2099, "platform": "flipkart"},
    {"date": "2026-04", "price": 2399, "platform": "flipkart"},
    {"date": "2026-05", "price": 2099, "platform": "flipkart"},
    {"date": "2026-06", "price": 1699, "platform": "flipkart"},
    {"date": "2026-07", "price": 1499, "platform": "flipkart"},
    {"date": "2026-08", "price": 1349, "platform": "flipkart"}
  ]
}

# ── Yamaha PSR-E373 Keyboard ──────────────────────────────────────────────────
yamaha_keyboard = {
  "id": "yamaha-psr-e373-keyboard",
  "name": "Yamaha PSR-E373 61-Key Portable Keyboard",
  "brand": "Yamaha",
  "category": "music",
  "subcategory": "keyboards",
  "image_url": "https://in.yamaha.com/files/PSR-E373_product_image_1200x1200_bf3f9db9c8d6c6f3c9c1f7c1f1d3c1f0.jpg",
  "description": "The Yamaha PSR-E373 is a feature-packed 61-key portable keyboard with 622 instrument voices, 205 accompaniment styles, and Yamaha's Education Suite for beginners. Ideal for students and hobbyists who want professional sound quality with easy-to-use controls.",
  "search_keywords": ["yamaha keyboard", "psr e373", "yamaha psr", "61 key keyboard", "portable keyboard", "beginner keyboard", "electronic keyboard", "digital piano", "yamaha psr e373", "music keyboard"],
  "best_price": 8499,
  "best_platform": "amazon",
  "specs": [
    {"key": "Brand", "value": "Yamaha", "category": "General"},
    {"key": "Model", "value": "PSR-E373", "category": "General"},
    {"key": "Number of Keys", "value": "61 (Standard Size)", "category": "Keyboard"},
    {"key": "Touch Sensitivity", "value": "Yes (3 sensitivity levels + Off)", "category": "Keyboard"},
    {"key": "Voices / Tones", "value": "622 instrument voices", "category": "Sound"},
    {"key": "Accompaniment Styles", "value": "205 preset styles", "category": "Features"},
    {"key": "Polyphony", "value": "48 notes maximum", "category": "Sound"},
    {"key": "Effects", "value": "Reverb (12 types), Chorus (14 types), DSP (106 types)", "category": "Sound"},
    {"key": "Built-in Songs", "value": "154 songs with lesson function", "category": "Features"},
    {"key": "Connectivity", "value": "USB to Host, Headphone Out, Sustain Pedal Jack", "category": "Connectivity"},
    {"key": "Power Supply", "value": "AC Adaptor (included) or 6 AA Batteries", "category": "Power"},
    {"key": "Display", "value": "LCD Display", "category": "Display"},
    {"key": "Dimensions", "value": "94.3 x 26.2 x 9.3 cm", "category": "Dimensions"},
    {"key": "Weight", "value": "4.1 kg (without batteries)", "category": "Dimensions"},
    {"key": "Colour", "value": "Black", "category": "Design"}
  ],
  "platforms": [
    {
      "platform": "amazon",
      "platform_display": "Amazon",
      "price": 8499,
      "original_price": 12990,
      "discount_percent": 35,
      "url": "https://www.amazon.in/s?k=Yamaha+PSR+E373+Keyboard",
      "in_stock": True,
      "delivery": "FREE delivery Tomorrow",
      "rating": 4.6,
      "total_reviews": 14200,
      "seller": "Yamaha Music India",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "Extra 10% off with HDFC Credit Card", "discount_type": "bank", "value": 10, "code": "HDFC10", "expires": "2026-09-30"},
        {"title": "No-cost EMI starting 3 months", "discount_type": "emi", "value": 0, "code": None, "expires": None},
        {"title": "Free Keyboard Stand worth Rs. 899", "discount_type": "bundle", "value": 899, "code": None, "expires": "2026-08-31"}
      ],
      "reviews": [
        {"user": "Mithun Chakraborty", "rating": 5, "title": "Best beginner keyboard in India!", "body": "Bought for my 10-year-old daughter. She loves it! The 622 voices keep her engaged for hours. Touch sensitivity is excellent and the lesson songs are great for beginners. Sound quality is amazing for this price.", "date": "2026-07-22", "verified": True, "helpful_votes": 892, "platform": "amazon"},
        {"user": "Kavitha Subramaniam", "rating": 5, "title": "Professional sound quality", "body": "I'm a music teacher and use this in class. The AWM sound generation sounds incredibly realistic. Students love the various styles. Build quality is solid Yamaha.", "date": "2026-06-17", "verified": True, "helpful_votes": 678, "platform": "amazon"},
        {"user": "Siddharth Menon", "rating": 4, "title": "Great for learning piano", "body": "Using Yamaha's built-in lesson songs to learn. Very helpful! The 154 built-in songs with lesson function makes practice easy. Lacks weighted keys but that's expected at this price.", "date": "2026-05-08", "verified": True, "helpful_votes": 543, "platform": "amazon"},
        {"user": "Rekha Nambiar", "rating": 5, "title": "Worth every rupee", "body": "Compared to Casio CT-X700 and Casio CTK-3500 — Yamaha PSR-E373 wins hands down. Sound quality, build, features are all superior. Highly recommended!", "date": "2026-04-19", "verified": True, "helpful_votes": 712, "platform": "amazon"},
        {"user": "Anand Krishnaswamy", "rating": 4, "title": "Excellent versatility", "body": "From classical piano to Indian music styles, this keyboard handles everything well. The 205 styles include Indian rhythms which is a huge plus!", "date": "2026-03-27", "verified": True, "helpful_votes": 487, "platform": "amazon"}
      ]
    },
    {
      "platform": "flipkart",
      "platform_display": "Flipkart",
      "price": 8999,
      "original_price": 12990,
      "discount_percent": 31,
      "url": "https://www.flipkart.com/search?q=Yamaha+PSR+E373",
      "in_stock": True,
      "delivery": "Free delivery in 2-3 days",
      "rating": 4.5,
      "total_reviews": 18700,
      "seller": "Flipkart SmartBuy",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "10% off with Flipkart Axis Bank Card", "discount_type": "bank", "value": 10, "code": "FKAXIS10", "expires": "2026-09-30"},
        {"title": "No-cost EMI on 6 months", "discount_type": "emi", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Prasanna Murthy", "rating": 5, "title": "Incredible keyboard", "body": "The 622 voices are incredible! From grand piano to sitar to drums — everything sounds amazing. My kids practice daily and love the educational songs.", "date": "2026-07-13", "verified": True, "helpful_votes": 654, "platform": "flipkart"},
        {"user": "Divya Prabhu", "rating": 4, "title": "Good for learning", "body": "Bought for music lessons. Teacher is happy with the touch sensitivity and sound quality. Very good keyboard for beginners and intermediate players.", "date": "2026-06-28", "verified": True, "helpful_votes": 432, "platform": "flipkart"},
        {"user": "Ritesh Jain", "rating": 5, "title": "Best purchase this year", "body": "The DSP effects make everything sound professional. The accompaniment styles are very useful for practice. Build quality is solid.", "date": "2026-05-17", "verified": True, "helpful_votes": 567, "platform": "flipkart"},
        {"user": "Gowri Shankar", "rating": 4, "title": "Great keyboard, slightly heavy", "body": "Sound quality is excellent. The 4.1kg weight makes it less portable than expected but otherwise perfect for home use.", "date": "2026-04-09", "verified": True, "helpful_votes": 321, "platform": "flipkart"},
        {"user": "Meena Ganesh", "rating": 5, "title": "Yamaha quality never disappoints", "body": "Third Yamaha keyboard I've owned. PSR-E373 is a significant upgrade with touch sensitivity and more voices. Excellent investment!", "date": "2026-03-22", "verified": True, "helpful_votes": 498, "platform": "flipkart"}
      ]
    },
    {
      "platform": "croma",
      "platform_display": "Croma",
      "price": 9999,
      "original_price": 12990,
      "discount_percent": 23,
      "url": "https://www.croma.com/searchB?q=Yamaha+PSR+E373",
      "in_stock": True,
      "delivery": "Free delivery in 2-3 days or in-store pickup",
      "rating": 4.7,
      "total_reviews": 4800,
      "seller": "Croma Retail",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "5% off on Croma Pay", "discount_type": "payment", "value": 5, "code": None, "expires": None},
        {"title": "No-cost EMI on 3/6/12 months", "discount_type": "emi", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Gopal Krishnan", "rating": 5, "title": "Best in-store demo!", "body": "The Croma staff let me demo the keyboard for 20 minutes before buying. The sound quality blew me away. Worth every rupee!", "date": "2026-07-01", "verified": True, "helpful_votes": 234, "platform": "croma"},
        {"user": "Sunanda Patel", "rating": 5, "title": "Excellent product", "body": "Bought for my music-loving son. The touch sensitivity helps develop proper piano technique. Croma service was excellent!", "date": "2026-06-16", "verified": True, "helpful_votes": 187, "platform": "croma"},
        {"user": "Venkatesan R", "rating": 4, "title": "Premium product experience", "body": "Croma gave me a full setup and demo. Keyboard sounds amazing. Pricier than Amazon but in-store experience is worth it.", "date": "2026-05-11", "verified": True, "helpful_votes": 212, "platform": "croma"},
        {"user": "Indira Devi", "rating": 5, "title": "Perfect gift for my child", "body": "My 8-year-old now practices daily without prompting! The lesson function and beautiful sounds got her hooked.", "date": "2026-04-27", "verified": True, "helpful_votes": 356, "platform": "croma"},
        {"user": "Ashwin Kumar", "rating": 4, "title": "Good keyboard, better at Amazon", "body": "Keyboard is excellent but same one on Amazon for Rs. 1500 less. Croma's advantage is warranty service and demo.", "date": "2026-03-15", "verified": True, "helpful_votes": 289, "platform": "croma"}
      ]
    },
    {
      "platform": "reliance_digital",
      "platform_display": "Reliance Digital",
      "price": 9499,
      "original_price": 12990,
      "discount_percent": 27,
      "url": "https://www.reliancedigital.in/search?q=Yamaha+PSR+E373",
      "in_stock": True,
      "delivery": "Free delivery in 2-4 days",
      "rating": 4.5,
      "total_reviews": 3200,
      "seller": "Reliance Digital",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "5% off with Jio Finance Card", "discount_type": "bank", "value": 5, "code": None, "expires": None},
        {"title": "No-cost EMI on 6 months", "discount_type": "emi", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Nagesh Rao", "rating": 5, "title": "Amazing value", "body": "The 622 voices and 205 styles keep it interesting. Sound quality is superb. Reliance Digital gave excellent service.", "date": "2026-07-08", "verified": True, "helpful_votes": 178, "platform": "reliance_digital"},
        {"user": "Asha Patil", "rating": 4, "title": "Good keyboard for beginners", "body": "My daughter is 7 and finds the keys easy to press. Sound is clear and lesson function is very educational.", "date": "2026-06-24", "verified": True, "helpful_votes": 145, "platform": "reliance_digital"},
        {"user": "Sreenivas Murthy", "rating": 5, "title": "Professional quality", "body": "I'm a semi-professional musician. This keyboard handles all my gig requirements. Excellent value for the price.", "date": "2026-05-19", "verified": True, "helpful_votes": 267, "platform": "reliance_digital"},
        {"user": "Meenakshi Sundaram", "rating": 4, "title": "Good build quality", "body": "Keys feel solid and responsive. The chord progression styles are very helpful for songwriting practice.", "date": "2026-04-11", "verified": True, "helpful_votes": 198, "platform": "reliance_digital"},
        {"user": "Rajan Pillai", "rating": 5, "title": "Worth it completely", "body": "The Indian rhythms in the 205 styles are a huge plus. Carnatic, Bollywood styles all present. Very happy!", "date": "2026-03-29", "verified": True, "helpful_votes": 312, "platform": "reliance_digital"}
      ]
    },
    {
      "platform": "vijay_sales",
      "platform_display": "Vijay Sales",
      "price": 9299,
      "original_price": 12990,
      "discount_percent": 28,
      "url": "https://www.vijaysales.com/search/Yamaha+PSR+E373",
      "in_stock": True,
      "delivery": "Free delivery in 3-5 days or store pickup",
      "rating": 4.5,
      "total_reviews": 2100,
      "seller": "Vijay Sales",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "No-cost EMI on 3/6 months", "discount_type": "emi", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Santosh Kulkarni", "rating": 5, "title": "Best music store experience", "body": "Vijay Sales has a dedicated music section. Staff is knowledgeable. The PSR-E373 sounds incredible in person.", "date": "2026-07-18", "verified": True, "helpful_votes": 134, "platform": "vijay_sales"},
        {"user": "Premlata Joshi", "rating": 4, "title": "Good product", "body": "Reliable purchase from Vijay Sales. Keyboard quality is excellent and warranty is genuine Yamaha India.", "date": "2026-06-07", "verified": True, "helpful_votes": 112, "platform": "vijay_sales"},
        {"user": "Kishore Nair", "rating": 5, "title": "My child's best gift", "body": "The keyboard came with a stand and headphones at Vijay Sales for same price! Great deal overall.", "date": "2026-05-23", "verified": True, "helpful_votes": 198, "platform": "vijay_sales"},
        {"user": "Sumati Reddy", "rating": 4, "title": "Good variety of sounds", "body": "622 voices is impressive. The grand piano sound is very close to real. Happy with the purchase!", "date": "2026-04-16", "verified": True, "helpful_votes": 145, "platform": "vijay_sales"},
        {"user": "Haridas Menon", "rating": 5, "title": "Yamaha always reliable", "body": "Yamaha keyboards are legendary. PSR-E373 is the best in this segment. Highly recommend to all music learners.", "date": "2026-03-09", "verified": True, "helpful_votes": 234, "platform": "vijay_sales"}
      ]
    },
    {
      "platform": "tatacliq",
      "platform_display": "Tata CLiQ",
      "price": 9249,
      "original_price": 12990,
      "discount_percent": 29,
      "url": "https://www.tatacliq.com/searchCategory?searchCategory=all&text=Yamaha+PSR+E373",
      "in_stock": True,
      "delivery": "Free delivery in 3-5 days",
      "rating": 4.5,
      "total_reviews": 3600,
      "seller": "Tata CLiQ",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "5% Cashback with Tata Neu HDFC Card", "discount_type": "cashback", "value": 5, "code": None, "expires": None},
        {"title": "No-cost EMI on 6 months", "discount_type": "emi", "value": 0, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Balaji Venkataraman", "rating": 5, "title": "Authentic Yamaha product", "body": "Tata CLiQ delivered genuine product with original Yamaha warranty card. Sound quality is outstanding.", "date": "2026-07-14", "verified": True, "helpful_votes": 167, "platform": "tatacliq"},
        {"user": "Savitha Reddy", "rating": 4, "title": "Great for practice", "body": "The 154 lesson songs are perfect for self-learning. My 12-year-old is now playing full songs in 2 months!", "date": "2026-06-29", "verified": True, "helpful_votes": 234, "platform": "tatacliq"},
        {"user": "Narayan Iyer", "rating": 5, "title": "Outstanding sound quality", "body": "The AWM (Advanced Wave Memory) sound technology makes this sound incredibly real. Worth every rupee!", "date": "2026-05-14", "verified": True, "helpful_votes": 312, "platform": "tatacliq"},
        {"user": "Parvathi Krishnan", "rating": 4, "title": "Good platform, good product", "body": "Tata CLiQ delivered in 4 days. Product quality is excellent. Happy with the purchase!", "date": "2026-04-28", "verified": True, "helpful_votes": 143, "platform": "tatacliq"},
        {"user": "Ramakrishna Nair", "rating": 5, "title": "Best keyboard at this price", "body": "Compared PSR-E363 and PSR-E373 — upgrade is absolutely worth it. Touch sensitivity changes everything for learning.", "date": "2026-03-12", "verified": True, "helpful_votes": 267, "platform": "tatacliq"}
      ]
    },
    {
      "platform": "meesho",
      "platform_display": "Meesho",
      "price": 7999,
      "original_price": 12990,
      "discount_percent": 38,
      "url": "https://www.meesho.com/search?q=Yamaha+PSR+E373+Keyboard",
      "in_stock": True,
      "delivery": "Free delivery in 5-7 days",
      "rating": 3.9,
      "total_reviews": 8900,
      "seller": "Music World",
      "warranty": "Seller Warranty",
      "offers": [
        {"title": "Extra 10% off — First Order", "discount_type": "first_order", "value": 10, "code": "FIRST10", "expires": "2026-12-31"}
      ],
      "reviews": [
        {"user": "Ganesh Hegde", "rating": 4, "title": "Good deal but check authenticity", "body": "Keyboard works well and sounds great. Not 100% sure if it's India warranty model. But product is functional.", "date": "2026-07-21", "verified": True, "helpful_votes": 312, "platform": "meesho"},
        {"user": "Sarada Devi", "rating": 3, "title": "Okay quality", "body": "Keyboard is functional but the warranty card doesn't look official. Prefer buying from authorized dealers.", "date": "2026-06-06", "verified": True, "helpful_votes": 456, "platform": "meesho"},
        {"user": "Bharat Singh", "rating": 5, "title": "Amazing value!", "body": "Got the keyboard at a great price. Sounds exactly like the official product. Very happy with the purchase!", "date": "2026-05-29", "verified": True, "helpful_votes": 267, "platform": "meesho"},
        {"user": "Lalitha Prasad", "rating": 4, "title": "Good for budget buyers", "body": "If you want the PSR-E373 experience at lower cost, this works. Sound quality is identical to the original.", "date": "2026-04-17", "verified": False, "helpful_votes": 198, "platform": "meesho"},
        {"user": "Sudarshan Rao", "rating": 2, "title": "Warranty issues", "body": "Had a key issue after 2 months. Yamaha service center didn't honor the warranty. Beware!", "date": "2026-03-31", "verified": True, "helpful_votes": 634, "platform": "meesho"}
      ]
    },
    {
      "platform": "snapdeal",
      "platform_display": "Snapdeal",
      "price": 8699,
      "original_price": 12990,
      "discount_percent": 33,
      "url": "https://www.snapdeal.com/search?keyword=Yamaha+PSR+E373",
      "in_stock": True,
      "delivery": "Delivery in 4-6 days",
      "rating": 4.1,
      "total_reviews": 5400,
      "seller": "Harmonics Music Store",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "5% off on UPI Payment", "discount_type": "payment", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Govind Krishnan", "rating": 4, "title": "Good product", "body": "Keyboard quality is excellent. Snapdeal delivery was 5 days. Would prefer Amazon's speed but price is good.", "date": "2026-07-09", "verified": True, "helpful_votes": 178, "platform": "snapdeal"},
        {"user": "Shantha Kumari", "rating": 5, "title": "Great purchase", "body": "The 622 voices and 205 styles make this keyboard incredibly versatile. Perfect for hobbyists!", "date": "2026-06-25", "verified": True, "helpful_votes": 234, "platform": "snapdeal"},
        {"user": "Kiran Reddy", "rating": 4, "title": "Solid keyboard", "body": "Build quality is good, sounds are excellent. USB connectivity to laptop is great for music production.", "date": "2026-05-13", "verified": True, "helpful_votes": 167, "platform": "snapdeal"},
        {"user": "Jayalakshmi S", "rating": 3, "title": "Delivery issues", "body": "Took 8 days to deliver. Keyboard itself is fine but delivery tracking was poor.", "date": "2026-04-26", "verified": True, "helpful_votes": 143, "platform": "snapdeal"},
        {"user": "Murugesan P", "rating": 5, "title": "Best keyboard for this price range", "body": "Compared every keyboard in 8000-10000 range. PSR-E373 is the winner. Touch sensitivity and sound quality are unmatched.", "date": "2026-03-18", "verified": True, "helpful_votes": 312, "platform": "snapdeal"}
      ]
    },
    {
      "platform": "nykaa_fashion",
      "platform_display": "Paytm Mall",
      "price": 8799,
      "original_price": 12990,
      "discount_percent": 32,
      "url": "https://paytmmall.com/shop/search?q=Yamaha+PSR+E373",
      "in_stock": True,
      "delivery": "Free delivery in 4-6 days",
      "rating": 4.2,
      "total_reviews": 3100,
      "seller": "Paytm Mall",
      "warranty": "1 Year Yamaha India Warranty",
      "offers": [
        {"title": "Extra 5% cashback with Paytm Wallet", "discount_type": "cashback", "value": 5, "code": None, "expires": None}
      ],
      "reviews": [
        {"user": "Parthasarathy K", "rating": 4, "title": "Good deal on Paytm Mall", "body": "Cashback with Paytm wallet makes it competitive with Amazon. Keyboard quality is excellent.", "date": "2026-07-16", "verified": True, "helpful_votes": 134, "platform": "paytm_mall"},
        {"user": "Vimala Devi", "rating": 5, "title": "Happy with the purchase", "body": "Genuine Yamaha warranty, original packing. Sounds incredible! The piano voice is very realistic.", "date": "2026-06-21", "verified": True, "helpful_votes": 189, "platform": "paytm_mall"},
        {"user": "Swaminathan R", "rating": 4, "title": "Good product", "body": "PSR-E373 is one of the best entry level keyboards. Paytm Mall delivered it in 5 days.", "date": "2026-05-27", "verified": True, "helpful_votes": 145, "platform": "paytm_mall"},
        {"user": "Annamalai S", "rating": 3, "title": "Slightly overpriced vs Amazon", "body": "Amazon has the same keyboard cheaper. But Paytm cashback helps. Mixed feelings.", "date": "2026-04-14", "verified": True, "helpful_votes": 112, "platform": "paytm_mall"},
        {"user": "Usha Krishnan", "rating": 5, "title": "My daughter loves it", "body": "She plays for 3 hours straight! The Yamaha Education Suite makes learning engaging and fun.", "date": "2026-03-07", "verified": True, "helpful_votes": 267, "platform": "paytm_mall"}
      ]
    },
    {
      "platform": "shopclues",
      "platform_display": "ShopClues",
      "price": 8249,
      "original_price": 12990,
      "discount_percent": 37,
      "url": "https://www.shopclues.com/search?q=Yamaha+PSR+E373",
      "in_stock": False,
      "delivery": "Delivery in 5-8 days",
      "rating": 3.7,
      "total_reviews": 2300,
      "seller": "Musical Instruments Hub",
      "warranty": "Seller Warranty",
      "offers": [
        {"title": "15% off with ShopClues Select", "discount_type": "membership", "value": 15, "code": "SELECT15", "expires": "2026-08-31"}
      ],
      "reviews": [
        {"user": "Nagarajan S", "rating": 3, "title": "Risky purchase", "body": "Keyboard works but warranty card seems unofficial. Always buy from authorized Yamaha dealers for safety.", "date": "2026-07-05", "verified": True, "helpful_votes": 342, "platform": "shopclues"},
        {"user": "Kamakshi Devi", "rating": 4, "title": "Good sound quality", "body": "Despite concerns about warranty, the keyboard sounds exactly like genuine PSR-E373. Happy with sound quality.", "date": "2026-06-12", "verified": False, "helpful_votes": 189, "platform": "shopclues"},
        {"user": "Madhavan R", "rating": 5, "title": "Great value", "body": "Got it at a great price. All features work perfectly. The accompaniment styles are very impressive.", "date": "2026-05-22", "verified": True, "helpful_votes": 234, "platform": "shopclues"},
        {"user": "Thangam N", "rating": 2, "title": "Quality doubts", "body": "A few keys feel different from the keyboard I played at the store. Might not be the same variant.", "date": "2026-04-08", "verified": True, "helpful_votes": 412, "platform": "shopclues"},
        {"user": "Krishnamoorthy V", "rating": 4, "title": "Budget option works", "body": "For the price, keyboard performance is good. Recommend comparing with Amazon before buying.", "date": "2026-03-19", "verified": True, "helpful_votes": 167, "platform": "shopclues"}
      ]
    }
  ],
  "price_history": [
    {"date": "2024-09", "price": 12990, "platform": "amazon"},
    {"date": "2024-10", "price": 10499, "platform": "amazon"},
    {"date": "2024-11", "price": 8999, "platform": "amazon"},
    {"date": "2024-12", "price": 10999, "platform": "amazon"},
    {"date": "2025-01", "price": 9499, "platform": "amazon"},
    {"date": "2025-02", "price": 11499, "platform": "amazon"},
    {"date": "2025-03", "price": 11999, "platform": "amazon"},
    {"date": "2025-04", "price": 12990, "platform": "amazon"},
    {"date": "2025-05", "price": 12490, "platform": "amazon"},
    {"date": "2025-06", "price": 10999, "platform": "amazon"},
    {"date": "2025-07", "price": 9999, "platform": "amazon"},
    {"date": "2025-08", "price": 8999, "platform": "amazon"},
    {"date": "2025-09", "price": 12990, "platform": "amazon"},
    {"date": "2025-10", "price": 9499, "platform": "amazon"},
    {"date": "2025-11", "price": 7999, "platform": "amazon"},
    {"date": "2025-12", "price": 10499, "platform": "amazon"},
    {"date": "2026-01", "price": 8999, "platform": "amazon"},
    {"date": "2026-02", "price": 10999, "platform": "amazon"},
    {"date": "2026-03", "price": 11499, "platform": "amazon"},
    {"date": "2026-04", "price": 12490, "platform": "amazon"},
    {"date": "2026-05", "price": 11499, "platform": "amazon"},
    {"date": "2026-06", "price": 9999, "platform": "amazon"},
    {"date": "2026-07", "price": 9499, "platform": "amazon"},
    {"date": "2026-08", "price": 8499, "platform": "amazon"},
    {"date": "2024-09", "price": 12990, "platform": "flipkart"},
    {"date": "2024-10", "price": 10999, "platform": "flipkart"},
    {"date": "2024-11", "price": 9499, "platform": "flipkart"},
    {"date": "2024-12", "price": 11499, "platform": "flipkart"},
    {"date": "2025-01", "price": 9999, "platform": "flipkart"},
    {"date": "2025-02", "price": 11999, "platform": "flipkart"},
    {"date": "2025-03", "price": 12490, "platform": "flipkart"},
    {"date": "2025-04", "price": 12990, "platform": "flipkart"},
    {"date": "2025-05", "price": 12490, "platform": "flipkart"},
    {"date": "2025-06", "price": 11499, "platform": "flipkart"},
    {"date": "2025-07", "price": 10499, "platform": "flipkart"},
    {"date": "2025-08", "price": 9499, "platform": "flipkart"},
    {"date": "2025-09", "price": 12990, "platform": "flipkart"},
    {"date": "2025-10", "price": 9999, "platform": "flipkart"},
    {"date": "2025-11", "price": 8499, "platform": "flipkart"},
    {"date": "2025-12", "price": 10999, "platform": "flipkart"},
    {"date": "2026-01", "price": 9499, "platform": "flipkart"},
    {"date": "2026-02", "price": 11499, "platform": "flipkart"},
    {"date": "2026-03", "price": 11999, "platform": "flipkart"},
    {"date": "2026-04", "price": 12490, "platform": "flipkart"},
    {"date": "2026-05", "price": 11999, "platform": "flipkart"},
    {"date": "2026-06", "price": 10499, "platform": "flipkart"},
    {"date": "2026-07", "price": 9999, "platform": "flipkart"},
    {"date": "2026-08", "price": 8999, "platform": "flipkart"}
  ]
}

# ── Write JSON Files ──────────────────────────────────────────────────────────
data_dir = Path("backend/data/products")
data_dir.mkdir(parents=True, exist_ok=True)

# Write fashion.json
fashion_file = data_dir / "fashion.json"
with open(fashion_file, "w", encoding="utf-8") as f:
    json.dump([nike_af1], f, indent=2, ensure_ascii=False)
print("Written: fashion.json")

# Write bags.json
bags_file = data_dir / "bags.json"
with open(bags_file, "w", encoding="utf-8") as f:
    json.dump([safari_bag], f, indent=2, ensure_ascii=False)
print("Written: bags.json")

# Write music.json
music_file = data_dir / "music.json"
with open(music_file, "w", encoding="utf-8") as f:
    json.dump([yamaha_keyboard], f, indent=2, ensure_ascii=False)
print("Written: music.json")

# ── Update index.json ─────────────────────────────────────────────────────────
index_file = Path("backend/data/index.json")
if index_file.exists():
    with open(index_file, "r", encoding="utf-8") as f:
        index = json.load(f)
else:
    index = {"categories": [], "products": []}

# Add new categories
for cat in ["fashion", "bags", "music"]:
    if cat not in index.get("categories", []):
        index["categories"].append(cat)

# Add new products
existing_ids = {p["id"] for p in index.get("products", [])}
new_products = [
    {"id": "nike-air-force-1-white", "name": "Nike Air Force 1 '07 (White)", "category": "fashion", "brand": "Nike",
     "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/af53d117-9c39-4e21-a898-e5c3d5a5a7a6/air-force-1-07-shoes-WrLlWX.png",
     "best_price": 7295, "best_platform": "ajio"},
    {"id": "safari-laptop-backpack-35l", "name": "Safari Thorium 35L Laptop Backpack", "category": "bags", "brand": "Safari",
     "image_url": "https://images.meesho.com/images/products/178652011/r6ghj_1200.jpg",
     "best_price": 1150, "best_platform": "snapdeal"},
    {"id": "yamaha-psr-e373-keyboard", "name": "Yamaha PSR-E373 61-Key Portable Keyboard", "category": "music", "brand": "Yamaha",
     "image_url": "https://in.yamaha.com/files/PSR-E373_product_image_1200x1200_bf3f9db9c8d6c6f3c9c1f7c1f1d3c1f0.jpg",
     "best_price": 7999, "best_platform": "meesho"},
]
for p in new_products:
    if p["id"] not in existing_ids:
        index["products"].append(p)

with open(index_file, "w", encoding="utf-8") as f:
    json.dump(index, f, indent=2, ensure_ascii=False)
print("Updated: index.json")
print("\nDone! 3 products added: Nike AF1, Safari Bag, Yamaha Keyboard")
