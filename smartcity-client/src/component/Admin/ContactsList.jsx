import { useState, useEffect } from 'react';
import { getAllContacts } from '../../service/api/adminService';
import { useTheme } from '../../context/useTheme';
import { FaEye, FaEnvelope, FaUser, FaCalendar } from 'react-icons/fa';
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
      toast.error('Failed to fetch contact messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      // This would be an API call to mark as read
      // For now, we'll update locally
      setContacts(prev => 
        prev.map(contact => 
          contact.id === id ? { ...contact, isRead: true } : contact
        )
      );
      onUpdate && onUpdate();
    } catch (error) {
      console.error('Error marking as read:', error);
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Messages</h2>
        <div className="text-sm text-gray-600">
          Total: {contacts.length} | Unread: {contacts.filter(c => !c.isRead).length}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
              !contact.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
            }`}
            onClick={() => {
              setSelectedContact(contact);
              if (!contact.isRead) {
                markAsRead(contact.id);
              }
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <span className="font-semibold text-gray-800">{contact.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaEnvelope className="text-xs" />
                    <span>{contact.email}</span>
                  </div>
                  {!contact.isRead && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">New</span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">{contact.message}</p>
                
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <FaCalendar />
                  <span>{new Date(contact.submittedAt).toLocaleString()}</span>
                </div>
              </div>
              
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm">
                <FaEye />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12">
          <FaEnvelope className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No contact messages found</p>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Contact Message from {selectedContact.name}</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-600">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-600">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-600">{selectedContact.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Submitted</label>
                    <p className="text-gray-600">{new Date(selectedContact.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 whitespace-pre-wrap">{selectedContact.message}</p>
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
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
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