import { useState } from 'react';
import { MapPin, Droplets, Calendar, Maximize, Sprout, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function WhatToGrow() {
  const { cropRecommendations } = useAppContext();
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Kya Ugayein?</h1>
        <p className="text-lg text-gray-600 mt-2">Apne farm ki condition aur market opportunity ko dekhkar crop options samjhein.</p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-green border-b pb-2">Step 1 — Farm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                <input type="text" defaultValue="Karnal, Haryana" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Land size</label>
                <input type="text" defaultValue="5 Acres" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Soil type</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green">
                  <option>Loamy</option>
                  <option>Clay</option>
                  <option>Sandy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Water availability</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green">
                  <option>Medium (Canal/Tube well)</option>
                  <option>High (Abundant)</option>
                  <option>Low (Rainfed)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-green border-b pb-2">Step 2 — Season</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="season" className="w-5 h-5 text-brand-green" defaultChecked /> Kharif
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="season" className="w-5 h-5 text-brand-green" /> Rabi
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="season" className="w-5 h-5 text-brand-green" /> Zaid
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-brand-green border-b pb-2">Step 3 — Current information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Previous crop</label>
                <input type="text" defaultValue="Paddy" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Farming preference</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green">
                  <option>Conventional</option>
                  <option>Organic</option>
                </select>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowResults(true)}
            className="w-full mt-8 bg-brand-green text-white py-4 rounded-xl text-xl font-bold hover:bg-green-700 transition-colors shadow-sm"
          >
            Find Suitable Crops
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <button onClick={() => setShowResults(false)} className="text-brand-green font-bold hover:underline mb-4 inline-block">
            &larr; Back to form
          </button>
          
          <div className="space-y-6">
            {cropRecommendations.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Compare Options</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                    <th className="p-4 font-bold">Crop</th>
                    <th className="p-4 font-bold">Suitability</th>
                    <th className="p-4 font-bold">Water</th>
                    <th className="p-4 font-bold">Duration</th>
                    <th className="p-4 font-bold">Demand</th>
                    <th className="p-4 font-bold">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {cropRecommendations.map(crop => (
                    <tr key={crop.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-900">{crop.name}</td>
                      <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${crop.suitability === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{crop.suitability}</span></td>
                      <td className="p-4">{crop.water}</td>
                      <td className="p-4">{crop.duration}</td>
                      <td className="p-4">{crop.demand}</td>
                      <td className="p-4">{crop.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Cards for Comparison */}
            <div className="md:hidden mt-4 space-y-4">
               {cropRecommendations.map(crop => (
                 <div key={crop.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-lg mb-2">{crop.name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-500">Suitability:</span> <span className="font-bold">{crop.suitability}</span></div>
                      <div><span className="text-gray-500">Water:</span> {crop.water}</div>
                      <div><span className="text-gray-500">Duration:</span> {crop.duration}</div>
                      <div><span className="text-gray-500">Demand:</span> {crop.demand}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CropCard({ crop }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            🌾 {crop.name}
          </h3>
          <span className={`inline-block px-3 py-1 rounded text-sm font-bold ${
            crop.suitability === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {crop.suitability} Suitability
          </span>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-brand-green font-bold hover:bg-brand-light-green border border-brand-green px-6 py-2 rounded-xl transition"
        >
          {expanded ? 'Hide Details' : 'Why this crop?'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Droplets className="h-4 w-4"/> Water</p>
          <p className="font-bold text-gray-900">{crop.water}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Calendar className="h-4 w-4"/> Duration</p>
          <p className="font-bold text-gray-900">{crop.duration}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500 mb-1">Market Demand</p>
          <p className="font-bold text-gray-900">{crop.demand}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500 mb-1">Risk</p>
          <p className="font-bold text-gray-900">{crop.risk}</p>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Why this crop?</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-brand-green" /> Season suitable</li>
            <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-brand-green" /> Water availability suitable</li>
            <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-brand-green" /> Farm condition suitable</li>
            <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-brand-green" /> Market opportunity available</li>
            <li className="flex items-center gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-brand-green" /> Duration suitable</li>
          </ul>
          <p className="text-sm text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg inline-block">
            Note: This is an estimated market opportunity, not a guaranteed profit.
          </p>
        </div>
      )}
    </div>
  );
}
