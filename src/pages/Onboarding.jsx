import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: user?.state || '',
    district: user?.district || '',
    village: user?.village || '',
    farmSize: '',
    crops: [],
    needs: [],
    language: user?.language || 'English'
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleArrayToggle = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };

  const finishOnboarding = () => {
    // In a real app we'd save this to backend/context
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sprout className="h-6 w-6 text-brand-green" /> Welcome, {user?.name || 'Farmer'}!
          </h2>
          <span className="text-sm font-bold text-gray-400">Step {step} of 4</span>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-brand-green border-b pb-2">Step 1 — Your Farm</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                <input name="state" value={formData.state} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
                <input name="district" value={formData.district} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Village</label>
                <input name="village" value={formData.village} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Farm Size (Acres)</label>
                <input name="farmSize" value={formData.farmSize} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-brand-green border-b pb-2">Step 2 — Your Crops</h3>
            <p className="text-gray-600">Select the crops you usually grow (select multiple):</p>
            <div className="flex flex-wrap gap-3">
              {['Wheat', 'Paddy', 'Mustard', 'Cotton', 'Sugarcane', 'Maize', 'Millets', 'Pulses'].map(crop => (
                <button 
                  key={crop}
                  onClick={() => handleArrayToggle('crops', crop)}
                  className={`px-4 py-2 rounded-full font-bold border transition ${formData.crops.includes(crop) ? 'bg-brand-green text-white border-brand-green' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'}`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-brand-green border-b pb-2">Step 3 — What do you need help with?</h3>
            <div className="grid grid-cols-2 gap-3">
              {['What to Grow', 'Crop Health', 'Weather', 'Mandi Prices', 'Find Buyers', 'Sell Crop', 'Transport', 'Storage'].map(need => (
                <label key={need} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${formData.needs.includes(need) ? 'border-brand-green bg-brand-light-green' : 'border-gray-200 bg-gray-50'}`}>
                  <input type="checkbox" checked={formData.needs.includes(need)} onChange={() => handleArrayToggle('needs', need)} className="w-5 h-5 text-brand-green rounded" />
                  <span className="font-bold text-gray-700">{need}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-brand-green border-b pb-2">Step 4 — Language</h3>
            <p className="text-gray-600">Select your preferred app language:</p>
            <div className="flex gap-4">
              {['English', 'हिंदी', 'ਪੰਜਾਬੀ'].map(lang => (
                <label key={lang} className={`flex-1 flex justify-center items-center gap-2 p-4 rounded-xl border cursor-pointer transition ${formData.language === lang ? 'border-brand-green bg-brand-light-green' : 'border-gray-200 bg-gray-50'}`}>
                  <input type="radio" name="language" value={lang} checked={formData.language === lang} onChange={handleChange} className="w-5 h-5 text-brand-green" />
                  <span className="font-bold text-gray-700 text-lg">{lang}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <button onClick={handlePrev} className="px-6 py-3 rounded-xl font-bold text-gray-600 border border-gray-300 hover:bg-gray-50">Back</button>
          ) : <div></div>}
          
          {step < 4 ? (
            <button onClick={handleNext} className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700">Next</button>
          ) : (
            <button onClick={finishOnboarding} className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700">Start with Smart Bharat</button>
          )}
        </div>

      </div>
    </div>
  );
}
