import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function FPORegister() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '', regId: '', contactPerson: '', phone: '', email: '', password: '', confirmPassword: '',
    state: '', district: '', location: '', farmerCount: '', crops: '', role: 'FPO'
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = register(formData);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">FPO Registration</h1>
        <p className="text-lg text-gray-600 mt-2">Manage farmer members and aggregate produce.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">{error}</div>}
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">FPO Name</label>
              <input name="name" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Registration ID</label>
              <input name="regId" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contact Person</label>
              <input name="contactPerson" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
              <input name="phone" required onChange={handleChange} type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input name="email" required onChange={handleChange} type="email" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input name="password" required onChange={handleChange} type="password" minLength="6" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
              <input name="confirmPassword" required onChange={handleChange} type="password" minLength="6" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
              <input name="state" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
              <input name="district" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Village / Location</label>
              <input name="location" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Number of Farmers</label>
              <input name="farmerCount" required onChange={handleChange} type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Main Crops</label>
              <input name="crops" required onChange={handleChange} type="text" placeholder="e.g. Wheat, Paddy" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-sm mt-4">
            Create FPO Account
          </button>
        </form>
      </div>
    </div>
  );
}
