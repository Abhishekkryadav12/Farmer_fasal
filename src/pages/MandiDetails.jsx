import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Navigation, ArrowLeft, Truck, Package, Calculator, Store, Users, Map as MapIcon, ChevronRight } from 'lucide-react';
import { calculateDistance } from '../utils/locationUtils';

export default function MandiDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mandis, cropLots, buyers } = useAppContext();
  const { user } = useAuth();
  
  const [quantity, setQuantity] = useState(100);
  const [showFullRoute, setShowFullRoute] = useState(false);

  const mandi = mandis.find(m => m.id === Number(id) || m.id === String(id));

  if (!mandi) return <div className="p-8 text-center text-xl font-bold">Mandi not found</div>;

  const isFarmer = user?.role === 'FARMER';
  
  // Calculations
  const distance = mandi.distance || 307; // default demo
  const travelTime = Math.round(distance / 50); // approx 50km/h
  const transportRatePerKm = 50;
  const totalTransportCost = distance * transportRatePerKm;
  const transportCostPerQtl = totalTransportCost / quantity;
  
  const storageCostPerQtl = mandi.storage || 20;
  const otherCostPerQtl = mandi.other || 10;
  
  const mandiPrice = mandi.price || 2500;
  const grossValue = mandiPrice * quantity;
  
  const totalStorage = storageCostPerQtl * quantity;
  const totalOther = otherCostPerQtl * quantity;
  
  const netRealisationPerQtl = mandiPrice - transportCostPerQtl - storageCostPerQtl - otherCostPerQtl;
  const totalNetRealisation = grossValue - totalTransportCost - totalStorage - totalOther;

  // Filter farmer crops available in this mandi
  const availableCrops = cropLots.filter(c => c.mandi === mandi.name && c.status === 'AVAILABLE');
  // Filter buyers interested in this location
  const availableBuyers = buyers.filter(b => b.city === mandi.city);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="text-brand-green font-bold flex items-center gap-2 hover:underline mb-2">
        <ArrowLeft className="h-5 w-5" /> Back
      </button>

      {/* TOP SECTION: MANDI INFO */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-2">🏪 {mandi.name}</h1>
          <p className="text-gray-500 text-lg flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5" /> {mandi.city}, {mandi.state}
          </p>
          <div className="flex gap-4 text-sm font-bold">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">Market Type: Mandi</span>
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg border border-green-100">Live Demo Data</span>
          </div>
        </div>
        
        <div className="bg-brand-green rounded-2xl p-6 text-white min-w-[240px] shadow-lg text-center">
          <p className="text-sm font-bold text-green-100 uppercase mb-1">Current Wheat Price</p>
          <p className="text-4xl font-black">₹{mandiPrice}<span className="text-xl font-normal text-green-200">/q</span></p>
          <p className="text-xs text-green-200 mt-2">Updated just now</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: ROUTE & ANALYSIS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ROUTE PREVIEW */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
               <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">🗺️ Delivery Route</h2>
               <button onClick={() => setShowFullRoute(true)} className="text-brand-green font-bold text-sm hover:underline flex items-center gap-1">
                 View Full Route <ChevronRight className="h-4 w-4" />
               </button>
             </div>
             
             <div className="p-8">
               <div className="flex items-stretch justify-between relative mb-8">
                 <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 border-t-2 border-dashed border-gray-400"></div>
                 
                 <div className="relative z-10 text-center w-1/3">
                   <div className="h-10 w-10 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                     <MapPin className="h-5 w-5" />
                   </div>
                   <p className="font-bold text-gray-900">{isFarmer ? 'Your Farm' : 'Your Location'}</p>
                   <p className="text-sm text-gray-500">{isFarmer ? user?.village || 'Malout, Punjab' : user?.city || 'Location'}</p>
                 </div>
                 
                 <div className="relative z-10 text-center w-1/3 mt-[-10px]">
                   <div className="bg-white px-4 py-1 rounded-full border-2 border-gray-200 shadow-sm inline-block">
                     <Truck className="h-6 w-6 text-orange-500" />
                   </div>
                 </div>

                 <div className="relative z-10 text-center w-1/3">
                   <div className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                     <Store className="h-5 w-5" />
                   </div>
                   <p className="font-bold text-gray-900">Destination Mandi</p>
                   <p className="text-sm text-gray-500">{mandi.name}</p>
                 </div>
               </div>

               <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase">Distance</p>
                    <p className="text-xl font-black text-gray-900">{distance} km</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase">Est. Travel Time</p>
                    <p className="text-xl font-black text-gray-900">~{travelTime} hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase">Transport Cost</p>
                    <p className="text-xl font-black text-orange-600">₹{totalTransportCost.toLocaleString()}</p>
                  </div>
               </div>
             </div>
          </div>

          {/* SELLING ANALYSIS (FARMER ONLY) */}
          {isFarmer && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="bg-brand-light-green p-6 border-b border-green-100 flex justify-between items-center">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Calculator className="h-5 w-5 text-brand-green" /> Selling Analysis</h2>
                 <div className="flex items-center gap-2">
                   <label className="text-sm font-bold text-gray-700">Quantity:</label>
                   <select 
                     value={quantity} 
                     onChange={(e) => setQuantity(Number(e.target.value))}
                     className="bg-white border border-gray-300 rounded-lg px-3 py-1 font-bold text-brand-green focus:outline-none"
                   >
                     <option value={50}>50 Quintals</option>
                     <option value={100}>100 Quintals</option>
                     <option value={250}>250 Quintals</option>
                   </select>
                 </div>
               </div>

               <div className="p-8 space-y-6">
                 <div className="flex justify-between items-end pb-4 border-b border-gray-100">
                   <div>
                     <p className="text-sm font-bold text-gray-500 uppercase">Gross Sale Value</p>
                     <p className="text-sm text-gray-400">₹{mandiPrice} × {quantity} Qtl</p>
                   </div>
                   <p className="text-2xl font-black text-gray-900">₹{grossValue.toLocaleString()}</p>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="flex justify-between text-gray-600">
                     <p className="flex flex-col">
                       <span className="font-bold">🚛 Estimated Transport</span>
                       <span className="text-xs">Distance: {distance}km | Rate: ₹{transportRatePerKm}/km</span>
                     </p>
                     <div className="text-right">
                       <p className="font-bold text-red-500">- ₹{totalTransportCost.toLocaleString()}</p>
                       <p className="text-xs text-gray-400">₹{transportCostPerQtl.toFixed(2)}/Qtl</p>
                     </div>
                   </div>
                   
                   <div className="flex justify-between text-gray-600">
                     <p className="flex flex-col">
                       <span className="font-bold">📦 Estimated Storage</span>
                       <span className="text-xs">₹{storageCostPerQtl}/Qtl</span>
                     </p>
                     <div className="text-right">
                       <p className="font-bold text-red-500">- ₹{totalStorage.toLocaleString()}</p>
                     </div>
                   </div>
                   
                   <div className="flex justify-between text-gray-600">
                     <p className="flex flex-col">
                       <span className="font-bold">⚙️ Other Costs</span>
                       <span className="text-xs">Transaction fees etc. (₹{otherCostPerQtl}/Qtl)</span>
                     </p>
                     <div className="text-right">
                       <p className="font-bold text-red-500">- ₹{totalOther.toLocaleString()}</p>
                     </div>
                   </div>
                 </div>

                 <div className="bg-green-50 p-6 rounded-2xl border border-green-200 mt-6 flex justify-between items-center">
                   <div>
                     <p className="text-sm font-bold text-green-800 uppercase mb-1">Estimated Net Realisation</p>
                     <p className="text-sm text-green-600 font-medium">After all logistics & fees</p>
                   </div>
                   <div className="text-right">
                     <p className="text-4xl font-black text-brand-green">₹{totalNetRealisation.toLocaleString()}</p>
                     <p className="text-sm font-bold text-green-700 mt-1">₹{netRealisationPerQtl.toFixed(2)} / Qtl</p>
                   </div>
                 </div>
                 
                 <button 
                   onClick={() => navigate('/sell-crop')} 
                   className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-md text-lg flex items-center justify-center gap-2"
                 >
                   <Package className="h-5 w-5" /> Create Crop Lot for This Mandi
                 </button>
               </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: MARKETPLACE */}
        <div className="space-y-8">
          
          {/* AVAILABLE BUYERS (FARMER VIEW) */}
          {isFarmer && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" /> Buyers Near This Market
              </h2>
              
              <div className="space-y-4">
                {availableBuyers.length > 0 ? availableBuyers.map(buyer => (
                  <div key={buyer.id} className="border border-gray-100 rounded-2xl p-4 hover:border-blue-200 transition bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{buyer.name}</h3>
                      <span className="bg-blue-100 text-blue-700 text-[10px] uppercase px-2 py-1 rounded font-bold">Verified</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3"><MapPin className="h-3 w-3"/> {buyer.city}</p>
                    
                    <div className="flex justify-between items-end mb-4">
                      <div>
                         <p className="text-xs text-gray-400 font-bold uppercase">Looking For</p>
                         <p className="font-bold text-gray-900">{buyer.quantity} Qtl {buyer.needs}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs text-gray-400 font-bold uppercase">Offer Price</p>
                         <p className="font-black text-brand-green">₹{buyer.offer}/q</p>
                      </div>
                    </div>
                    
                    <p className="text-sm font-bold text-gray-700 mb-4 bg-gray-100 px-3 py-2 rounded-lg text-center">
                      📞 {buyer.phone || '+91 98765 43210'}
                    </p>
                    
                    <button className="w-full bg-white border border-blue-600 text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-50 text-sm">
                      Contact Buyer
                    </button>
                  </div>
                )) : (
                  <div className="text-center py-6 text-gray-500">
                    No registered buyers found currently looking near {mandi.city}.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AVAILABLE FARMER LOTS (BUYER / EVERYONE VIEW) */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-500" /> Available Crop Lots
            </h2>
            
            <div className="space-y-4">
              {availableCrops.length > 0 ? availableCrops.map(crop => (
                <div key={crop.id} className="border border-gray-100 rounded-2xl p-4 hover:border-brand-green transition bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{crop.farmerName}</h3>
                    <span className="text-xs font-bold text-gray-500">{crop.grade}</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-3"><MapPin className="h-3 w-3"/> {crop.location}</p>
                  
                  <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Available Qty</p>
                        <p className="font-bold text-gray-900">{crop.availableQuantity} Qtl {crop.crop}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 font-bold uppercase">Asking Price</p>
                        <p className="font-black text-brand-green">₹{crop.expectedPrice}/q</p>
                    </div>
                  </div>
                  
                  <p className="text-sm font-bold text-gray-700 mb-4 bg-gray-100 px-3 py-2 rounded-lg text-center">
                    📞 {crop.phone || '+91 99887 76655'}
                  </p>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/buyers/crop/${crop.id}`)}
                      className="flex-1 bg-white border border-brand-green text-brand-green font-bold py-2 rounded-lg hover:bg-brand-light-green text-sm"
                    >
                      View
                    </button>
                    {!isFarmer && (
                      <button 
                        onClick={() => navigate(`/buyers/crop/${crop.id}`)}
                        className="flex-1 bg-brand-green text-white font-bold py-2 rounded-lg hover:bg-green-700 text-sm"
                      >
                        Plan Purchase
                      </button>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-center py-6 text-gray-500">
                  No farmer crop listings available for this market yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FULL MAP MODAL */}
      {showFullRoute && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Route Map</h2>
                 <p className="text-gray-500">{isFarmer ? user?.village || 'Farm' : 'Origin'} → {mandi.name}</p>
               </div>
               <button onClick={() => setShowFullRoute(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 font-bold px-4">Close</button>
             </div>
             
             <div className="flex-1 bg-gray-200 relative flex items-center justify-center overflow-hidden">
               {/* Mock Map Image Background */}
               <div className="absolute inset-0 opacity-40 bg-[url('https://maps.wikimedia.org/osm-intl/12/2885/1709.png')] bg-cover bg-center"></div>
               
               {/* Mock Route Line Overlay */}
               <svg className="absolute inset-0 h-full w-full pointer-events-none z-10" preserveAspectRatio="none">
                 <path d="M 200,400 Q 400,200 600,300 T 800,100" fill="none" stroke="#22c55e" strokeWidth="6" strokeDasharray="10,10" />
               </svg>
               
               {/* Markers */}
               <div className="absolute left-[200px] top-[400px] -translate-x-1/2 -translate-y-full z-20">
                 <div className="bg-gray-900 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg mb-1">{isFarmer ? 'Farm' : 'Origin'}</div>
                 <MapPin className="h-8 w-8 text-red-500 mx-auto" fill="white" />
               </div>
               <div className="absolute left-[800px] top-[100px] -translate-x-1/2 -translate-y-full z-20">
                 <div className="bg-brand-green text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg mb-1">{mandi.name}</div>
                 <MapPin className="h-8 w-8 text-brand-green mx-auto" fill="white" />
               </div>

               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-6 shadow-xl w-full max-w-2xl z-30 flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl"><Navigation className="h-6 w-6 text-green-700"/></div>
                    <div>
                      <p className="text-2xl font-black text-gray-900">{distance} km <span className="text-gray-400 font-medium text-lg">| ~{travelTime} hrs</span></p>
                      <p className="text-gray-500 font-medium">Estimated Transport: ₹{totalTransportCost.toLocaleString()}</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 text-lg shadow-md">
                    Start Navigation
                  </button>
               </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
