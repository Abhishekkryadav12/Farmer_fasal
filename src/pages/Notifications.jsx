import { CloudRain, Bug, IndianRupee, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
      </div>

      <div className="space-y-4">
        <div onClick={() => navigate('/weather')} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 cursor-pointer hover:border-blue-300 transition">
          <div className="bg-blue-50 p-3 rounded-full">
            <CloudRain className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Weather Alert</h3>
            <p className="text-gray-600">Rain expected tomorrow. Check your irrigation schedule.</p>
            <p className="text-sm text-gray-400 mt-2">2 hours ago</p>
          </div>
        </div>

        <div onClick={() => navigate('/crop-health')} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 cursor-pointer hover:border-orange-300 transition">
          <div className="bg-orange-50 p-3 rounded-full">
            <Bug className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Crop Health Alert</h3>
            <p className="text-gray-600">Possible leaf disease detected in your recent photo upload.</p>
            <p className="text-sm text-gray-400 mt-2">1 day ago</p>
          </div>
        </div>

        <div onClick={() => navigate('/market')} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 cursor-pointer hover:border-yellow-300 transition">
          <div className="bg-yellow-50 p-3 rounded-full">
            <IndianRupee className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Mandi Price Update</h3>
            <p className="text-gray-600">Wheat prices in Karnal Mandi increased by ₹20/q.</p>
            <p className="text-sm text-gray-400 mt-2">2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
