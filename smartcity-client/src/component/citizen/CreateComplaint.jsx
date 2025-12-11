import { useState } from 'react';
import { createComplaint } from '../../service/api/citizenService';
import { useAuth } from '../../context/useAuth';
import { FaExclamationTriangle, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CreateComplaint = ({ onSuccess }) => {
  const { user } = useAuth();
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
      toast.error(error.response?.data?.message || 'Failed to file complaint');
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaExclamationTriangle className="text-2xl text-red-600" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">File a Complaint</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Complaint Type and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="complaintType" className="block text-sm font-medium text-gray-700 mb-2">
              Complaint Type *
            </label>
            <select
              id="complaintType"
              name="complaintType"
              value={form.complaintType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select complaint type</option>
              {complaintTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            placeholder="Specific address where the issue occurred"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            maxLength={255}
          />
        </div>

        {/* Attachment URL */}
        <div>
          <label htmlFor="attachmentUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Attachment URL (Optional)
          </label>
          <input
            type="url"
            id="attachmentUrl"
            name="attachmentUrl"
            value={form.attachmentUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            maxLength={255}
          />
          <p className="text-sm text-gray-500 mt-1">
            Provide a URL to an image or document related to your complaint
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Please provide a detailed description of the issue, including when it occurred and any relevant details..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
            required
            maxLength={1000}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {form.description.length}/1000 characters
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Filing...
              </>
            ) : (
              <>
                <FaPaperPlane />
                File Complaint
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
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Clear Form
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <h4 className="font-medium text-blue-800 mb-2">Filing Guidelines:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Provide clear and specific details about the issue</li>
          <li>• Include the exact location where the problem occurred</li>
          <li>• Choose the most appropriate category for faster resolution</li>
          <li>• You can track the status of your complaint in "My Complaints" section</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateComplaint;