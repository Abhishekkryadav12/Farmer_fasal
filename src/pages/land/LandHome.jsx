import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

export default function LandHome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🌾 Kheti Partnership</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Zameen jiske paas hai, aur kheti karne ki capability jiske paas hai — Smart Bharat unhe connect karta hai.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center flex flex-col items-center">
          <div className="bg-green-50 p-6 rounded-full mb-6">
            <MapPin className="h-12 w-12 text-brand-green" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">I Have Land</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Apni unused agricultural land ko farming ke liye available karein.
          </p>
          <button 
            onClick={() => navigate('/land-connect/list-land')}
            className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition"
          >
            List My Land
          </button>
          <button 
            onClick={() => navigate('/land-connect/my-land')}
            className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Manage My Listings
          </button>
        </div>

        <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center flex flex-col items-center">
          <div className="bg-blue-50 p-6 rounded-full mb-6">
            <Search className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">I Need Land</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Kheti karne ke liye suitable agricultural land find karein.
          </p>
          <button 
            onClick={() => navigate('/land-connect/find')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
          >
            Find Land
          </button>
          <button 
            onClick={() => navigate('/land-connect/my-requests')}
            className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            View My Requests
          </button>
        </div>
      </div>
    </div>
  );
}
