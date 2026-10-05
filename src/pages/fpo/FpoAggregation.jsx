import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Package, Users, MapPin, Check, Plus } from 'lucide-react';

export default function FpoAggregation() {
  const { fpoFarmers, fpoBulkLots, setFpoBulkLots } = useAppContext();
  const navigate = useNavigate();
  
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter farmers who have the selected crop
  const availableFarmers = fpoFarmers.filter(f => f.crop === selectedCrop);

  const handleToggleFarmer = (farmerId) => {
    if (selectedFarmers.includes(farmerId)) {
      setSelectedFarmers(selectedFarmers.filter(id => id !== farmerId));
    } else {
      setSelectedFarmers([...selectedFarmers, farmerId]);
    }
  };

  const selectedFarmersData = availableFarmers.filter(f => selectedFarmers.includes(f.id));
  const totalQuantity = selectedFarmersData.reduce((sum, f) => sum + f.availableQtl, 0);

  const handleCreateBulkLot = () => {
    if (totalQuantity === 0) return;

    const newLot = {
      id: `BL-${1000 + fpoBulkLots.length + 1}`,
      crop: selectedCrop,
      quantity: totalQuantity,
      farmersCount: selectedFarmers.length,
      quality: 'Grade A',
      collection: 'Malout Collection Center',
      market: 'To be determined',
      status: 'Active'
    };

    setFpoBulkLots([newLot, ...fpoBulkLots]);
    setShowSuccess(true);
    setTimeout(() => navigate('/fpo/crop-lots'), 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Crop Aggregation</h1>
        <p className="text-gray-500 mt-1">Combine produce from multiple associated farmers to create a bulk lot.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT: Selection Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 h-6 w-6 rounded-full flex items-center justify-center text-sm">1</span> 
              Select Crop
            </h2>
            <div className="flex gap-3">
              {['Wheat', 'Rice', 'Mustard', 'Cotton'].map(crop => (
                <button
                  key={crop}
                  onClick={() => { setSelectedCrop(crop); setSelectedFarmers([]); }}
                  className={`px-6 py-3 rounded-xl font-bold border-2 transition ${
                    selectedCrop === crop ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-600 hover:border-purple-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 h-6 w-6 rounded-full flex items-center justify-center text-sm">2</span> 
              Select Participating Farmers
            </h2>
            
            <div className="space-y-3">
              {availableFarmers.length > 0 ? availableFarmers.map(farmer => {
                const isSelected = selectedFarmers.includes(farmer.id);
                return (
                  <div 
                    key={farmer.id}
                    onClick={() => handleToggleFarmer(farmer.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                      isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-6 w-6 rounded flex items-center justify-center border ${isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{farmer.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3"/> {farmer.village}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-gray-900">{farmer.availableQtl} Qtl</p>
                      <p className="text-xs text-purple-600 font-bold uppercase">{farmer.crop}</p>
                    </div>
                  </div>
                );
              }) : (
                <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-gray-500 font-medium">No associated farmers found with {selectedCrop}.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Aggregation Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-3xl p-6 shadow-lg text-white sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Package className="h-5 w-5 text-purple-400" /> Aggregation Summary
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 font-medium">Crop</span>
                <span className="font-bold">{selectedCrop}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 font-medium">Farmers Selected</span>
                <span className="font-bold">{selectedFarmers.length}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 font-medium">Average Quality</span>
                <span className="font-bold">Grade A</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 font-medium">Collection Center</span>
                <span className="font-bold">Malout</span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-gray-300 font-bold text-lg">Total Quantity</span>
                <span className="text-3xl font-black text-purple-400">{totalQuantity} Qtl</span>
              </div>
            </div>

            {selectedFarmersData.length > 0 && (
              <div className="mb-8 bg-gray-800 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Farmer Contributions</p>
                <div className="space-y-2">
                  {selectedFarmersData.map(f => (
                    <div key={f.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">{f.name}</span>
                      <span className="font-bold text-white">{f.availableQtl} Qtl</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={handleCreateBulkLot}
              disabled={totalQuantity === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition flex justify-center items-center gap-2 ${
                totalQuantity > 0 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus className="h-5 w-5" /> Create Bulk Lot
            </button>
            
            {showSuccess && (
              <div className="mt-4 p-3 bg-green-900/50 text-green-400 text-sm font-bold text-center rounded-lg border border-green-800">
                Bulk lot created successfully! Redirecting...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
