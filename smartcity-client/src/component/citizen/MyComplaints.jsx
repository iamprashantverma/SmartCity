import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplaints } from '../../service/api/citizenService';
import { useTheme } from '../../context/useTheme';
import { FaEye, FaPlus, FaExclamationTriangle, FaSync } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MyComplaints = ({ onUpdate }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async (withLoader = true) => {
    try {
      withLoader ? setLoading(true) : setRefreshing(true);
      const response = await getComplaints();
      const payload = response?.data?.data ?? response?.data ?? [];
      const normalized = (Array.isArray(payload) ? payload : []).map((c) => ({
        ...c,
        status: c.status ? String(c.status).toUpperCase() : 'PENDING',
      }));
      setComplaints(normalized);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-100 border-yellow-200 dark:border-yellow-700';
      case 'IN_PROGRESS': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-700';
      case 'RESOLVED': return 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-100 border-green-200 dark:border-green-700';
      case 'REJECTED': return 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-100 border-red-200 dark:border-red-700';
      default: return 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600';
      case 'NORMAL': return 'text-yellow-600';
      case 'LOW': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === 'PENDING').length;
    const resolved = complaints.filter((c) => c.status === 'RESOLVED').length;
    return [
      { label: 'Total', value: total },
      { label: 'Pending', value: pending },
      { label: 'Resolved', value: resolved },
    ];
  }, [complaints]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 space-y-6 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Complaints</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track every update from the city team in real-time.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => fetchComplaints(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-green-50 dark:border-gray-700 dark:hover:bg-gray-800 transition"
          >
            <FaSync className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={() => {
              if (onUpdate) onUpdate();
              navigate('/citizen/complaints/create');
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
          >
            <FaPlus />
            New Complaint
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl p-4 text-center shadow-sm border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {complaints.map((complaint) => (
          <div key={complaint.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
            theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex justify-between items-start mb-3">
              <h3 className={`font-semibold text-lg truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>{complaint.complaintType}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </span>
            </div>
            
            <p className={`text-sm mb-3 line-clamp-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>{complaint.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Priority:</span>
                <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority || 'NORMAL'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Address:</span>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>{complaint.address || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Date:</span>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setSelectedComplaint(complaint)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm w-full justify-center ${
                  theme === 'dark' 
                    ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <FaEye />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {complaints.length === 0 && (
        <div className="text-center py-12">
          <FaExclamationTriangle className={`mx-auto text-4xl mb-4 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <p className={`text-lg mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>No complaints filed yet</p>
          <button
            onClick={() => onUpdate && onUpdate()}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mx-auto"
          >
            <FaPlus />
            File Your First Complaint
          </button>
        </div>
      )}

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>{selectedComplaint.complaintType}</h3>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className={`text-xl ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedComplaint.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedComplaint.status)}`}>
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <span className={`font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority || 'NORMAL'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                    <p className="text-gray-600">{selectedComplaint.userId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Filed</label>
                    <p className="text-gray-600">{new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {selectedComplaint.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedComplaint.address}</p>
                  </div>
                )}

                {selectedComplaint.attachmentUrl && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                    <a 
                      href={selectedComplaint.attachmentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Attachment
                    </a>
                  </div>
                )}

                {selectedComplaint.adminResponse && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Response</label>
                    <p className="text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                      {selectedComplaint.adminResponse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComplaints;