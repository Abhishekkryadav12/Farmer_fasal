export const initialFpoFarmers = [
  { id: 'F-101', name: 'Rajesh Kumar', phone: '+91 98765 43210', village: 'Malout', district: 'Sri Muktsar Sahib', land: 8, crop: 'Wheat', availableQtl: 120, status: 'Active' },
  { id: 'F-102', name: 'Gurpreet Singh', phone: '+91 98765 43211', village: 'Abohar', district: 'Fazilka', land: 12, crop: 'Cotton', availableQtl: 180, status: 'Active' },
  { id: 'F-103', name: 'Suresh Kumar', phone: '+91 98765 43212', village: 'Muktsar', district: 'Sri Muktsar Sahib', land: 6, crop: 'Mustard', availableQtl: 90, status: 'Active' },
  { id: 'F-104', name: 'Harpreet Kaur', phone: '+91 98765 43213', village: 'Bathinda', district: 'Bathinda', land: 10, crop: 'Rice', availableQtl: 150, status: 'Active' },
  { id: 'F-105', name: 'Ravi Verma', phone: '+91 98765 43214', village: 'Karnal', district: 'Karnal', land: 15, crop: 'Wheat', availableQtl: 250, status: 'Active' },
];

export const initialFpoBulkLots = [
  { id: 'BL-1042', crop: 'Wheat', quantity: 500, farmersCount: 4, quality: 'Grade A', collection: 'Malout', market: 'Azadpur Mandi', status: 'Active' },
  { id: 'BL-1043', crop: 'Rice', quantity: 280, farmersCount: 8, quality: 'Grade A', collection: 'Ludhiana', market: 'Delhi', status: 'Negotiation' },
  { id: 'BL-1044', crop: 'Mustard', quantity: 160, farmersCount: 6, quality: 'Grade B', collection: 'Bathinda', market: 'Jaipur', status: 'Buyer Confirmed' },
  { id: 'BL-1045', crop: 'Cotton', quantity: 140, farmersCount: 3, quality: 'Grade A', collection: 'Abohar', market: 'Ludhiana', status: 'Completed' },
];

export const initialFpoBuyers = [
  { id: 'B-201', name: 'Delhi Agro Foods', location: 'Delhi', crop: 'Wheat', requiredQty: 500, price: 2450, paymentDays: 7, distance: 310, status: 'Demo Verified' },
  { id: 'B-202', name: 'Punjab Grain Traders', location: 'Ludhiana', crop: 'Wheat', requiredQty: 300, price: 2400, paymentDays: 5, distance: 150, status: 'Demo Verified' },
  { id: 'B-203', name: 'FreshHarvest Foods', location: 'Jaipur', crop: 'Mustard', requiredQty: 200, price: 5200, paymentDays: 10, distance: 450, status: 'Demo Verified' },
];

export const initialFpoOffers = [
  { id: 'OF-203', buyer: 'Delhi Agro Foods', crop: 'Wheat', quantity: 500, buyerOffer: 2450, fpoAsk: 2500, status: 'Negotiation', date: '2026-10-02' },
  { id: 'OF-204', buyer: 'FreshHarvest Foods', crop: 'Mustard', quantity: 160, buyerOffer: 5100, fpoAsk: 5200, status: 'Accepted', date: '2026-10-01' },
];

export const initialFpoLogistics = [
  { id: 'LT-203', lotId: 'BL-1042', crop: 'Wheat', quantity: 500, from: 'Malout', to: 'Azadpur Delhi', distance: 307, cost: 15350, status: 'In Transit' },
  { id: 'LT-204', lotId: 'BL-1044', crop: 'Mustard', quantity: 160, from: 'Bathinda', to: 'Jaipur', distance: 450, cost: 12000, status: 'Scheduled' },
];

export const initialFpoStorage = [
  { id: 'ST-01', name: 'Malout FPO Warehouse', capacity: 1500, available: 450, cost: 18 },
  { id: 'ST-02', name: 'Muktsar Storage Center', capacity: 1200, available: 320, cost: 20 },
  { id: 'ST-03', name: 'Bathinda Warehouse', capacity: 1400, available: 480, cost: 22 },
];

export const initialFpoPayments = [
  { id: 'TX-501', buyer: 'Delhi Agro Foods', lot: 'BL-1042', amount: 1225000, date: '2026-10-01', status: 'Pending' },
  { id: 'TX-502', buyer: 'Punjab Grain Traders', lot: 'BL-1020', amount: 840000, date: '2026-09-28', status: 'Received' },
];
