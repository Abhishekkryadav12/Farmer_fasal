import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Clock, Truck, MapPin, X, ArrowLeft, Loader2, Phone, Box } from 'lucide-react';
import { mockUser } from '../data/mockData';

const farmIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933096.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const destIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2765/2765103.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function MapBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

export default function RouteMapView({ 
  onClose, 
  destination, 
  distance, 
  travelTime, 
  transportCost, 
  quantity, 
  crop,
  isMandi
}) {
  const [routePositions, setRoutePositions] = useState([]);
  const [routeSteps, setRouteSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [truckPos, setTruckPos] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  const farmLat = mockUser.lat;
  const farmLng = mockUser.lng;
  const destLat = destination.lat;
  const destLng = destination.lng;

  useEffect(() => {
    async function fetchRoute() {
      try {
        setLoading(true);
        // Using OSRM public API for real road routing!
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${farmLng},${farmLat};${destLng},${destLat}?overview=full&geometries=geojson&steps=true`);
        const data = await res.json();
        
        if (data.code === 'Ok' && data.routes.length > 0) {
          const route = data.routes[0];
          const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
          setRoutePositions(coords);
          setTruckPos(coords[Math.floor(coords.length / 2)]);
          
          if (route.legs && route.legs[0] && route.legs[0].steps) {
            // Filter steps to major roads (those with names) to avoid clutter
            const majorSteps = route.legs[0].steps.filter(s => s.name && s.name.length > 0);
            setRouteSteps(majorSteps);
          }
        } else {
          throw new Error('No route found');
        }
      } catch (err) {
        console.error(err);
        const fallbackRoute = [[farmLat, farmLng], [destLat, destLng]];
        setRoutePositions(fallbackRoute);
        setTruckPos([(farmLat + destLat)/2, (farmLng + destLng)/2]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchRoute();
  }, [farmLat, farmLng, destLat, destLng]);

  const mapBounds = routePositions.length > 0 ? L.latLngBounds(routePositions) : L.latLngBounds([[farmLat, farmLng], [destLat, destLng]]);
  
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col md:flex-row overflow-hidden">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-10 shadow-sm">
        <button onClick={onClose} className="flex items-center gap-2 text-gray-700 font-bold">
          <ArrowLeft className="h-5 w-5" /> Route to {destination.name}
        </button>
      </div>

      {/* MAP SECTION (Left on Desktop, Top on Mobile) */}
      <div className="flex-1 relative bg-gray-100 flex flex-col min-h-[40vh] md:min-h-screen">
        {/* Desktop Header Overlay */}
        <div className="hidden md:flex absolute top-6 left-6 z-[400] bg-white p-4 rounded-xl shadow-lg items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Route to {destination.name}</h1>
            <p className="text-sm text-gray-500 font-medium">{mockUser.village}, {mockUser.state} &nbsp;→&nbsp; {destination.city}</p>
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 z-[400] bg-white/80 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 text-brand-green animate-spin mb-2" />
            <p className="font-bold text-gray-700">Calculating your route...</p>
          </div>
        )}

        <MapContainer 
          center={[farmLat, farmLng]} 
          zoom={6} 
          style={{ height: '100%', width: '100%', zIndex: 10 }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {routePositions.length > 0 && (
            <Polyline 
              positions={routePositions} 
              color="#3b82f6" 
              weight={6} 
              opacity={0.8}
            />
          )}

          <Marker position={[farmLat, farmLng]} icon={farmIcon}>
            <Tooltip permanent direction="bottom" offset={[0, 10]} className="font-bold">Your Farm</Tooltip>
          </Marker>
          
          <Marker position={[destLat, destLng]} icon={destIcon}>
            <Tooltip permanent direction="top" offset={[0, -20]} className="font-bold">{destination.name}</Tooltip>
          </Marker>

          {truckPos && (
            <Marker position={truckPos} icon={truckIcon}>
              <Tooltip direction="right" offset={[15, 0]}>Estimated Route</Tooltip>
            </Marker>
          )}

          <MapBounds bounds={mapBounds} />
        </MapContainer>
      </div>

      {/* ROUTE SUMMARY SECTION (Right on Desktop, Bottom on Mobile) */}
      <div className="w-full md:w-[400px] lg:w-[450px] bg-white border-l border-gray-200 shadow-2xl z-20 flex flex-col h-[60vh] md:h-screen overflow-y-auto">
        
        {/* Desktop Close Button */}
        <div className="hidden md:flex justify-end p-4">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 md:pt-0 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Truck className="h-6 w-6 text-brand-green" /> Route Summary
          </h2>

          <div className="relative pl-6 pb-6 border-l-2 border-gray-200 ml-3 mb-2">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white ring-2 ring-green-100"></div>
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">From</p>
            <p className="font-bold text-gray-900 text-lg">Your Farm</p>
            <p className="text-gray-600">{mockUser.village}, {mockUser.state}</p>
          </div>

          <div className="relative pl-6 pb-2 ml-3">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100"></div>
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">To</p>
            <p className="font-bold text-gray-900 text-lg">{destination.name}</p>
            <p className="text-gray-600">{destination.city}, {destination.state}</p>
          </div>

          <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <MapPin className="h-5 w-5" /> Distance
              </div>
              <span className="font-bold text-gray-900 text-lg">{distance} km</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Clock className="h-5 w-5" /> Travel Time
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900 text-lg">{travelTime}</span>
                <p className="text-xs text-yellow-600 font-bold mt-0.5">Moderate Traffic</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2 text-brand-green font-bold">
                <Truck className="h-5 w-5" /> Est. Transport
              </div>
              <div className="text-right">
                <span className="font-black text-brand-green text-xl">₹{transportCost.toLocaleString()}</span>
                <p className="text-xs text-gray-500 font-medium mt-0.5">₹{Math.round(transportCost/quantity)} / Qtl</p>
              </div>
            </div>
          </div>

          {/* Route Steps Collapsible */}
          {routeSteps.length > 0 && (
            <div className="mt-6 border border-gray-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setShowSteps(!showSteps)}
                className="w-full bg-gray-50 p-4 flex justify-between items-center font-bold text-gray-700 hover:bg-gray-100 transition"
              >
                <span>🛣️ Route Details</span>
                <span className="text-xl">{showSteps ? '−' : '+'}</span>
              </button>
              
              {showSteps && (
                <div className="p-4 bg-white max-h-48 overflow-y-auto space-y-3">
                  <div className="flex gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-4 h-4 rounded-full bg-brand-green mt-0.5 shrink-0"></div>
                    <div>Start at {mockUser.village}, {mockUser.state}</div>
                  </div>
                  
                  {routeSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-gray-600 font-medium border-l-2 border-gray-200 ml-2 pl-4 py-1">
                      <div>↓</div>
                      <div className="text-gray-800">{step.name}</div>
                    </div>
                  ))}

                  <div className="flex gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-4 h-4 rounded-full bg-blue-600 mt-0.5 shrink-0"></div>
                    <div>Arrive at {destination.name}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 space-y-3 pb-6">
            <a 
              href={`https://www.google.com/maps/dir/?api=1&origin=${farmLat},${farmLng}&destination=${destLat},${destLng}`}
              target="_blank" rel="noreferrer"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-2"
            >
              <Navigation className="h-5 w-5" /> Start Navigation
            </a>
            
            {isMandi ? (
              <button className="w-full bg-white border-2 border-brand-green text-brand-green py-4 rounded-xl font-bold hover:bg-green-50 transition shadow-sm flex items-center justify-center gap-2">
                <Box className="h-5 w-5" /> Create Crop Lot for this Mandi
              </button>
            ) : (
              <button className="w-full bg-white border-2 border-brand-green text-brand-green py-4 rounded-xl font-bold hover:bg-green-50 transition shadow-sm flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" /> Contact Buyer
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
