import { User, MapPin, Sprout, Edit } from 'lucide-react';
import { mockUser } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { language, setLanguage, t, purchaseRequests } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Farm & Profile</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-brand-light-green text-brand-green rounded-full flex items-center justify-center text-2xl font-bold">
            {mockUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{mockUser.name}</h2>
            <p className="text-gray-500 flex items-center gap-1"><MapPin className="h-4 w-4"/> {mockUser.village}, {mockUser.state}</p>
          </div>
        </div>
        <button className="text-brand-green bg-brand-light-green p-2 rounded-lg hover:bg-green-200">
          <Edit className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Sprout className="h-5 w-5 text-brand-green"/> Farm Details</h3>
          <button className="text-brand-green text-sm font-medium hover:underline">Edit Farm</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Land Size</p>
            <p className="font-bold text-gray-900">{mockUser.farm.size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Soil Type</p>
            <p className="font-bold text-gray-900">{mockUser.farm.soilType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Crop</p>
            <p className="font-bold text-gray-900">{mockUser.farm.currentCrop}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Language Preference</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Language</p>
            <p className="font-bold text-gray-900 text-lg">
               {language === 'en' ? 'English' : language === 'hi' ? 'हिंदी (Hindi)' : language === 'pa' ? 'ਪੰਜਾਬੀ (Punjabi)' : language === 'or' ? 'ଓଡ଼ିଆ (Odia)' : language.toUpperCase()}
            </p>
          </div>
          <div className="flex gap-2">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              className="border border-gray-300 rounded-xl px-4 py-2 font-bold outline-none focus:border-brand-green bg-white"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>
        </div>
      </div>
      
      {user?.role === 'BUYER' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">My Purchases</h2>
          <div className="space-y-4">
            {purchaseRequests && purchaseRequests.length > 0 ? (
              purchaseRequests.map(pr => (
                <div key={pr.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">Purchase Request - {pr.cropName}</h3>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold uppercase">{pr.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">Farmer: {pr.farmerName}</p>
                  <p className="text-sm text-gray-600">Quantity: {pr.quantity} Qtl</p>
                  <p className="text-sm font-bold text-gray-900 mt-2">Offer: ₹{pr.offerPrice}/Qtl</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No purchase requests yet.</p>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        <button className="w-full text-left p-4 font-bold text-gray-900 border-b border-gray-100 hover:bg-gray-50">Notifications</button>
        <button onClick={() => navigate('/')} className="w-full text-left p-4 font-bold text-red-600 hover:bg-red-50">Logout</button>
      </div>
    </div>
  );
}
