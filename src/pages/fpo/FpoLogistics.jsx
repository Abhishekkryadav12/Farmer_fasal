import { useAppContext } from '../../context/AppContext';
import { Truck, MapPin, Navigation } from 'lucide-react';

export default function FpoLogistics() {
  const { fpoLogistics } = useAppContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Logistics & Shipments</h1>
        <p className="text-gray-500 mt-1">Track your bulk lot shipments to buyers and markets.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Active Shipments</p>
          <p className="text-2xl font-black text-gray-900">8</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Scheduled</p>
          <p className="text-2xl font-black text-gray-900">5</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">In Transit</p>
          <p className="text-2xl font-black text-orange-500">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Delivered</p>
          <p className="text-2xl font-black text-green-600">24</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                <th className="p-6">Shipment ID</th>
                <th className="p-6">Bulk Lot</th>
                <th className="p-6">Crop & Qty</th>
                <th className="p-6">Route</th>
                <th className="p-6">Distance</th>
                <th className="p-6">Est. Cost</th>
                <th className="p-6">Status</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fpoLogistics.map(shipment => (
                <tr key={shipment.id} className="hover:bg-gray-50 transition">
                  <td className="p-6 font-bold text-gray-900 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-orange-500" /> {shipment.id}
                  </td>
                  <td className="p-6 font-bold text-purple-700">{shipment.lotId}</td>
                  <td className="p-6">
                    <span className="font-bold text-gray-900">{shipment.quantity} Qtl</span>
                    <span className="text-xs text-gray-500 block">{shipment.crop}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-gray-700">{shipment.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-bold text-gray-900">{shipment.to}</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-600 font-medium">{shipment.distance} km</td>
                  <td className="p-6 font-bold text-gray-900">₹{shipment.cost}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      shipment.status === 'In Transit' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-200 flex items-center gap-1">
                      <Navigation className="h-3 w-3" /> View Route
                    </button>
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
