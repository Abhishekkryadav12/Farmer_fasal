import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, MapPin, Truck, Warehouse, TrendingUp, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MandiBhav() {
  const { mandis } = useAppContext();
  const navigate = useNavigate();
  const [selectedMandiIds, setSelectedMandiIds] = useState([]);
  
  const [calcBase, setCalcBase] = useState(2500);
  const [calcTransport, setCalcTransport] = useState(40);
  const [calcStorage, setCalcStorage] = useState(20);
  const [calcOther, setCalcOther] = useState(10);

  const toggleMandi = (id) => {
    setSelectedMandiIds(prev => 
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="bg-brand-green rounded-3xl p-8 text-white shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">📍 Where do you want to sell?</h2>
          <p className="text-green-100">Search any location in India to find mandis, direct buyers, logistics estimates, and net realisation.</p>
        </div>
        <button 
          onClick={() => navigate('/sell-destination')}
          className="bg-white text-brand-green px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition w-full md:w-auto whitespace-nowrap shadow-sm"
        >
          Search Destination
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Aaj Ka Mandi Bhav</h1>
        <p className="text-lg text-gray-600 mt-2">Sirf Mandi ka bhav nahi — actual earning samajhiye.</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-wrap gap-4 justify-center">
        <select className="border border-gray-300 rounded-xl px-6 py-3 bg-gray-50 focus:outline-none focus:border-brand-green font-medium">
          <option>🌾 Wheat</option>
          <option>🌾 Mustard</option>
        </select>
        <select className="border border-gray-300 rounded-xl px-6 py-3 bg-gray-50 focus:outline-none focus:border-brand-green font-medium">
          <option>📍 Nearby (Karnal)</option>
          <option>📍 All Haryana</option>
        </select>
        <input type="date" defaultValue="2026-10-03" className="border border-gray-300 rounded-xl px-6 py-3 bg-gray-50 focus:outline-none focus:border-brand-green font-medium" />
      </div>

      {/* Net Realisation Calculator */}
      <div className="bg-gradient-to-r from-brand-light-green to-white rounded-3xl p-8 border border-green-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Estimated Net Realisation Calculator</h2>
        <p className="text-gray-600 mb-8 font-medium">Highest mandi price does not always mean highest actual earning. Calculate your actual earning below.</p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700">Selling Price (₹/q)</label>
              <input type="number" value={calcBase} onChange={(e)=>setCalcBase(Number(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-2 w-32 text-right bg-white font-bold" />
            </div>
            <div className="flex justify-between items-center text-red-500">
              <label className="font-medium">- Transport Cost (₹/q)</label>
              <input type="number" value={calcTransport} onChange={(e)=>setCalcTransport(Number(e.target.value))} className="border border-red-200 rounded-lg px-3 py-2 w-32 text-right bg-red-50" />
            </div>
            <div className="flex justify-between items-center text-red-500">
              <label className="font-medium">- Storage Cost (₹/q)</label>
              <input type="number" value={calcStorage} onChange={(e)=>setCalcStorage(Number(e.target.value))} className="border border-red-200 rounded-lg px-3 py-2 w-32 text-right bg-red-50" />
            </div>
            <div className="flex justify-between items-center text-red-500 border-b border-gray-200 pb-4">
              <label className="font-medium">- Transaction Cost (₹/q)</label>
              <input type="number" value={calcOther} onChange={(e)=>setCalcOther(Number(e.target.value))} className="border border-red-200 rounded-lg px-3 py-2 w-32 text-right bg-red-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-brand-green"></div>
             <p className="text-lg font-bold text-gray-500 mb-2">Estimated Net Realisation</p>
             <p className="text-6xl font-bold text-brand-green">
               ₹{calcBase - calcTransport - calcStorage - calcOther}
             </p>
             <p className="text-gray-500 mt-2 font-medium">per quintal</p>
          </div>
        </div>
      </div>

      {/* Selling Time */}
      <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-blue-100 p-4 rounded-full">
          <TrendingUp className="h-10 w-10 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Kab Bechein?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-blue-200 text-center shadow-sm">
              <p className="text-lg font-bold text-gray-900 flex justify-center items-center gap-2 mb-2">
                <span className="h-4 w-4 rounded-full bg-green-500"></span> Consider Selling Now
              </p>
              <p className="text-sm text-gray-600">Current information suggests prices are stable.</p>
            </div>
            <div className="bg-white/50 p-4 rounded-xl border border-blue-100 text-center opacity-70">
              <p className="text-lg font-bold text-gray-900 flex justify-center items-center gap-2 mb-2">
                <span className="h-4 w-4 rounded-full bg-yellow-500"></span> Consider Waiting
              </p>
            </div>
            <div className="bg-white/50 p-4 rounded-xl border border-blue-100 text-center opacity-70">
              <p className="text-lg font-bold text-gray-900 flex justify-center items-center gap-2 mb-2">
                <span className="h-4 w-4 rounded-full bg-blue-500"></span> Consider Storage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mandis */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Kaunsi Mandi Better Hai?</h2>
          {selectedMandiIds.length > 0 && (
            <button className="bg-brand-green text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700">
              Plan Sale ({selectedMandiIds.length})
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mandis.map((mandi) => (
            <div 
              key={mandi.id} 
              className={`bg-white rounded-3xl border-2 overflow-hidden shadow-sm transition cursor-pointer border-gray-100 hover:border-brand-green hover:shadow-md`}
              onClick={() => navigate(`/market/${mandi.id}`)}
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">{mandi.name}</h3>
                <p className="text-gray-500 mt-1 flex items-center gap-1"><MapPin className="h-4 w-4"/> {mandi.distance} km</p>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-3xl font-bold text-gray-900">₹{mandi.price}<span className="text-lg text-gray-500 font-normal">/q</span></p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1"><Truck className="h-4 w-4"/> Transport</span>
                  <span className="font-bold text-red-500">-₹{mandi.transport}/q</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1"><Warehouse className="h-4 w-4"/> Storage</span>
                  <span className="font-bold text-red-500">-₹{mandi.storage}/q</span>
                </div>
                <div className="flex justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-gray-600 flex items-center gap-1"><Info className="h-4 w-4"/> Other</span>
                  <span className="font-bold text-red-500">-₹{mandi.other}/q</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-gray-900">Est. Net</span>
                  <span className="font-bold text-xl text-brand-green">₹{mandi.net}/q</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price History */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Price History (Wheat)</h2>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm font-bold bg-brand-green text-white rounded-lg">7 Days</button>
            <button className="px-4 py-1 text-sm font-bold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">15 Days</button>
            <button className="px-4 py-1 text-sm font-bold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">30 Days</button>
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-2 border-b-2 border-l-2 border-gray-200 p-4">
           {/* Simple CSS bars for mock chart */}
           {[2400, 2410, 2390, 2430, 2450, 2480, 2500].map((val, i) => (
             <div key={i} className="w-full bg-brand-light-green rounded-t-md hover:bg-brand-green transition group relative" style={{height: `${(val-2300)/2.5}%`}}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                  ₹{val}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
