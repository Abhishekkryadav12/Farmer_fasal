import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo accounts for mock authentication
  const demoAccounts = {
    'farmer@smartbharat.demo': { email: 'farmer@smartbharat.demo', password: 'Farmer@123', role: 'FARMER', name: 'Ramesh ji', phone: '9876543210' },
    'buyer@smartbharat.demo': { email: 'buyer@smartbharat.demo', password: 'Buyer@123', role: 'BUYER', name: 'Aggarwal Traders', phone: '9876543211' },
    'fpo@smartbharat.demo': { email: 'fpo@smartbharat.demo', password: 'Fpo@123', role: 'FPO', name: 'Kisan FPO', phone: '9876543212' },
    'admin@smartbharat.demo': { email: 'admin@smartbharat.demo', password: 'Admin@123', role: 'ADMIN', name: 'Admin', phone: '9876543213' }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('smartBharatUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (emailOrPhone, password, role) => {
    // Check demo accounts first
    const account = Object.values(demoAccounts).find(
      a => (a.email === emailOrPhone || a.phone === emailOrPhone) && a.password === password && (role ? a.role === role : true)
    );

    if (account) {
      localStorage.setItem('smartBharatUser', JSON.stringify(account));
      setUser(account);
      return { success: true, role: account.role };
    }

    // Check localStorage registered users (mock backend)
    const users = JSON.parse(localStorage.getItem('smartBharatUsers') || '[]');
    const registeredUser = users.find(u => 
      (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
    );

    if (registeredUser) {
       localStorage.setItem('smartBharatUser', JSON.stringify(registeredUser));
       setUser(registeredUser);
       return { success: true, role: registeredUser.role };
    }

    return { success: false, message: 'Invalid email/mobile or password' };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('smartBharatUsers') || '[]');
    
    // Check if exists
    if (users.find(u => u.email === userData.email || u.phone === userData.phone)) {
      return { success: false, message: 'Email or mobile number already registered' };
    }

    const newUser = { id: Date.now().toString(), ...userData };
    users.push(newUser);
    localStorage.setItem('smartBharatUsers', JSON.stringify(users));
    
    // Log them in immediately after register
    localStorage.setItem('smartBharatUser', JSON.stringify(newUser));
    setUser(newUser);
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('smartBharatUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, demoAccounts }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
