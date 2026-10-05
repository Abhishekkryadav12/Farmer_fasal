import { Users, Package, ShoppingCart, CreditCard, Activity, Leaf, MapPin, Truck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FPODashboard() {
  const { user } = useAuth();
  const { fpoBulkLots } = useAppContext();

  const data = [
    { name: 'Jan', qty: 450 },
    { name: 'Feb', qty: 620 },
    { name: 'Mar', qty: 780 },
    { name: 'Apr', qty: 910 },
    { name: 'May', qty: 1100 },
    { name: 'Jun', qty: 1250 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Welcome, {user?.name || 'Kisan FPO'}</h1>
        <p className="text-gray-500 mt-1">Organization Overview</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Associated Farmers</p>
          <p className="text-2xl font-black text-gray-900">128</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Total Available Produce</p>
          <p className="text-2xl font-black text-gray-900">1,840 Qtl</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Active Bulk Lots</p>
          <p className="text-2xl font-black text-gray-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Active Buyers</p>
          <p className="text-2xl font-black text-gray-900">26</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Pending Offers</p>
          <p className="text-2xl font-black text-gray-900">8</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Pending Payments</p>
          <p className="text-2xl font-black text-green-600">₹4.85 L</p>
        </div>
      </div>

      {/* CHARTS AND INVENTORY */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
           <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Aggregated Produce (Qtl)</h2>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="qty" fill="#9333ea" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
           <h2 className="text-xl font-bold text-gray-900 mb-6">Crop Inventory</h2>
           <div className="space-y-4">
             {[
               { crop: 'Wheat', qty: 620, color: 'bg-amber-500', width: '80%' },
               { crop: 'Rice', qty: 410, color: 'bg-emerald-500', width: '60%' },
               { crop: 'Maize', qty: 280, color: 'bg-yellow-400', width: '40%' },
               { crop: 'Mustard', qty: 190, color: 'bg-yellow-600', width: '25%' },
               { crop: 'Cotton', qty: 140, color: 'bg-slate-500', width: '15%' },
               { crop: 'Vegetables', qty: 200, color: 'bg-green-500', width: '30%' },
             ].map((item, idx) => (
               <div key={idx}>
                 <div className="flex justify-between text-sm mb-1 font-bold">
                   <span className="text-gray-700">{item.crop}</span>
                   <span className="text-gray-900">{item.qty} Qtl</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-2">
                   <div className={`${item.color} h-2 rounded-full`} style={{ width: item.width }}></div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Bulk Lots</h2>
            <button className="text-purple-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="pb-3 font-medium">Lot ID</th>
                  <th className="pb-3 font-medium">Crop</th>
                  <th className="pb-3 font-medium">Quantity</th>
                  <th className="pb-3 font-medium">Farmers</th>
                  <th className="pb-3 font-medium">Target Market</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {fpoBulkLots.map((lot) => (
                  <tr key={lot.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 font-bold text-purple-700">{lot.id}</td>
                    <td className="py-4 font-bold text-gray-900">{lot.crop} <span className="text-xs text-gray-500 font-normal block">{lot.quality}</span></td>
                    <td className="py-4 font-bold text-gray-900">{lot.quantity} Qtl</td>
                    <td className="py-4 text-gray-600">{lot.farmersCount}</td>
                    <td className="py-4 text-gray-600">{lot.market}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        lot.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        lot.status === 'Negotiation' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {lot.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-gray-100">
            {[
              { icon: Leaf, text: 'Farmer Rajesh Kumar added 25 Qtl Wheat', color: 'text-green-500', bg: 'bg-green-100' },
              { icon: Package, text: 'Bulk Lot BL-1042 created', color: 'text-purple-500', bg: 'bg-purple-100' },
              { icon: ShoppingCart, text: 'Buyer Delhi Agro Foods submitted offer', color: 'text-blue-500', bg: 'bg-blue-100' },
              { icon: Users, text: '120 Qtl Wheat successfully aggregated', color: 'text-amber-500', bg: 'bg-amber-100' },
              { icon: CreditCard, text: 'Payment received from Punjab Grain Traders', color: 'text-emerald-500', bg: 'bg-emerald-100' },
              { icon: Truck, text: 'Logistics shipment LT-203 started', color: 'text-orange-500', bg: 'bg-orange-100' },
            ].map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 border-4 border-white ${activity.bg} ${activity.color} relative z-10`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium pt-1">{activity.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
