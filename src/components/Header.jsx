import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt, FaBars, FaSearch, FaTachometerAlt, FaBell, FaEnvelope } from "react-icons/fa";
import Logout from "../pages/Logout";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo & Mobile Menu */}
         

          {/* Desktop Navigation */}
          

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            

            {/* User Profile */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-200 transition-colors group"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="hidden md:block font-medium">Store Manager</span>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <FaUserCircle className="text-xl" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-800"></div>
                </div>
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-slideDown">
                  <div className="bg-indigo-50 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-700 text-white p-3 rounded-full">
                        <FaUserCircle className="text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Store Manager Account</p>
                        {/* <p className="text-gray-500 text-sm">store@gmail.com</p> */}
                      </div>
                    </div>
                  </div>

                  <ul className="text-gray-700 py-2">
                    <li>
                      {/* <a
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <FaUser className="text-indigo-600" />
                        <span>My Profile</span>
                      </a> */}
                    </li>
                    <li>
                      {/* <a
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <FaCog className="text-indigo-600" />
                        <span>Account Settings</span>
                      </a> */}
                    </li>
                    <li className="border-t border-gray-100 mt-2">
                      <div className="px-4 py-3">
                        <Logout />
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden transition-all duration-300 transform origin-top animate-fadeIn">
            <div className="px-4 pt-2 pb-5 space-y-3 bg-indigo-800 border-t border-indigo-700">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 rounded-lg bg-indigo-700 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <FaSearch className="absolute left-3 top-3 text-indigo-300" />
              </div>
              <ul className="space-y-1">
                <li>
                  <a href="/dashboard" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    <FaTachometerAlt className="mr-3" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/profile" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    <FaUser className="mr-3" />
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/settings" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    <FaCog className="mr-3" />
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Add these custom animations to your tailwind.config.js file
const tailwindConfig = `
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scaleY(0.95)' },
          '100%': { opacity: '1', transform: 'scaleY(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [],
}
`;

export default Header;