import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Search, Navigation, IndianRupee, Store, Users, ChevronLeft, Truck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mandis, buyers, mockUser } from '../data/mockData';
import { calculateDistance, calculateTravelTime, calculateTransportCost } from '../utils/locationUtils';
import RouteMapView from '../components/RouteMapView';

export default function DestinationSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useAppContext();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [crop, setCrop] = useState(searchParams.get('crop') || 'Wheat');
  const [quantity, setQuantity] = useState(searchParams.get('qty') || '100');
  
  const [activeTab, setActiveTab] = useState('both'); // 'both', 'markets', 'buyers'
  const [selectedResult, setSelectedResult] = useState(null); // For "Sell Here" analysis
  const [showFullRoute, setShowFullRoute] = useState(false);

  // Determine searched location. In a real app, this would use a geocoding API.
  // We'll simulate it by checking if query matches a city/state in our mock data.
  const searchedCoordinates = useMemo(() => {
    if (!query) return null;
    const lowerQ = query.toLowerCase();
    const match = [...mandis, ...buyers].find(m => 
      m.city.toLowerCase().includes(lowerQ) || 
      m.state.toLowerCase().includes(lowerQ) ||
      m.name.toLowerCase().includes(lowerQ)
    );
    if (match) return { lat: match.lat, lng: match.lng, name: match.city };
    
    // Default fallback if no exact match but there's a query
    return { lat: 28.6139, lng: 77.2090, name: query }; 
  }, [query]);

  // Filter based on coordinates and crop
  const { filteredMandis, filteredBuyers } = useMemo(() => {
    if (!searchedCoordinates) return { filteredMandis: [], filteredBuyers: [] };
    
    const cropLower = crop.toLowerCase();
    
    // Simple mock logic: return places within 100km of searched location
    // Or just all if they match the city text.
    const isNearby = (item) => {
      const distToSearch = calculateDistance(searchedCoordinates.lat, searchedCoordinates.lng, item.lat, item.lng);
      return distToSearch < 150 && (item.crop?.toLowerCase() === cropLower || item.needs?.toLowerCase() === cropLower);
    };

    return {
      filteredMandis: mandis.filter(isNearby),
      filteredBuyers: buyers.filter(isNearby)
    };
  }, [searchedCoordinates, crop]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query, crop, qty: quantity });
    setSelectedResult(null);
  };

  const farmLat = mockUser.lat;
  const farmLng = mockUser.lng;

  const renderAnalysis = () => {
    if (!selectedResult) return null;
    
    const isMandi = 'price' in selectedResult;
    const price = isMandi ? selectedResult.price : selectedResult.offer;
    const distance = calculateDistance(farmLat, farmLng, selectedResult.lat, selectedResult.lng);
    const transportPerQtl = calculateTransportCost(distance, 1);
    const totalTransport = calculateTransportCost(distance, Number(quantity));
    const netPerQtl = price - transportPerQtl;
    const totalNet = netPerQtl * Number(quantity);
    const travelTime = calculateTravelTime(distance);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Selling Analysis</h2>
            <button onClick={() => setSelectedResult(null)} className="text-gray-500 font-bold hover:text-gray-800 text-xl">✕</button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">From (Your Farm)</p>
              <p className="font-bold text-gray-900 flex items-center gap-1"><MapPin className="h-4 w-4 text-brand-green"/> {mockUser.village}, {mockUser.state}</p>
            </div>
            
            <div className="hidden md:flex flex-col justify-center items-center px-4">
              <Truck className="h-6 w-6 text-gray-400 mb-2"/>
              <div className="h-[2px] w-24 bg-gray-300"></div>
            </div>

            <div className="flex-1 bg-brand-light-green p-4 rounded-xl border border-brand-green/30">
              <p className="text-sm text-gray-700 mb-1">To Destination</p>
              <p className="font-bold text-gray-900 flex items-center gap-1"><MapPin className="h-4 w-4 text-brand-green"/> {selectedResult.name}</p>
              <p className="text-sm text-gray-600 mt-1">{selectedResult.city}, {selectedResult.state}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-y-4 mb-4 pb-4 border-b border-gray-100">
              <div><p className="text-sm text-gray-500">Crop</p><p className="font-bold text-gray-900">{crop}</p></div>
              <div><p className="text-sm text-gray-500">Quantity</p><p className="font-bold text-gray-900">{quantity} Quintal</p></div>
              <div><p className="text-sm text-gray-500">Distance</p><p className="font-bold text-gray-900">{distance} km ({travelTime})</p></div>
              <div><p className="text-sm text-gray-500">Gross Price</p><p className="font-bold text-brand-green">₹{price} / Qtl</p></div>
            </div>
            
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Gross Value ({quantity} Qtl)</span>
                <span>₹{(price * Number(quantity)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Estimated Transport (₹{transportPerQtl}/Qtl)</span>
                <span>- ₹{totalTransport.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-lg text-gray-900">Estimated Net Realisation</span>
              <div className="text-right">
                <span className="font-black text-2xl text-brand-green">₹{netPerQtl.toLocaleString()}</span>
                <span className="text-sm text-gray-500"> / Qtl</span>
                <div className="text-sm font-bold text-gray-700 mt-1">Total: ₹{totalNet.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-green-700 transition">
              {isMandi ? 'Create Crop Lot for this Mandi' : 'Contact Buyer'}
            </button>
            <button 
              onClick={() => setShowFullRoute(true)}
              className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:border-brand-green hover:text-brand-green transition flex justify-center items-center gap-2"
            >
              <Navigation className="h-5 w-5"/> View Full Route
            </button>
          </div>
        </div>

        {showFullRoute && (
          <RouteMapView 
            onClose={() => setShowFullRoute(false)}
            destination={selectedResult}
            distance={distance}
            travelTime={travelTime}
            transportCost={totalTransport}
            quantity={Number(quantity)}
            crop={crop}
            isMandi={isMandi}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-brand-green text-white pt-8 pb-16 px-4 rounded-b-[40px]">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-green-100 hover:text-white font-medium mb-6">
            <ChevronLeft className="h-5 w-5" /> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">📍 Where do you want to sell?</h1>
          <p className="text-green-100 text-lg mb-8">Search any location in India to find markets, buyers, and estimate logistics.</p>

          <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-lg flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search city, state, mandi or buyer..." 
                className="bg-transparent w-full outline-none text-gray-900 font-medium"
                value={query}
                onChange={e => setQuery(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <select value={crop} onChange={e=>setCrop(e.target.value)} className="bg-gray-50 rounded-xl px-4 py-3 outline-none border-none font-medium text-gray-700 border-r border-gray-200">
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Mustard">Mustard</option>
              </select>
              <input 
                type="number" 
                placeholder="Qty (Qtl)" 
                value={quantity}
                onChange={e=>setQuantity(e.target.value)}
                className="w-28 bg-gray-50 rounded-xl px-4 py-3 outline-none text-gray-900 font-medium" 
                required
              />
              <button type="submit" className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition">Search</button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        {!searchedCoordinates && (
           <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100 shadow-sm mt-12">
             <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
             <p className="text-lg">Search a destination to see selling opportunities.</p>
           </div>
        )}

        {searchedCoordinates && (
          <>
            <div className="flex gap-2 bg-white p-2 rounded-xl border border-gray-200 mb-6 shadow-sm overflow-x-auto">
              <button onClick={()=>setActiveTab('both')} className={`px-6 py-2 rounded-lg font-bold whitespace-nowrap transition ${activeTab==='both' ? 'bg-brand-green text-white' : 'text-gray-600 hover:bg-gray-100'}`}>All Matches</button>
              <button onClick={()=>setActiveTab('markets')} className={`px-6 py-2 rounded-lg font-bold whitespace-nowrap transition ${activeTab==='markets' ? 'bg-brand-green text-white' : 'text-gray-600 hover:bg-gray-100'}`}>🏪 Markets / Mandis</button>
              <button onClick={()=>setActiveTab('buyers')} className={`px-6 py-2 rounded-lg font-bold whitespace-nowrap transition ${activeTab==='buyers' ? 'bg-brand-green text-white' : 'text-gray-600 hover:bg-gray-100'}`}>🤝 Direct Buyers</button>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">📍 Selling Opportunities Near {searchedCoordinates.name}</h2>
              <span className="text-sm font-bold bg-brand-light-green text-brand-green px-3 py-1 rounded-full">
                {filteredMandis.length + filteredBuyers.length} options found
              </span>
            </div>

            <div className="space-y-6">
              {/* MARKETS */}
              {(activeTab === 'both' || activeTab === 'markets') && filteredMandis.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2"><Store className="h-5 w-5 text-blue-600"/> Markets & Mandis</h3>
                  <div className="grid gap-4">
                    {filteredMandis.map(mandi => {
                      const dist = calculateDistance(farmLat, farmLng, mandi.lat, mandi.lng);
                      const net = mandi.price - calculateTransportCost(dist, 1);
                      return (
                        <div key={`m-${mandi.id}`} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-green transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{mandi.name}</h4>
                            <p className="text-sm text-gray-500 mb-3">{mandi.city}, {mandi.state}</p>
                            <div className="flex gap-4 text-sm font-medium">
                              <span className="flex items-center gap-1 text-gray-700"><Navigation className="h-4 w-4"/> {dist} km</span>
                              <span className="text-gray-700">Crop: {crop}</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end md:ml-auto">
                            <p className="text-sm text-gray-500">Mandi Price</p>
                            <p className="text-xl font-black text-gray-900">₹{mandi.price} <span className="text-sm font-normal text-gray-500">/ Qtl</span></p>
                            <p className="text-sm font-bold text-brand-green mt-1">Est. Net: ₹{net}/Qtl</p>
                          </div>
                          <button 
                            onClick={() => setSelectedResult(mandi)}
                            className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition whitespace-nowrap"
                          >
                            Sell Here
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* BUYERS */}
              {(activeTab === 'both' || activeTab === 'buyers') && filteredBuyers.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-purple-600"/> Direct Buyers</h3>
                  <div className="grid gap-4">
                    {filteredBuyers.map(buyer => {
                      const dist = calculateDistance(farmLat, farmLng, buyer.lat, buyer.lng);
                      const net = buyer.offer - calculateTransportCost(dist, 1);
                      return (
                        <div key={`b-${buyer.id}`} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-green transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-xl font-bold text-gray-900">{buyer.name}</h4>
                              {buyer.verified && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Verified</span>}
                            </div>
                            <p className="text-sm text-gray-500 mb-3">{buyer.city}, {buyer.state}</p>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                              <span className="flex items-center gap-1 text-gray-700"><Navigation className="h-4 w-4"/> {dist} km</span>
                              <span className="text-gray-700 bg-gray-100 px-2 py-0.5 rounded">Req: {buyer.quantity} Qtl</span>
                              <span className="text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{buyer.grade}</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end md:ml-auto">
                            <p className="text-sm text-gray-500">Buyer Offer</p>
                            <p className="text-xl font-black text-gray-900">₹{buyer.offer} <span className="text-sm font-normal text-gray-500">/ Qtl</span></p>
                            <p className="text-sm font-bold text-brand-green mt-1">Est. Net: ₹{net}/Qtl</p>
                          </div>
                          <button 
                            onClick={() => setSelectedResult(buyer)}
                            className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition whitespace-nowrap"
                          >
                            Sell Here
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredMandis.length === 0 && filteredBuyers.length === 0 && (
                <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100">
                  <p className="font-bold text-lg text-gray-700 mb-2">No matching opportunities found</p>
                  <p>Try searching for a different destination or crop.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {renderAnalysis()}
      <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
        <p className="text-sm font-medium text-gray-500 bg-gray-100 py-2 px-4 rounded-full inline-block">
          Note: Distances, routes, travel times, and transport costs are <b>Estimated Data</b> for decision-support purposes.
        </p>
      </div>
    </div>
  );
}
