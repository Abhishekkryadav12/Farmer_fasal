import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLand } from '../../context/LandContext';
import { Image as ImageIcon } from 'lucide-react';

export default function ListLand() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addLand, updateLand } = useLand();
  
  const editLand = location.state?.editLand;
  
  const [formData, setFormData] = useState({
    area: '', state: '', district: '', village: '', soilType: '', irrigation: '', electricity: '',
    roadAccess: '', crops: '', duration: '', model: 'Harvest Share', fixedPayment: '', ownerShare: '', cultivatorShare: '', description: ''
  });
  
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    if (editLand) {
      setFormData({
        area: editLand.area || '', state: editLand.state || '', district: editLand.district || '',
        village: editLand.village || '', soilType: editLand.soilType || '', irrigation: editLand.irrigation || '',
        electricity: editLand.electricity || '', roadAccess: editLand.roadAccess || '', crops: editLand.crops || '',
        duration: editLand.duration || '', model: editLand.model || 'Harvest Share',
        fixedPayment: editLand.terms?.fixedPayment || '', ownerShare: editLand.terms?.ownerShare || '',
        cultivatorShare: editLand.terms?.cultivatorShare || '', description: editLand.description || ''
      });
      if (editLand.photos) {
        setPhotos(editLand.photos);
      }
    }
  }, [editLand]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const terms = {};
    if (formData.model === 'Fixed Payment' || formData.model === 'Hybrid') {
      terms.fixedPayment = Number(formData.fixedPayment);
    }
    if (formData.model === 'Harvest Share' || formData.model === 'Hybrid') {
      terms.ownerShare = Number(formData.ownerShare);
      terms.cultivatorShare = Number(formData.cultivatorShare) || (100 - Number(formData.ownerShare));
    }
    
    if (editLand) {
      updateLand(editLand.id, { ...formData, terms, photos, title: `${formData.area} Acres Agricultural Land` });
    } else {
      addLand({ ...formData, terms, photos, title: `${formData.area} Acres Agricultural Land` });
    }
    navigate('/land-connect/my-land');
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">{editLand ? 'Edit Land Listing' : 'List Your Land'}</h1>
        <p className="text-lg text-gray-600 mt-2">{editLand ? 'Update your agricultural land details.' : 'Apni unused land ko farming partnership ke liye list karein.'}</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-brand-green border-b pb-2 mb-4">Land Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Land Area (Acres)</label>
                <input required name="area" value={formData.area} onChange={handleChange} type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                <input required name="state" value={formData.state} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
                <input required name="district" value={formData.district} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Village</label>
                <input required name="village" value={formData.village} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Soil Type</label>
                <input required name="soilType" value={formData.soilType} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Suitable Crops (Comma separated)</label>
                <input required name="crops" value={formData.crops} onChange={handleChange} type="text" placeholder="e.g. Wheat, Maize" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green border-b pb-2 mb-4">Facilities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Irrigation</label>
                <select required name="irrigation" value={formData.irrigation} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none">
                  <option value="">Select</option>
                  <option>Tube Well</option>
                  <option>Canal</option>
                  <option>Borewell</option>
                  <option>Rainfed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Electricity</label>
                <select required name="electricity" value={formData.electricity} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none">
                  <option value="">Select</option>
                  <option>Available</option>
                  <option>Not Available</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Road Access</label>
                <select required name="roadAccess" value={formData.roadAccess} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none">
                  <option value="">Select</option>
                  <option>Available</option>
                  <option>Partial</option>
                  <option>None</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green border-b pb-2 mb-4">Partnership Model</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Available Duration</label>
                <input required name="duration" value={formData.duration} onChange={handleChange} type="text" placeholder="e.g. 1 Year, 2 Seasons" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Model</label>
                <select name="model" onChange={handleChange} value={formData.model} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none">
                  <option>Harvest Share</option>
                  <option>Fixed Payment</option>
                  <option>Hybrid</option>
                </select>
              </div>

              {(formData.model === 'Harvest Share' || formData.model === 'Hybrid') && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Expected Share (%)</label>
                    <input required type="number" name="ownerShare" value={formData.ownerShare} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
                  </div>
                </>
              )}
              {(formData.model === 'Fixed Payment' || formData.model === 'Hybrid') && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expected Fixed Payment (₹)</label>
                  <input required type="number" name="fixedPayment" value={formData.fixedPayment} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green border-b pb-2 mb-4">Additional Details</h2>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Land Photos</label>
              
              {photos.length > 0 && (
                <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                  {photos.map((photo, idx) => (
                    <div key={idx} className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <img src={photo} alt="Land" className="h-full w-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setPhotos(photos.filter((_, i) => i !== idx))} 
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 relative">
                <ImageIcon className="h-8 w-8 mb-2" />
                <span>Click to upload land photos</span>
                <input type="file" accept="image/*" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handlePhotoUpload} />
              </label>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 h-32 resize-none outline-none focus:border-brand-green"></textarea>
            </div>
          </section>

          <button type="submit" className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-sm">
            Publish Land Listing
          </button>
        </form>
      </div>
    </div>
  );
}
