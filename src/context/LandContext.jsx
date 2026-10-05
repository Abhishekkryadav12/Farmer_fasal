import { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const LandContext = createContext();

export function LandProvider({ children }) {
  const { user } = useAuth();
  
  // Mock Land Listings
  const [lands, setLands] = useState(() => {
    const saved = localStorage.getItem('smart_bharat_lands');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'L101',
        ownerId: 'owner123',
        ownerName: 'Gurpreet Singh',
        phone: '+91 98765 43210',
        email: 'gurpreet@example.com',
        title: '5 Acres Agricultural Land',
        area: 5,
        state: 'Punjab',
        district: 'Muktsar',
        village: 'Malout',
        soilType: 'Loamy',
        irrigation: 'Tube Well',
        electricity: 'Available',
        roadAccess: 'Available',
        crops: 'Wheat, Rice',
        duration: '2 Seasons',
        model: 'Harvest Share',
        terms: { ownerShare: 20, cultivatorShare: 80 },
        description: 'Fertile land near the main highway, excellent water availability.',
        status: 'Active',
        photos: []
      },
      {
        id: 'L102',
        ownerId: 'owner124',
        ownerName: 'Ramesh Kumar',
        phone: '+91 99887 77665',
        title: '3 Acres for Lease',
        area: 3,
        state: 'Punjab',
        district: 'Bathinda',
        village: 'Bhucho Mandi',
        soilType: 'Sandy Loam',
        irrigation: 'Borewell',
        electricity: 'Available',
        roadAccess: 'Partial',
        crops: 'Cotton',
        duration: '1 Season',
        model: 'Fixed Payment',
        terms: { fixedPayment: 35000 },
        description: 'Good land for cotton cultivation.',
        status: 'Active',
        photos: []
      },
      {
        id: 'L103',
        ownerId: 'owner125',
        ownerName: 'Hardip',
        phone: '+91 98111 22233',
        title: '8 Acres Canal Irrigated Land',
        area: 8,
        state: 'Punjab',
        district: 'Mansa',
        village: 'Budhlada',
        soilType: 'Clay Loam',
        irrigation: 'Canal',
        electricity: 'Available',
        roadAccess: 'Available',
        crops: 'Wheat, Maize',
        duration: '1 Year',
        model: 'Hybrid',
        terms: { fixedPayment: 25000, ownerShare: 10, cultivatorShare: 90 },
        description: 'Premium land with direct canal water access.',
        status: 'Active',
        photos: []
      }
    ];
  });

  // Mock Partnership Requests / Negotiations
  const [requests, setRequests] = useState([
    // Demo request for the logged-in user if they want to test
  ]);
  
  const [messages, setMessages] = useState({}); // { requestId: [ {sender, text, time} ] }

  const addLand = (landData) => {
    const newLand = {
      ...landData,
      id: `L${Math.floor(1000 + Math.random() * 9000)}`,
      ownerId: user.id,
      ownerName: user.name,
      phone: '+91 98765 00000', // Mock fallback
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    const updatedLands = [...lands, newLand];
    setLands(updatedLands);
    try {
      localStorage.setItem('smart_bharat_lands', JSON.stringify(updatedLands));
    } catch (e) {
      console.error('Failed to save to localStorage (might be full of base64 images)', e);
    }
    return newLand.id;
  };

  const sendRequest = (landId, proposal, message) => {
    const land = lands.find(l => l.id === landId);
    const newRequest = {
      id: `REQ${Math.floor(1000 + Math.random() * 9000)}`,
      landId,
      landTitle: land.title,
      ownerId: land.ownerId,
      ownerName: land.ownerName,
      cultivatorId: user.id,
      cultivatorName: user.name,
      status: 'Pending',
      crop: proposal.crop,
      duration: proposal.duration,
      model: proposal.model,
      terms: proposal.terms,
      history: [{ type: 'PROPOSAL', from: 'CULTIVATOR', terms: proposal.terms, date: new Date().toISOString() }]
    };
    setRequests([...requests, newRequest]);
    
    if (message) {
      setMessages({ ...messages, [newRequest.id]: [{ sender: user.id, text: message, time: new Date().toISOString() }] });
    }
    return newRequest.id;
  };

  const updateRequestStatus = (reqId, status) => {
    setRequests(requests.map(r => r.id === reqId ? { ...r, status } : r));
  };

  const sendCounterOffer = (reqId, terms) => {
    setRequests(requests.map(r => {
      if (r.id === reqId) {
        const isOwner = user.id === r.ownerId;
        return {
          ...r,
          status: 'Negotiating',
          terms,
          history: [...r.history, { type: 'COUNTER', from: isOwner ? 'OWNER' : 'CULTIVATOR', terms, date: new Date().toISOString() }]
        };
      }
      return r;
    }));
  };
  
  const addMessage = (reqId, text) => {
    const newMsg = { sender: user.id, text, time: new Date().toISOString() };
    const currentMsgs = messages[reqId] || [];
    setMessages({ ...messages, [reqId]: [...currentMsgs, newMsg] });
  };

  const updateLand = (id, landData) => {
    const updatedLands = lands.map(l => l.id === id ? { ...l, ...landData } : l);
    setLands(updatedLands);
    try {
      localStorage.setItem('smart_bharat_lands', JSON.stringify(updatedLands));
    } catch (e) {}
  };

  return (
    <LandContext.Provider value={{ 
      lands, addLand, updateLand,
      requests, sendRequest, updateRequestStatus, sendCounterOffer,
      messages, addMessage
    }}>
      {children}
    </LandContext.Provider>
  );
}

export function useLand() {
  return useContext(LandContext);
}
