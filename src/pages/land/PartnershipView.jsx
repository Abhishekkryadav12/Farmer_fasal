import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLand } from '../../context/LandContext';
import { useAuth } from '../../context/AuthContext';
import { MessageCircle, Send, Handshake, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function PartnershipView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requests, updateRequestStatus, sendCounterOffer, messages, addMessage } = useLand();
  const { user } = useAuth();
  
  const req = requests.find(r => r.id === id);
  const [msgText, setMsgText] = useState('');
  
  // Counter offer state
  const [showCounter, setShowCounter] = useState(false);
  const [counterTerms, setCounterTerms] = useState({
    fixedPayment: req?.terms?.fixedPayment || '',
    ownerShare: req?.terms?.ownerShare || '',
    cultivatorShare: req?.terms?.cultivatorShare || ''
  });

  if (!req) return <div>Request not found</div>;

  const isOwner = user.id === req.ownerId;
  const isCultivator = user.id === req.cultivatorId;
  
  const reqMessages = messages[req.id] || [];

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msgText.trim()) {
      addMessage(req.id, msgText);
      setMsgText('');
    }
  };

  const handleCounter = (e) => {
    e.preventDefault();
    const terms = {};
    if (req.model === 'Fixed Payment' || req.model === 'Hybrid') {
      terms.fixedPayment = Number(counterTerms.fixedPayment);
    }
    if (req.model === 'Harvest Share' || req.model === 'Hybrid') {
      terms.ownerShare = Number(counterTerms.ownerShare);
      terms.cultivatorShare = Number(counterTerms.cultivatorShare) || (100 - Number(counterTerms.ownerShare));
    }
    sendCounterOffer(req.id, terms);
    setShowCounter(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-brand-green font-bold">
        <ArrowLeft className="h-5 w-5" /> Back
      </button>

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partnership Details</h1>
          <p className="text-lg text-gray-600 mt-2">{req.landTitle}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
          req.status === 'Accepted' || req.status === 'Active' ? 'bg-green-100 text-green-700' :
          req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {req.status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          
          {req.status === 'Accepted' || req.status === 'Active' ? (
            <div className="bg-brand-light-green border border-brand-green p-8 rounded-3xl shadow-sm text-center">
              <CheckCircle2 className="h-12 w-12 text-brand-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SMART BHARAT</h2>
              <p className="text-sm font-bold tracking-widest text-brand-green mb-6 uppercase">Farming Partnership</p>
              
              <div className="bg-white p-6 rounded-2xl text-left space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-bold text-sm">Land</span>
                  <span className="font-bold text-gray-900">{req.landTitle}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-bold text-sm">Crop & Duration</span>
                  <span className="font-bold text-gray-900">{req.crop} • {req.duration}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-bold text-sm">Partnership Model</span>
                  <span className="font-bold text-gray-900">{req.model}</span>
                </div>
                
                {req.model === 'Fixed Payment' || req.model === 'Hybrid' ? (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 font-bold text-sm">Fixed Payment</span>
                    <span className="font-bold text-brand-green">₹{req.terms.fixedPayment}</span>
                  </div>
                ) : null}
                
                {req.model === 'Harvest Share' || req.model === 'Hybrid' ? (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 font-bold text-sm">Harvest Share</span>
                    <span className="font-bold text-gray-900">Owner {req.terms.ownerShare}% • Cultivator {req.terms.cultivatorShare}%</span>
                  </div>
                ) : null}

                <div className="flex justify-between pt-2">
                  <span className="text-gray-500 font-bold text-sm">Status</span>
                  <span className="font-bold text-brand-green">Mutually Agreed</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-6">This is a digital agreement summary for prototype purposes.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Handshake className="h-6 w-6 text-brand-green" /> Current Terms
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Crop</p>
                    <p className="font-bold text-gray-900">{req.crop}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-bold text-gray-900">{req.duration}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Partnership Model</p>
                  <p className="font-bold text-xl text-gray-900 mb-4">{req.model}</p>
                  
                  {req.model === 'Fixed Payment' && (
                    <p className="font-bold text-2xl text-brand-green">₹{req.terms.fixedPayment}</p>
                  )}
                  {req.model === 'Harvest Share' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Owner: <strong className="text-gray-900">{req.terms.ownerShare}%</strong></span>
                      <span className="text-gray-600">Cultivator: <strong className="text-gray-900">{req.terms.cultivatorShare}%</strong></span>
                    </div>
                  )}
                  {req.model === 'Hybrid' && (
                    <div>
                      <p className="font-bold text-brand-green mb-2">₹{req.terms.fixedPayment}</p>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Owner: <strong className="text-gray-900">{req.terms.ownerShare}%</strong></span>
                        <span className="text-gray-600">Cultivator: <strong className="text-gray-900">{req.terms.cultivatorShare}%</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(req.status === 'Pending' || req.status === 'Negotiating') && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                  <button 
                    onClick={() => updateRequestStatus(req.id, 'Accepted')}
                    className="flex-1 bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => setShowCounter(!showCounter)}
                    className="flex-1 bg-white border border-brand-green text-brand-green py-3 rounded-xl font-bold hover:bg-green-50"
                  >
                    Counter Offer
                  </button>
                  <button 
                    onClick={() => updateRequestStatus(req.id, 'Rejected')}
                    className="w-full bg-white border border-red-300 text-red-600 py-3 rounded-xl font-bold hover:bg-red-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}

          {showCounter && (
            <div className="bg-white rounded-3xl p-8 border border-brand-green shadow-sm animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4">Send Counter Offer</h3>
              <form onSubmit={handleCounter} className="space-y-4">
                {(req.model === 'Fixed Payment' || req.model === 'Hybrid') && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">New Fixed Payment (₹)</label>
                    <input type="number" required value={counterTerms.fixedPayment} onChange={e=>setCounterTerms({...counterTerms, fixedPayment: e.target.value})} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
                  </div>
                )}
                {(req.model === 'Harvest Share' || req.model === 'Hybrid') && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Owner Share (%)</label>
                      <input type="number" required value={counterTerms.ownerShare} onChange={e=>setCounterTerms({...counterTerms, ownerShare: e.target.value, cultivatorShare: 100 - Number(e.target.value)})} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Cultivator Share (%)</label>
                      <input type="number" readOnly value={counterTerms.cultivatorShare} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 font-bold outline-none" />
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={()=>setShowCounter(false)} className="px-4 py-2 font-bold text-gray-600">Cancel</button>
                  <button type="submit" className="bg-brand-green text-white px-6 py-2 rounded-xl font-bold">Send Counter</button>
                </div>
              </form>
            </div>
          )}
          
          {(req.status === 'Accepted' || req.status === 'Active') && (req.model === 'Harvest Share' || req.model === 'Hybrid') && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Harvest Calculator</h3>
              <div className="flex items-end gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Total Harvest (Quintal)</label>
                  <input type="number" defaultValue={100} id="harvestInput" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:border-brand-green outline-none" />
                </div>
                <button onClick={() => {
                  const val = document.getElementById('harvestInput').value;
                  document.getElementById('ownerCalc').innerText = (val * (req.terms.ownerShare/100)).toFixed(1) + ' Q';
                  document.getElementById('cultivatorCalc').innerText = (val * (req.terms.cultivatorShare/100)).toFixed(1) + ' Q';
                }} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold">Calculate</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-600 mb-1">Owner Share ({req.terms.ownerShare}%)</p>
                  <p className="font-bold text-2xl text-green-700" id="ownerCalc">{(100 * (req.terms.ownerShare/100)).toFixed(1)} Q</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-600 mb-1">Cultivator Share ({req.terms.cultivatorShare}%)</p>
                  <p className="font-bold text-2xl text-blue-700" id="cultivatorCalc">{(100 * (req.terms.cultivatorShare/100)).toFixed(1)} Q</p>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-[600px]">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Chat with {isOwner ? req.cultivatorName : req.ownerName}
            </h3>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
            {reqMessages.length === 0 ? (
              <p className="text-center text-gray-500 text-sm mt-10">No messages yet. Start the conversation!</p>
            ) : (
              reqMessages.map((msg, idx) => {
                const isMe = msg.sender === user.id;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 ${isMe ? 'bg-brand-green text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMsg} className="flex gap-2">
              <input 
                type="text" 
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                placeholder="Type message..." 
                className="flex-1 border border-gray-300 rounded-full px-6 py-3 bg-gray-50 focus:border-brand-green outline-none"
              />
              <button type="submit" className="bg-brand-green text-white p-3 rounded-full hover:bg-green-700 transition">
                <Send className="h-6 w-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
