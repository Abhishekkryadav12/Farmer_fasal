import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
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

    const result = login(identifier, password, 'ADMIN');
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const autofillDemo = () => {
    const account = demoAccounts['admin@smartbharat.demo'];
    if (account) {
      setIdentifier(account.email);
      setPassword(account.password);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="text-center mb-8">
        <ShieldAlert className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
        <p className="text-gray-600">Restricted Access</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">{error}</div>}
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Admin ID / Email</label>
            <input 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-red-600" 
              placeholder="Enter admin ID or email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-red-600" 
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-sm">
            Admin Login
          </button>
        </form>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
        <p className="text-sm font-bold text-blue-900 mb-2">Demo Account Available</p>
        <button onClick={autofillDemo} className="text-sm text-blue-700 underline hover:text-blue-900">
          Autofill Demo Admin Credentials
        </button>
      </div>
    </div>
  );
}
