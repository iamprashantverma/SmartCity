import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

const NavBar = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME;
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 border bg-white shadow">
      <Link to="/" className="font-bold text-xl">{APP_NAME}</Link>

      <div className="flex items-center gap-6">
        {!user ? (
          <>
            <Link to="/signup" className="hover:text-blue-500">Sign Up</Link>
            <Link to="/login" className="hover:text-blue-500">Log In</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

        <Link to="/about" className="hover:text-blue-500">About</Link>

        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-xl"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
