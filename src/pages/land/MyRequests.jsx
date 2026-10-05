import { useNavigate } from 'react-router-dom';
import { useLand } from '../../context/LandContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin } from 'lucide-react';

export default function MyRequests() {
  const navigate = useNavigate();
  const { requests } = useLand();
  const { user } = useAuth();
  
  const myRequests = requests.filter(r => r.cultivatorId === user.id);
  
  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Sent Requests</h1>
        <p className="text-lg text-gray-600 mt-2">Track the partnership requests you have sent to land owners.</p>
      </div>

      <div className="space-y-6">
        {myRequests.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Requests Yet</h2>
            <p className="text-gray-500 mb-6">You haven't sent any partnership requests to land owners.</p>
            <button 
              onClick={() => navigate('/land-connect/find')}
              className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition"
            >
              Find Agricultural Land
            </button>
          </div>
        ) : (
          myRequests.map(req => (
            <div key={req.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{req.landTitle}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    req.status === 'Accepted' || req.status === 'Active' ? 'bg-green-100 text-green-700' :
                    req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Crop</p>
                    <p className="font-bold text-gray-900">{req.crop}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="font-bold text-gray-900">{req.model}</p>
                  </div>
                  {req.model === 'Harvest Share' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Owner Share</p>
                        <p className="font-bold text-gray-900">{req.terms.ownerShare}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Your Share</p>
                        <p className="font-bold text-brand-green">{req.terms.cultivatorShare}%</p>
                      </div>
                    </>
                  )}
                  {req.model === 'Fixed Payment' && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Fixed Payment</p>
                      <p className="font-bold text-brand-green">₹{req.terms.fixedPayment}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 md:p-8 bg-gray-50 md:w-64 flex flex-col justify-center items-center">
                <p className="text-sm text-gray-500 mb-1">Land Owner</p>
                <p className="font-bold text-gray-900 mb-6">{req.ownerName}</p>
                
                <button 
                  onClick={() => navigate(`/land-connect/partnership/${req.id}`)}
                  className="w-full bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
                >
                  View Partnership
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
