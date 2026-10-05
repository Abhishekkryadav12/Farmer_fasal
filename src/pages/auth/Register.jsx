import { useNavigate } from 'react-router-dom';
import { Sprout, ShoppingCart, Building2 } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Join Smart Bharat</h1>
        <p className="text-lg text-gray-600 mt-2">Choose how you want to use the platform.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div 
          onClick={() => navigate('/register/farmer')}
          className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm cursor-pointer hover:border-brand-green transition group text-center"
        >
          <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-light-green transition">
            <Sprout className="h-10 w-10 text-brand-green" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🌾 Farmer</h2>
          <p className="text-gray-600">Plan crops, understand markets and sell to suitable buyers.</p>
        </div>

        <div 
          onClick={() => navigate('/register/buyer')}
          className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm cursor-pointer hover:border-blue-400 transition group text-center"
        >
          <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition">
            <ShoppingCart className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🛒 Buyer</h2>
          <p className="text-gray-600">Discover agricultural produce and connect with farmers and FPOs.</p>
        </div>

        <div 
          onClick={() => navigate('/fpo/register')}
          className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm cursor-pointer hover:border-purple-400 transition group text-center"
        >
          <div className="h-20 w-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 transition">
            <Building2 className="h-10 w-10 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🏢 FPO</h2>
          <p className="text-gray-600">Manage farmer members, aggregate produce and connect with buyers.</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">Already have an account? <button onClick={() => navigate('/login')} className="text-brand-green font-bold hover:underline">Login here</button></p>
      </div>
    </div>
  );
}
