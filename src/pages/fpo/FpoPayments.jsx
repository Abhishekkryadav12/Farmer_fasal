import { useAppContext } from '../../context/AppContext';
import { CreditCard, CheckCircle2, Clock } from 'lucide-react';

export default function FpoPayments() {
  const { fpoPayments } = useAppContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Payments & Distribution</h1>
        <p className="text-gray-500 mt-1">Track incoming buyer payments and manage farmer distributions.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Total Receivable</p>
          <p className="text-2xl font-black text-gray-900">₹12.8 L</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Received</p>
          <p className="text-2xl font-black text-green-600">₹8.4 L</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Pending (Buyer)</p>
          <p className="text-2xl font-black text-yellow-600">₹4.4 L</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 mb-1">Pending (Farmer Dist.)</p>
          <p className="text-2xl font-black text-orange-500">₹2.1 L</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-500" /> Incoming Buyer Payments
          </h2>
          <div className="space-y-4">
            {fpoPayments.map(payment => (
              <div key={payment.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{payment.buyer}</h3>
                    <p className="text-sm text-gray-500">Lot: <span className="font-bold text-purple-700">{payment.lot}</span></p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded flex items-center gap-1 ${
                    payment.status === 'Received' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {payment.status === 'Received' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {payment.status}
                  </span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <p className="text-xs text-gray-400 font-medium">Date: {payment.date}</p>
                  <p className="text-xl font-black text-gray-900">₹{payment.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-900">Farmer Distribution</h2>
             <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">Demo Calculation</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
            <p className="text-sm text-gray-500 font-bold mb-1">Selected Lot for Distribution</p>
            <p className="text-lg font-black text-purple-700">BL-1042 <span className="text-gray-900 font-normal">| Total Sale: ₹12,50,000</span></p>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Rajesh Kumar', qty: 100, amount: 250000, status: 'Paid' },
              { name: 'Gurpreet Singh', qty: 150, amount: 375000, status: 'Paid' },
              { name: 'Suresh Kumar', qty: 80, amount: 200000, status: 'Pending' },
              { name: 'Harpreet Kaur', qty: 170, amount: 425000, status: 'Pending' },
            ].map((farmer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-bold text-gray-900">{farmer.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{farmer.qty} Qtl contribution</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{farmer.amount.toLocaleString()}</p>
                  <span className={`text-xs font-bold ${farmer.status === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}>
                    {farmer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700">
            Process Pending Distributions
          </button>
        </div>
      </div>
    </div>
  );
}
