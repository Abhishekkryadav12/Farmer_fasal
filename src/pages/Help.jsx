import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { id: 1, question: "How to use Smart Bharat?", answer: "Smart Bharat helps you from planning your crop to selling it. Use the top menu to navigate between What to Grow, Crop Health, Weather, and finding Buyers." },
    { id: 2, question: "What to Grow", answer: "Enter your farm details in the 'What to Grow' section to get recommendations based on soil, water, and market demand." },
    { id: 3, question: "Crop Health", answer: "Upload a photo of your crop in the 'Crop Health' section to detect possible pests or diseases." },
    { id: 4, question: "Weather", answer: "Check the 7-day forecast and get specific advice on how weather affects your crop." },
    { id: 5, question: "Mandi Bhav", answer: "Compare mandi prices and calculate your actual earning after transport and storage costs." }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Aapki Madad Ke Liye</h1>
        <p className="text-lg text-gray-600 mt-2">Humari team aapki madad ke liye taiyaar hai.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4 hover:border-brand-green hover:shadow-md transition">
          <div className="bg-blue-50 p-6 rounded-full text-blue-600">
            <Phone className="h-10 w-10" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Contact Support</span>
          <span className="text-gray-500">Toll-free 1800-XXX-XXXX</span>
        </button>

        <button className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4 hover:border-brand-green hover:shadow-md transition">
          <div className="bg-green-50 p-6 rounded-full text-brand-green">
            <MessageCircle className="h-10 w-10" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Agriculture Expert</span>
          <span className="text-gray-500">Chat with KVK expert</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full text-left p-6 font-bold text-lg text-gray-900 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
              >
                {faq.question}
                <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === faq.id && (
                <div className="p-6 bg-white text-gray-700 text-lg border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
