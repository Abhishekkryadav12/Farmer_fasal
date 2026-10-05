export const mockUser = {
  name: "Ramesh ji",
  village: "Malout",
  district: "Sri Muktsar Sahib",
  state: "Punjab",
  lat: 30.1944,
  lng: 74.4965,
  farm: {
    size: "5 Acres",
    soilType: "Loamy",
    currentCrop: "Wheat",
  }
};

export const todaySummary = {
  weather: {
    temp: 28,
    condition: "Sunny",
    rainChance: 70
  },
  crop: {
    name: "Wheat",
    status: "Growing well"
  },
  market: {
    price: 2450,
    unit: "q",
    location: "Nearby mandi"
  },
  alert: {
    message: "Rain expected tomorrow",
    type: "warning"
  }
};

export const cropRecommendations = [
  {
    id: 1,
    name: "Wheat",
    suitability: "High",
    water: "Medium",
    duration: "120 days",
    demand: "High",
    risk: "Low",
    reasons: ["Suitable soil", "Suitable season", "Water availability matches", "Market demand looks favorable"]
  },
  {
    id: 2,
    name: "Mustard",
    suitability: "Medium",
    water: "Low",
    duration: "110 days",
    demand: "Medium",
    risk: "Medium",
    reasons: ["Suitable season", "Requires less water"]
  }
];

export const mandis = [
  { id: 1, name: "Azadpur Mandi", city: "Delhi", state: "Delhi", lat: 28.7058, lng: 77.1691, price: 2500, crop: "Wheat", storage: 20, other: 10 },
  { id: 2, name: "Karnal Mandi", city: "Karnal", state: "Haryana", lat: 29.6857, lng: 76.9905, price: 2450, crop: "Wheat", storage: 20, other: 10 },
  { id: 3, name: "Kurukshetra Mandi", city: "Kurukshetra", state: "Haryana", lat: 29.9695, lng: 76.8227, price: 2400, crop: "Wheat", storage: 15, other: 10 },
  { id: 4, name: "Narela Mandi", city: "Delhi", state: "Delhi", lat: 28.8471, lng: 77.0984, price: 2480, crop: "Wheat", storage: 15, other: 10 },
  { id: 5, name: "Nashik Mandi", city: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, price: 2600, crop: "Wheat", storage: 30, other: 15 },
  { id: 6, name: "Indore Mandi", city: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, price: 2475, crop: "Wheat", storage: 25, other: 10 },
  { id: 7, name: "Ludhiana Mandi", city: "Ludhiana", state: "Punjab", lat: 30.9010, lng: 75.8573, price: 2420, crop: "Wheat", storage: 15, other: 10 },
  { id: 8, name: "Jaipur Mandi", city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, price: 2550, crop: "Wheat", storage: 25, other: 10 }
];

export const buyers = [
  { id: 1, name: "Aggarwal Traders", verified: true, needs: "Wheat", quantity: "500", grade: "Grade A", city: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090, offer: 2550, paymentDays: 7, match: 92, phone: "+91 98111 22333" },
  { id: 2, name: "Kisan Agro", verified: false, needs: "Wheat", quantity: "100", grade: "Grade B", city: "Karnal", state: "Haryana", lat: 29.6857, lng: 76.9905, offer: 2460, paymentDays: 3, match: 75, phone: "+91 94160 55444" },
  { id: 3, name: "Delhi Grain Buyers", verified: true, needs: "Wheat", quantity: "2000", grade: "Grade A", city: "Delhi", state: "Delhi", lat: 28.6448, lng: 77.2167, offer: 2520, paymentDays: 5, match: 88, phone: "+91 99999 88888" },
  { id: 4, name: "ABC Agro Foods", verified: true, needs: "Wheat", quantity: "300", grade: "Grade A", city: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, offer: 2650, paymentDays: 2, match: 80, phone: "+91 98222 33444" },
  { id: 5, name: "Punjab Mills", verified: true, needs: "Wheat", quantity: "1000", grade: "Grade A", city: "Ludhiana", state: "Punjab", lat: 30.9010, lng: 75.8573, offer: 2450, paymentDays: 1, match: 95, phone: "+91 98140 11222" },
  { id: 6, name: "Jaipur Processors", verified: false, needs: "Wheat", quantity: "50", grade: "Grade C", city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, offer: 2500, paymentDays: 10, match: 60, phone: "+91 98290 77666" }
];

export const cropHealthHistory = [
  {
    date: "Today",
    action: "Image checked",
    status: "Possible issue",
    details: "Leaf Disease (87% confidence)"
  },
  {
    date: "3 days ago",
    action: "Possible disease detected",
    status: "Alert",
    details: "Moderate severity"
  },
  {
    date: "7 days ago",
    action: "Crop healthy",
    status: "Healthy",
    details: ""
  }
];

export const payments = [
  {
    id: 1,
    amount: 125000,
    buyer: "Aggarwal Traders",
    date: "12 Oct 2026",
    expectedDate: "19 Oct 2026",
    status: "Payment Pending",
    timeline: [
      { step: "Order Confirmed", done: true },
      { step: "Crop Delivered", done: true },
      { step: "Payment Pending", done: false },
      { step: "Payment Received", done: false }
    ]
  }
];
export const initialCropLots = [
  {
    id: 'SB1024',
    farmerId: 'F1',
    farmerName: 'Raj Kumar',
    phone: '+91 98765 00001',
    crop: 'Wheat',
    variety: 'Sharbati',
    quantity: 100,
    availableQuantity: 100,
    grade: 'Grade A',
    expectedPrice: 2500,
    state: 'Punjab',
    district: 'Sri Muktsar Sahib',
    village: 'Malout',
    location: 'Malout, Punjab',
    lat: 30.1944,
    lng: 74.4965,
    harvestDate: '2026-04-15',
    availableFrom: '2026-04-15',
    mandi: 'Azadpur Mandi',
    status: 'AVAILABLE',
    photos: []
  },
  {
    id: 'SB1025',
    farmerId: 'F2',
    farmerName: 'Aman Singh',
    phone: '+91 98765 00002',
    crop: 'Wheat',
    variety: 'PBW 343',
    quantity: 250,
    availableQuantity: 250,
    grade: 'Grade A',
    expectedPrice: 2480,
    state: 'Haryana',
    district: 'Karnal',
    village: 'Karnal',
    location: 'Karnal, Haryana',
    lat: 29.6857,
    lng: 76.9905,
    harvestDate: '2026-04-18',
    availableFrom: '2026-04-18',
    mandi: 'Karnal Mandi',
    status: 'AVAILABLE',
    photos: []
  },
  {
    id: 'SB1026',
    farmerId: 'F3',
    farmerName: 'Demo FPO',
    phone: '+91 98765 00003',
    crop: 'Wheat',
    variety: 'HD 2967',
    quantity: 500,
    availableQuantity: 500,
    grade: 'Grade A',
    expectedPrice: 2470,
    state: 'Punjab',
    district: 'Ludhiana',
    village: 'Ludhiana',
    location: 'Ludhiana, Punjab',
    lat: 30.9010,
    lng: 75.8573,
    harvestDate: '2026-04-20',
    availableFrom: '2026-04-20',
    mandi: 'Azadpur Mandi',
    status: 'AVAILABLE',
    photos: []
  }
];

export const initialPurchaseRequests = [
  {
    id: 'PR-1001',
    cropId: 'SB1024',
    buyerId: 'B-201',
    buyerName: 'Delhi Agro Foods',
    buyerLocation: 'Delhi',
    requestedQuantity: 80,
    offerPrice: 2480,
    deliveryLocation: 'Delhi',
    paymentTerms: 7,
    requestDate: '2026-10-02',
    status: 'Pending'
  }
];
