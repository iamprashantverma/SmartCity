import { useState } from 'react';
import { submitContact } from '../../service/api/citizenService';
import { FaEnvelope, FaPaperPlane, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactUs = () => {
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
      toast.error(error.response?.data?.message || 'Failed to send message');
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Form */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaEnvelope className="text-2xl text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Send us a Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={15}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleInputChange}
                placeholder="Please describe your inquiry or concern in detail..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                required
                maxLength={2000}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {form.message.length}/2000 characters
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
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
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        {/* Contact Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaPhone className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <p className="text-gray-600">+91 1800-123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600">support@smartcity.gov.in</p>
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800">Address</p>
                <p className="text-gray-600">
                  Smart City Administration<br />
                  123 Government Complex<br />
                  City Center, State - 123456
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Office Hours</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Monday - Friday</span>
              <span className="font-medium">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saturday</span>
              <span className="font-medium">10:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday</span>
              <span className="font-medium text-red-600">Closed</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4">Emergency Contact</h3>
          <p className="text-red-700 mb-2">For urgent issues requiring immediate attention:</p>
          <p className="text-2xl font-bold text-red-800">📞 108</p>
          <p className="text-sm text-red-600 mt-2">Available 24/7</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;