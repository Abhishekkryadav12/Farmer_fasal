import { useNavigate } from 'react-router-dom';
import { useLand } from '../../context/LandContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Users } from 'lucide-react';

export default function MyLand() {
  const navigate = useNavigate();
  const { lands, requests } = useLand();
  const { user } = useAuth();
  
  const myLands = lands.filter(l => l.ownerId === user.id);
  
  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Land Listings</h1>
          <p className="text-lg text-gray-600 mt-2">Manage your available land and partnership requests.</p>
        </div>
        <button 
          onClick={() => navigate('/land-connect/list-land')}
          className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          Add New Land
        </button>
      </div>

      <div className="space-y-6">
        {myLands.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Land Listed</h2>
            <p className="text-gray-500 mb-6">You haven't listed any agricultural land yet.</p>
            <button 
              onClick={() => navigate('/land-connect/list-land')}
              className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition"
            >
              List Your Land Now
            </button>
          </div>
        ) : (
          myLands.map(land => {
            const landRequests = requests.filter(r => r.landId === land.id);
            return (
              <div key={land.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row group">
                <div className="w-full md:w-64 h-48 md:h-auto bg-gray-200 relative">
                   <img 
                     src={land.photos?.length > 0 ? land.photos[0] : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'} 
                     alt="Land" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs font-bold">
                     {land.photos?.length || 0} Photos
                   </div>
                </div>
                <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{land.area} Acres — {land.village}</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {land.status}
                    </span>
                  </div>
                  <p className="text-gray-500 flex items-center gap-1 mb-6">
                    <MapPin className="h-4 w-4" /> {land.district}, {land.state}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="font-bold text-gray-900">{land.model}</p>
                    </div>
                    {land.model === 'Harvest Share' && (
                      <div>
                        <p className="text-sm text-gray-500">Owner Share</p>
                        <p className="font-bold text-gray-900">{land.terms.ownerShare}%</p>
                      </div>
                    )}
                  </div>
                  
                  {land.photos?.length > 0 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {land.photos.map((p, i) => (
                        <img key={i} src={p} className="h-12 w-16 object-cover rounded shadow-sm border border-gray-200" alt="thumb" />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 bg-gray-50 md:w-72 flex flex-col justify-center text-center">
                  <div className="mb-6">
                    <div className="flex justify-center items-center gap-2 mb-2">
                      <Users className="h-6 w-6 text-brand-green" />
                      <span className="text-3xl font-bold text-gray-900">{landRequests.length}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-500">Partnership Requests</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => navigate(`/land-connect/${land.id}`)}
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-xl font-bold hover:bg-gray-50"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => navigate('/land-connect/list-land', { state: { editLand: land } })}
                      className="w-full bg-white border border-blue-300 text-blue-700 py-2 rounded-xl font-bold hover:bg-blue-50"
                    >
                      Edit Listing
                    </button>
                    {landRequests.length > 0 && (
                      <button 
                        onClick={() => navigate(`/land-connect/partnership/${landRequests[0].id}`)}
                        className="w-full bg-brand-green text-white py-2 rounded-xl font-bold hover:bg-green-700"
                      >
                        View Requests
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
