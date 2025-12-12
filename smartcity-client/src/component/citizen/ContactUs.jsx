import { useState } from 'react';
import { submitContact } from '../../service/api/citizenService';
import { useTheme } from '../../context/useTheme';
import { FaEnvelope, FaPaperPlane, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContact(form);
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error?.response?.data?.error?.message || 'Failed to send message');
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
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl shadow-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <FaEnvelope className="text-2xl text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold">Contact Support</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">We'll get back to you within one business day.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      theme === 'dark' 
                        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Phone (optional)</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  }`}
                  maxLength={15}
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  }`}
                  required
                  maxLength={2000}
                />
                <div className={`text-right text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {form.message.length}/2000
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    loading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setForm({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    message: ''
                  })}
                  className={`px-6 py-2 rounded-lg transition-colors font-medium border ${
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
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className={`rounded-2xl shadow-xl p-4 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-bold mb-3">Contact Info</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <FaPhone className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">+91 1800-123-4567</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Mon-Fri, 9 AM - 6 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FaEnvelope className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">support@smartcity.gov.in</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Smart City Administration<br />
                    123 Government Complex<br />
                    City Center, State - 123456
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl shadow-xl p-4 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-bold mb-3">Office Hours</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Mon - Fri</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Sunday</span>
                <span className="font-medium text-red-600">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
