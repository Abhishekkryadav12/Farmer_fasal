import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, IndianRupee, Clock, Navigation, CheckCircle2, Truck, Box, Phone } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useAppContext } from '../context/AppContext';
import { buyers, mockUser } from '../data/mockData';
import { calculateDistance, calculateTravelTime, calculateTransportCost } from '../utils/locationUtils';

// Leaflet custom icons
const farmIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933096.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const buyerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2765/2765103.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function MapBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

export default function BuyerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useAppContext();
  
  const buyer = buyers.find(b => b.id === Number(id));
  const [quantityToSell, setQuantityToSell] = useState(100);

  if (!buyer) {
    return <div className="p-8 text-center text-xl font-bold">Buyer not found</div>;
  }

  const farmLat = mockUser.lat;
  const farmLng = mockUser.lng;
  const buyerLat = buyer.lat;
  const buyerLng = buyer.lng;

  const distance = calculateDistance(farmLat, farmLng, buyerLat, buyerLng);
  const travelTime = calculateTravelTime(distance);
  
  const transportPerQtl = calculateTransportCost(distance, 1);
  const totalTransport = calculateTransportCost(distance, Number(quantityToSell));
  
  const storageCost = 3000;
  const transactionCost = 2000;
  
  const grossSale = buyer.offer * Number(quantityToSell);
  const estimatedNet = grossSale - totalTransport - storageCost - transactionCost;

  const routePositions = [
    [farmLat, farmLng],
    // Simulating a slightly curved route by adding a midpoint with an offset
    [(farmLat + buyerLat)/2 + 0.1, (farmLng + buyerLng)/2 + 0.1],
    [buyerLat, buyerLng]
  ];

  const truckPos = routePositions[1];
  const mapBounds = L.latLngBounds([[farmLat, farmLng], [buyerLat, buyerLng]]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      <button onClick={() => navigate(-1)} className="text-brand-green font-bold flex items-center gap-2 hover:underline mb-4">
        &larr; Back to Buyers
      </button>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: BUYER DETAILS & ANALYSIS */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Buyer Details Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-3xl font-black text-gray-900">{buyer.name}</h1>
              {buyer.verified && (
                <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-bold">
                  <ShieldCheck className="h-4 w-4" /> Verified
                </span>
              )}
            </div>
            
            <p className="text-gray-600 text-lg flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-gray-400" /> {buyer.city}, {buyer.state}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Buyer Type</span>
                <span className="font-bold text-gray-900">Grain Buyer</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Looking For</span>
                <span className="font-bold text-gray-900">🌾 {buyer.needs}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Required Quantity</span>
                <span className="font-bold text-gray-900">{buyer.quantity}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Quality Requirement</span>
                <span className="font-bold text-gray-900">{buyer.grade}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Payment Terms</span>
                <span className="font-bold text-gray-900">{buyer.paymentDays} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium mt-1">Buyer Offer</span>
                <span className="text-2xl font-black text-brand-green">₹{buyer.offer} / Qtl</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-sm flex justify-center items-center gap-2">
                <Box className="h-5 w-5" /> Sell Crop to This Buyer
              </button>
              <button className="w-full bg-white border-2 border-brand-green text-brand-green py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-sm flex justify-center items-center gap-2">
                <Phone className="h-5 w-5" /> Contact Buyer
              </button>
            </div>
          </div>

          {/* Selling Analysis */}
          <div className="bg-brand-light-green rounded-3xl p-8 border border-brand-green/30 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📊 Selling Analysis
            </h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm text-gray-700 font-bold mb-1 block">Your Crop Quantity (Qtl)</label>
                <input 
                  type="number" 
                  value={quantityToSell} 
                  onChange={(e) => setQuantityToSell(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 font-bold text-gray-900 outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Gross Sale Value</span>
                <span className="font-bold">₹{grossSale.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Estimated Transport</span>
                <span>− ₹{totalTransport.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Estimated Storage</span>
                <span>− ₹{storageCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600 pb-4 border-b border-green-200">
                <span>Est. Transaction Cost</span>
                <span>− ₹{transactionCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-gray-900 text-lg">Estimated Net Realisation</span>
                <span className="font-black text-2xl text-brand-green">₹{estimatedNet.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MAP & ROUTE */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px] relative">
            
            {/* Map Header */}
            <div className="p-6 bg-white border-b border-gray-100 z-10 relative shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Route to {buyer.name}</h2>
              <p className="text-gray-500 font-medium mt-1">📍 {mockUser.village}, {mockUser.state} &nbsp;→&nbsp; 📍 {buyer.city}, {buyer.state}</p>
            </div>

            {/* Leaflet Map */}
            <div className="flex-1 w-full bg-gray-100 relative z-0">
              <MapContainer 
                center={[farmLat, farmLng]} 
                zoom={6} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                <Polyline 
                  positions={routePositions} 
                  color="#16a34a" 
                  weight={5} 
                  dashArray="10, 10" 
                />

                <Marker position={[farmLat, farmLng]} icon={farmIcon}>
                  <Tooltip permanent direction="top" offset={[0, -20]} className="font-bold">Your Farm</Tooltip>
                </Marker>
                
                <Marker position={[buyerLat, buyerLng]} icon={buyerIcon}>
                  <Tooltip permanent direction="top" offset={[0, -20]} className="font-bold">{buyer.name}</Tooltip>
                </Marker>

                <Marker position={truckPos} icon={truckIcon}>
                  <Tooltip direction="bottom" offset={[0, 10]}>Estimated Route</Tooltip>
                </Marker>

                <MapBounds bounds={mapBounds} />
              </MapContainer>
            </div>

            {/* Route Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 z-[400]">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-6 w-6 text-brand-green" />
                <h3 className="text-xl font-bold text-gray-900">Delivery Route</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Distance</p>
                  <p className="font-black text-gray-900 text-lg">{distance} km</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Est. Travel Time</p>
                  <p className="font-black text-gray-900 text-lg">{travelTime}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Traffic</p>
                  <p className="font-black text-yellow-600 text-lg">Moderate</p>
                </div>
                <div className="bg-brand-light-green rounded-xl p-3 border border-brand-green/20">
                  <p className="text-xs text-brand-green font-bold uppercase mb-1">Est. Transport</p>
                  <p className="font-black text-brand-green text-lg">₹{totalTransport.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&origin=${farmLat},${farmLng}&destination=${buyerLat},${buyerLng}`}
                  target="_blank" rel="noreferrer"
                  className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Navigation className="h-5 w-5" /> Start Navigation
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
