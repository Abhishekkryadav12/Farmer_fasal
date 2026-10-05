import { useAppContext } from '../../context/AppContext';
import { Database, Plus } from 'lucide-react';

export default function FpoStorage() {
  const { fpoStorage } = useAppContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Storage Management</h1>
        <p className="text-gray-500 mt-1">Manage warehouse capacity and reserve storage for bulk lots.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-1">Available Capacity</p>
            <p className="text-3xl font-black text-green-600">1,250 <span className="text-lg">Qtl</span></p>
          </div>
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
            <Database className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-1">Occupied</p>
            <p className="text-3xl font-black text-gray-900">2,850 <span className="text-lg">Qtl</span></p>
          </div>
          <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center">
            <Database className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 mb-1">Total Capacity</p>
            <p className="text-3xl font-black text-gray-900">4,100 <span className="text-lg">Qtl</span></p>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
            <Database className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {fpoStorage.map(storage => (
          <div key={storage.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{storage.name}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm font-medium">Capacity</span>
                  <span className="font-bold text-gray-900">{storage.capacity} Qtl</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm font-medium">Available</span>
                  <span className="font-bold text-green-600">{storage.available} Qtl</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-500 text-sm font-medium">Est. Cost</span>
                  <span className="font-bold text-red-500">₹{storage.cost}/Qtl/mo</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${((storage.capacity - storage.available)/storage.capacity)*100}%` }}></div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-purple-50 text-purple-700 py-2 rounded-xl font-bold hover:bg-purple-100 transition shadow-sm text-sm">
                Reserve Storage
              </button>
            </div>
          </div>
        ))}
        
        <div className="bg-gray-50 rounded-3xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:bg-gray-100 transition cursor-pointer min-h-[250px]">
          <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-gray-400">
            <Plus className="h-6 w-6" />
          </div>
          <p className="font-bold text-gray-900">Add Storage Facility</p>
          <p className="text-sm text-gray-500 mt-1">Register a new warehouse or collection center</p>
        </div>
      </div>
    </div>
  );
}
