export const BRAND_PROFILE = {
  name: "RubzzKitchen",
  legalTagline: "Halal Pakistani & Indian Culinary Atelier · Grazing Tables & Catering",
  handle: "@rubzzkitchen",
  location: "Carteret, NJ",
  phones: ["(732) 486-5390", "(732) 425-9212"],
  primaryPhoneTel: "+17324865390",
  whatsappNumber: "17324865390",
  email: "rubzzkitchen@gmail.com",
  instagramUrl: "https://www.instagram.com/rubzzkitchen/",
  igDmUrl: "https://ig.me/m/rubzzkitchen",
  crestSrc: "./assets/portfolio/brand-crest.jpg",
  serviceAreas: [
    "Carteret",
    "Edison",
    "Woodbridge",
    "Iselin",
    "Metuchen",
    "Piscataway",
    "Jersey City",
    "Princeton",
    "Staten Island & NYC"
  ],
  stats: {
    posts: 552,
    halalStandard: "100% Zabiha Halal",
    menuOfferings: 34
  },
  bookingPolicies: [
    {
      id: "retainer",
      title: "50% Date Retainer",
      detail: "Event trays, banquet packages, and styled grazing table commissions are locked onto the kitchen calendar with a 50% retainer."
    },
    {
      id: "lead-time",
      title: "72-Hour Tray & 7-Day Grazing Notice",
      detail: "Full catering trays require at least 72 hours notice. Custom floral and riser grazing installations require 7 days advance booking."
    },
    {
      id: "zabiha-scratch",
      title: "100% Zabiha Halal Scratch Kitchen",
      detail: "Every stock, kebab mince, biryani pot, and grazing charcuterie board is prepared from certified Zabiha Halal cuts with zero shortcuts."
    },
    {
      id: "mosque-galas",
      title: "Mosque, Nikah & 150+ Gala Scaling",
      detail: "Dedicated large-batch pricing and coordinated delivery windows are available for community iftars, nikahs, and fundraisers above 150 guests."
    }
  ]
};

export const MENU_CATEGORIES = [
  {
    id: "appetizers-desserts",
    label: "Appetizers & Desserts",
    subtitle: "Crisp chaats, golden fritters, and slow-reduced sweets",
    editorialNote: "Built for cocktail hours, dawat starters, and finishing tables.",
    heroImage: "./assets/originals/parfait-mimosa-grazing.jpg"
  },
  {
    id: "entrees",
    label: "Signature Entrees",
    subtitle: "Saffron biryanis, bone-in karahi, nihari, and haleem",
    editorialNote: "Small trays serve 12 to 15 guests; large full trays serve 25 to 30 guests.",
    heroImage: "./assets/originals/nihari-karahi-bowls.jpg"
  },
  {
    id: "oven-baked-bbq",
    label: "Oven-Baked BBQ",
    subtitle: "Char-kissed boneless tikka, malai boti, bihari, and kebabs",
    editorialNote: "Marinated overnight in hung yogurt, toasted spices, and raw papaya.",
    heroImage: "./assets/originals/oven-baked-chicken-platter.jpg"
  },
  {
    id: "frozen-dozens",
    label: "Frozen Dozens",
    subtitle: "Hand-pleated samosas, puff patties, and seared kebabs",
    editorialNote: "Packed by the dozen for effortless hosting, Ramadan prep, and family freezers.",
    heroImage: "./assets/originals/dawat-samosa-kebab-buffet.jpg"
  },
  {
    id: "banquet-packages",
    label: "Banquet Packages",
    subtitle: "Curated 40-guest and 100-guest dawat bundles with naan",
    editorialNote: "Complete multi-course spreads with fresh naan, salad, and green chutney included.",
    heroImage: "./assets/originals/seekh-kebab-biryani-board.jpg"
  },
  {
    id: "holiday-packages",
    label: "Holiday Packages",
    subtitle: "Seasonal family roast feasts for ~20 guests",
    editorialNote: "Halal holiday centerpieces crafted for Thanksgiving and winter gatherings.",
    heroImage: "./assets/originals/holiday-roasted-turkey.jpg"
  }
];

export const MENU_ITEMS = [
  // Appetizers & Desserts (7)
  {
    id: "pakora",
    categoryId: "appetizers-desserts",
    name: "Crisp Vegetable Pakora",
    subtitle: "Spiced chickpea batter fritters",
    description: "Thinly sliced potato, onion, and spinach fritters fried golden with roasted coriander seed and served with tamarind-mint chutney.",
    dietary: ["Vegetarian"],
    spiceLevel: "Medium",
    badge: "Dawat Starter",
    imageSrc: "./assets/originals/parfait-mimosa-grazing.jpg",
    options: [
      { optionId: "pakora-sm", label: "Small Tray", price: 65, servesText: "Serves 12-15" },
      { optionId: "pakora-lg", label: "Large Tray", price: 110, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "chana-chaat",
    categoryId: "appetizers-desserts",
    name: "Chana Chaat",
    subtitle: "Tangy chickpea, potato & tamarind medley",
    description: "Tender kabuli chickpeas tossed with diced potato, red onion, crisp papri crunch, roasted cumin, and house imli glaze.",
    dietary: ["Vegetarian", "Signature"],
    spiceLevel: "Signature",
    badge: "House Favorite",
    imageSrc: "./assets/originals/pipette-chaat-tiers.jpg",
    options: [
      { optionId: "chana-chaat-sm", label: "Small Tray", price: 55, servesText: "Serves 12-15" },
      { optionId: "chana-chaat-lg", label: "Large Tray", price: 100, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "dahi-bhalla",
    categoryId: "appetizers-desserts",
    name: "Dahi Bhalla",
    subtitle: "Whipped yogurt lentil dumplings",
    description: "Featherlight urad-dal dumplings steeped in chilled sweet-tangy yogurt, finished with date-tamarind drizzle, pomegranate, and toasted cumin.",
    dietary: ["Vegetarian"],
    spiceLevel: "Mild",
    badge: "Chilled Classic",
    imageSrc: "./assets/originals/festive-chaat-biryani-dawat.jpg",
    options: [
      { optionId: "dahi-bhalla-sm", label: "Small Tray", price: 65, servesText: "Serves 12-15" },
      { optionId: "dahi-bhalla-lg", label: "Large Tray", price: 110, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "fruit-chaat",
    categoryId: "appetizers-desserts",
    name: "Orchard Fruit Chaat",
    subtitle: "Spiced seasonal fruit & citrus toss",
    description: "Hand-cut apples, grapes, berries, citrus, and kiwi folded in house chaat masala, black salt, and fresh lemon.",
    dietary: ["Vegetarian"],
    spiceLevel: "Mild",
    badge: "Iftar Staple",
    imageSrc: "./assets/originals/festive-chaat-biryani-dawat.jpg",
    options: [
      { optionId: "fruit-chaat-sm", label: "Small Tray", price: 75, servesText: "Serves 12-15" },
      { optionId: "fruit-chaat-lg", label: "Large Tray", price: 125, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "mixed-fried",
    categoryId: "appetizers-desserts",
    name: "Mixed Fried Platter",
    subtitle: "Mini Chk Spring Roll, Mini Chk Keema Samosa, Mini Aloo Samosa & Pakora",
    description: "An assortment of hand-rolled chicken spring rolls, flaky minced-chicken and potato samosas, and crisp pakoras.",
    dietary: ["Zabiha Halal", "Signature"],
    spiceLevel: "Signature",
    badge: "Crowd Assortment",
    imageSrc: "./assets/originals/dawat-samosa-kebab-buffet.jpg",
    options: [
      { optionId: "mixed-fried-sm", label: "Small Tray", price: 85, servesText: "Serves 12-15" },
      { optionId: "mixed-fried-lg", label: "Large Tray", price: 135, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "kheer",
    categoryId: "appetizers-desserts",
    name: "Slow-Reduced Cardamom Kheer",
    subtitle: "Velvet basmati milk pudding with pistachio & rose",
    description: "Whole milk simmered low with aged basmati, crushed green cardamom pods, slivered almonds, and emerald pistachios.",
    dietary: ["Vegetarian", "Signature"],
    spiceLevel: "Mild",
    badge: "Heritage Sweet",
    imageSrc: null,
    options: [
      { optionId: "kheer-sm", label: "Small Tray", price: 65, servesText: "Serves 12-15" },
      { optionId: "kheer-lg", label: "Large Tray", price: 120, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "matanjan",
    categoryId: "appetizers-desserts",
    name: "Royal Matanjan",
    subtitle: "Saffron-jeweled sweet rice with khoya & nuts",
    description: "Long-grain sella basmati glazed in pure ghee syrup with saffron, khoya, candied ashrafi, cashews, and plump raisins.",
    dietary: ["Vegetarian"],
    spiceLevel: "Mild",
    badge: "Celebration Dessert",
    imageSrc: null,
    options: [
      { optionId: "matanjan-sm", label: "Small Tray", price: 80, servesText: "Serves 12-15" },
      { optionId: "matanjan-lg", label: "Large Tray", price: 120, servesText: "Serves 25-30" }
    ]
  },

  // Signature Entrees (10)
  {
    id: "lahori-cholay",
    categoryId: "entrees",
    name: "Lahori Cholay",
    subtitle: "Slow-simmered spiced chickpeas",
    description: "Traditional Lahore-style chickpeas braised in black cardamom, caramelized onion, crushed peppercorn, and rich tomato gravy.",
    dietary: ["Vegetarian"],
    spiceLevel: "Medium",
    badge: "Vegetarian Classic",
    imageSrc: null,
    options: [
      { optionId: "lahori-cholay-sm", label: "Small Tray", price: 75, servesText: "Serves 12-15" },
      { optionId: "lahori-cholay-lg", label: "Large Tray", price: 115, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "chicken-biryani-pulao",
    categoryId: "entrees",
    name: "Chicken Biryani / Pulao",
    subtitle: "Dum-steamed basmati with saffron & fried shallots",
    description: "Choose layered Karachi-style masala biryani or aromatic yakhni chicken pulao finished over steam with crispy birista and mint.",
    dietary: ["Zabiha Halal", "Signature"],
    spiceLevel: "Signature",
    badge: "Dawat Essential",
    imageSrc: "./assets/originals/seekh-kebab-biryani-board.jpg",
    options: [
      { optionId: "chk-biryani-sm", label: "Small Tray", price: 80, servesText: "Serves 12-15" },
      { optionId: "chk-biryani-lg", label: "Large Tray", price: 140, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "chicken-korma-karahi",
    categoryId: "entrees",
    name: "Chicken Korma / Karahi",
    subtitle: "Velvet Shahi korma or wok-seared ginger karahi",
    description: "Prepared as slow-braised celebratory korma with toasted almond and kewra, or vibrant tomato, black pepper, and fresh ginger karahi.",
    dietary: ["Zabiha Halal"],
    spiceLevel: "Medium",
    badge: "Banquet Anchor",
    imageSrc: "./assets/originals/nihari-karahi-bowls.jpg",
    options: [
      { optionId: "chk-karahi-sm", label: "Small Tray", price: 80, servesText: "Serves 12-15" },
      { optionId: "chk-karahi-lg", label: "Large Tray", price: 140, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "palak-chicken",
    categoryId: "entrees",
    name: "Palak Chicken",
    subtitle: "Silky mustard-spiced spinach with tender chicken",
    description: "Slow-braised young spinach and fenugreek leaves simmered with bone-in or boneless Zabiha chicken and garlic tadka.",
    dietary: ["Zabiha Halal"],
    spiceLevel: "Medium",
    badge: "Home Heritage",
    imageSrc: null,
    options: [
      { optionId: "palak-chk-sm", label: "Small Tray", price: 85, servesText: "Serves 12-15" },
      { optionId: "palak-chk-lg", label: "Large Tray", price: 145, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "palak-paneer",
    categoryId: "entrees",
    name: "Palak Paneer",
    subtitle: "Fresh paneer cubes in velvety spiced greens",
    description: "Golden-seared farmer paneer folded into slow-cooked spinach, whole cumin, garlic, and toasted kasuri methi.",
    dietary: ["Vegetarian"],
    spiceLevel: "Mild",
    badge: "Vegetarian Favorite",
    imageSrc: null,
    options: [
      { optionId: "palak-paneer-sm", label: "Small Tray", price: 85, servesText: "Serves 12-15" },
      { optionId: "palak-paneer-lg", label: "Large Tray", price: 140, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "aloo-ghosht",
    categoryId: "entrees",
    name: "Aloo Ghosht",
    subtitle: "Bone-in goat & Yukon potato shorba curry",
    description: "Deeply caramelized onion and bone-in goat stew finished with tender quartered potatoes and fragrant whole garam masala.",
    dietary: ["Zabiha Halal"],
    spiceLevel: "Medium",
    badge: "Heirloom Dish",
    imageSrc: "./assets/originals/nihari-karahi-bowls.jpg",
    options: [
      { optionId: "aloo-ghosht-sm", label: "Small Tray", price: 140, servesText: "Serves 12-15" },
      { optionId: "aloo-ghosht-lg", label: "Large Tray", price: 230, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "goat-biryani-pulao",
    categoryId: "entrees",
    name: "Goat Biryani / Pulao",
    subtitle: "Bone-in Zabiha goat sealed in saffron basmati",
    description: "Tender spiced goat layered beneath aged long-grain saffron rice, caramelized shallots, plums, and fresh mint leaves.",
    dietary: ["Zabiha Halal", "Signature"],
    spiceLevel: "Signature",
    badge: "Royal Centerpiece",
    imageSrc: "./assets/originals/seekh-kebab-biryani-board.jpg",
    options: [
      { optionId: "goat-biryani-sm", label: "Small Tray", price: 110, servesText: "Serves 12-15" },
      { optionId: "goat-biryani-lg", label: "Large Tray", price: 200, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "goat-korma-karahi",
    categoryId: "entrees",
    name: "Goat Korma / Karahi",
    subtitle: "Hand-cut goat in ceremonial korma or fiery karahi",
    description: "Select either rich fried-onion and cardamom korma or high-heat Peshawari tomato-ginger karahi cooked to fall-off-the-bone tenderness.",
    dietary: ["Zabiha Halal", "Signature"],
    spiceLevel: "Signature",
    badge: "Chef Flagship",
    imageSrc: "./assets/originals/nihari-karahi-bowls.jpg",
    options: [
      { optionId: "goat-karahi-sm", label: "Small Tray", price: 145, servesText: "Serves 12-15" },
      { optionId: "goat-karahi-lg", label: "Large Tray", price: 240, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "beef-nihari",
    categoryId: "entrees",
    name: "Beef Nihari",
    subtitle: "Overnight-braised shank in long-pepper gravy",
    description: "Slow-simmered beef shank enriched with roasted fennel, dried ginger, and pipli spice, garnished with fresh ginger juliennes and lime.",
    dietary: ["Zabiha Halal", "Signature"],
    spiceLevel: "Signature",
    badge: "Slow Braise",
    imageSrc: "./assets/originals/nihari-karahi-bowls.jpg",
    options: [
      { optionId: "beef-nihari-sm", label: "Small Tray", price: 100, servesText: "Serves 12-15" },
      { optionId: "beef-nihari-lg", label: "Large Tray", price: 180, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "beef-haleem",
    categoryId: "entrees",
    name: "Beef Haleem",
    subtitle: "Slow-beaten wheat, lentil & shredded beef stew",
    description: "Hours-simmered grain, four-lentil, and pulled Zabiha beef porridge topped with crisp fried onions, ginger, and green chilies.",
    dietary: ["Zabiha Halal", "Signature"],
    spiceLevel: "Medium",
    badge: "Ceremonial Stew",
    imageSrc: null,
    options: [
      { optionId: "beef-haleem-sm", label: "Small Tray", price: 100, servesText: "Serves 12-15" },
      { optionId: "beef-haleem-lg", label: "Large Tray", price: 180, servesText: "Serves 25-30" }
    ]
  },

  // Oven-Baked BBQ (3)
  {
    id: "mix-baked-boneless",
    categoryId: "oven-baked-bbq",
    name: "Mix Baked Boneless Chicken",
    subtitle: "Malai Boti, Chicken Tikka & Chicken Bihari",
    description: "Our signature trio of cream-and-cardamom Malai Boti, charred red Tikka, and smoky Bihari strips served with pickled onion and chutney.",
    dietary: ["Zabiha Halal", "BBQ & Grill", "Signature"],
    spiceLevel: "Signature",
    badge: "BBQ Trio",
    imageSrc: "./assets/originals/oven-baked-chicken-platter.jpg",
    options: [
      { optionId: "mix-bbq-sm", label: "Small Tray", price: 100, servesText: "Serves 12-15" },
      { optionId: "mix-bbq-lg", label: "Large Tray", price: 200, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "baked-chicken-bone",
    categoryId: "oven-baked-bbq",
    name: "Baked Chicken w/ Bone",
    subtitle: "Tandoori-spiced quartered roast chicken",
    description: "Bone-in Zabiha chicken marinated 24 hours in Kashmiri chili, roasted cumin, ginger, and lemon, roasted crisp on the bone.",
    dietary: ["Zabiha Halal", "BBQ & Grill"],
    spiceLevel: "Medium",
    badge: "Charred Roast",
    imageSrc: "./assets/originals/oven-baked-chicken-platter.jpg",
    options: [
      { optionId: "baked-bone-sm", label: "Small Tray", price: 85, servesText: "Serves 12-15" },
      { optionId: "baked-bone-lg", label: "Large Tray", price: 150, servesText: "Serves 25-30" }
    ]
  },
  {
    id: "oven-baked-seekh-kebabs",
    categoryId: "oven-baked-bbq",
    name: "Oven-Baked Seekh Kebabs",
    subtitle: "Hand-skewered minced kebab skewers with herbs",
    description: "Juicy hand-formed seekh kebabs seasoned with fresh cilantro, toasted coriander, and green chilies, baked to a smoky sear.",
    dietary: ["Zabiha Halal", "BBQ & Grill", "Signature"],
    spiceLevel: "Signature",
    badge: "Event Specialty",
    imageSrc: "./assets/originals/chapli-seekh-platter.jpg",
    options: [
      { optionId: "seekh-custom", label: "Custom Event Tray", price: null, servesText: "Custom Event Tray" }
    ]
  },

  // Frozen Dozens (14)
  {
    id: "veggie-spring-roll",
    categoryId: "frozen-dozens",
    name: "Veggie Spring Roll",
    subtitle: "Crisp julienned cabbage, carrot & scallion rolls",
    description: "Hand-rolled thin pastry cigars filled with wok-tossed vegetables, cracked black pepper, and toasted sesame.",
    dietary: ["Vegetarian", "Ready-to-Cook Frozen"],
    spiceLevel: "Mild",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "veg-spring-1dz", label: "1 Dozen", price: 16, servesText: "12 Pieces" }
    ]
  },
  {
    id: "mini-aloo-samosa",
    categoryId: "frozen-dozens",
    name: "Mini Aloo Samosa",
    subtitle: "Crisp pastry triangles with spiced potato & peas",
    description: "Hand-pleated snack-sized pastry pockets stuffed with cumin-roasted potato, green peas, and crushed coriander.",
    dietary: ["Vegetarian", "Ready-to-Cook Frozen"],
    spiceLevel: "Medium",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "mini-aloo-1dz", label: "1 Dozen", price: 16, servesText: "12 Pieces" }
    ]
  },
  {
    id: "mini-chicken-keema-samosa",
    categoryId: "frozen-dozens",
    name: "Mini Chicken Keema Samosa",
    subtitle: "Savory spiced minced chicken cocktail samosas",
    description: "Bite-sized crisp wrappers filled with dry-roasted chicken keema, caramelized onion, and fresh cilantro.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Medium",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "mini-chk-samosa-1dz", label: "1 Dozen", price: 18, servesText: "12 Pieces" }
    ]
  },
  {
    id: "chicken-spring-roll",
    categoryId: "frozen-dozens",
    name: "Chicken Spring Roll",
    subtitle: "Shredded spiced chicken & crisp vegetable rolls",
    description: "Generously packed shredded chicken spring rolls balanced with cabbage, bell pepper, garlic, and light soy-pepper seasoning.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Mild",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "chk-spring-1dz", label: "1 Dozen", price: 20, servesText: "12 Pieces" }
    ]
  },
  {
    id: "mini-beef-keema-samosa",
    categoryId: "frozen-dozens",
    name: "Mini Beef Keema Samosa",
    subtitle: "Hearty Zabiha beef keema cocktail samosas",
    description: "Crisp hand-folded triangles packed with lean minced beef, roasted cumin, green chili, and fresh mint.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Medium",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "mini-beef-samosa-1dz", label: "1 Dozen", price: 20, servesText: "12 Pieces" }
    ]
  },
  {
    id: "chicken-keema-puff-patties",
    categoryId: "frozen-dozens",
    name: "Chicken Keema Puff Patties",
    subtitle: "Flaky bakery puff pastry with savory chicken filling",
    description: "Buttery laminated puff squares ready for the oven or air fryer, stuffed with creamy spiced chicken keema.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Mild",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "chk-puff-1dz", label: "1 Dozen", price: 20, servesText: "12 Pieces" }
    ]
  },
  {
    id: "beef-keema-puff-patties",
    categoryId: "frozen-dozens",
    name: "Beef Keema Puff Patties",
    subtitle: "Flaky bakery puff pastry with spiced beef keema",
    description: "Golden-baking puff patties filled with aromatic roasted-spice Zabiha beef mince for effortless tea tables.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Medium",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "beef-puff-1dz", label: "1 Dozen", price: 24, servesText: "12 Pieces" }
    ]
  },
  {
    id: "chicken-kofta",
    categoryId: "frozen-dozens",
    name: "Chicken Kofta",
    subtitle: "Hand-rolled spiced chicken meatballs",
    description: "Tender chicken meatballs seasoned with ginger, garlic, and toasted gram flour, ready for quick weeknight curry or grilling.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Medium",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "chk-kofta-1dz", label: "1 Dozen", price: 24, servesText: "12 Pieces" }
    ]
  },
  {
    id: "chicken-muthi-kebab",
    categoryId: "frozen-dozens",
    name: "Chicken Muthi Kebab",
    subtitle: "Hand-pressed oblong herb chicken kebabs",
    description: "Traditional fist-shaped chicken kebabs folded with fresh coriander, green chilies, and crushed pomegranate seeds.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Medium",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "chk-muthi-1dz", label: "1 Dozen", price: 24, servesText: "12 Pieces" }
    ]
  },
  {
    id: "chicken-shami-kebab",
    categoryId: "frozen-dozens",
    name: "Chicken Shami Kebab",
    subtitle: "Silky shredded chicken & chana dal medallions",
    description: "Slow-cooked chicken and split chickpea patties ground fine with whole black cardamom, ready to pan-sear in minutes.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Mild",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "chk-shami-1dz", label: "1 Dozen", price: 24, servesText: "12 Pieces" }
    ]
  },
  {
    id: "chicken-chapli-kebab",
    categoryId: "frozen-dozens",
    name: "Chicken Chapli Kebab",
    subtitle: "Peshawari-style crushed-spice flat kebabs",
    description: "Rustic chicken patties studded with crushed coriander, anardana, diced tomato, and scallion.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Signature",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "chk-chapli-1dz", label: "1 Dozen", price: 26, servesText: "12 Pieces" }
    ]
  },
  {
    id: "beef-shami-kebab",
    categoryId: "frozen-dozens",
    name: "Beef Shami Kebab",
    subtitle: "Classic slow-braised beef & lentil medallions",
    description: "Velvety shredded Zabiha beef and chana dal patties infused with aromatic whole spices, clove, and fresh mint.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen"],
    spiceLevel: "Medium",
    badge: "1 Dozen",
    imageSrc: null,
    options: [
      { optionId: "beef-shami-1dz", label: "1 Dozen", price: 28, servesText: "12 Pieces" }
    ]
  },
  {
    id: "beef-chapli-kebab",
    categoryId: "frozen-dozens",
    name: "Beef Chapli Kebab",
    subtitle: "Coarse-minced Peshawari chapli medallions",
    description: "Herb-packed Zabiha beef chapli kebabs with crushed roasted coriander, pomegranate seed, green chili, and scallion.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen", "Signature"],
    spiceLevel: "Signature",
    badge: "Best Seller",
    imageSrc: null,
    options: [
      { optionId: "beef-chapli-1dz", label: "1 Dozen", price: 32, servesText: "12 Pieces" }
    ]
  },
  {
    id: "braided-chicken-bread",
    categoryId: "frozen-dozens",
    name: "Braided Chicken Bread",
    subtitle: "Bakery-style stuffed sesame pastry braid",
    description: "Hand-braided golden dough filled with creamy black-pepper chicken, bell peppers, and sesame-herb crust.",
    dietary: ["Zabiha Halal", "Ready-to-Cook Frozen", "Signature"],
    spiceLevel: "Mild",
    badge: "Signature Loaf",
    imageSrc: "./assets/originals/braided-chicken-bread.jpg",
    options: [
      { optionId: "chk-bread-1pc", label: "1 Large Piece", price: 45, servesText: "1 Large Loaf" }
    ]
  }
];

export const BANQUET_PACKAGES = [
  {
    id: "dawat-40-classic",
    categoryId: "banquet-packages",
    name: "40-Guest Classic Dawat",
    guestCount: 40,
    guestRangeLabel: "Serves ~40 Guests",
    price: 649,
    originalPrice: 735,
    customPricingNote: "Saves $86 off individual tray menu",
    badge: "Most Popular · 40 Guests",
    includes: [
      "1 Small Tray: Lahori Cholay or Daal",
      "1 Small Tray: Slow-Reduced Kheer",
      "1 Medium Tray: Chana Chaat",
      "1 Medium Tray: Crisp Pakora",
      "1 Medium Tray: Mix Baked Boneless Chicken",
      "1 Medium Tray: Chicken Karahi or Korma",
      "1 Large Tray: Chicken Pulao or Biryani",
      "20 Fresh Naan, Garden Salad & Green Chutney"
    ],
    naanIncluded: "20 Fresh Naan + Salad & Green Chutney",
    imageSrc: "./assets/originals/festive-chaat-biryani-dawat.jpg"
  },
  {
    id: "dawat-40-royal",
    categoryId: "banquet-packages",
    name: "40-Guest Royal Goat & BBQ Dawat",
    guestCount: 40,
    guestRangeLabel: "Serves ~40 Guests",
    price: 849,
    originalPrice: 935,
    customPricingNote: "Saves $86 off individual tray menu",
    badge: "Goat & Paneer · 40 Guests",
    includes: [
      "1 Small Tray: Orchard Fruit Chaat",
      "1 Small Tray: Palak Paneer",
      "1 Small Tray: Royal Matanjan",
      "1 Medium Tray: Dahi Bhalla",
      "1 Medium Tray: Crisp Pakora",
      "1 Medium Tray: Mix Baked Boneless Chicken or Baked Chicken w/ Bone",
      "1 Medium Tray: Goat Karahi or Aloo Ghosht",
      "1 Large Tray: Chicken Pulao or Biryani",
      "20 Fresh Naan, Garden Salad & Green Chutney"
    ],
    naanIncluded: "20 Fresh Naan + Salad & Green Chutney",
    imageSrc: "./assets/originals/seekh-kebab-biryani-board.jpg"
  },
  {
    id: "banquet-100-classic",
    categoryId: "banquet-packages",
    name: "100-Guest Grand Banquet I",
    guestCount: 100,
    guestRangeLabel: "Serves ~100 Guests",
    price: 1449,
    originalPrice: 1540,
    customPricingNote: "Saves $91 off individual tray menu",
    badge: "Grand Scale · 100 Guests",
    includes: [
      "2 Large Trays: Lahori Cholay or Daal",
      "2 Large Trays: Chana Chaat",
      "2 Large Trays: Crisp Pakora",
      "2 Large Trays: Chicken Pulao or Biryani",
      "2 Large Trays: Chicken Karahi or Korma",
      "2 Large Trays: Slow-Reduced Kheer",
      "75 Fresh Naan, Garden Salad & Green Chutney"
    ],
    naanIncluded: "75 Fresh Naan + Salad & Green Chutney",
    imageSrc: "./assets/originals/dawat-samosa-kebab-buffet.jpg"
  },
  {
    id: "banquet-100-imperial",
    categoryId: "banquet-packages",
    name: "100-Guest Imperial Goat & Biryani Banquet",
    guestCount: 100,
    guestRangeLabel: "Serves ~100 Guests",
    price: 1999,
    originalPrice: 2120,
    customPricingNote: "Saves $121 off individual tray menu",
    badge: "Imperial Nikah · 100 Guests",
    includes: [
      "2 Large Trays: Lahori Cholay or Daal",
      "2 Large Trays: Dahi Bhalla",
      "2 Large Trays: Crisp Pakora",
      "2 Large Trays: Chicken Pulao or Biryani",
      "2 Large Trays: Goat Korma or Aloo Ghosht",
      "2 Large Trays: Orchard Fruit Chaat",
      "2 Large Trays: Slow-Reduced Kheer",
      "75 Fresh Naan, Garden Salad & Green Chutney"
    ],
    naanIncluded: "75 Fresh Naan + Salad & Green Chutney",
    imageSrc: "./assets/originals/nihari-karahi-bowls.jpg"
  },
  {
    id: "holiday-20-pkg1",
    categoryId: "holiday-packages",
    name: "Family Feast Package I (Roasted Turkey & Beef Stew)",
    guestCount: 20,
    guestRangeLabel: "Serves ~20 Guests",
    price: null,
    originalPrice: null,
    customPricingNote: "Contact for Seasonal Quote · Serves ~20",
    badge: "Holiday Collection",
    includes: [
      "Whole Herb-Roasted Zabiha Halal Turkey",
      "Slow-Simmered Spiced Beef Stew",
      "Herb Butter Rice & Mashed Potatoes",
      "Garlic Green Beans & Chicken Spinach Pie (2)",
      "Cranberry Sauce & Pecan Pie or Tres Leches Cake"
    ],
    naanIncluded: "Cranberry Sauce & Herb Sides Included",
    imageSrc: "./assets/originals/holiday-roasted-turkey.jpg"
  },
  {
    id: "holiday-20-pkg2",
    categoryId: "holiday-packages",
    name: "Family Feast Package II (Roasted & Honey-Cranberry Chicken)",
    guestCount: 20,
    guestRangeLabel: "Serves ~20 Guests",
    price: null,
    originalPrice: null,
    customPricingNote: "Contact for Seasonal Quote · Serves ~20",
    badge: "Holiday Collection",
    includes: [
      "Whole Herb-Roasted Zabiha Halal Chicken",
      "Honey-Cranberry Baked Chicken with Ricotta Cheese",
      "Beef Chili, Mac & Cheese & Herb Butter Rice",
      "Garlic Green Beans & Mashed or Baked Potatoes",
      "Gajar Halwa or Cardamom Kheer"
    ],
    naanIncluded: "Full Holiday Sides & Dessert Included",
    imageSrc: "./assets/originals/oven-baked-chicken-platter.jpg"
  }
];

export const GRAZING_TIERS = [
  {
    id: "petite-table",
    name: "Petite Atelier Table",
    guestRange: "15 - 30 Guests",
    footprint: "6 ft table footprint",
    setupWindow: "60-minute on-site styling",
    startingPrice: null,
    priceLabel: "Custom Venue Quote",
    imageSrc: "./assets/originals/floral-croissant-bar.jpg",
    description: "Intimate tiered appetizer and fruit display tailored for bridal mornings, tea gatherings, and home receptions."
  },
  {
    id: "signature-grazing",
    name: "Signature Grazing Installation",
    guestRange: "35 - 70 Guests",
    footprint: "8 - 10 ft table footprint",
    setupWindow: "90-minute on-site styling",
    startingPrice: null,
    priceLabel: "Custom Venue Quote",
    imageSrc: "./assets/originals/hero-grazing-sliders.jpg",
    description: "Multi-level acrylic and porcelain risers pairing pipette chaat shooters, croissant sliders, artisan samosas, and halal charcuterie."
  },
  {
    id: "grand-gala-installation",
    name: "Grand Gala & Cafe Opening",
    guestRange: "75 - 150+ Guests",
    footprint: "12 - 16 ft statement spread",
    setupWindow: "120-minute venue styling",
    startingPrice: null,
    priceLabel: "Custom Venue Quote",
    imageSrc: "./assets/originals/cilru-gala-ballroom.jpg",
    description: "Full architectural centerpiece built for grand openings, university galas, corporate lounges, and large nikah receptions."
  }
];

export const GRAZING_STATIONS = [
  {
    id: "pipette-chaat",
    name: "Pipette Chana Chaat Shooters",
    subtitle: "Individual cocktail glasses with tamarind pipettes & edible florals",
    imageSrc: "./assets/originals/pipette-chaat-tiers.jpg",
    previewImage: "./assets/originals/pipette-chaat-tiers.jpg"
  },
  {
    id: "croissant-sliders",
    name: "Flaky Croissant & Brioche Sliders",
    subtitle: "Tiered chicken salad croissants and spiced brioche party sliders",
    imageSrc: "./assets/originals/hero-grazing-sliders.jpg",
    previewImage: "./assets/originals/hero-grazing-sliders.jpg"
  },
  {
    id: "samosa-spring-flight",
    name: "Hand-Folded Samosa & Spring Roll Flight",
    subtitle: "Crisp keema samosas and spring rolls presented on tiered risers",
    imageSrc: "./assets/originals/cilru-gala-ballroom.jpg",
    previewImage: "./assets/originals/cilru-gala-ballroom.jpg"
  },
  {
    id: "halal-charcuterie",
    name: "Halal Charcuterie & Orchard Fruit",
    subtitle: "Grapes, toasted almonds, pita triangles, mango, kiwi & spiced chutney",
    imageSrc: "./assets/originals/charcuterie-orchard-table.jpg",
    previewImage: "./assets/originals/charcuterie-orchard-table.jpg"
  },
  {
    id: "kheer-parfait-cups",
    name: "Dessert Parfait & Mango Flute Bar",
    subtitle: "Portioned berry parfaits, mango mocktail flutes, and pakora pyramids",
    imageSrc: "./assets/originals/parfait-mimosa-grazing.jpg",
    previewImage: "./assets/originals/parfait-mimosa-grazing.jpg"
  },
  {
    id: "weekly-tiffin-addon",
    name: "Floral Riser & Macaron Console",
    subtitle: "White garden roses, framed menu styling, macaron tower & croissant trays",
    imageSrc: "./assets/originals/floral-croissant-bar.jpg",
    previewImage: "./assets/originals/floral-croissant-bar.jpg"
  }
];

export const DELIVERY_ZONES = [
  {
    id: "carteret-pickup",
    label: "Carteret, NJ Kitchen Pickup",
    areas: "Direct scheduled handoff in Carteret, NJ",
    fee: 0,
    feeLabel: "Complimentary Kitchen Pickup"
  },
  {
    id: "middlesex-union",
    label: "Middlesex & Union County",
    areas: "Edison, Iselin, Woodbridge, Metuchen, Rahway, Piscataway",
    fee: null,
    feeLabel: "Quoted by Mileage"
  },
  {
    id: "central-north-nj",
    label: "Central & North New Jersey",
    areas: "Jersey City, Princeton, Somerset, New Brunswick, Newark",
    fee: null,
    feeLabel: "Quoted by Mileage"
  },
  {
    id: "tri-state-onsite",
    label: "NYC, Staten Island & On-Site Gala Setup",
    areas: "Staten Island, Manhattan, Brooklyn, Queens & full venue styling",
    fee: null,
    feeLabel: "Quoted by Mileage"
  }
];

export const GENERATED_PLATES = [
  {
    id: "hero-grazing-sliders",
    title: "Brioche Sliders & Croissant Grazing Spread",
    caption: "Rose-skewered brioche sliders, flaky croissants on checkered trays, kebabs, and white florals.",
    imageSrc: "./assets/originals/hero-grazing-sliders.jpg",
    aspect: "portrait"
  },
  {
    id: "charcuterie-orchard-table",
    title: "Overhead Halal Grazing & Chutney Spread",
    caption: "Hammered mini karahi chutney bowl, toasted pita triangles, almonds, grapes, mango, and kiwi.",
    imageSrc: "./assets/originals/charcuterie-orchard-table.jpg",
    aspect: "portrait"
  },
  {
    id: "nihari-karahi-bowls",
    title: "Candlelit Beef Nihari & Karahi",
    caption: "Slow-braised beef nihari and spiced karahi finished with fresh coriander.",
    imageSrc: "./assets/originals/nihari-karahi-bowls.jpg",
    aspect: "portrait"
  },
  {
    id: "seekh-kebab-biryani-board",
    title: "Char-Grilled Seekh Kebabs & Saffron Pulao",
    caption: "Hand-skewered seekh kebabs with blistered green chili, saffron rice, naan, and chutneys.",
    imageSrc: "./assets/originals/seekh-kebab-biryani-board.jpg",
    aspect: "portrait"
  },
  {
    id: "dawat-samosa-kebab-buffet",
    title: "Home Dawat Samosa & Kebab Buffet",
    caption: "Tiered samosas and flaky puff patties alongside lemon-garnished kebabs and sliders.",
    imageSrc: "./assets/originals/dawat-samosa-kebab-buffet.jpg",
    aspect: "portrait"
  },
  {
    id: "parfait-mimosa-grazing",
    title: "Dessert Parfaits & Mango Flute Table",
    caption: "Layered berry parfaits, mango flutes, blush roses, and golden pakora platter.",
    imageSrc: "./assets/originals/parfait-mimosa-grazing.jpg",
    aspect: "portrait"
  },
  {
    id: "inline-seekh-platter",
    title: "Seekh Kebab & Saffron Rice Detail",
    caption: "Inline editorial vignette of char-grilled seekh kebabs and saffron rice.",
    imageSrc: "./assets/originals/inline-seekh-platter.jpg",
    aspect: "landscape"
  },
  {
    id: "inline-chutney-spread",
    title: "Spiced Chutney & Pita Grazing Detail",
    caption: "Inline editorial vignette of glossy tomato-chili chutney, pita triangles, and grapes.",
    imageSrc: "./assets/originals/inline-chutney-spread.jpg",
    aspect: "landscape"
  }
];

export const PORTFOLIO_EVENTS = [
  {
    id: "signature-grazing-sliders",
    title: "Brioche Sliders & Checkered Croissant Spread",
    category: "grazing",
    location: "New Jersey",
    eventType: "Signature Grazing Installation",
    caption: "Rose-skewered brioche sliders on silver platters, flaky filled croissants on checkered porcelain trays, kebabs, and fresh white florals.",
    imageSrc: "./assets/originals/hero-grazing-sliders.jpg",
    aspect: "wide"
  },
  {
    id: "charcuterie-orchard-spread",
    title: "Halal Grazing Table & Spiced Chutney Karahi",
    category: "grazing",
    location: "Carteret, NJ",
    eventType: "Bespoke Grazing Commission",
    caption: "Lush green and red grapes, toasted almonds, warm pita triangles, kiwi, mango, and glossy house chutney in a hammered mini karahi.",
    imageSrc: "./assets/originals/charcuterie-orchard-table.jpg",
    aspect: "tall"
  },
  {
    id: "pipette-chaat-reception",
    title: "Pipette Chana Chaat & Tea Sandwich Tiers",
    category: "bridal",
    location: "Edison, NJ",
    eventType: "Engagement & Tea Reception",
    caption: "Individual chana chaat shooter glasses topped with icing florals and tamarind pipettes beneath olive-picked tea sandwiches and skewers.",
    imageSrc: "./assets/originals/pipette-chaat-tiers.jpg",
    aspect: "standard"
  },
  {
    id: "cilru-fundraising-gala",
    title: "CILRU Fundraising Gala Ballroom",
    category: "corporate",
    location: "Central NJ Ballroom",
    eventType: "150+ Guest Fundraising Gala",
    caption: "Dual-table ballroom installation lined with white garden roses, crisp spring roll tiers, and portioned appetizer cups.",
    imageSrc: "./assets/originals/cilru-gala-ballroom.jpg",
    aspect: "wide"
  },
  {
    id: "chandelier-banquet-console",
    title: "Chandelier Dining Room Catering Console",
    category: "bridal",
    location: "Middlesex County, NJ",
    eventType: "Private Reception Styling",
    caption: "Crystal-chandelier dining setup pairing elevated brioche sliders, puff pastries, white roses, and framed RubzzKitchen table signage.",
    imageSrc: "./assets/originals/chandelier-banquet-table.jpg",
    aspect: "tall"
  },
  {
    id: "parfait-mimosa-bar",
    title: "Berry Parfaits, Mango Flutes & Pakora Pyramid",
    category: "grazing",
    location: "Woodbridge, NJ",
    eventType: "Bridal & Brunch Grazing Bar",
    caption: "Multi-tier berry dessert parfaits, chilled mango mocktail flutes, blush roses, and golden crisp pakoras.",
    imageSrc: "./assets/originals/parfait-mimosa-grazing.jpg",
    aspect: "standard"
  },
  {
    id: "floral-croissant-bar",
    title: "White Garden Rose Croissant & Macaron Bar",
    category: "bridal",
    location: "Iselin, NJ",
    eventType: "Shower & Tea Reception",
    caption: "Fresh white garden roses flanking a pastel macaron tower, checkered croissant and brioche trays, and RubzzKitchen menu frame.",
    imageSrc: "./assets/originals/floral-croissant-bar.jpg",
    aspect: "standard"
  },
  {
    id: "acrylic-riser-spread",
    title: "White Acrylic Riser & Hydrangea Spread",
    category: "grazing",
    location: "Princeton, NJ",
    eventType: "Boutique Cocktail Grazing",
    caption: "Architectural white acrylic risers elevating spiced sliders and cocktail bites beside lush white hydrangeas.",
    imageSrc: "./assets/originals/acrylic-riser-spread.jpg",
    aspect: "tall"
  },
  {
    id: "tiered-chaat-cups",
    title: "Three-Tier Individual Savory Chaat Cups",
    category: "corporate",
    location: "Central NJ",
    eventType: "Cocktail Hour Canapes",
    caption: "Three-tier wood-and-iron stand showcasing grab-and-go savory chaat cups topped with crisp bites.",
    imageSrc: "./assets/originals/tiered-chaat-cups.jpg",
    aspect: "standard"
  },
  {
    id: "dawat-samosa-kebab-buffet",
    title: "Home Dawat Samosa, Pastry & Kebab Buffet",
    category: "banquets",
    location: "Carteret, NJ",
    eventType: "Family Dawat Commission",
    caption: "Generous home buffet spread featuring tiered samosas and puff patties, lemon-garnished kebabs, biryani, and sliders.",
    imageSrc: "./assets/originals/dawat-samosa-kebab-buffet.jpg",
    aspect: "wide"
  }
];

export const FAQ_ITEMS = [
  {
    id: "halal-assurance",
    question: "Is 100% of RubzzKitchen's menu Zabiha Halal?",
    answer: "Yes. Every beef, goat, and poultry cut across our catering trays, oven-baked BBQ platters, grazing charcuterie boards, and frozen dozens is sourced from certified Zabiha Halal suppliers and prepared in a strictly halal kitchen in Carteret, NJ."
  },
  {
    id: "tray-sizing",
    question: "How many guests do Small and Large catering trays serve?",
    answer: "As a reliable planning baseline, a Small Tray serves 12 to 15 guests alongside other courses, and a Large Full Tray serves 25 to 30 guests. Use the Portion Architect above to model multi-dish buffets from 15 to 250 guests."
  },
  {
    id: "lead-time-retainer",
    question: "How far in advance should we book catering trays or a grazing table?",
    answer: "Please place catering tray and banquet package requests at least 72 hours ahead. Bespoke grazing tables with on-site floral and riser styling require 7 days notice. A 50% retainer confirms your date on the kitchen calendar."
  },
  {
    id: "frozen-dozens-prep",
    question: "How are Frozen Dozens packaged and cooked at home?",
    answer: "All 14 frozen items are packed by the dozen (12 pieces per order, with Braided Chicken Bread sold as 1 large baked or bake-ready loaf). Each box includes crisp air-fryer, shallow-fry, or oven finishing instructions directly from frozen."
  },
  {
    id: "delivery-setup",
    question: "Where do you deliver and set up grazing tables?",
    answer: "Complimentary scheduled pickup is available in Carteret, NJ. Delivery and full venue styling cover Middlesex and Union Counties, Central and North Jersey, Princeton, Jersey City, Staten Island, and NYC, with delivery quoted transparently by mileage."
  },
  {
    id: "custom-mosque-gala",
    question: "Do you customize menus for mosques, nikahs, or 150+ guest galas?",
    answer: "Yes. Beyond our 40-guest ($649 / $849) and 100-guest ($1,449 / $1,999) packages, we build custom large-batch menus, mosque iftars, and fundraising gala spreads. Call or WhatsApp (732) 486-5390 directly for large-venue coordination."
  }
];
