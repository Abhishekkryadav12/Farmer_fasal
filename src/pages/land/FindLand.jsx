import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLand } from '../../context/LandContext';
import { MapPin, Droplets, Leaf, Handshake } from 'lucide-react';

export default function FindLand() {
  const navigate = useNavigate();
  const { lands } = useLand();
  
  // Exclude lands owned by the current user from the main search? Or keep all for demo. We'll keep all for demo.

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Agricultural Land</h1>
          <p className="text-lg text-gray-600 mt-2">Available land for cultivation partnership.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4">
        <select className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-brand-green flex-1 min-w-[150px]">
          <option>All Locations</option>
          <option>Punjab</option>
        </select>
        <select className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-brand-green flex-1 min-w-[150px]">
          <option>Any Area</option>
          <option>1-5 Acres</option>
          <option>5+ Acres</option>
        </select>
        <select className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-brand-green flex-1 min-w-[150px]">
          <option>Any Model</option>
          <option>Harvest Share</option>
          <option>Fixed Payment</option>
          <option>Hybrid</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lands.filter(l => l.status === 'Active').map((land) => (
          <div key={land.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group">
            
            {/* Main Photo Area */}
            <div className="h-48 bg-gray-200 relative overflow-hidden">
               <img 
                 src={land.photos && land.photos.length > 0 ? land.photos[0] : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'} 
                 alt={land.title} 
                 className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
               
               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                 📷 {land.photos && land.photos.length > 0 ? land.photos.length : 0} Photos
               </div>
               
               <div className="absolute bottom-3 left-3 right-3 text-white">
                 <h3 className="text-xl font-bold mb-1 shadow-black drop-shadow-md truncate">🌾 {land.area} Acres Agricultural Land</h3>
                 <p className="text-sm font-medium flex items-center gap-1 opacity-90"><MapPin className="h-3 w-3" /> {land.village}, {land.district}</p>
               </div>
            </div>
            
            <div className="p-5 flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="font-bold truncate">{land.irrigation || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <span className="text-lg">🚜</span>
                  <span className="font-bold truncate">{land.roadAccess || 'Access'}</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">
                  <Handshake className="h-4 w-4 text-brand-green" /> {land.model}
                </div>
                {land.model === 'Fixed Payment' && (
                   <p className="text-lg font-black text-brand-green">₹{land.terms?.fixedPayment} <span className="text-xs font-bold text-gray-500 uppercase">Expected</span></p>
                )}
                {land.model === 'Harvest Share' && (
                  <div className="flex justify-between text-sm items-end">
                    <span className="text-gray-500 font-bold flex flex-col">Owner <strong className="text-xl text-gray-900">{land.terms?.ownerShare}%</strong></span>
                    <span className="text-gray-500 font-bold flex flex-col text-right">You <strong className="text-xl text-brand-green">{land.terms?.cultivatorShare}%</strong></span>
                  </div>
                )}
                {land.model === 'Hybrid' && (
                  <div className="text-sm">
                    <p className="font-black text-brand-green mb-1 text-lg">₹{land.terms?.fixedPayment}</p>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-bold">Owner: <strong className="text-gray-900">{land.terms?.ownerShare}%</strong></span>
                      <span className="text-gray-500 font-bold">You: <strong className="text-gray-900">{land.terms?.cultivatorShare}%</strong></span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-600 flex justify-between items-center px-1">
                <span className="font-bold uppercase text-xs">Landowner</span>
                <span className="font-bold text-gray-900">{land.ownerName}</span>
              </div>
            </div>
            
            <div className="p-5 pt-0 flex gap-3">
              <button 
                onClick={() => navigate(`/land-connect/${land.id}`)}
                className="flex-1 bg-white border border-brand-green text-brand-green py-2.5 rounded-xl font-bold hover:bg-green-50 transition shadow-sm text-sm"
              >
                View Details
              </button>
              <button 
                onClick={() => navigate(`/land-connect/${land.id}`)}
                className="flex-1 bg-brand-green text-white py-2.5 rounded-xl font-bold hover:bg-green-700 transition shadow-sm text-sm"
              >
                Contact Owner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
