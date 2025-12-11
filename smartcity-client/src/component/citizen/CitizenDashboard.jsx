import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { getComplaints, getMyProfile } from '../../service/api/citizenService';
import { FaUser, FaExclamationTriangle, FaEnvelope, FaCreditCard, FaPlus } from 'react-icons/fa';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const complaintsRes = await getComplaints();
      const complaints = complaintsRes.data.data || [];
      
      setStats({
        totalComplaints: complaints.length,
        pendingComplaints: complaints.filter(c => c.status === 'PENDING').length,
        resolvedComplaints: complaints.filter(c => c.status === 'RESOLVED').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className={`rounded-xl p-6 shadow-lg border-l-4 ${color} ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
          <Icon className={`text-2xl ${color.replace('border-l-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-green-50 to-blue-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Welcome, {user?.name}!
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>Citizen Portal - Smart City Services</p>
        </div>



        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={FaExclamationTriangle}
                title="Total Complaints"
                value={stats.totalComplaints}
                color="border-l-blue-500"
                bgColor="bg-white"
              />
              <StatCard
                icon={FaExclamationTriangle}
                title="Pending"
                value={stats.pendingComplaints}
                color="border-l-yellow-500"
                bgColor="bg-white"
              />
              <StatCard
                icon={FaExclamationTriangle}
                title="Resolved"
                value={stats.resolvedComplaints}
                color="border-l-green-500"
                bgColor="bg-white"
              />
            </div>

            {/* Quick Actions */}
            <div className={`rounded-xl shadow-lg p-6 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/citizen/complaints/create"
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-red-900/20 hover:bg-red-900/30 border-red-800' 
                      : 'bg-red-50 hover:bg-red-100 border-red-200'
                  }`}
                >
                  <FaPlus className="text-red-600 text-xl" />
                  <div className="text-left">
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-red-300' : 'text-red-800'
                    }`}>File New Complaint</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`}>Report a city issue quickly</p>
                  </div>
                </Link>
                <Link
                  to="/citizen/profile"
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-blue-900/20 hover:bg-blue-900/30 border-blue-800' 
                      : 'bg-blue-50 hover:bg-blue-100 border-blue-200'
                  }`}
                >
                  <FaUser className="text-blue-600 text-xl" />
                  <div className="text-left">
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
                    }`}>Update Profile</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>Manage your information</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default CitizenDashboard;