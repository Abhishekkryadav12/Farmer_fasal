import { createContext, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  mockUser as initialUser, 
  cropRecommendations, 
  mandis, 
  buyers, 
  payments as initialPayments,
  todaySummary,
  initialCropLots,
  initialPurchaseRequests
} from '../data/mockData';
import { 
  initialFpoFarmers, initialFpoBulkLots, initialFpoBuyers, 
  initialFpoOffers, initialFpoLogistics, initialFpoStorage, initialFpoPayments 
} from '../data/mockDataFpo';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { t: i18nT, i18n } = useTranslation();
  
  const language = i18n.language;
  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('smartBharatLanguage', lang);
  };

  const [user, setUser] = useState(initialUser);
  const [cropLots, setCropLots] = useState(initialCropLots);
  const [purchaseRequests, setPurchaseRequests] = useState(initialPurchaseRequests);
  const [offers, setOffers] = useState([
    { id: 1, buyerId: 1, buyerName: 'Aggarwal Traders', price: 2450, status: 'pending' },
    { id: 2, buyerId: 2, buyerName: 'Kisan Agro', price: 2500, status: 'pending' },
    { id: 3, buyerId: 3, buyerName: 'Sharma & Sons', price: 2480, status: 'pending' }
  ]);
  const [payments, setPayments] = useState(initialPayments);

  const [fpoFarmers, setFpoFarmers] = useState(initialFpoFarmers);
  const [fpoBulkLots, setFpoBulkLots] = useState(initialFpoBulkLots);
  const [fpoBuyers, setFpoBuyers] = useState(initialFpoBuyers);
  const [fpoOffers, setFpoOffers] = useState(initialFpoOffers);
  const [fpoLogistics, setFpoLogistics] = useState(initialFpoLogistics);
  const [fpoStorage, setFpoStorage] = useState(initialFpoStorage);
  const [fpoPayments, setFpoPayments] = useState(initialFpoPayments);

  const t = (enText, hiTextOrOptions) => {
    let options = {};
    let hiText = null;
    if (typeof hiTextOrOptions === 'string') {
      hiText = hiTextOrOptions;
    } else if (typeof hiTextOrOptions === 'object') {
      options = hiTextOrOptions;
    }
    
    const translated = i18nT(enText, options);
    // If not found in i18n (returns key), fallback to enText or hiText depending on lang if provided
    if (translated === enText) {
       return (language === 'hi' && hiText) ? hiText : enText;
    }
    return translated;
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, t,
      user, setUser,
      cropLots, setCropLots,
      purchaseRequests, setPurchaseRequests,
      offers, setOffers,
      payments, setPayments,
      cropRecommendations, mandis, buyers, todaySummary,
      fpoFarmers, setFpoFarmers,
      fpoBulkLots, setFpoBulkLots,
      fpoBuyers, setFpoBuyers,
      fpoOffers, setFpoOffers,
      fpoLogistics, setFpoLogistics,
      fpoStorage, setFpoStorage,
      fpoPayments, setFpoPayments
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
