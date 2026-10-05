import { useState } from 'react';
import { Box, Plus, Image as ImageIcon, X, MapPin, AlertTriangle, ShieldCheck, CheckCircle2, MessageSquare, Briefcase } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function SellCrop() {
  const { cropLots, setCropLots, purchaseRequests, setPurchaseRequests, buyers } = useAppContext();
  const { user } = useAuth();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLot, setEditingLot] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [toast, setToast] = useState('');
  
  // Modals state
  const [requestsModalLot, setRequestsModalLot] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { type, request, action, title, text }
  const [counterOfferReq, setCounterOfferReq] = useState(null);
  const [viewBuyerData, setViewBuyerData] = useState(null);
  const [lotDetailsModal, setLotDetailsModal] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleCreateOrEditLot = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (editingLot) {
      setCropLots(cropLots.map(lot => lot.id === editingLot.id ? { 
        ...lot, 
        ...data,
        expectedPrice: Number(data.expectedPrice),
        quantity: Number(data.quantity),
        photos 
      } : lot));
      showToast("Crop listing updated successfully.");
    } else {
      const newLot = {
        id: `SB${Math.floor(1000 + Math.random() * 9000)}`,
        farmerId: user?.id || 'F1',
        farmerName: user?.name || 'Farmer',
        ...data,
        expectedPrice: Number(data.expectedPrice),
        quantity: Number(data.quantity),
        availableQuantity: Number(data.quantity),
        photos: photos,
        status: 'AVAILABLE'
      };
      setCropLots([...cropLots, newLot]);
      showToast("Crop lot created successfully.");
    }
    setIsFormOpen(false);
    setEditingLot(null);
    setPhotos([]);
  };

  const openEdit = (lot) => {
    setEditingLot(lot);
    setPhotos(lot.photos || []);
    setIsFormOpen(true);
  };

  const handleToggleStatus = (lotId, currentStatus) => {
    const newStatus = currentStatus === 'AVAILABLE' ? 'PAUSED' : 'AVAILABLE';
    setConfirmModal({
      title: `${newStatus === 'PAUSED' ? 'Pause' : 'Resume'} Listing?`,
      text: `Are you sure you want to ${newStatus === 'PAUSED' ? 'pause' : 'resume'} this crop listing?`,
      action: () => {
        setCropLots(cropLots.map(l => l.id === lotId ? { ...l, status: newStatus } : l));
        showToast(`Listing ${newStatus === 'PAUSED' ? 'paused' : 'resumed'} successfully.`);
        setConfirmModal(null);
      }
    });
  };

  const handleAcceptRequest = (request) => {
    setConfirmModal({
      title: 'Accept Purchase Request?',
      text: `You are accepting the offer of ₹${request.offerPrice}/q for ${request.requestedQuantity} Tonnes from ${request.buyerName}.`,
      action: () => {
        // Update request status
        setPurchaseRequests(purchaseRequests.map(pr => pr.id === request.id ? { ...pr, status: 'Accepted' } : pr));
        // Reduce available quantity from lot
        setCropLots(cropLots.map(l => {
          if (l.id === request.cropId) {
            const newAvail = l.availableQuantity - request.requestedQuantity;
            return { ...l, availableQuantity: newAvail, status: newAvail <= 0 ? 'SOLD OUT' : l.status };
          }
          return l;
        }));
        showToast("Purchase request accepted successfully. Order created.");
        setConfirmModal(null);
        setRequestsModalLot(null);
      }
    });
  };

  const handleRejectRequest = (request) => {
    setConfirmModal({
      title: 'Reject Request?',
      text: `Are you sure you want to reject this offer from ${request.buyerName}?`,
      action: () => {
        setPurchaseRequests(purchaseRequests.map(pr => pr.id === request.id ? { ...pr, status: 'Rejected' } : pr));
        showToast("Purchase request rejected.");
        setConfirmModal(null);
      }
    });
  };

  const handleCounterOffer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setPurchaseRequests(purchaseRequests.map(pr => pr.id === counterOfferReq.id ? { 
      ...pr, 
      status: 'Counter Offer Sent',
      counterPrice: Number(formData.get('counterPrice')),
      counterMsg: formData.get('message')
    } : pr));
    showToast("Counter offer sent to buyer.");
    setCounterOfferReq(null);
  };

  // Find requests for a specific lot
  const getRequestsForLot = (lotId) => {
    return purchaseRequests.filter(pr => pr.cropId === lotId && pr.status !== 'Rejected');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 relative">
      
      {/* TOAST */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-top-5">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          {toast}
        </div>
      )}

      <div className="text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900">Apni Fasal List Karein</h1>
          <p className="text-lg text-gray-600 mt-1">Digital crop lot banayein aur buyers se offers paayein.</p>
        </div>
        {!isFormOpen && (
          <button onClick={() => { setEditingLot(null); setPhotos([]); setIsFormOpen(true); }} className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 flex items-center gap-2 shadow-sm whitespace-nowrap w-full md:w-auto justify-center">
            <Plus className="h-5 w-5" /> Create Lot
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{editingLot ? 'Edit Crop Lot' : 'Create Crop Lot'}</h2>
            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X className="h-6 w-6"/></button>
          </div>
          <form onSubmit={handleCreateOrEditLot} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Crop</label>
                <input name="crop" type="text" required defaultValue={editingLot?.crop || "Wheat"} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Variety</label>
                <input name="variety" type="text" required defaultValue={editingLot?.variety || "Sharbati"} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                  <input name="quantity" type="number" required defaultValue={editingLot?.quantity || 100} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Unit</label>
                  <select name="unit" defaultValue="Tonnes" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green">
                    <option>Tonnes</option>
                    <option>Quintals</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Quality / Grade</label>
                <select name="grade" defaultValue={editingLot?.grade || "Grade A"} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green">
                  <option>Grade A</option>
                  <option>Grade B</option>
                  <option>Grade C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                <input name="location" type="text" required defaultValue={editingLot?.location || "Karnal, Haryana"} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ready Date</label>
                <input name="readyDate" type="date" required defaultValue={editingLot?.readyDate || "2026-10-15"} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Expected Price (₹/q)</label>
                <input name="expectedPrice" type="number" required defaultValue={editingLot?.expectedPrice || 2500} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description / Notes</label>
              <textarea name="description" defaultValue={editingLot?.description || ''} rows="2" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green" placeholder="Any specific details about the crop..."></textarea>
            </div>
            
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Crop Photos</label>
               {photos.length > 0 && (
                 <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                   {photos.map((photo, idx) => (
                     <div key={idx} className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                       <img src={photo} alt="Crop" className="h-full w-full object-cover" />
                       <button type="button" onClick={() => setPhotos(photos.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600">
                         <X className="h-3 w-3" />
                       </button>
                     </div>
                   ))}
                 </div>
               )}
               <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 transition">
                  <ImageIcon className="h-8 w-8 mb-2 text-brand-green" />
                  <span className="font-medium">Click to upload photos</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
               </label>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
              <button type="submit" className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700">
                {editingLot ? 'Save Changes' : 'Publish Crop Lot'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {cropLots.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
              <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Box className="h-12 w-12 text-brand-green" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Crop Lots Yet</h2>
              <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">Create a digital lot of your harvested crop to start receiving offers from verified buyers.</p>
              <button onClick={() => setIsFormOpen(true)} className="bg-brand-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 flex items-center gap-2 mx-auto shadow-sm">
                <Plus className="h-6 w-6" /> Publish Digital Crop Lot
              </button>
            </div>
          ) : (
            cropLots.map((lot) => {
              const requests = getRequestsForLot(lot.id);
              const pendingReqs = requests.filter(r => r.status === 'Pending' || r.status === 'Counter Offer Sent');
              
              return (
                <div key={lot.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:border-brand-light-green transition">
                  <div 
                    className="p-6 md:p-8 flex-1 cursor-pointer"
                    onClick={() => setLotDetailsModal(lot)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{lot.crop} Lot #{lot.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                        lot.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                        lot.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${lot.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-yellow-500'}`}></span> {lot.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 mt-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Quantity</p>
                        <p className="font-bold">{lot.availableQuantity} / {lot.quantity} Tonnes</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Grade</p>
                        <p className="font-bold">{lot.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="font-bold">{lot.location || lot.village}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Ready Date</p>
                        <p className="font-bold">{lot.readyDate || lot.harvestDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 p-6 md:p-8 min-w-[280px]">
                    <p className="text-sm text-gray-500 mb-1 text-right w-full">Expected Price</p>
                    <p className="text-3xl font-black text-brand-green mb-6 flex items-end justify-end w-full gap-1">
                      ₹{lot.expectedPrice}<span className="text-lg text-gray-500 font-normal mb-1">/q</span>
                    </p>
                    
                    <div className="flex flex-col gap-3 w-full">
                      <button 
                        onClick={() => setRequestsModalLot(lot)}
                        className={`w-full py-3 rounded-xl font-bold text-center relative transition shadow-sm ${
                          pendingReqs.length > 0 
                            ? 'bg-brand-green text-white hover:bg-green-700 ring-2 ring-brand-green ring-offset-2' 
                            : 'bg-white border border-brand-green text-brand-green hover:bg-brand-light-green'
                        }`}
                      >
                        {pendingReqs.length > 0 ? 'View Requests' : 'No purchase requests yet.'}
                        {pendingReqs.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                            {pendingReqs.length}
                          </span>
                        )}
                      </button>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(lot)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-xl font-bold hover:bg-gray-50 text-sm shadow-sm transition">
                          Edit Listing
                        </button>
                        <button onClick={() => handleToggleStatus(lot.id, lot.status)} className={`flex-1 border py-2 rounded-xl font-bold text-sm shadow-sm transition ${
                          lot.status === 'PAUSED' ? 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50' : 'bg-white border-yellow-300 text-yellow-700 hover:bg-yellow-50'
                        }`}>
                          {lot.status === 'PAUSED' ? 'Resume Listing' : 'Pause Listing'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* REQUESTS MODAL */}
      {requestsModalLot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Purchase Requests</h2>
                <p className="text-gray-500 text-sm">Lot: {requestsModalLot.id} • {requestsModalLot.crop}</p>
              </div>
              <button onClick={() => setRequestsModalLot(null)} className="p-2 hover:bg-gray-200 rounded-full bg-white text-gray-500"><X className="h-6 w-6"/></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              {getRequestsForLot(requestsModalLot.id).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 font-medium text-lg">No active requests for this lot yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getRequestsForLot(requestsModalLot.id).map(req => (
                    <div key={req.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{req.buyerName}</h3>
                              <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="h-3 w-3" /> {req.buyerLocation}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              req.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                              req.status === 'Counter Offer Sent' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>{req.status}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                            <div><p className="text-xs text-gray-500 uppercase font-bold">Requested Qty</p><p className="font-black text-gray-900">{req.requestedQuantity} Tonnes</p></div>
                            <div><p className="text-xs text-gray-500 uppercase font-bold">Offer Price</p><p className="font-black text-brand-green">₹{req.offerPrice}/q</p></div>
                            <div><p className="text-xs text-gray-500 uppercase font-bold">Delivery</p><p className="font-bold text-gray-900">{req.deliveryLocation}</p></div>
                            <div><p className="text-xs text-gray-500 uppercase font-bold">Payment</p><p className="font-bold text-gray-900">{req.paymentTerms} Days</p></div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 min-w-[200px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 justify-center">
                          {req.status === 'Pending' && (
                            <>
                              <button onClick={() => handleAcceptRequest(req)} className="w-full bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-sm flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-5 w-5" /> Accept
                              </button>
                              <div className="flex gap-2">
                                <button onClick={() => setCounterOfferReq(req)} className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-xl hover:bg-gray-50 shadow-sm text-sm">
                                  Counter
                                </button>
                                <button onClick={() => handleRejectRequest(req)} className="flex-1 bg-white border border-red-200 text-red-600 font-bold py-2 rounded-xl hover:bg-red-50 shadow-sm text-sm">
                                  Reject
                                </button>
                              </div>
                            </>
                          )}
                          <button onClick={() => setViewBuyerData(buyers.find(b => b.name === req.buyerName) || { name: req.buyerName, city: req.buyerLocation })} className="w-full text-blue-600 font-bold text-sm hover:underline py-2">
                            View Buyer Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COUNTER OFFER MODAL */}
      {counterOfferReq && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Counter Offer</h2>
            <p className="text-gray-500 mb-6 text-sm">Send a counter offer to {counterOfferReq.buyerName}</p>
            <form onSubmit={handleCounterOffer} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Counter Price (₹/q)</label>
                <input name="counterPrice" type="number" defaultValue={requestsModalLot.expectedPrice} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-brand-green font-bold text-lg" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Quantity</label>
                  <input name="quantity" type="number" defaultValue={counterOfferReq.requestedQuantity} className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Payment (Days)</label>
                  <input name="paymentTerms" type="number" defaultValue={counterOfferReq.paymentTerms} className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Message (Optional)</label>
                <textarea name="message" rows="2" className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50" placeholder="e.g. Price is fixed but I can arrange transport..."></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setCounterOfferReq(null)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200">Cancel</button>
                <button type="submit" className="flex-1 bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-sm">Send Counter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW BUYER MODAL */}
      {viewBuyerData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
           <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
             <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-4">
                 <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                   <Briefcase className="h-8 w-8" />
                 </div>
                 <div>
                   <h2 className="text-xl font-black text-gray-900">{viewBuyerData.name}</h2>
                   <p className="text-gray-500 font-medium flex items-center gap-1"><MapPin className="h-3 w-3" /> {viewBuyerData.city}, {viewBuyerData.state || 'India'}</p>
                 </div>
               </div>
               <button onClick={() => setViewBuyerData(null)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><X className="h-6 w-6"/></button>
             </div>
             
             <div className="space-y-4">
               <div className="bg-green-50 text-green-800 p-3 rounded-xl border border-green-100 font-bold flex items-center gap-2 text-sm">
                 <ShieldCheck className="h-5 w-5" /> Verified Smart Bharat Buyer
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                    <p className="text-xs text-gray-500 font-bold uppercase">Business Type</p>
                    <p className="font-bold text-gray-900">Wholesale Trader</p>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                    <p className="text-xs text-gray-500 font-bold uppercase">Payment Rating</p>
                    <p className="font-bold text-gray-900">Excellent (4.8/5)</p>
                  </div>
               </div>
               <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 font-bold uppercase mb-2">Platform Activity</p>
                  <ul className="space-y-2 text-sm font-medium text-gray-700">
                    <li>• Active since: 2024</li>
                    <li>• Completed Transactions: 45+</li>
                    <li>• Typical Payment Term: 5-7 Days</li>
                  </ul>
               </div>
             </div>
             
             <button onClick={() => setViewBuyerData(null)} className="w-full mt-6 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200">
               Close Profile
             </button>
           </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="h-16 w-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{confirmModal.title}</h2>
            <p className="text-gray-600 mb-8">{confirmModal.text}</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(null)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200">Cancel</button>
              <button onClick={confirmModal.action} className="flex-1 bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-sm">Confirm</button>
            </div>
          </div>
        </div>
      )}
      
      {/* LOT DETAILS MODAL */}
      {lotDetailsModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[50] p-4">
           <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">Lot Details</h2>
                <button onClick={() => setLotDetailsModal(null)} className="p-2 hover:bg-gray-200 rounded-full bg-white text-gray-500"><X className="h-6 w-6"/></button>
             </div>
             <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900">{lotDetailsModal.crop}</h3>
                    <p className="text-gray-500 font-medium">Lot ID: {lotDetailsModal.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-bold">Asking Price</p>
                    <p className="text-2xl font-black text-brand-green">₹{lotDetailsModal.expectedPrice}/q</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div><p className="text-xs text-gray-500 uppercase font-bold">Original Qty</p><p className="font-bold text-gray-900">{lotDetailsModal.quantity} T</p></div>
                  <div><p className="text-xs text-gray-500 uppercase font-bold">Available Qty</p><p className="font-bold text-green-600">{lotDetailsModal.availableQuantity} T</p></div>
                  <div><p className="text-xs text-gray-500 uppercase font-bold">Grade</p><p className="font-bold text-gray-900">{lotDetailsModal.grade}</p></div>
                  <div><p className="text-xs text-gray-500 uppercase font-bold">Location</p><p className="font-bold text-gray-900">{lotDetailsModal.location || lotDetailsModal.village}</p></div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Market Interest</h4>
                  <p className="text-blue-800 text-sm">
                    This lot has received <strong>{getRequestsForLot(lotDetailsModal.id).length}</strong> purchase requests so far. 
                    {getRequestsForLot(lotDetailsModal.id).filter(r => r.status === 'Accepted').length > 0 && 
                      " Portions of this lot have already been sold."}
                  </p>
                </div>
                
                <button onClick={() => { setLotDetailsModal(null); setRequestsModalLot(lotDetailsModal); }} className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-sm text-lg">
                  Manage Requests for this Lot
                </button>
             </div>
           </div>
        </div>
      )}

    </div>
  );
}
