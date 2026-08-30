import { NextRequest, NextResponse } from "next/server";

/** Simple chat stub — returns contextual responses based on keywords.
 *  Will be replaced with real Gemini API call in Phase 2.
 */
export async function POST(req: NextRequest) {
  const { message = "" } = await req.json();
  const m = message.toLowerCase();

  let reply = "I can help you compare prices and find the best deals! Try searching for a specific product.";

  if (m.includes("iphone") || m.includes("apple phone"))
    reply = "The iPhone 15 (128GB) is currently at ₹62,999 on Amazon — near its all-time low! The 256GB variant is ₹71,999. Both have MagSafe and USB-C. Want me to compare it with the Galaxy S24?";
  else if (m.includes("samsung") || m.includes("galaxy s24"))
    reply = "The Samsung Galaxy S24 is ₹59,999 on Flipkart — the cheapest right now. It has Snapdragon 8 Gen 3 and 7 years of software updates. 10% off with HDFC card brings it to ~₹54,000!";
  else if (m.includes("macbook") || m.includes("mac"))
    reply = "MacBook Air M3 (8GB/256GB) is ₹1,04,900 on Flipkart. It has 18-hour battery life and beats most Intel i9 laptops in everyday tasks. Want me to compare with the Dell XPS 15?";
  else if (m.includes("sony") || m.includes("headphone") || m.includes("wh-1000"))
    reply = "Sony WH-1000XM5 is ₹23,990 on Amazon — 30% off MRP. Best-in-class ANC with 30-hour battery. 10% HDFC cashback brings it to ~₹21,591. Stock is limited!";
  else if (m.includes("budget") && (m.includes("phone") || m.includes("mobile")))
    reply = "Under ₹30K, the OnePlus 12R is unbeatable — Snapdragon 8 Gen 2 + 100W charging for ₹29,999. Under ₹40K, the Pixel 8a at ₹39,999 has the best camera AI and 7-year updates.";
  else if (m.includes("laptop") && (m.includes("budget") || m.includes("student")))
    reply = "Best student laptops: HP Pavilion 15 (₹52,990, i5, 16GB), Lenovo IdeaPad Slim 5 (₹61,990, Ryzen 7, OLED display). The Lenovo's 2.8K OLED screen is stunning!";
  else if (m.includes("compare"))
    reply = "Sure! Search for the products you want to compare, select up to 3 using the checkboxes, then click 'Compare Products' at the bottom. I'll show a full spec-by-spec table!";
  else if (m.includes("cheapest") || m.includes("best price") || m.includes("lowest"))
    reply = "I track prices across Amazon, Flipkart, Croma, Reliance Digital, and more. For electronics, Amazon and Flipkart usually compete for the lowest price. Want me to check a specific product?";
  else if (m.includes("diwali") || m.includes("sale") || m.includes("discount"))
    reply = "Diwali 2025 (Oct-Nov) had the year's biggest discounts — 15-25% off on phones and laptops. The next big sale is Republic Day (Jan 2027). Current prices on some items are already near Diwali lows!";

  return NextResponse.json({ reply, timestamp: new Date().toISOString() });
}
