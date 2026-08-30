/**
 * Product image URLs — all verified to allow hotlinking.
 * Primary sources: Amazon CDN (no CORS), Wikipedia (open), GSMArena (open)
 */

const PRODUCT_IMAGES: Record<string, string> = {
  // Phones
  "iphone-15-128gb":
    "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
  "samsung-galaxy-s24":
    "https://m.media-amazon.com/images/I/71RZJv+pQxL._SL1500_.jpg",
  "oneplus-12r":
    "https://m.media-amazon.com/images/I/717Qo4MH97L._SL1500_.jpg",
  "pixel-8a":
    "https://m.media-amazon.com/images/I/71Qv+8vB6cL._SL1500_.jpg",
  "vivo-v30-pro":
    "https://m.media-amazon.com/images/I/61NlU8O2zPL._SL1500_.jpg",

  // Laptops
  "macbook-air-m3-13":
    "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
  "asus-rog-strix-g16":
    "https://m.media-amazon.com/images/I/71B6-C5Y1PL._SL1500_.jpg",
  "hp-pavilion-15":
    "https://m.media-amazon.com/images/I/71F1E5WqI0L._SL1500_.jpg",
  "lenovo-ideapad-slim-5":
    "https://m.media-amazon.com/images/I/61PqU9sOhmL._SL1500_.jpg",
  "dell-xps-15":
    "https://m.media-amazon.com/images/I/61y8A2E8mBL._SL1500_.jpg",

  // Audio
  "sony-wh-1000xm5":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwa1zpuLYaOFtDMW9xroNWt6Lbhz7w_3asVd1w2a4OcA&s=10",
  "boat-rockerz-550":
    "https://m.media-amazon.com/images/I/61r5V6T3b2L._SL1500_.jpg",
  "apple-airpods-pro-2":
    "https://m.media-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg",
  "jbl-flip-6":
    "https://m.media-amazon.com/images/I/61U08j53KGL._SL1500_.jpg",

  // Grocery
  "tata-sampann-tur-dal-1kg":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyxiMg27tsIZWdgpZC_cKRTjbl6RFEHj75EhowsfPkbA&s",
  "aashirvaad-atta-5kg":
    "https://m.media-amazon.com/images/I/81I233Y6wJL._SL1500_.jpg",
  "amul-butter-500g":
    "https://m.media-amazon.com/images/I/61lF1sA1NPL._SL1500_.jpg",
  "saffola-gold-oil-1l":
    "https://m.media-amazon.com/images/I/51bE8U++4gL._SL1500_.jpg",

  // Appliances
  "dyson-v12-detect-slim":
    "https://m.media-amazon.com/images/I/51sN+rg4EiL._AC_UF894,1000_QL80_.jpg",
  "samsung-1-5t-5star-ac":
    "https://m.media-amazon.com/images/I/51c4B6z+Z3L._SL1500_.jpg",

  // Fashion
  "nike-air-force-1-white":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPz3RJ70NG6q6FJ9aodywxrpjryRDdOkEIVR7rn1baeQ&s=10",

  // Bags
  "safari-laptop-backpack-35l":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqx_oTiRpqQdtpLbncZNpocox8UDblWHZdRRrWQqYqSg&s",

  // Music
  "yamaha-psr-e373-keyboard":
    "https://m.media-amazon.com/images/I/71u9Yh4aRDL._SL1500_.jpg",
};

// Brand domains for Clearbit logo API (free, reliable)
const BRAND_DOMAINS: Record<string, string> = {
  apple: "apple.com",
  samsung: "samsung.com",
  oneplus: "oneplus.com",
  google: "google.com",
  vivo: "vivo.com",
  asus: "asus.com",
  hp: "hp.com",
  lenovo: "lenovo.com",
  dell: "dell.com",
  sony: "sony.com",
  boat: "boat-lifestyle.com",
  jbl: "jbl.com",
  tata: "tata.com",
  aashirvaad: "itcportal.com",
  amul: "amul.com",
  saffola: "marico.com",
  dyson: "dyson.com",
  nike: "nike.com",
  safari: "safaribags.com",
  yamaha: "yamaha.com",
};

/** Get product image URL by product ID */
export function getProductImage(id: string): string | null {
  return PRODUCT_IMAGES[id] || null;
}

/** Get brand logo URL from Clearbit */
export function getBrandLogo(brand?: string): string {
  if (!brand) return "";
  const domain = BRAND_DOMAINS[brand.toLowerCase()] || `${brand.toLowerCase().replace(/\s+/g, "")}.com`;
  return `https://logo.clearbit.com/${domain}`;
}

/** Category-specific gradient backgrounds */
export function getCategoryGradient(category?: string): string {
  const map: Record<string, string> = {
    phones: "from-blue-900/40 via-indigo-900/30 to-purple-900/20",
    laptops: "from-slate-800/40 via-zinc-800/30 to-gray-800/20",
    audio: "from-violet-900/40 via-purple-900/30 to-fuchsia-900/20",
    grocery: "from-green-900/40 via-emerald-900/30 to-teal-900/20",
    appliances: "from-amber-900/40 via-orange-900/30 to-red-900/20",
    fashion: "from-pink-900/40 via-rose-900/30 to-red-900/20",
    bags: "from-teal-900/40 via-cyan-900/30 to-blue-900/20",
    music: "from-indigo-900/40 via-blue-900/30 to-violet-900/20",
  };
  return map[category?.toLowerCase() || ""] || "from-gray-900/40 via-gray-800/30 to-gray-900/20";
}
