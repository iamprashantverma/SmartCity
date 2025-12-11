import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { FaSun, FaMoon, FaUser, FaExclamationTriangle, FaEnvelope, FaCreditCard, FaTachometerAlt, FaBars, FaTimes, FaCog } from 'react-icons/fa';

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

  const getNavLinks = () => {
    if (!user) return [];
    
    if (user.role === 'ADMIN') {
      return [
        { path: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
        { path: '/admin/complaints', label: 'Complaints', icon: FaExclamationTriangle },
        { path: '/admin/contacts', label: 'Messages', icon: FaEnvelope },
      ];
    } else {
      return [
        { path: '/citizen/dashboard', label: 'Home', icon: FaTachometerAlt },
        { path: '/citizen/complaints', label: 'Complaints', icon: FaExclamationTriangle },
        { path: '/citizen/bills', label: 'Bills', icon: FaCreditCard },
        { path: '/citizen/contact', label: 'Contact', icon: FaEnvelope },
      ];
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-gray-800 hidden sm:block">{APP_NAME}</span>
            <span className="font-bold text-lg text-gray-800 sm:hidden">SC</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-colors text-sm font-medium ${
                  isActivePath(path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="text-sm" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Toggle theme"
            >
              {theme === 'light' ? <FaMoon className="text-gray-600 text-sm" /> : <FaSun className="text-yellow-500 text-sm" />}
            </button>

            {/* User Actions */}
            {!user ? (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm px-3 py-2"
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
                    to="/citizen/profile"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="w-7 h-7 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <FaUser className="text-xs text-gray-600 dark:text-gray-300" />
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
                  className="md:hidden p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden border-t dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="py-3 space-y-1">
              {/* Navigation Links */}
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${
                    isActivePath(path)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}

              {/* Profile Link for Citizens */}
              {user.role === 'CITIZEN' && (
                <Link
                  to="/citizen/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors ${
                    isActivePath('/citizen/profile')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FaUser className="text-lg" />
                  <span className="font-medium">Profile</span>
                </Link>
              )}

              {/* User Info & Logout */}
              <div className="border-t pt-2 mt-2">
                <div className="px-4 py-2 text-sm text-gray-500">
                  {user.name} ({user.role})
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <FaTimes className="text-lg" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
