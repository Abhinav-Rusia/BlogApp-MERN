import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-300 py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          Beyond Ink Blog
        </Link>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                Dashboard
              </Link>
              <Link to="/write" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                Write Post
              </Link>
              <span className="text-gray-700 font-medium">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-xl p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu - Simplified */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-6 pb-4 space-y-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/write"
                className="block py-3 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Write Post
              </Link>
              <div className="py-2 px-4 text-gray-700 font-medium">
                Hello, {user.name}
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full py-3 px-4 bg-red-600 text-white rounded hover:bg-red-700 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
