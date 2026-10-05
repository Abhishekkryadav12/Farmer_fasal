import { useNavigate } from 'react-router-dom';
import { Sprout, ShieldCheck, CloudRain, IndianRupee, Users, Box, Wallet, MapPin, Handshake, Info, Search, HelpCircle, Tractor } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useAppContext();
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <section className="bg-brand-light-green text-center py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Sprout className="h-16 w-16 text-brand-green mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('home.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/what-to-grow')}
              className="bg-brand-green text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-700 transition shadow-sm"
            >
              {t('home.explore')}
            </button>
            <button 
              onClick={() => navigate('/sell-destination')}
              className="bg-white text-brand-green border border-brand-green px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition shadow-sm"
            >
              {t('home.findMarket')}
            </button>
          </div>
        </div>
      </section>

      {/* 8. WHAT DO YOU WANT TO DO TODAY? */}
      <section className="py-12 px-4 max-w-4xl mx-auto w-full">
        <h2 className="text-sm font-bold text-gray-500 mb-6 text-center tracking-widest uppercase">What do you want to do today?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={()=>navigate('/market')} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:border-brand-green hover:shadow-md transition text-center flex flex-col items-center justify-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mandi Bhav</h3>
            <p className="text-gray-500 text-sm">Check market prices and compare selling opportunities.</p>
          </button>
          
          <button onClick={()=>navigate('/buyers')} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:border-brand-green hover:shadow-md transition text-center flex flex-col items-center justify-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Buyers</h3>
            <p className="text-gray-500 text-sm">Find buyers looking for your crop.</p>
          </button>
          
          <button onClick={()=>navigate('/sell-crop')} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:border-brand-green hover:shadow-md transition text-center flex flex-col items-center justify-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚜</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sell Crop</h3>
            <p className="text-gray-500 text-sm">Create your crop lot and connect with buyers.</p>
          </button>
        </div>
      </section>

      {/* 5. MAIN FARMER JOURNEY */}
      {(!user || user.role !== 'BUYER') && (
      <section className="py-20 px-4 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Your Farming Journey</h2>
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-2 relative">
            { [
              { num: '01', icon: Sprout, title: t("navbar.whatToGrow", "What to Grow"), desc: "Choose suitable crops.", path: "/what-to-grow" },
              { num: '02', icon: ShieldCheck, title: t("navbar.cropHealth", "Crop Health"), desc: "Check pests & diseases.", path: "/crop-health" },
              { num: '03', icon: CloudRain, title: t("navbar.weather", "Weather"), desc: "Get weather guidance.", path: "/weather" },
              { num: '04', icon: IndianRupee, title: t("navbar.mandiBhav", "Mandi Bhav"), desc: "Compare market prices.", path: "/market" },
              { num: '05', icon: Users, title: t("navbar.buyers", "Buyers"), desc: "Connect with buyers.", path: "/buyers" },
              { num: '06', icon: Box, title: t("navbar.sellCrop", "Sell Crop"), desc: "Create a crop lot.", path: "/sell-crop" },
              { num: '07', icon: Wallet, title: t("navbar.payments", "Payments"), desc: "Track settlement.", path: "/payments" }
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col lg:flex-row items-center relative z-10">
                <div className="flex flex-col items-center cursor-pointer group w-32" onClick={() => navigate(step.path)}>
                  <div className="bg-brand-light-green text-brand-green font-bold text-sm px-3 py-1 rounded-full mb-4 group-hover:bg-brand-green group-hover:text-white transition">
                    {step.num}
                  </div>
                  <div className="bg-white p-4 rounded-full border-2 border-gray-100 mb-4 group-hover:border-brand-green group-hover:shadow-md transition">
                    <step.icon className="h-6 w-6 text-gray-700 group-hover:text-brand-green" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-center mb-2 group-hover:text-brand-green leading-tight">{step.title}</h3>
                  <p className="text-xs text-gray-500 text-center px-1 hidden lg:block">{step.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div className="hidden lg:block h-[2px] w-6 bg-gray-200 mx-2 -translate-y-8"></div>
                )}
                {idx < arr.length - 1 && (
                  <div className="lg:hidden text-gray-300 my-4">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 7. KHETI PARTNERSHIP */}
      <section className="bg-yellow-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🌾 Kheti Karni Hai, Par Zameen Nahi?</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Jiske paas agricultural land hai lekin woh khud kheti nahi karta, aur jiske paas kheti karne ki capability hai lekin zameen nahi hai — Smart Bharat unhe connect karta hai.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 border border-yellow-200 shadow-sm text-center hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🏡 I Have Land</h3>
              <p className="text-gray-600 mb-8">Apni unused agricultural land ko farming partnership ke liye available karein.</p>
              <button onClick={() => navigate('/land-connect/list-land')} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition">
                List My Land
              </button>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-yellow-200 shadow-sm text-center hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">👨‍🌾 I Need Land</h3>
              <p className="text-gray-600 mb-8">Kheti karne ke liye suitable agricultural land find karein.</p>
              <button onClick={() => navigate('/land-connect/find')} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition">
                Explore Land
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
