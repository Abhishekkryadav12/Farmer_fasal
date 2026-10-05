import { Wallet, CheckCircle2, Circle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Payment() {
  const { payments } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Payment Status</h1>
        <p className="text-lg text-gray-600 mt-2">Apne payments track karein.</p>
      </div>

      <div className="space-y-6">
        {payments.map(payment => (
          <div key={payment.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start gap-4 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Wallet className="h-8 w-8 text-brand-green" />
                </div>
                <div>
                  <p className="text-gray-500 font-bold mb-1">Sale to {payment.buyer}</p>
                  <h3 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </h3>
                </div>
              </div>
              <div className="text-left md:text-right">
                <span className={`inline-block text-sm font-bold px-4 py-2 rounded-full mb-2 ${
                  payment.status === 'Payment Received' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.status}
                </span>
                <p className="text-sm text-gray-500 font-bold">Expected: {payment.expectedDate}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-[15px] w-1 bg-gray-100 -z-10 rounded"></div>
                <div className="space-y-8">
                  {payment.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                      <div className="bg-white">
                        {step.done ? (
                          <CheckCircle2 className="h-8 w-8 text-brand-green bg-white rounded-full" />
                        ) : (
                          <Circle className="h-8 w-8 text-gray-300 bg-white rounded-full" />
                        )}
                      </div>
                      <span className={`text-lg font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
