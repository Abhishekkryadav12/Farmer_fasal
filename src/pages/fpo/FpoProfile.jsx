import { useAuth } from '../../context/AuthContext';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Edit3 } from 'lucide-react';

export default function FpoProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Organization Profile</h1>
        <p className="text-gray-500 mt-1">Manage your FPO details and verification status.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="h-32 bg-purple-600"></div>
        <div className="px-8 pb-8">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-purple-600">
              <Building2 className="h-12 w-12" />
            </div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200">
              <Edit3 className="h-4 w-4" /> Edit Profile
            </button>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-black text-gray-900">{user?.name || 'Kisan FPO'}</h2>
              <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-100 uppercase tracking-wider">
                <ShieldCheck className="h-3 w-3" /> Demo Verified
              </span>
            </div>
            <p className="text-gray-500 font-medium">Registration ID: FPO-PB-2024-9876</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user?.email || 'contact@kisanfpo.demo'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900">{user?.phone || '+91 98765 43210'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-500">Registered Address</p>
                  <p className="font-medium text-gray-900">123, Mandi Road, Malout<br/>Sri Muktsar Sahib, Punjab 152107</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Bank & Payment Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-500">Bank Name</p>
                <p className="font-medium text-gray-900">State Bank of India</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Account Number</p>
                <p className="font-medium text-gray-900">XXXX XXXX 4589</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">IFSC Code</p>
                <p className="font-medium text-gray-900">SBIN000XXXX</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Operational Information</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-500">Authorized Person</p>
              <p className="font-bold text-gray-900 text-lg">Demo Authorized Person</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Associated Farmers</p>
              <p className="font-bold text-gray-900 text-lg">128 Active Members</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Total Aggregated Produce (YTD)</p>
              <p className="font-bold text-gray-900 text-lg">14,500 Qtl</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Primary Crops</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-sm rounded-lg">Wheat</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 font-bold text-sm rounded-lg">Rice</span>
                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 font-bold text-sm rounded-lg">Mustard</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Established Year</p>
              <p className="font-bold text-gray-900 text-lg">2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
