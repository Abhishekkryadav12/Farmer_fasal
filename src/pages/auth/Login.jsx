import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('FARMER');
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

    const result = login(identifier, password, role);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const autofillDemo = () => {
    const account = Object.values(demoAccounts).find(a => a.role === role);
    if (account) {
      setIdentifier(account.email);
      setPassword(account.password);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="text-center mb-8">
        <Sprout className="h-12 w-12 text-brand-green mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back to Smart Bharat 🌾</h1>
        <p className="text-gray-600">Your crop. Your market. Your decision.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex gap-2 mb-8 bg-gray-50 p-1 rounded-xl">
          {['FARMER', 'BUYER', 'FPO'].map((r) => (
            <button
              key={r}
              onClick={() => { 
                if (r === 'FPO') {
                  navigate('/fpo/login');
                } else {
                  setRole(r); setError(''); setIdentifier(''); setPassword(''); 
                }
              }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                role === r ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {r === 'FARMER' ? 'Farmer' : r === 'BUYER' ? 'Buyer' : 'FPO'}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">{error}</div>}
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email or Mobile Number</label>
            <input 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" 
              placeholder="Enter email or mobile"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" 
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-sm">
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button className="text-brand-green font-bold text-sm hover:underline">Forgot Password?</button>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
        <p className="text-sm font-bold text-blue-900 mb-2">Demo Account Available</p>
        <button onClick={autofillDemo} className="text-sm text-blue-700 underline hover:text-blue-900">
          Autofill Demo {role} Credentials
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">Don't have an account? <button onClick={() => navigate('/register')} className="text-brand-green font-bold hover:underline">Register here</button></p>
      </div>
    </div>
  );
}
