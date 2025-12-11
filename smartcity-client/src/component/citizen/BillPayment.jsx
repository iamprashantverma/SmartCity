import { useState } from 'react';
import { FaCreditCard, FaReceipt, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BillPayment = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    amount: 0
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock bill data
  const bills = [
    {
      id: 1,
      type: 'Electricity',
      amount: 1250.00,
      dueDate: '2024-01-15',
      billNumber: 'ELE-2024-001',
      status: 'pending',
      icon: '⚡',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
      id: 2,
      type: 'Water Supply',
      amount: 850.00,
      dueDate: '2024-01-20',
      billNumber: 'WAT-2024-001',
      status: 'pending',
      icon: '💧',
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
      id: 3,
      type: 'Property Tax',
      amount: 5500.00,
      dueDate: '2024-01-25',
      billNumber: 'TAX-2024-001',
      status: 'pending',
      icon: '🏠',
      color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
      id: 4,
      type: 'Waste Management',
      amount: 300.00,
      dueDate: '2024-01-18',
      billNumber: 'WST-2024-001',
      status: 'pending',
      icon: '🗑️',
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    }
  ];

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      setPaymentSuccess(true);
      toast.success('Payment processed successfully!');
      
      // Reset form after success
      setTimeout(() => {
        setSelectedBill(null);
        setPaymentForm({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardholderName: '',
          amount: 0
        });
        setPaymentSuccess(false);
      }, 3000);
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.length <= 19) {
        setPaymentForm(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formatted.length <= 5) {
        setPaymentForm(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    // Limit CVV to 3 digits
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 3) {
        setPaymentForm(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  const selectBill = (bill) => {
    setSelectedBill(bill);
    setPaymentForm(prev => ({ ...prev, amount: bill.amount }));
  };

  if (paymentSuccess) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <FaCheckCircle className="mx-auto text-6xl text-green-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your payment of ₹{selectedBill?.amount.toFixed(2)} for {selectedBill?.type} has been processed.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-green-700">
            <strong>Transaction ID:</strong> TXN{Date.now()}
          </p>
          <p className="text-sm text-green-700">
            <strong>Bill Number:</strong> {selectedBill?.billNumber}
          </p>
        </div>
        <p className="text-sm text-gray-500">Redirecting to bills overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!selectedBill ? (
        // Bills Overview
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaReceipt className="text-2xl text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Utility Bills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bills.map((bill) => (
              <div key={bill.id} className={`border-2 rounded-xl p-6 hover:shadow-md transition-shadow ${bill.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{bill.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{bill.type}</h3>
                      <p className="text-sm opacity-75">Bill #{bill.billNumber}</p>
                    </div>
                  </div>
                  <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
                    {bill.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm opacity-75">Amount:</span>
                    <span className="font-bold text-lg">₹{bill.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-75">Due Date:</span>
                    <span className="font-medium">{new Date(bill.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => selectBill(bill)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors"
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Payment Form
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaCreditCard className="text-2xl text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
            </div>
            <button
              onClick={() => setSelectedBill(null)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          {/* Bill Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Bill Summary</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{selectedBill.type}</p>
                <p className="text-sm text-gray-600">Bill #{selectedBill.billNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">₹{selectedBill.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Due: {new Date(selectedBill.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={paymentForm.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentForm.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentForm.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentForm.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCreditCard />
                    Pay ₹{selectedBill.amount.toFixed(2)}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedBill(null)}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-blue-700">
              🔒 Your payment information is secure and encrypted. This is a demo - no actual payment will be processed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillPayment;