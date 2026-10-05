import { Bell, Package, CreditCard, Users, Truck } from 'lucide-react';

export default function FpoNotifications() {
  const notifications = [
    { id: 1, type: 'offer', text: 'New buyer offer received from Delhi Agro Foods', time: '2 hours ago', icon: Bell, bg: 'bg-blue-100', color: 'text-blue-600', read: false },
    { id: 2, type: 'payment', text: 'Payment of ₹8.4L received from Punjab Grain Traders', time: '5 hours ago', icon: CreditCard, bg: 'bg-green-100', color: 'text-green-600', read: false },
    { id: 3, type: 'lot', text: 'Bulk Lot BL-1042 successfully created', time: '1 day ago', icon: Package, bg: 'bg-purple-100', color: 'text-purple-600', read: true },
    { id: 4, type: 'farmer', text: 'Farmer Rajesh Kumar added 25 Qtl Wheat', time: '1 day ago', icon: Users, bg: 'bg-amber-100', color: 'text-amber-600', read: true },
    { id: 5, type: 'logistics', text: 'Shipment LT-203 is now in transit', time: '2 days ago', icon: Truck, bg: 'bg-orange-100', color: 'text-orange-600', read: true },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated on your FPO's activities.</p>
        </div>
        <button className="text-purple-600 font-bold hover:underline text-sm">Mark All as Read</button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {notifications.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} className={`p-6 flex items-start gap-4 transition ${n.read ? 'bg-white' : 'bg-purple-50/30'}`}>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className={`text-gray-900 ${n.read ? 'font-medium' : 'font-bold'}`}>{n.text}</p>
                  <p className="text-sm text-gray-500 mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <div className="h-3 w-3 bg-purple-600 rounded-full mt-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
