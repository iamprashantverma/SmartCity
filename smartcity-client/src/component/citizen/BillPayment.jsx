import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../context/useTheme';
import { useAuth } from '../../context/useAuth';
import { fetchMyAllBills, payBillById } from '../../service/api/citizenService';
import { FaReceipt, FaCheckCircle, FaFilter, FaSync } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BillPayment = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [payingBillId, setPayingBillId] = useState(null);
  const [filterType, setFilterType] = useState('ALL');
  const [filterPaid, setFilterPaid] = useState('ALL');

  const billTypes = {
    ELECTRICITY: { label: 'Electricity', icon: '⚡', color: 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300' },
    PARKING: { label: 'Parking', icon: '🚗', color: 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300' },
    WATER_SUPPLY: { label: 'Water Supply', icon: '💧', color: 'bg-cyan-100 border-cyan-300 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-700 dark:text-cyan-300' },
    WASTE_MANAGEMENT: { label: 'Waste Management', icon: '🗑️', color: 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-300' }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async (withLoader = true) => {
    try {
      withLoader ? setLoading(true) : setRefreshing(true);
      const response = await fetchMyAllBills();
      const billsData = response?.data?.data || response?.data || [];
      setBills(Array.isArray(billsData) ? billsData : []);
    } catch (error) {
      console.error('Error fetching bills:', error);
      toast.error(error?.response?.data?.error?.message || 'Failed to fetch bills');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handlePayBill = async (billId) => {
    try {
      setPayingBillId(billId);
      await payBillById(billId);
      toast.success('Bill paid successfully!');
      await fetchBills(false);
    } catch (error) {
      console.error('Error paying bill:', error);
      toast.error(error?.response?.data?.error?.message || 'Failed to pay bill');
    } finally {
      setPayingBillId(null);
    }
  };

  const filteredBills = useMemo(() => {
    return bills.filter(bill => {
      const matchesType = filterType === 'ALL' || bill.billType === filterType;
      const matchesPaid = filterPaid === 'ALL' || 
        (filterPaid === 'PAID' && bill.paid === true) ||
        (filterPaid === 'UNPAID' && (bill.paid === false || bill.paid === null));
      return matchesType && matchesPaid;
    });
  }, [bills, filterType, filterPaid]);

  const stats = useMemo(() => {
    const total = bills.length;
    const paid = bills.filter(b => b.paid === true).length;
    const unpaid = bills.filter(b => b.paid === false || b.paid === null).length;
    const totalAmount = bills.reduce((sum, b) => sum + (b.amount || 0), 0);
    const unpaidAmount = bills
      .filter(b => b.paid === false || b.paid === null)
      .reduce((sum, b) => sum + (b.amount || 0), 0);
    return { total, paid, unpaid, totalAmount, unpaidAmount };
  }, [bills]);

  const getBillTypeInfo = (type) => {
    return billTypes[type] || { label: type, icon: '📄', color: 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl shadow-xl p-6 space-y-6 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Utility Bills</p>
          <h2 className="text-2xl font-bold">My Bills</h2>
        </div>
        <button
          onClick={() => fetchBills(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-green-50 dark:border-gray-700 dark:hover:bg-gray-800 transition"
        >
          <FaSync className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`rounded-xl border p-4 text-center ${
          theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className={`rounded-xl border p-4 text-center ${
          theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Paid</p>
          <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
        </div>
        <div className={`rounded-xl border p-4 text-center ${
          theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Unpaid</p>
          <p className="text-2xl font-bold text-red-600">{stats.unpaid}</p>
        </div>
        <div className={`rounded-xl border p-4 text-center ${
          theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Due</p>
          <p className="text-lg font-bold">₹{stats.unpaidAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`pl-10 pr-8 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="ALL">All Bill Types</option>
            {Object.keys(billTypes).map(type => (
              <option key={type} value={type}>{billTypes[type].label}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filterPaid}
            onChange={(e) => setFilterPaid(e.target.value)}
            className={`pl-10 pr-8 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="ALL">All Bills</option>
            <option value="PAID">Paid Bills</option>
            <option value="UNPAID">Unpaid Bills</option>
          </select>
        </div>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((bill) => {
          const typeInfo = getBillTypeInfo(bill.billType);
          const isPaid = bill.paid === true;
          
          return (
            <div
              key={bill.billId}
              className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all ${
                isPaid 
                  ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700'
                  : typeInfo.color
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{typeInfo.icon}</span>
                  <div>
                    <h3 className={`font-bold text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{typeInfo.label}</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Bill #{bill.billId}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isPaid
                    ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                    : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                }`}>
                  {isPaid ? 'PAID' : 'UNPAID'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Amount:</span>
                  <span className={`font-bold text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>₹{bill.amount?.toFixed(2) || '0.00'}</span>
                </div>
                {bill.createdAt && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Created:</span>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {new Date(bill.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {bill.paidAt && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Paid On:</span>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {new Date(bill.paidAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {!isPaid && (
                <button
                  onClick={() => handlePayBill(bill.billId)}
                  disabled={payingBillId === bill.billId}
                  className={`w-full font-medium py-2 px-4 rounded-lg transition-colors ${
                    payingBillId === bill.billId
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {payingBillId === bill.billId ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </span>
                  ) : (
                    'Pay Now'
                  )}
                </button>
              )}
              {isPaid && (
                <div className="w-full bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 font-medium py-2 px-4 rounded-lg text-center">
                  <FaCheckCircle className="inline mr-2" />
                  Paid
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredBills.length === 0 && (
        <div className="text-center py-12">
          <FaReceipt className={`mx-auto text-4xl mb-4 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>No bills found</p>
        </div>
      )}
    </div>
  );
};

export default BillPayment;
