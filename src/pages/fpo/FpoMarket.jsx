import { useAppContext } from '../../context/AppContext';
import { Store, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function FpoMarket() {
  const { mandis } = useAppContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Markets & Mandi</h1>
        <p className="text-gray-500 mt-1">Compare different markets to find the best net realisation for your aggregated crops.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-900">Market Comparison (Wheat)</h2>
          <select className="border border-gray-200 rounded-lg px-3 py-1 bg-white font-medium text-sm">
             <option>Wheat</option>
             <option>Rice</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-gray-100">
              <tr className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                <th className="p-6">Mandi</th>
                <th className="p-6">Price/Qtl</th>
                <th className="p-6">Distance</th>
                <th className="p-6">Transport</th>
                <th className="p-6">Storage</th>
                <th className="p-6">Est. Net Realisation</th>
                <th className="p-6">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mandis.map((mandi, idx) => {
                const transport = mandi.transport || (mandi.distance * 0.5).toFixed(0);
                const storage = mandi.storage || 20;
                const net = mandi.price - transport - storage;
                const trend = idx === 0 ? 'Rising' : idx === 1 ? 'Falling' : 'Stable';
                
                return (
                  <tr key={mandi.id} className="hover:bg-purple-50 transition">
                    <td className="p-6 font-bold text-gray-900 flex items-center gap-2">
                      <Store className="h-4 w-4 text-gray-400" /> {mandi.name}
                    </td>
                    <td className="p-6 font-black text-gray-900">₹{mandi.price}</td>
                    <td className="p-6 text-gray-600 font-medium">{mandi.distance} km</td>
                    <td className="p-6 text-red-500 font-bold">-₹{transport}</td>
                    <td className="p-6 text-red-500 font-bold">-₹{storage}</td>
                    <td className="p-6 font-black text-green-600 text-lg">₹{net}</td>
                    <td className="p-6">
                      {trend === 'Rising' ? <TrendingUp className="text-green-500 h-5 w-5" /> : 
                       trend === 'Falling' ? <TrendingDown className="text-red-500 h-5 w-5" /> : 
                       <Minus className="text-gray-400 h-5 w-5" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 font-medium flex gap-2">
        <span className="font-bold">Note:</span> Estimated Net Realisation = Mandi Price - (Estimated Transport + Estimated Storage). Always calculate actual logistics costs before dispatching bulk lots.
      </div>
    </div>
  );
}
