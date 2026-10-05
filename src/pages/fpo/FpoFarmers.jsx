import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Search, Filter, UserPlus, MapPin, MoreVertical } from 'lucide-react';

export default function FpoFarmers() {
  const { fpoFarmers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFarmers = fpoFarmers.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Associated Farmers</h1>
          <p className="text-gray-500 mt-1">Manage farmers associated with your FPO and view their available produce.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 shadow-sm"
        >
          <UserPlus className="h-5 w-5" /> Add Farmer
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or village..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-purple-500 font-medium"
          />
        </div>
        <div className="flex gap-4">
          <select className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-purple-500 font-medium text-gray-600">
            <option>Filter by Crop</option>
            <option>Wheat</option>
            <option>Rice</option>
            <option>Mustard</option>
          </select>
          <button className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center gap-2 font-bold">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                <th className="p-6">Farmer</th>
                <th className="p-6">Location</th>
                <th className="p-6">Phone</th>
                <th className="p-6">Total Land</th>
                <th className="p-6">Available Produce</th>
                <th className="p-6">Status</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredFarmers.map(farmer => (
                <tr key={farmer.id} className="hover:bg-gray-50 transition">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">
                        {farmer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{farmer.name}</p>
                        <p className="text-xs text-gray-500">{farmer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-gray-900">{farmer.village}</p>
                    <p className="text-xs text-gray-500">{farmer.district}</p>
                  </td>
                  <td className="p-6 text-gray-600 font-medium">{farmer.phone}</td>
                  <td className="p-6 font-bold text-gray-900">{farmer.land} Acres</td>
                  <td className="p-6">
                    <p className="font-bold text-gray-900">{farmer.availableQtl} Qtl</p>
                    <p className="text-xs text-purple-600 font-bold bg-purple-50 inline-block px-2 py-0.5 rounded mt-1">{farmer.crop}</p>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      {farmer.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <button className="text-purple-600 font-bold text-sm bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100">View</button>
                      <button className="text-gray-400 hover:text-gray-700"><MoreVertical className="h-5 w-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFarmers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">No farmers found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Farmer</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Farmer Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-purple-500" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mobile</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-purple-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Village</label>
                  <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-purple-500" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">District</label>
                  <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-purple-500" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Primary Crop</label>
                  <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-purple-500" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Available Qty</label>
                  <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 focus:outline-none focus:border-purple-500" required />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="bg-purple-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-purple-700">Add Farmer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
