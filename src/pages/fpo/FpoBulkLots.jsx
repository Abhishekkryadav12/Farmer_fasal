import { useAppContext } from '../../context/AppContext';
import { Package, Search, Filter, Eye, PauseCircle, Users, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FpoBulkLots() {
  const { fpoBulkLots } = useAppContext();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Negotiation': return 'bg-yellow-100 text-yellow-700';
      case 'Buyer Confirmed': return 'bg-purple-100 text-purple-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Bulk Crop Lots</h1>
          <p className="text-gray-500 mt-1">Manage aggregated produce and track their market status.</p>
        </div>
        <button 
          onClick={() => navigate('/fpo/aggregation')}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 shadow-sm"
        >
          Create New Lot
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Active Lots</p>
          <p className="text-2xl font-black text-green-600">{fpoBulkLots.filter(l => l.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">In Negotiation</p>
          <p className="text-2xl font-black text-yellow-600">{fpoBulkLots.filter(l => l.status === 'Negotiation').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Buyer Confirmed</p>
          <p className="text-2xl font-black text-purple-600">{fpoBulkLots.filter(l => l.status === 'Buyer Confirmed').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Completed</p>
          <p className="text-2xl font-black text-blue-600">{fpoBulkLots.filter(l => l.status === 'Completed').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Lot ID or Crop..." 
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-purple-500 font-medium"
          />
        </div>
        <div className="flex gap-4">
          <select className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-purple-500 font-medium text-gray-600">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Negotiation</option>
            <option>Buyer Confirmed</option>
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
                <th className="p-6">Lot ID</th>
                <th className="p-6">Crop & Qty</th>
                <th className="p-6">Farmers</th>
                <th className="p-6">Collection Center</th>
                <th className="p-6">Target Market</th>
                <th className="p-6">Status</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fpoBulkLots.map(lot => (
                <tr key={lot.id} className="hover:bg-gray-50 transition">
                  <td className="p-6">
                    <span className="font-black text-purple-700">{lot.id}</span>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-gray-900 text-lg">{lot.quantity} Qtl</p>
                    <p className="text-xs text-purple-600 font-bold bg-purple-50 inline-block px-2 py-0.5 rounded mt-1">{lot.crop} - {lot.quality}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-bold text-gray-700">{lot.farmersCount} Farmers</span>
                    </div>
                  </td>
                  <td className="p-6 font-bold text-gray-900">{lot.collection}</td>
                  <td className="p-6 text-gray-600 font-medium">{lot.market}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(lot.status)}`}>
                      {lot.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      {lot.status === 'Active' && (
                        <>
                          <button onClick={() => navigate('/fpo/buyers')} className="px-3 py-1.5 bg-purple-50 text-purple-700 font-bold text-sm rounded-lg hover:bg-purple-100">
                            Find Buyers
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {fpoBulkLots.length === 0 && (
            <div className="text-center py-16">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Bulk Lots Yet</h3>
              <p className="text-gray-500 mb-6">Create your first aggregated crop lot by combining farmer produce.</p>
              <button onClick={() => navigate('/fpo/aggregation')} className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold">Create Bulk Lot</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
