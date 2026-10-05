import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, IndianRupee, Clock, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { mockUser } from '../data/mockData';
import { calculateDistance, calculateTransportCost } from '../utils/locationUtils';

export default function Buyers() {
  const { buyers, cropLots } = useAppContext();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (user?.role === 'BUYER') {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🤝 Find Agricultural Produce</h1>
          <p className="text-lg text-gray-600 mt-2">Find crops from farmers and FPOs across available markets.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <input type="text" placeholder="🔍 Search crop, farmer, mandi or location" className="col-span-2 border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" />
            <select className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green">
              <option>Crop (All)</option>
              <option>Wheat</option>
              <option>Mustard</option>
            </select>
            <select className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green">
              <option>Location (All)</option>
              <option>Punjab</option>
              <option>Haryana</option>
            </select>
            <button className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-700">Search</button>
          </div>
        </div>

        <div className="grid gap-6">
          {cropLots.filter(c => c.status === 'AVAILABLE' || c.status === 'Available for Purchase').map(crop => {
            const dist = crop.lat && crop.lng ? calculateDistance(user.lat || 28.6139, user.lng || 77.2090, crop.lat, crop.lng) : 'N/A';
            
            return (
              <div key={crop.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row hover:border-brand-green transition">
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                        🌾 {crop.crop} - {crop.variety || 'Standard'}
                      </h3>
                      <p className="text-gray-500 text-lg flex items-center gap-1">
                        Farmer: <span className="font-bold text-gray-700">{crop.farmerName}</span>
                      </p>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" /> {crop.location || `${crop.village}, ${crop.district}`}
                      </p>
                    </div>
                    <div className="text-right border border-green-200 bg-green-50 rounded-xl p-3">
                      <p className="text-sm font-bold text-green-700 uppercase mb-1">Expected Price</p>
                      <p className="text-2xl font-black text-brand-green">₹{crop.expectedPrice}<span className="text-sm font-normal text-gray-600">/q</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Available</p>
                      <p className="font-bold text-gray-900">{crop.availableQuantity} Qtl</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Quality</p>
                      <p className="font-bold text-gray-900">{crop.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Available From</p>
                      <p className="font-bold text-gray-900">{new Date(crop.availableFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">Est. Distance</p>
                      <p className="font-bold text-gray-900">{dist} km</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100">
                  <button 
                    onClick={() => navigate(`/buyers/crop/${crop.id}`)}
                    className="w-full bg-white border border-brand-green text-brand-green py-3 rounded-xl font-bold hover:bg-brand-light-green transition shadow-sm"
                  >
                    View Crop
                  </button>
                  <button 
                    onClick={() => navigate(`/buyers/crop/${crop.id}`)}
                    className="w-full bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-sm"
                  >
                    Plan Purchase
                  </button>
                </div>
              </div>
            );
          })}
          
          {cropLots.length === 0 && (
             <div className="text-center p-12 bg-white rounded-3xl border border-gray-100">
               <h3 className="text-xl font-bold text-gray-900 mb-2">No crops currently listed</h3>
               <p className="text-gray-500">Farmers haven't posted any crops yet.</p>
             </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* DESTINATION SEARCH BANNER */}
      <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">📍 Find Buyers Anywhere in India</h2>
          <p className="text-blue-100">Search any location in India to find buyers, their requirements, and estimate logistics from your farm.</p>
        </div>
        <button 
          onClick={() => window.location.href = '/sell-destination'}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition w-full md:w-auto whitespace-nowrap shadow-sm"
        >
          Search Location
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Buyer Dhoondhein</h1>
        <p className="text-lg text-gray-600 mt-2">Apni fasal ke liye sahi buyer choose karein.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <select className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green flex-1">
          <option>🌾 Wheat</option>
          <option>🌾 Mustard</option>
        </select>
        <select className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green flex-1">
          <option>📍 All Locations</option>
          <option>📍 Nearby (Punjab/Haryana)</option>
        </select>
        <select className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green flex-1">
          <option>📦 Any Quantity</option>
          <option>📦 1-5 tonnes</option>
          <option>📦 5-10 tonnes</option>
        </select>
        <button className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-700">
          Search
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Aapke Crop Ke Liye Buyers</h2>
        
        <div className="space-y-6">
            {buyers.map((buyer) => {
              const dist = calculateDistance(mockUser.lat, mockUser.lng, buyer.lat, buyer.lng);
              const estTransport = calculateTransportCost(dist, Number(buyer.quantity) || 100);
              
              return (
              <div key={buyer.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row hover:border-brand-green transition">
                <div className="p-8 flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                        {buyer.name}
                        {buyer.verified && (
                          <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-bold">
                            <ShieldCheck className="h-4 w-4" /> Verified
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-500 text-lg flex items-center gap-1">
                        <MapPin className="h-5 w-5" /> {buyer.city}, {buyer.state}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Needs</p>
                      <p className="font-bold text-gray-900">{buyer.needs} <span className="text-xs font-normal text-gray-500">({buyer.grade})</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Quantity</p>
                      <p className="font-bold text-gray-900">{buyer.quantity} Qtl</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">Distance</p>
                      <p className="font-bold text-gray-900">{dist} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">Offer</p>
                      <p className="font-bold text-brand-green text-xl">₹{buyer.offer}<span className="text-sm font-normal text-gray-500">/q</span></p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm font-medium text-gray-600">
                     <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                       🚛 Est. transport ₹{estTransport.toLocaleString()}
                     </span>
                     <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                       <Clock className="h-4 w-4" /> Payment {buyer.paymentDays} days
                     </span>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 md:w-64 flex flex-col justify-center">
                  <div className="bg-white p-3 rounded-xl border border-gray-200 text-center mb-6">
                    <p className="text-xs text-gray-500 font-bold mb-1">Match Score</p>
                    <p className="text-3xl font-black text-brand-green">{buyer.match}%</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => navigate(`/buyers/${buyer.id}`)}
                      className="w-full bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-sm"
                    >
                      View Buyer
                    </button>
                    <button 
                      onClick={() => navigate(`/buyers/${buyer.id}`)}
                      className="w-full bg-white border border-brand-green text-brand-green py-3 rounded-xl font-bold hover:bg-brand-light-green transition shadow-sm"
                    >
                      View Route
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mt-8">Note: Verification status shown is for demo purposes.</p>
    </div>
  );
}
