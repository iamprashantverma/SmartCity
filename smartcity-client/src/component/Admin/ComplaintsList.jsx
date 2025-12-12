import { useEffect, useMemo, useState } from 'react';
import { changeComplaintStatus, getAllComplaints } from '../../service/api/adminService';
import { useTheme } from '../../context/useTheme';
import { FaCheckCircle, FaExclamationTriangle, FaEye, FaFilter, FaSearch, FaSync } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ComplaintsList = ({ onUpdate }) => {
  const { theme } = useTheme();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async (withLoader = true) => {
    try {
      withLoader ? setLoading(true) : setRefreshing(true);
      const response = await getAllComplaints();
      const payload = response?.data?.data ?? response?.data ?? [];
      const normalized = (Array.isArray(payload) ? payload : []).map((c) => ({
        ...c,
        status: c.status ? String(c.status).toUpperCase() : 'PENDING',
      }));
      setComplaints(normalized);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error(error?.response?.data?.error?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateComplaintStatus = async (id, newStatus) => {
    try {
      setStatusUpdatingId(id);

      const currentComplaint = complaints.find((c) => c.id === id);
      if (!currentComplaint) {
        toast.error('Complaint not found');
        setStatusUpdatingId(null);
        return;
      }
      
      // Send full payload so backend receives complete snapshot
      const payload = { ...currentComplaint, status: newStatus };
      
      const response = await changeComplaintStatus(payload, id);
     
      const updatedComplaint = response?.data?.data || payload;
      const message = response?.data?.message || 'Complaint status updated successfully';

      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === id ? { ...complaint, ...updatedComplaint } : complaint
        )
      );

      setLastMessage(message);
      toast.success(message);
      onUpdate && onUpdate();
    } catch (error) {
      console.error('Error updating complaint:', error);
      const message = error?.response?.data?.error?.message || 'Failed to update complaint status';
      setLastMessage(message);
      toast.error(message);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesFilter = filter === 'ALL' || complaint.status === filter;
    const matchesSearch =
      complaint.complaintType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.userId?.toString().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-100 border-yellow-200 dark:border-yellow-700';
      case 'IN_PROGRESS':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-700';
      case 'RESOLVED':
        return 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-100 border-green-200 dark:border-green-700';
      case 'REJECTED':
        return 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-100 border-red-200 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-600';
      case 'NORMAL':
        return 'text-yellow-600';
      case 'LOW':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === 'PENDING').length;
    const inProgress = complaints.filter((c) => c.status === 'IN_PROGRESS').length;
    const resolved = complaints.filter((c) => c.status === 'RESOLVED').length;
    return [
      { label: 'Total', value: total, color: 'from-indigo-500 to-blue-500' },
      { label: 'Pending', value: pending, color: 'from-amber-500 to-orange-500' },
      { label: 'In Progress', value: inProgress, color: 'from-sky-500 to-cyan-500' },
      { label: 'Resolved', value: resolved, color: 'from-emerald-500 to-green-500' },
    ];
  }, [complaints]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Operations Center</p>
          <h2 className="text-2xl font-bold">Complaints Management</h2>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => fetchComplaints(false)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700'
                : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-100'
            }`}
          >
            <FaSync className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          {lastMessage && (
            <span className={`text-xs px-3 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-blue-900/30 text-blue-100 border border-blue-800'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {lastMessage}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl p-4 shadow-sm border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{item.label}</p>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 min-w-[220px]">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search complaints, user or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500'
                : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-500'
            }`}
          />
        </div>

        <div className="relative">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-gray-100'
                : 'bg-white border-gray-200 text-gray-800'
            }`}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className={`border rounded-xl p-4 hover:shadow-md transition-all shadow-sm ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-gray-50'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <h3 className={`font-semibold text-lg truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {complaint.complaintType}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {complaint.address || 'No address provided'}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-200 text-sm mb-3 line-clamp-2">
              {complaint.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">User ID:</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  {complaint.userId || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                <span className={`font-medium ${getPriorityColor(complaint.priority)} ${theme === 'dark' ? 'text-opacity-90' : ''}`}>
                  {complaint.priority || 'NORMAL'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date:</span>
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : '—'}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap items-center">
              <button
                onClick={() => setSelectedComplaint(complaint)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors text-sm ${
                  theme === 'dark'
                    ? 'bg-blue-900/30 text-blue-200 hover:bg-blue-900/50'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <FaEye />
                View
              </button>

              {complaint.status !== 'RESOLVED' && (
                <select
                  value={complaint.status}
                  onChange={(e) => updateComplaintStatus(complaint.id, e.target.value)}
                  disabled={statusUpdatingId === complaint.id}
                  className="px-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 disabled:opacity-70 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              )}
              {statusUpdatingId === complaint.id && (
                <span className="flex items-center gap-2 text-xs text-blue-600">
                  <FaCheckCircle /> Updating...
                </span>
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

      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedComplaint.complaintType}</h3>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <p className="text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {selectedComplaint.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedComplaint.status
                      )}`}
                    >
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Priority
                    </label>
                    <span className={`font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority || 'NORMAL'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      User ID
                    </label>
                    <p className="text-gray-600 dark:text-gray-200">{selectedComplaint.userId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date Created
                    </label>
                    <p className="text-gray-600 dark:text-gray-200">
                      {selectedComplaint.createdAt ? new Date(selectedComplaint.createdAt).toLocaleString() : '—'}
                    </p>
                  </div>
                </div>

                {selectedComplaint.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                    <p className="text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {selectedComplaint.address}
                    </p>
                  </div>
                )}

                {selectedComplaint.attachmentUrl && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Attachment
                    </label>
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