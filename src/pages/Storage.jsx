import { useState } from 'react';
import { Warehouse, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Storage() {
  const [selected, setSelected] = useState(null);

  const storages = [
    { id: 1, name: "Kisan Cold Storage", distance: "12 km", type: "Cold Storage", cost: "₹20/q/month", verified: true },
    { id: 2, name: "Aggarwal Warehousing", distance: "5 km", type: "Dry Godown", cost: "₹10/q/month", verified: false },
    { id: 3, name: "State Govt Godown", distance: "18 km", type: "Dry Godown", cost: "₹8/q/month", verified: true }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Storage Dhoondhein</h1>
        <p className="text-lg text-gray-600 mt-2">Fasal ko store karein aur better price ka wait karein.</p>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-3xl p-8 mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-purple-900 mb-2">Sell Now vs Store?</h2>
          <p className="text-purple-800">Compare current market prices against storage costs and expected future trends.</p>
        </div>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 whitespace-nowrap">
          Compare Options
        </button>
      </div>

      <div className="grid gap-6">
        {storages.map((storage) => (
          <div 
            key={storage.id} 
            onClick={() => setSelected(storage.id)}
            className={`bg-white rounded-3xl p-6 md:p-8 border-2 cursor-pointer transition ${
              selected === storage.id ? 'border-brand-green ring-4 ring-green-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Warehouse className="h-10 w-10 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                    {storage.name}
                    {storage.verified && <ShieldCheck className="h-5 w-5 text-blue-500" />}
                  </h3>
                  <p className="text-gray-500 font-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {storage.distance} • {storage.type}
                  </p>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-500 mb-1">Est. Cost</p>
                <p className="text-2xl font-bold text-gray-900">{storage.cost}</p>
              </div>

              {selected === storage.id && (
                <div className="hidden md:block">
                  <CheckCircle2 className="h-8 w-8 text-brand-green" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg sticky bottom-6 flex justify-between items-center mt-8">
          <div>
            <p className="text-gray-500 font-bold">Selected Storage</p>
            <p className="text-xl font-bold text-gray-900">{storages.find(o => o.id === selected).name}</p>
          </div>
          <button className="bg-brand-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-sm">
            Request Storage
          </button>
        </div>
      )}
    </div>
  );
}
