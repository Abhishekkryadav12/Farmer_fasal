import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2 } from 'lucide-react';

export default function FPOLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, demoAccounts } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!identifier || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(identifier, password, 'FPO');
    if (result.success) {
      navigate('/fpo/dashboard');
    } else {
      setError(result.message);
    }
  };

  const autofillDemo = () => {
    const account = Object.values(demoAccounts).find(a => a.role === 'FPO');
    if (account) {
      setIdentifier(account.email);
      setPassword(account.password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <Building2 className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-black text-gray-900 mb-2">Smart Bharat</h1>
          <p className="text-xl font-bold text-purple-700 tracking-wider uppercase">FPO Portal</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">{error}</div>}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Organization Email / Phone</label>
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200" 
                placeholder="Enter email or mobile"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200" 
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition shadow-md">
              Login to FPO Portal
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 mb-2">Don't have an FPO account?</p>
            <button onClick={() => navigate('/fpo/register')} className="text-purple-600 font-bold hover:underline">
              Register as FPO
            </button>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
          <p className="text-sm font-bold text-purple-900 mb-2">Demo FPO Account Available</p>
          <button onClick={autofillDemo} className="text-sm text-purple-700 underline hover:text-purple-900">
            Autofill FPO Credentials
          </button>
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-900 text-sm font-medium flex items-center justify-center gap-2 mx-auto">
            &larr; Back to Main Website
          </button>
        </div>
      </div>
    </div>
  );
}
