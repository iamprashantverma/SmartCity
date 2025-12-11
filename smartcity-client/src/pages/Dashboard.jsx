import { useAuth } from '../context/useAuth';
import AdminDashboard from '../component/admin/AdminDashboard';
import CitizenDashboard from '../component/citizen/CitizenDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'ADMIN' ? <AdminDashboard /> : <CitizenDashboard />}
    </div>
  );
};

export default Dashboard;