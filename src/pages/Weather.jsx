import { Sun, CloudRain, Wind, AlertTriangle, Cloud, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Weather() {
  const { user } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Aaj Ka Mausam</h1>
        <p className="text-lg text-gray-600 mt-2 flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5" /> {user.village}, {user.state}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-sm relative overflow-hidden">
          <Sun className="absolute -right-8 -top-8 h-48 w-48 text-white opacity-10" />
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
            <div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-7xl font-bold">28°C</span>
                <span className="text-2xl pb-2 opacity-90">🌤️ Sunny</span>
              </div>
              <p className="text-lg opacity-90">Feels like 30°C</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 bg-black/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-center">
                <CloudRain className="h-6 w-6 mx-auto mb-1 opacity-80" />
                <p className="text-sm opacity-80 mb-1">Rain Chance</p>
                <p className="font-bold text-xl">70%</p>
              </div>
              <div className="text-center border-l border-white/20">
                <Wind className="h-6 w-6 mx-auto mb-1 opacity-80" />
                <p className="text-sm opacity-80 mb-1">Wind</p>
                <p className="font-bold text-xl">12 km/h</p>
              </div>
              <div className="text-center border-l border-white/20">
                <Cloud className="h-6 w-6 mx-auto mb-1 opacity-80" />
                <p className="text-sm opacity-80 mb-1">Humidity</p>
                <p className="font-bold text-xl">65%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">7-Day Forecast</h2>
          <div className="space-y-4">
            {[
              { day: 'Today', icon: Sun, temp: '28°', rain: '70%' },
              { day: 'Tomorrow', icon: CloudRain, temp: '26°', rain: '90%' },
              { day: 'Day 3', icon: CloudRain, temp: '25°', rain: '60%' },
              { day: 'Day 4', icon: Cloud, temp: '27°', rain: '20%' },
              { day: 'Day 5', icon: Sun, temp: '29°', rain: '0%' },
              { day: 'Day 6', icon: Sun, temp: '30°', rain: '0%' },
              { day: 'Day 7', icon: Sun, temp: '31°', rain: '0%' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="font-medium text-gray-700 w-24">{item.day}</span>
                <div className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500 w-8">{item.rain}</span>
                </div>
                <span className="font-bold text-gray-900">{item.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory */}
      <div className="bg-orange-50 border border-orange-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-orange-200 pb-4">Aapki Fasal Ke Liye</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-orange-100 flex gap-4">
            <div className="text-4xl">🌧️</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Rain Expected</h3>
              <p className="text-gray-700">Rain forecast ko dekhte hue irrigation aur spraying schedule ko reconsider karein.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-orange-100 flex gap-4 opacity-70">
            <div className="text-4xl">☀️</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Clear Weather (Later)</h3>
              <p className="text-gray-700">Harvest planning ke liye available weather window check karein.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Weather Alerts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-sm hover:shadow-md transition text-left">
            <h3 className="font-bold text-lg text-gray-900 mb-1 flex items-center gap-2">🌧️ Rain Alert</h3>
            <p className="text-gray-600">Rain expected in coming days</p>
          </button>
          <button className="bg-white border-l-4 border-red-500 rounded-xl p-6 shadow-sm hover:shadow-md transition text-left">
            <h3 className="font-bold text-lg text-gray-900 mb-1 flex items-center gap-2">🔥 Heat Alert</h3>
            <p className="text-gray-600">High temp expected next week</p>
          </button>
          <button className="bg-white border-l-4 border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-md transition text-left opacity-50">
            <h3 className="font-bold text-lg text-gray-900 mb-1 flex items-center gap-2">💨 Wind Alert</h3>
            <p className="text-gray-600">No strong winds expected</p>
          </button>
        </div>
      </div>
    </div>
  );
}
