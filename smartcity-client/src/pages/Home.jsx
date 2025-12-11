import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FaCity, FaExclamationTriangle, FaCreditCard, FaEnvelope, FaUsers, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FaExclamationTriangle,
      title: "File Complaints",
      description: "Report issues in your city and track their resolution status",
      color: "text-red-600 bg-red-100"
    },
    {
      icon: FaCreditCard,
      title: "Pay Bills",
      description: "Conveniently pay utility bills online with secure payment",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: FaEnvelope,
      title: "Contact Support",
      description: "Get in touch with city administration for any queries",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: FaUsers,
      title: "Admin Dashboard",
      description: "Manage complaints and citizen communications efficiently",
      color: "text-purple-600 bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <FaCity className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Smart City</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Your digital gateway to city services. File complaints, pay bills, and stay connected with your local administration - all in one place.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Started
                <FaArrowRight />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Go to Dashboard
              <FaArrowRight />
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Making Cities Smarter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Complaints Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
              <div className="text-gray-600">Bills Paid Online</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account and verify your identity</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Services</h3>
              <p className="text-gray-600">File complaints, pay bills, or contact support</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor status and receive updates on your requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="text-xl font-bold">Smart City</span>
              </div>
              <p className="text-gray-400">
                Connecting citizens with their city administration for a better tomorrow.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91 1800-123-4567</p>
                <p>✉️ support@smartcity.gov.in</p>
                <p>📍 Smart City Administration</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Smart City. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;