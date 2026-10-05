import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, Sprout, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useAppContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Desktop only shows high-level navigation
  const primaryLinks = [
    { name: t('navbar.home', 'Home'), path: '/' },
    { name: t('navbar.khetiPartnership', 'Kheti Partnership'), path: '/land-connect' },
    { name: t('navbar.mandiBhav', 'Mandi Bhav'), path: '/market' }
  ];

  if (user?.role !== 'BUYER') {
    primaryLinks.push(
      { name: t('navbar.buyers', 'Buyers'), path: '/buyers' },
      { name: t('navbar.sellCrop', 'Sell Crop'), path: '/sell-crop' }
    );
  } else {
    primaryLinks.push(
      { name: 'Marketplace', path: '/buyers' }
    );
  }

  // Mobile shows everything, grouped
  const secondaryLinks = [
    { name: t('navbar.whatToGrow'), path: '/what-to-grow', hideForRoles: ['BUYER'] },
    { name: t('navbar.cropHealth'), path: '/crop-health', hideForRoles: ['BUYER'] },
    { name: t('navbar.weather'), path: '/weather', hideForRoles: ['BUYER'] },
    { name: t('navbar.myCrop'), path: '/my-crop', hideForRoles: ['BUYER'] },
    { name: t('navbar.payments'), path: '/payments' },
    { name: t('navbar.help'), path: '/help' }
  ].filter(link => !link.hideForRoles || !link.hideForRoles.includes(user?.role));

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/')}>
            <Sprout className="h-8 w-8 text-brand-green" />
            <span className="font-bold text-xl text-gray-900 tracking-tight hidden sm:block">SMART BHARAT</span>
          </div>

          {/* Desktop Nav - Primary Links Only */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {user && primaryLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors hover:text-brand-green ${
                    isActive ? 'text-brand-green border-b-2 border-brand-green pb-1' : 'text-gray-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            
            {user ? (
              <>
                <button className="text-gray-600 hover:text-brand-green relative" onClick={() => navigate('/notifications')}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="text-gray-600 hover:text-brand-green" onClick={() => navigate('/profile')}>
                  <User className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-700 ml-2 flex items-center gap-1 text-sm font-bold" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => navigate('/login')} className="text-brand-green font-bold px-4 py-2 hover:bg-brand-light-green rounded-lg">{t('navbar.login')}</button>
                <button onClick={() => navigate('/register')} className="bg-brand-green text-white font-bold px-4 py-2 hover:bg-green-700 rounded-lg">{t('navbar.register')}</button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-4 shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-brand-green focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 pt-2 pb-6">
            {user ? (
              <>
                <div className="space-y-1 mb-4">
                  <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Main Menu</p>
                  {primaryLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block px-3 py-3 rounded-xl text-base font-bold ${
                          isActive ? 'bg-brand-light-green text-brand-green' : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
                
                <div className="space-y-1 border-t border-gray-100 pt-4">
                  <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">More Features</p>
                  {secondaryLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-sm font-medium ${
                          isActive ? 'bg-brand-light-green text-brand-green' : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6 flex justify-around">
                  <button className="flex flex-col items-center text-gray-600" onClick={() => { navigate('/notifications'); closeMenu(); }}>
                    <Bell className="h-6 w-6 mb-1" />
                    <span className="text-xs">Notifications</span>
                  </button>
                  <button className="flex flex-col items-center text-gray-600" onClick={() => { navigate('/profile'); closeMenu(); }}>
                    <User className="h-6 w-6 mb-1" />
                    <span className="text-xs">Profile</span>
                  </button>
                  <button className="flex flex-col items-center text-red-500" onClick={handleLogout}>
                    <LogOut className="h-6 w-6 mb-1" />
                    <span className="text-xs font-bold">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <button onClick={() => { navigate('/login'); closeMenu(); }} className="w-full text-brand-green font-bold px-4 py-3 border border-brand-green rounded-xl text-center">Login</button>
                <button onClick={() => { navigate('/register'); closeMenu(); }} className="w-full bg-brand-green text-white font-bold px-4 py-3 rounded-xl text-center">Register</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
