import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, Users, Package, LayoutDashboard, ShoppingCart, 
  Store, Truck, Database, CreditCard, Bell, User, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';

export default function FpoLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not FPO, redirect to home
  if (!user || user.role !== 'FPO') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
        <p className="text-gray-600">This portal is restricted to authorized FPOs.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-brand-green text-white font-bold rounded-lg hover:bg-green-700">Go to Home</button>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', path: '/fpo/dashboard', icon: LayoutDashboard },
    { name: 'Farmers', path: '/fpo/farmers', icon: Users },
    { name: 'Crop Aggregation', path: '/fpo/aggregation', icon: Package },
    { name: 'Bulk Crop Lots', path: '/fpo/crop-lots', icon: Store },
    { name: 'Buyers', path: '/fpo/buyers', icon: ShoppingCart },
    { name: 'Offers & Negotiation', path: '/fpo/offers', icon: Building2 },
    { name: 'Markets / Mandi', path: '/fpo/market', icon: Store },
    { name: 'Logistics', path: '/fpo/logistics', icon: Truck },
    { name: 'Storage', path: '/fpo/storage', icon: Database },
    { name: 'Payments', path: '/fpo/payments', icon: CreditCard },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavContent = () => (
    <>
      <div className="p-6">
        <div className="flex items-center gap-3 text-brand-green">
          <Building2 className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-black tracking-tight leading-tight">SMART BHARAT</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-700">FPO Portal</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 flex flex-col gap-1 overflow-y-auto h-[calc(100vh-180px)]">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Management</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${
                  isActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}

        <div className="mt-8 border-t border-gray-200 pt-6 space-y-1">
           <NavLink to="/fpo/notifications" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive ? 'bg-purple-100 text-purple-800' : 'text-gray-600 hover:bg-gray-100'}`}>
             <Bell className="h-5 w-5" /> Notifications
           </NavLink>
           <NavLink to="/fpo/profile" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive ? 'bg-purple-100 text-purple-800' : 'text-gray-600 hover:bg-gray-100'}`}>
             <User className="h-5 w-5" /> FPO Profile
           </NavLink>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Desktop & Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 shrink-0 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-purple-700">
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 hidden sm:block">Organization Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right mr-4">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Authorized Person</p>
            </div>
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold border border-purple-200">
              {user.name?.charAt(0)}
            </div>
            <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 p-2 rounded-lg ml-2">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
