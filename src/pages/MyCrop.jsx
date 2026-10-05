import { useState } from 'react';
import { Sprout, Bug, CloudRain, IndianRupee, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function MyCrop() {
  const { user, todaySummary } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Meri Fasal</h1>
        <p className="text-lg text-gray-600 mt-2">Current crop status and information.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="bg-brand-light-green p-6 rounded-full">
            <Sprout className="h-12 w-12 text-brand-green" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">Current Crop</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{user.farm.currentCrop}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {user.farm.size} • {user.farm.soilType}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center w-full md:w-auto">
          <p className="text-sm text-gray-500 font-bold mb-1">Crop Stage</p>
          <p className="text-2xl font-bold text-brand-green">Monitoring</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Crop Health</h3>
            <Bug className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-gray-600 mb-6">Last checked: 3 days ago. Possible issue detected.</p>
          <button onClick={() => navigate('/crop-health')} className="w-full text-brand-green font-bold border border-brand-green py-3 rounded-xl hover:bg-brand-light-green">
            Check Crop Health
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Weather Impact</h3>
            <CloudRain className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-gray-600 mb-6">{todaySummary.alert.message}. Adjust irrigation.</p>
          <button onClick={() => navigate('/weather')} className="w-full text-brand-green font-bold border border-brand-green py-3 rounded-xl hover:bg-brand-light-green">
            Check Weather
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Market Trend</h3>
            <IndianRupee className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-gray-600 mb-6">Prices stable around ₹2,450/q in nearby mandis.</p>
          <button onClick={() => navigate('/market')} className="w-full text-brand-green font-bold border border-brand-green py-3 rounded-xl hover:bg-brand-light-green">
            Check Market
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Ready to Harvest?</h2>
        <p className="text-blue-800 mb-6 max-w-xl mx-auto">If your crop is ready, create a digital crop lot to start receiving offers from buyers before you even harvest.</p>
        <button onClick={() => navigate('/sell-crop')} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700">
          Create Crop Lot
        </button>
      </div>
    </div>
  );
}
