import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLand } from '../../context/LandContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Droplets, Leaf, Handshake, Info, ArrowLeft } from 'lucide-react';

export default function LandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lands, sendRequest } = useLand();
  const { user } = useAuth();
  
  const land = lands.find(l => l.id === id);
  const [showProposal, setShowProposal] = useState(false);
  const [proposalData, setProposalData] = useState({
    crop: '', duration: '', model: land?.model || 'Harvest Share', 
    fixedPayment: land?.terms?.fixedPayment || '', ownerShare: land?.terms?.ownerShare || '', cultivatorShare: land?.terms?.cultivatorShare || '',
    message: ''
  });
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMode, setContactMode] = useState('message');
  
  const landPhotos = land.photos?.length > 0 ? land.photos : [];
  const activePhoto = landPhotos[activePhotoIdx] || `https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80`;

  if (!land) return <div>Land not found</div>;

  const handleSendRequest = (e) => {
    e.preventDefault();
    const terms = {};
    if (proposalData.model === 'Fixed Payment' || proposalData.model === 'Hybrid') {
      terms.fixedPayment = Number(proposalData.fixedPayment);
    }
    if (proposalData.model === 'Harvest Share' || proposalData.model === 'Hybrid') {
      terms.ownerShare = Number(proposalData.ownerShare);
      terms.cultivatorShare = Number(proposalData.cultivatorShare);
    }
    
    const reqId = sendRequest(land.id, {
      crop: proposalData.crop,
      duration: proposalData.duration,
      model: proposalData.model,
      terms
    }, proposalData.message);
    
    navigate(`/land-connect/partnership/${reqId}`);
  };
  
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(contactMode === 'message' ? "Message sent successfully." : contactMode === 'call' ? "Call request sent successfully." : "Your interest has been sent to the landowner.");
    setShowContactModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-brand-green font-bold">
        <ArrowLeft className="h-5 w-5" /> Back to Listings
      </button>

      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
        
        {/* PHOTO GALLERY */}
        <div className="relative">
          <div className="h-80 md:h-[500px] bg-gray-900 flex items-center justify-center relative cursor-pointer group" onClick={() => setShowLightbox(true)}>
             <img src={activePhoto} alt="Land Main" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
             <div className="absolute bottom-6 left-6 text-white pointer-events-none">
               <h1 className="text-3xl md:text-4xl font-black mb-2">{land.title || `${land.area} Acres Agricultural Land`}</h1>
               <p className="flex items-center gap-2 font-bold text-lg"><MapPin className="h-5 w-5"/> {land.village}, {land.district}, {land.state}</p>
             </div>
             {landPhotos.length === 0 && (
               <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md">
                 Placeholder Image
               </div>
             )}
          </div>
          
          {landPhotos.length > 0 && (
            <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto border-b border-gray-100">
              {landPhotos.map((photo, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative h-20 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition ${activePhotoIdx === idx ? 'border-brand-green ring-2 ring-brand-green ring-offset-1' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={photo} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 rounded font-bold">{idx + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{land.description || 'No description provided.'}</p>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1 font-bold">Soil Type</p>
                <p className="font-bold text-gray-900">{land.soilType}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1 font-bold flex items-center gap-1"><Droplets className="h-4 w-4 text-blue-500"/> Irrigation</p>
                <p className="font-bold text-gray-900">{land.irrigation}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1 font-bold">Electricity</p>
                <p className="font-bold text-gray-900">{land.electricity}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1 font-bold">Road Access</p>
                <p className="font-bold text-gray-900">{land.roadAccess}</p>
              </div>
            </section>

            <section>
               <h2 className="text-xl font-bold text-gray-900 mb-4">Suitable Crops</h2>
               <div className="flex flex-wrap gap-2">
                 {land.crops ? land.crops.split(',').map(c => (
                   <span key={c} className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm">
                     <Leaf className="h-4 w-4" /> {c.trim()}
                   </span>
                 )) : <span className="text-gray-500">Not specified</span>}
               </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Handshake className="h-5 w-5 text-brand-green" /> Agreement Details
              </h3>
              <p className="text-sm text-gray-500 mb-1 font-bold uppercase">Model Type</p>
              <p className="font-bold text-xl text-gray-900 mb-4">{land.model}</p>
              
              {land.model === 'Fixed Payment' && (
                <>
                  <p className="text-sm text-gray-500 mb-1 font-bold uppercase">Expected Payment</p>
                  <p className="font-black text-3xl text-brand-green">₹{land.terms?.fixedPayment}</p>
                </>
              )}
              {land.model === 'Harvest Share' && (
                <div className="flex justify-between border-t border-gray-200 pt-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500 font-bold">Owner Share</p>
                    <p className="font-black text-2xl text-gray-900">{land.terms?.ownerShare}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-bold">Your Share</p>
                    <p className="font-black text-2xl text-brand-green">{land.terms?.cultivatorShare}%</p>
                  </div>
                </div>
              )}
              {land.model === 'Hybrid' && (
                <div className="space-y-2 border-t border-gray-200 pt-4 mt-2">
                  <p className="text-sm text-gray-500 font-bold uppercase">Expected Payment</p>
                  <p className="font-black text-2xl text-gray-900">₹{land.terms?.fixedPayment}</p>
                  <div className="flex justify-between mt-2 bg-white p-3 rounded-xl border border-gray-100">
                    <span className="text-sm font-bold">Owner: <span className="text-lg">{land.terms?.ownerShare}%</span></span>
                    <span className="text-sm font-bold text-brand-green">You: <span className="text-lg">{land.terms?.cultivatorShare}%</span></span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 bg-brand-light-green rounded-full flex items-center justify-center font-black text-2xl text-brand-green shadow-sm">
                  {land.ownerName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Land Owner</p>
                  <h4 className="font-black text-xl text-gray-900">{land.ownerName}</h4>
                </div>
              </div>
              
              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <p className="text-sm font-bold text-gray-700 flex justify-between"><span>Phone:</span> <span>{land.phone || '+91 XXXXX XXXXX'}</span></p>
                 <p className="text-sm font-bold text-gray-700 flex justify-between"><span>Email:</span> <span>{land.email || 'Contact via platform'}</span></p>
                 <p className="text-sm font-bold text-gray-700 flex justify-between"><span>Prefers:</span> <span className="text-brand-green">Platform Message</span></p>
              </div>
              
              <button onClick={() => setShowContactModal(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm mb-3">
                Contact Landowner
              </button>
            </div>

            {user.id !== land.ownerId && !showProposal && (
              <button 
                onClick={() => {
                  document.getElementById('proposal-form')?.scrollIntoView({ behavior: 'smooth' });
                  setShowProposal(true);
                }}
                className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-sm"
              >
                Send Formal Proposal
              </button>
            )}
          </div>
        </div>
      </div>

      {showProposal && (
        <div className="bg-white rounded-3xl p-8 border border-brand-green shadow-lg animate-fade-in scroll-mt-24" id="proposal-form">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Proposal</h2>
          <form onSubmit={handleSendRequest} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Crop you intend to grow</label>
                <input required value={proposalData.crop} onChange={e=>setProposalData({...proposalData, crop: e.target.value})} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
                <select required value={proposalData.duration} onChange={e=>setProposalData({...proposalData, duration: e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green">
                  <option value="">Select duration</option>
                  <option>1 Season</option>
                  <option>2 Seasons</option>
                  <option>1 Year</option>
                  <option>2 Years</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Partnership Model</label>
                <select value={proposalData.model} onChange={e=>setProposalData({...proposalData, model: e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green">
                  <option>Harvest Share</option>
                  <option>Fixed Payment</option>
                  <option>Hybrid</option>
                </select>
              </div>

              {(proposalData.model === 'Harvest Share' || proposalData.model === 'Hybrid') && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Proposed Owner Share (%)</label>
                    <input required type="number" value={proposalData.ownerShare} onChange={e=>setProposalData({...proposalData, ownerShare: e.target.value, cultivatorShare: 100 - Number(e.target.value)})} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Proposed Share (%)</label>
                    <input readOnly value={proposalData.cultivatorShare} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 font-bold outline-none" />
                  </div>
                </>
              )}

              {(proposalData.model === 'Fixed Payment' || proposalData.model === 'Hybrid') && (
                <div className={proposalData.model === 'Fixed Payment' ? 'md:col-span-2' : 'md:col-span-2'}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Proposed Fixed Payment (₹)</label>
                  <input required type="number" value={proposalData.fixedPayment} onChange={e=>setProposalData({...proposalData, fixedPayment: e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Message to Owner</label>
                <textarea required value={proposalData.message} onChange={e=>setProposalData({...proposalData, message: e.target.value})} placeholder="Tell the land owner why you are interested..." className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 h-32 resize-none outline-none focus:border-brand-green"></textarea>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button type="button" onClick={() => setShowProposal(false)} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-50 rounded-xl">Cancel</button>
              <button type="submit" className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700">Send Request</button>
            </div>
          </form>
        </div>
      )}
      {/* LIGHTBOX */}
      {showLightbox && landPhotos.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <div className="absolute top-4 right-4 flex gap-4 text-white">
            <span className="font-bold">{activePhotoIdx + 1} / {landPhotos.length}</span>
            <button onClick={() => setShowLightbox(false)} className="hover:text-gray-300 font-bold">Close ✕</button>
          </div>
          
          <button 
            onClick={() => setActivePhotoIdx(p => p === 0 ? landPhotos.length - 1 : p - 1)}
            className="absolute left-4 md:left-10 text-white hover:text-gray-300 text-6xl p-4 select-none"
          >
            ‹
          </button>
          
          <img src={landPhotos[activePhotoIdx]} alt="Fullscreen" className="max-w-full max-h-[85vh] object-contain" />
          
          <button 
            onClick={() => setActivePhotoIdx(p => p === landPhotos.length - 1 ? 0 : p + 1)}
            className="absolute right-4 md:right-10 text-white hover:text-gray-300 text-6xl p-4 select-none"
          >
            ›
          </button>
        </div>
      )}

      {/* CONTACT MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Contact {land.ownerName}</h2>
              <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full font-bold">✕</button>
            </div>
            
            <div className="flex border-b border-gray-100">
              <button type="button" onClick={() => setContactMode('message')} className={`flex-1 py-3 font-bold text-sm ${contactMode === 'message' ? 'text-brand-green border-b-2 border-brand-green bg-green-50/50' : 'text-gray-500 hover:bg-gray-50'}`}>Send Message</button>
              <button type="button" onClick={() => setContactMode('call')} className={`flex-1 py-3 font-bold text-sm ${contactMode === 'call' ? 'text-brand-green border-b-2 border-brand-green bg-green-50/50' : 'text-gray-500 hover:bg-gray-50'}`}>Request Call</button>
              <button type="button" onClick={() => setContactMode('interest')} className={`flex-1 py-3 font-bold text-sm ${contactMode === 'interest' ? 'text-brand-green border-b-2 border-brand-green bg-green-50/50' : 'text-gray-500 hover:bg-gray-50'}`}>Send Interest</button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
              {contactMode === 'message' && (
                <>
                  <input required type="text" placeholder="Your Name" defaultValue={user?.name} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
                  <input required type="text" placeholder="Your Contact" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
                  <textarea required rows="4" placeholder="Hello, I am interested in farming on your land. I would like to discuss the available land and agreement terms." defaultValue="Hello, I am interested in farming on your land. I would like to discuss the available land and agreement terms." className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green"></textarea>
                  <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-green-700">Send Message</button>
                </>
              )}
              
              {contactMode === 'call' && (
                <>
                  <div className="flex gap-4">
                    <input required type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
                    <input required type="time" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
                  </div>
                  <textarea rows="3" placeholder="Message (Optional)" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green"></textarea>
                  <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-green-700">Request Call</button>
                </>
              )}
              
              {contactMode === 'interest' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2 text-left">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Interested in</p>
                    <p className="font-bold text-gray-900">{land.title || 'Agricultural Land'}</p>
                  </div>
                  <input required type="number" placeholder="Required Area (Acres)" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green" />
                  <select required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green">
                    <option value="">Preferred Agreement</option>
                    <option>Fixed Rent</option>
                    <option>Share of Produce</option>
                    <option>Negotiable</option>
                  </select>
                  <textarea required rows="2" placeholder="Message" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 outline-none focus:border-brand-green"></textarea>
                  <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-green-700">Send Interest</button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
