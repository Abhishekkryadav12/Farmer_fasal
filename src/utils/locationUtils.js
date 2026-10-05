export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return Math.round(d);
}

// Assume average truck speed of 50 km/h
export function calculateTravelTime(distance) {
  const hours = distance / 50;
  if (hours < 1) return "< 1 hour";
  return `~${Math.round(hours)} hours`;
}

// Assume flat transport rate of ₹0.5 per km per quintal for simplicity
export function calculateTransportCost(distance, quantityQuintals = 1) {
  return Math.round(distance * 0.5 * quantityQuintals);
}
