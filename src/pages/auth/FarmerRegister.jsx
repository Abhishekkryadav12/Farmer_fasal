import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { indianStates, stateLanguages, languageMap } from '../../data/stateLanguages';

export default function FarmerRegister() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { setLanguage, t } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', password: '', confirmPassword: '',
    state: '', district: '', village: '', language: '', role: 'FARMER'
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
      if (formData.language) {
        setLanguage(formData.language);
      }
      navigate('/onboarding');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Farmer Registration</h1>
        <p className="text-lg text-gray-600 mt-2">Create your account to start managing your farm smarter.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">{error}</div>}
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input name="name" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
              <input name="phone" required onChange={handleChange} type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email (Optional)</label>
              <input name="email" onChange={handleChange} type="email" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
              <select name="state" required onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none">
                <option value="">Select State</option>
                {indianStates.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Language</label>
              <select name="language" required onChange={handleChange} disabled={!formData.state} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none disabled:opacity-50">
                <option value="">Select Language</option>
                {formData.state && stateLanguages[formData.state]?.map(lang => (
                  <option key={lang} value={lang}>{languageMap[lang]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
              <input name="district" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Village</label>
              <input name="village" required onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input name="password" required onChange={handleChange} type="password" minLength="6" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
              <input name="confirmPassword" required onChange={handleChange} type="password" minLength="6" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-sm mt-4">
            {formData.language ? t('auth.continueIn', { lang: languageMap[formData.language].split(' ')[0] }) : 'Create Farmer Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
