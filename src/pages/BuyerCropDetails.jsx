import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, User, ShieldCheck, Box, ShoppingCart, Navigation, IndianRupee } from 'lucide-react';
import { calculateDistance, calculateTravelTime, calculateTransportCost } from '../utils/locationUtils';

export default function BuyerCropDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cropLots, purchaseRequests, setPurchaseRequests } = useAppContext();
  const { user } = useAuth();
  
  const crop = cropLots.find(c => c.id === id);
  const [showPurchasePlan, setShowPurchasePlan] = useState(false);
  const [reqQuantity, setReqQuantity] = useState(crop?.availableQuantity || 100);
  const [offerPrice, setOfferPrice] = useState(crop?.expectedPrice || 2500);
  const [deliveryLocation, setDeliveryLocation] = useState(user?.city || 'Delhi');

  if (!crop) return <div className="p-8 text-center text-xl font-bold">Crop not found</div>;

  // Assuming buyer is in Delhi for logistics calculation if no user lat/lng
  const buyerLat = user?.lat || 28.6139;
  const buyerLng = user?.lng || 77.2090;
  
  // Fake crop lat lng if not present
  const cropLat = crop.lat || 30.1944;
  const cropLng = crop.lng || 74.4965;

  const dist = calculateDistance(cropLat, cropLng, buyerLat, buyerLng);
  const estTransport = calculateTransportCost(dist, Number(reqQuantity));
  const estCropValue = offerPrice * Number(reqQuantity);
  const totalCost = estCropValue + estTransport;

  const handleSendRequest = () => {
    const newRequest = {
      id: `PR${Math.floor(1000 + Math.random() * 9000)}`,
      cropId: crop.id,
      buyerName: user?.name || 'ABC Agro Foods',
      cropName: crop.crop,
      quantity: reqQuantity,
      offerPrice: offerPrice,
      deliveryLocation,
      status: 'Pending',
      farmerName: crop.farmerName
    };
    setPurchaseRequests([...purchaseRequests, newRequest]);
    alert("Purchase Request Sent!");
    navigate('/profile'); // Go to profile to see My Purchases
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <button onClick={() => navigate(-1)} className="text-brand-green font-bold flex items-center gap-2 hover:underline mb-4">
        &larr; Back to Marketplace
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: CROP DETAILS */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h1 className="text-3xl font-black text-gray-900 mb-2">🌾 {crop.crop} — {crop.grade}</h1>
            <p className="text-gray-500 flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-gray-400" /> {crop.location || `${crop.village}, ${crop.district}`}
            </p>

            <div className="border-b border-gray-100 pb-6 mb-6">
              <p className="text-xs text-gray-500 font-bold uppercase mb-2">Farmer</p>
              <div className="flex items-center gap-3">
                <div className="bg-brand-light-green p-3 rounded-full text-brand-green">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg flex items-center gap-1">
                    {crop.farmerName} <ShieldCheck className="h-4 w-4 text-blue-500" />
                  </p>
                  <p className="text-sm text-gray-500">Profile: Complete</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Crop Variety</span>
                <span className="font-bold text-gray-900">{crop.variety || 'Standard'}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Available Quantity</span>
                <span className="font-bold text-gray-900">{crop.availableQuantity} Qtl</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Quality Requirement</span>
                <span className="font-bold text-gray-900">{crop.grade}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Harvest / Availability</span>
                <span className="font-bold text-gray-900">{new Date(crop.availableFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-gray-500 font-medium mt-1">Expected Price</span>
                <span className="text-3xl font-black text-brand-green">₹{crop.expectedPrice} <span className="text-lg font-normal text-gray-500">/ Qtl</span></span>
              </div>
            </div>

            {!showPurchasePlan && (
              <button 
                onClick={() => setShowPurchasePlan(true)}
                className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-sm flex justify-center items-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" /> Create Purchase Plan
              </button>
            )}
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Crop Images</h2>
            {crop.photos && crop.photos.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto">
                {crop.photos.map((p, i) => (
                   <img key={i} src={p} alt="Crop" className="h-32 w-32 object-cover rounded-xl border border-gray-200" />
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 text-gray-500">
                <Box className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No images uploaded by farmer</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: PURCHASE PLAN */}
        {showPurchasePlan && (
          <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200 shadow-sm h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🛒 Purchase Plan
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Quantity Required (Qtl)</label>
                <input 
                  type="number" 
                  value={reqQuantity} 
                  onChange={(e) => setReqQuantity(Math.min(e.target.value, crop.availableQuantity))}
                  max={crop.availableQuantity}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 font-bold text-gray-900 outline-none focus:border-brand-green"
                />
                <p className="text-xs text-gray-500 mt-1">Max available: {crop.availableQuantity} Qtl</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Offer (₹ / Qtl)</label>
                <input 
                  type="number" 
                  value={offerPrice} 
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 font-bold text-gray-900 outline-none focus:border-brand-green"
                />
                <p className="text-xs text-gray-500 mt-1">Farmer's asking price: ₹{crop.expectedPrice}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Location</label>
                <input 
                  type="text" 
                  value={deliveryLocation} 
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 font-bold text-gray-900 outline-none focus:border-brand-green"
                  placeholder="e.g. Azadpur Mandi, Delhi"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Estimated Crop Value</span>
                  <span className="font-bold">₹{estCropValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Distance ({crop.village} → {deliveryLocation})</span>
                  <span className="font-bold">{dist} km</span>
                </div>
                <div className="flex justify-between text-orange-600 pb-4 border-b border-gray-100">
                  <span>Estimated Transport</span>
                  <span className="font-bold">+ ₹{estTransport.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-gray-900 text-lg">Estimated Total Cost</span>
                  <span className="font-black text-2xl text-blue-700">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleSendRequest}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-sm"
              >
                Send Purchase Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
