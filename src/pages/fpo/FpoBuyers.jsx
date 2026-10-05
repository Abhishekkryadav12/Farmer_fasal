import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Search, Filter, ShieldCheck, MapPin, Truck, Check } from 'lucide-react';

export default function FpoBuyers() {
  const { fpoBuyers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const filteredBuyers = fpoBuyers.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Find Buyers</h1>
        <p className="text-gray-500 mt-1">Discover verified buyers looking for bulk agricultural produce.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search buyers by name or crop..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-purple-500 font-medium"
          />
        </div>
        <div className="flex gap-4">
          <select className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-purple-500 font-medium text-gray-600">
            <option>All Crops</option>
            <option>Wheat</option>
            <option>Mustard</option>
          </select>
          <button className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center gap-2 font-bold">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuyers.map(buyer => (
          <div key={buyer.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:border-purple-300 transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{buyer.name}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {buyer.location}</p>
              </div>
              {buyer.status === 'Demo Verified' && (
                <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm font-medium">Looking For</span>
                <span className="font-bold text-gray-900">{buyer.requiredQty} Qtl <span className="text-purple-600">{buyer.crop}</span></span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm font-medium">Expected Price</span>
                <span className="font-bold text-green-600">₹{buyer.price}/Qtl</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm font-medium">Payment Terms</span>
                <span className="font-bold text-gray-900">{buyer.paymentDays} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm font-medium">Distance</span>
                <span className="font-bold text-gray-900">{buyer.distance} km</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedBuyer(buyer)}
              className="w-full bg-purple-50 text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-100 transition shadow-sm"
            >
              Match & Send Offer
            </button>
          </div>
        ))}
      </div>

      {selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Match with {selectedBuyer.name}</h2>
            <p className="text-gray-500 mb-6">Select a bulk lot to offer this buyer.</p>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-green-800 mb-2 text-sm uppercase tracking-wider">Matching Analysis</h3>
              <ul className="space-y-2 text-sm text-green-700 font-medium">
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Crop matches (Wheat)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Quantity is sufficient</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Payment terms acceptable</li>
              </ul>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSelectedBuyer(null); alert("Offer sent successfully! (Demo)"); }}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Select Your Bulk Lot</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-purple-500" required>
                  <option value="">-- Choose Lot --</option>
                  <option value="BL-1042">BL-1042: 500 Qtl Wheat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Your Asking Price (₹/Qtl)</label>
                <input type="number" defaultValue={selectedBuyer.price + 50} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-purple-500 font-bold" required />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setSelectedBuyer(null)} className="px-5 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700">Send Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
