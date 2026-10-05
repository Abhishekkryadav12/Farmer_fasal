import { useState } from 'react';
import { IndianRupee, MessageCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Offers() {
  const { offers, setOffers } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [counterPrice, setCounterPrice] = useState("");

  const handleAction = (id, action) => {
    if (action === 'counter') {
      setSelectedOffer(offers.find(o => o.id === id));
      setCounterPrice(offers.find(o => o.id === id).price + 50);
      setModalOpen(true);
    } else {
      setOffers(prev => prev.map(o => o.id === id ? { ...o, status: action } : o));
    }
  };

  const sendCounter = () => {
    setOffers(prev => prev.map(o => o.id === selectedOffer.id ? { ...o, status: 'countered', counterPrice } : o));
    setModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Crop Offers</h1>
        <p className="text-lg text-gray-600 mt-2">Buyers se aaye hue offers dekhein aur negotiate karein.</p>
      </div>

      <div className="space-y-6">
        {offers.map((offer) => (
          <div key={offer.id} className={`bg-white rounded-3xl p-6 md:p-8 border shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 ${
            offer.status === 'accepted' ? 'border-green-300 bg-green-50/30' : 
            offer.status === 'rejected' ? 'border-red-200 opacity-70' : 
            'border-gray-100'
          }`}>
            <div>
              <p className="text-sm text-gray-500 mb-1">Offer from</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.buyerName}</h3>
              <p className="text-sm text-gray-500">For: Wheat Lot #SB1024</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Offered Price</p>
              <p className="text-4xl font-bold text-brand-green flex items-center gap-1 justify-center">₹{offer.price}<span className="text-lg font-normal text-gray-500">/q</span></p>
            </div>
            
            <div className="w-full md:w-auto">
              {offer.status === 'pending' && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => handleAction(offer.id, 'accepted')} className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 flex-1">
                    Accept
                  </button>
                  <button onClick={() => handleAction(offer.id, 'counter')} className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-6 py-3 rounded-xl font-bold hover:bg-yellow-100 flex-1">
                    Counter
                  </button>
                  <button onClick={() => handleAction(offer.id, 'rejected')} className="bg-white border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 flex-1">
                    Reject
                  </button>
                </div>
              )}
              {offer.status === 'accepted' && (
                <div className="flex items-center justify-center gap-2 text-green-700 font-bold bg-green-100 px-6 py-3 rounded-xl">
                  <CheckCircle2 className="h-5 w-5" /> Accepted
                </div>
              )}
              {offer.status === 'rejected' && (
                <div className="flex items-center justify-center gap-2 text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl border border-red-100">
                  <XCircle className="h-5 w-5" /> Rejected
                </div>
              )}
              {offer.status === 'countered' && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-700 font-bold bg-yellow-100 px-6 py-3 rounded-xl mb-2">
                    <MessageCircle className="h-5 w-5" /> Counter Sent
                  </div>
                  <p className="text-sm text-gray-600">Your ask: ₹{offer.counterPrice}/q</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Counter Offer</h2>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
              <p className="text-sm text-gray-500 mb-1">Current Offer</p>
              <p className="text-2xl font-bold text-gray-900">₹{selectedOffer?.price} <span className="text-sm font-normal text-gray-500">/q</span></p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Counter Offer (₹/q)</label>
              <input type="number" value={counterPrice} onChange={(e) => setCounterPrice(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green font-bold text-lg" />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
              <textarea placeholder="e.g. My crop quality is Grade A+..." className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green h-24 resize-none"></textarea>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={sendCounter} className="flex-1 bg-brand-green text-white py-4 rounded-xl font-bold hover:bg-green-700">
                Send Counter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
