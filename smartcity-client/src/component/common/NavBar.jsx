import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { FaSun, FaMoon, FaUser, FaExclamationTriangle, FaEnvelope, FaCreditCard, FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME;
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    return user?.role === 'ADMIN' ? '/admin/dashboard' : '/citizen/dashboard';
  };

  const profilePath = user?.role === 'ADMIN' ? '/admin/profile' : '/citizen/profile';

  const getNavLinks = () => {
    if (!user) return [];
    
    if (user.role === 'ADMIN') {
      return [
        { path: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
        { path: '/admin/complaints', label: 'Complaints', icon: FaExclamationTriangle },
        { path: '/admin/contacts', label: 'Messages', icon: FaEnvelope },
        { path: profilePath, label: 'Profile', icon: FaUser },
      ];
    } else {
      return [
        { path: '/citizen/dashboard', label: 'Home', icon: FaTachometerAlt },
        { path: '/citizen/complaints', label: 'Complaints', icon: FaExclamationTriangle },
        { path: '/citizen/bills', label: 'Bills', icon: FaCreditCard },
        { path: '/citizen/contact', label: 'Contact', icon: FaEnvelope },
        { path: profilePath, label: 'Profile', icon: FaUser },
      ];
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = getNavLinks();

  return (
    <div>
      <nav className={`flex justify-between items-center px-5 py-4 border shadow sticky top-0 z-50 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <Link to="/" className={`font-bold text-xl ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>{APP_NAME}</Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-3">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-colors text-sm font-medium ${
                isActivePath(path)
                  ? theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                  : theme === 'dark' ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="text-sm" />
              <span className="hidden lg:inline">{label}</span>
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title="Toggle theme"
          >
            {theme === 'light' ? <FaMoon className="text-gray-600 text-sm" /> : <FaSun className="text-yellow-500 text-sm" />}
          </button>

          {/* User Actions */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className={`transition-colors font-medium text-sm px-3 py-2 ${
                  theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop User Info */}
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to={profilePath}
                  className={`flex items-center gap-2 transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <FaUser className={`text-xs ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  </div>
                  <span className="font-medium text-sm">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {user && mobileMenuOpen && (
        <div className={`md:hidden border-t ${
          theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          <div className="py-3 space-y-1">
            {/* Navigation Links */}
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${
                  isActivePath(path)
                    ? theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                    : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="text-lg" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}

            {/* Profile Link for Citizens */}
            {user && (
              <Link
                to={profilePath}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${
                  isActivePath(profilePath)
                    ? theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                    : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaUser className="text-lg" />
                <span className="font-medium">Profile</span>
              </Link>
            )}

            {/* User Info & Logout */}
            <div className={`border-t pt-2 mt-2 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className={`px-4 py-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {user.name} ({user.role})
              </div>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors w-full text-left ${
                  theme === 'dark' ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <FaTimes className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
