import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-lg text-gray-600 mb-8">You don't have permission to access this page.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return children;
}
