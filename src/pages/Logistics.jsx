import { useState } from 'react';
import { Truck, MapPin, IndianRupee, CheckCircle2 } from 'lucide-react';

export default function Logistics() {
  const [selected, setSelected] = useState(null);

  const options = [
    { id: 1, type: "Tractor Trolley", capacity: "3-5 Tonnes", cost: "₹40/q", time: "Available in 2 hrs" },
    { id: 2, type: "Mini Truck", capacity: "1.5-2 Tonnes", cost: "₹60/q", time: "Available Now" },
    { id: 3, type: "Heavy Truck", capacity: "9-12 Tonnes", cost: "₹30/q", time: "Available tomorrow" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Fasal Kaise Pahunchayein?</h1>
        <p className="text-lg text-gray-600 mt-2">Apni fasal mandi ya buyer tak pahunchane ke liye transport book karein.</p>
      </div>

      <div className="grid gap-6">
        {options.map((opt) => (
          <div 
            key={opt.id} 
            onClick={() => setSelected(opt.id)}
            className={`bg-white rounded-3xl p-6 md:p-8 border-2 cursor-pointer transition ${
              selected === opt.id ? 'border-brand-green ring-4 ring-green-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-blue-50 p-4 rounded-full">
                  <Truck className="h-10 w-10 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{opt.type}</h3>
                  <p className="text-gray-500 font-medium">Capacity: {opt.capacity}</p>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-3xl font-bold text-gray-900 mb-1">{opt.cost}</p>
                <p className="text-sm text-green-600 font-bold">{opt.time}</p>
              </div>

              {selected === opt.id && (
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
            <p className="text-gray-500 font-bold">Selected Transport</p>
            <p className="text-xl font-bold text-gray-900">{options.find(o => o.id === selected).type}</p>
          </div>
          <button className="bg-brand-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-sm">
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}
