import { useState } from 'react';
import { useTheme } from '../../context/useTheme';
import { createBill } from '../../service/api/adminService';
import { FaReceipt, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CreateBill = ({ onSuccess }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    billType: '',
    userId: '',
    amount: ''
  });

  const billTypes = [
    { value: 'ELECTRICITY', label: 'Electricity' },
    { value: 'PARKING', label: 'Parking' },
    { value: 'WATER_SUPPLY', label: 'Water Supply' },
    { value: 'WASTE_MANAGEMENT', label: 'Waste Management' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const billData = {
        billType: form.billType,
        userId: form.userId,
        amount: parseFloat(form.amount)
      };
      
      await createBill(billData);
      toast.success('Bill created successfully!');
      setForm({
        billType: '',
        userId: '',
        amount: ''
      });
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Error creating bill:', error);
      toast.error(error?.response?.data?.error?.message || 'Failed to create bill');
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
    <div className={`rounded-2xl shadow-xl p-6 space-y-6 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-center gap-3">
        <FaReceipt className="text-2xl text-blue-600" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Bill Management</p>
          <h2 className="text-2xl font-bold">Create New Bill</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="billType" className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Bill Type *
            </label>
            <select
              id="billType"
              name="billType"
              value={form.billType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-800 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
              required
            >
              <option value="">Select bill type</option>
              {billTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="userId" className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Consumer ID (User ID) *
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={form.userId}
              onChange={handleInputChange}
              placeholder="Enter consumer/user ID"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
              required
              maxLength={50}
            />
          </div>
        </div>

        <div>
          <label htmlFor="amount" className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Amount (₹) *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleInputChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'dark' 
                ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating...
              </>
            ) : (
              <>
                <FaPlus />
                Create Bill
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setForm({
              billType: '',
              userId: '',
              amount: ''
            })}
            className={`px-6 py-3 rounded-lg transition-colors font-medium ${
              theme === 'dark' 
                ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBill;



