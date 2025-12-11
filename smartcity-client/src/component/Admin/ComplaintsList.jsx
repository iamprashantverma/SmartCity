import { useState, useEffect } from 'react';
import { getAllComplaints } from '../../service/api/adminService';
import { FaEye, FaFilter, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ComplaintsList = ({ onUpdate }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getAllComplaints();
      setComplaints(response.data.data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (id, newStatus) => {
    try {
      // This would be an API call to update status
      // For now, we'll update locally
      setComplaints(prev => 
        prev.map(complaint => 
          complaint.id === id ? { ...complaint, status: newStatus } : complaint
        )
      );
      toast.success('Complaint status updated successfully');
      onUpdate && onUpdate();
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast.error('Failed to update complaint status');
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = filter === 'ALL' || complaint.status === filter;
    const matchesSearch = complaint.complaintType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.userId?.toString().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Complaints Management</h2>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800 text-lg truncate">{complaint.complaintType}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{complaint.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">User ID:</span>
                <span className="font-medium">{complaint.userId || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Priority:</span>
                <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority || 'NORMAL'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSelectedComplaint(complaint)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
              >
                <FaEye />
                View
              </button>
              
              {complaint.status !== 'RESOLVED' && (
                <select
                  value={complaint.status}
                  onChange={(e) => updateComplaintStatus(complaint.id, e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredComplaints.length === 0 && (
        <div className="text-center py-12">
          <FaExclamationTriangle className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No complaints found</p>
        </div>
      )}

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedComplaint.complaintType}</h3>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Created</label>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;