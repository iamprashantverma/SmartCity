import { useState } from 'react';
import { createComplaint } from '../../service/api/citizenService';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { FaExclamationTriangle, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CreateComplaint = ({ onSuccess }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    complaintType: '',
    description: '',
    priority: 'NORMAL',
    address: '',
    attachmentUrl: ''
  });

  const complaintTypes = [
    'Road & Infrastructure',
    'Water Supply',
    'Electricity',
    'Waste Management',
    'Public Safety',
    'Traffic & Transportation',
    'Parks & Recreation',
    'Noise Pollution',
    'Street Lighting',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const complaintData = {
        ...form,
        userId: user?.id
      };
      await createComplaint(complaintData);
      toast.success('Complaint filed successfully!');
      setForm({
        complaintType: '',
        description: '',
        priority: 'NORMAL',
        address: '',
        attachmentUrl: ''
      });
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Error creating complaint:', error);
      toast.error(error?.response?.data?.error?.message || 'Failed to file complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`rounded-2xl shadow-lg p-6 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <FaExclamationTriangle className="text-2xl text-red-600" />
        <div>
          <h2 className="text-2xl font-bold">File a Complaint</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Share the details; we will route it to the right team.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-sm`}
        >
          <div className="space-y-2">
            <label htmlFor="complaintType" className="block text-sm font-medium">
              Complaint Type *
            </label>
            <select
              id="complaintType"
              name="complaintType"
              value={form.complaintType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
              required
            >
              <option value="">Select complaint type</option>
              {complaintTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-sm space-y-4`}
        >
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              placeholder="Where did it occur?"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="attachmentUrl" className="block text-sm font-medium">
              Attachment URL (optional)
            </label>
            <input
              type="url"
              id="attachmentUrl"
              name="attachmentUrl"
              value={form.attachmentUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/photo.jpg"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
              maxLength={255}
            />
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-sm space-y-2`}
        >
          <label htmlFor="description" className="block text-sm font-medium">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Describe the issue clearly with any time or reference details."
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical ${
              theme === 'dark' 
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
            }`}
            required
            maxLength={1000}
          />
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            {form.description.length}/1000
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Filing...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Submit
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setForm({
              complaintType: '',
              description: '',
              priority: 'NORMAL',
              address: '',
              attachmentUrl: ''
            })}
            className={`px-6 py-3 rounded-lg transition-colors font-medium border ${
              theme === 'dark' 
                ? 'bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComplaint;