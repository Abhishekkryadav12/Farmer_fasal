import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function FpoOffers() {
  const { fpoOffers } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Offers & Negotiation</h1>
        <p className="text-gray-500 mt-1">Manage incoming buyer offers and your counter-offers.</p>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {['All', 'Incoming', 'Sent', 'Negotiating', 'Accepted'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-bold text-sm border-b-2 transition ${activeTab === tab ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                <th className="p-6">Offer ID</th>
                <th className="p-6">Buyer</th>
                <th className="p-6">Crop & Qty</th>
                <th className="p-6">Buyer Offer</th>
                <th className="p-6">FPO Ask</th>
                <th className="p-6">Status</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fpoOffers.map(offer => (
                <tr key={offer.id} className="hover:bg-gray-50 transition">
                  <td className="p-6 font-bold text-gray-500">{offer.id}</td>
                  <td className="p-6 font-bold text-gray-900">{offer.buyer}</td>
                  <td className="p-6">
                    <span className="font-bold text-gray-900">{offer.quantity} Qtl</span>
                    <span className="text-xs text-gray-500 block">{offer.crop}</span>
                  </td>
                  <td className="p-6 font-bold text-blue-600">₹{offer.buyerOffer}/Qtl</td>
                  <td className="p-6 font-bold text-purple-600">₹{offer.fpoAsk}/Qtl</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      offer.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="p-6">
                    {offer.status === 'Negotiation' ? (
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-50 text-green-700 font-bold text-sm rounded hover:bg-green-100">Accept</button>
                        <button className="px-3 py-1 bg-gray-50 text-gray-700 font-bold text-sm rounded hover:bg-gray-200">Counter</button>
                      </div>
                    ) : (
                      <button className="px-3 py-1 border border-gray-200 text-gray-600 font-bold text-sm rounded hover:bg-gray-50">View Details</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
