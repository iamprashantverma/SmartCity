import { useState, useEffect } from 'react';
import { getAllContacts } from '../../service/api/adminService';
import { useTheme } from '../../context/useTheme';
import { FaEnvelope, FaUser, FaCalendar, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactsList = ({ onUpdate }) => {
  const { theme } = useTheme();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getAllContacts();
      setContacts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error(error?.response?.data?.error?.message || 'Failed to fetch contact messages');
    } finally {
      setLoading(false);
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
    <div className={`rounded-2xl shadow-xl p-6 space-y-6 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Messages Center</p>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
        </div>
        <div className={`text-sm px-3 py-1 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          Total: {contacts.length}
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className={`border rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer ${
              theme === 'dark' 
                ? 'border-gray-700 bg-gray-800 hover:bg-gray-750' 
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <FaUser className={`text-sm ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{contact.name}</h3>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{contact.email}</p>
                </div>
              </div>
            </div>
            
            <p className={`text-sm mb-3 line-clamp-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>{contact.message}</p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FaCalendar />
              <span>{contact.submittedAt ? new Date(contact.submittedAt).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12">
          <FaEnvelope className={`mx-auto text-4xl mb-4 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>No contact messages found</p>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <div 
            className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>Message from {selectedContact.name}</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className={`text-xl p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Name</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
                    }`}>{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Email</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
                    }`}>{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Phone</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
                    }`}>{selectedContact.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Date Submitted</label>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
                    }`}>
                      {selectedContact.submittedAt ? new Date(selectedContact.submittedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Message</label>
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <p className={`whitespace-pre-wrap ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-600'
                    }`}>{selectedContact.message}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: Your Message`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reply via Email
                </button>
                <button
                  onClick={() => setSelectedContact(null)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsList;
