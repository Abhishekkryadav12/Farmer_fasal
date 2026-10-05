import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import FpoLayout from './layouts/FpoLayout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import WhatToGrow from './pages/WhatToGrow';
import CropHealth from './pages/CropHealth';
import Weather from './pages/Weather';
import MandiBhav from './pages/MandiBhav';
import Buyers from './pages/Buyers';
import SellCrop from './pages/SellCrop';
import MyCrop from './pages/MyCrop';
import Offers from './pages/Offers';
import Logistics from './pages/Logistics';
import Storage from './pages/Storage';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Notifications from './pages/Notifications';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FarmerRegister from './pages/auth/FarmerRegister';
import BuyerRegister from './pages/auth/BuyerRegister';
import FPORegister from './pages/auth/FPORegister';
import FPOLogin from './pages/auth/FPOLogin';
import AdminLogin from './pages/auth/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

// Kheti Partnership Pages
import LandHome from './pages/land/LandHome';
import FindLand from './pages/land/FindLand';
import ListLand from './pages/land/ListLand';
import MyLand from './pages/land/MyLand';
import MyRequests from './pages/land/MyRequests';
import LandDetails from './pages/land/LandDetails';
import PartnershipView from './pages/land/PartnershipView';

import DestinationSearch from './pages/DestinationSearch';
import BuyerDetails from './pages/BuyerDetails';
import BuyerCropDetails from './pages/BuyerCropDetails';
import MandiDetails from './pages/MandiDetails';

import FPODashboard from './pages/fpo/FPODashboard';
import FpoFarmers from './pages/fpo/FpoFarmers';
import FpoAggregation from './pages/fpo/FpoAggregation';
import FpoBulkLots from './pages/fpo/FpoBulkLots';
import FpoBuyers from './pages/fpo/FpoBuyers';
import FpoOffers from './pages/fpo/FpoOffers';
import FpoMarket from './pages/fpo/FpoMarket';
import FpoLogistics from './pages/fpo/FpoLogistics';
import FpoStorage from './pages/fpo/FpoStorage';
import FpoPayments from './pages/fpo/FpoPayments';
import FpoNotifications from './pages/fpo/FpoNotifications';
import FpoProfile from './pages/fpo/FpoProfile';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* FPO Portal (Independent Layout) */}
        <Route path="/fpo/login" element={<FPOLogin />} />
        <Route path="/fpo/register" element={<FPORegister />} />
        
        <Route element={<FpoLayout />}>
          <Route path="/fpo/dashboard" element={<FPODashboard />} />
          <Route path="/fpo/farmers" element={<FpoFarmers />} />
          <Route path="/fpo/aggregation" element={<FpoAggregation />} />
          <Route path="/fpo/crop-lots" element={<FpoBulkLots />} />
          <Route path="/fpo/buyers" element={<FpoBuyers />} />
          <Route path="/fpo/offers" element={<FpoOffers />} />
          <Route path="/fpo/market" element={<FpoMarket />} />
          <Route path="/fpo/logistics" element={<FpoLogistics />} />
          <Route path="/fpo/storage" element={<FpoStorage />} />
          <Route path="/fpo/payments" element={<FpoPayments />} />
          <Route path="/fpo/notifications" element={<FpoNotifications />} />
          <Route path="/fpo/profile" element={<FpoProfile />} />
          <Route path="/fpo/*" element={<FPODashboard />} />
        </Route>

        {/* Main Smart Bharat Portal */}
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sell-destination" element={<DestinationSearch />} />
          <Route path="/buyers/:id" element={<BuyerDetails />} />
          <Route path="/buyers/crop/:id" element={<BuyerCropDetails />} />
          <Route path="/market/:id" element={<MandiDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/farmer" element={<FarmerRegister />} />
          <Route path="/register/buyer" element={<BuyerRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/help" element={<Help />} />

          {/* Protected Routes */}
          <Route path="/onboarding" element={
            <ProtectedRoute allowedRoles={['FARMER']}><Onboarding /></ProtectedRoute>
          } />
          <Route path="/what-to-grow" element={
            <ProtectedRoute allowedRoles={['FARMER']}><WhatToGrow /></ProtectedRoute>
          } />
          <Route path="/crop-health" element={
            <ProtectedRoute allowedRoles={['FARMER']}><CropHealth /></ProtectedRoute>
          } />
          <Route path="/weather" element={
            <ProtectedRoute allowedRoles={['FARMER']}><Weather /></ProtectedRoute>
          } />
          <Route path="/market" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><MandiBhav /></ProtectedRoute>
          } />
          <Route path="/buyers" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><Buyers /></ProtectedRoute>
          } />
          <Route path="/sell-crop" element={
            <ProtectedRoute allowedRoles={['FARMER']}><SellCrop /></ProtectedRoute>
          } />
          <Route path="/my-crop" element={
            <ProtectedRoute allowedRoles={['FARMER']}><MyCrop /></ProtectedRoute>
          } />
          <Route path="/offers" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><Offers /></ProtectedRoute>
          } />
          <Route path="/logistics" element={
            <ProtectedRoute allowedRoles={['FARMER']}><Logistics /></ProtectedRoute>
          } />
          <Route path="/storage" element={
            <ProtectedRoute allowedRoles={['FARMER']}><Storage /></ProtectedRoute>
          } />
          <Route path="/payments" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><Payment /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><Profile /></ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><Notifications /></ProtectedRoute>
          } />

          {/* Kheti Partnership Routes */}
          <Route path="/land-connect" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><LandHome /></ProtectedRoute>
          } />
          <Route path="/land-connect/find" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><FindLand /></ProtectedRoute>
          } />
          <Route path="/land-connect/list-land" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><ListLand /></ProtectedRoute>
          } />
          <Route path="/land-connect/my-land" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><MyLand /></ProtectedRoute>
          } />
          <Route path="/land-connect/my-requests" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><MyRequests /></ProtectedRoute>
          } />
          <Route path="/land-connect/partnership/:id" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><PartnershipView /></ProtectedRoute>
          } />
          <Route path="/land-connect/:id" element={
            <ProtectedRoute allowedRoles={['FARMER', 'BUYER']}><LandDetails /></ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
