import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../features/auth/authSlice";
import { logoutUser, checkAuthStatus } from "../features/auth/authThunks";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const logout = async () => {
    try {
      dispatch(logoutUser());
      dispatch(logoutAction());
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  const navLinkClass = "relative px-2 py-1 cursor-pointer hover:text-blue-600";

  return (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50">
      <div className="hidden lg:flex justify-between items-center py-4 px-6 xl:px-8 max-w-7xl mx-auto">
        <div className="flex items-center flex-shrink-0">
          <NavLink to="/">
            <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
              Stockify
            </span>
          </NavLink>
        </div>

        <div className="flex flex-1 items-center justify-between ml-8">
          <div className="flex space-x-6"></div>

          <nav className="flex items-center space-x-6 mx-6">
            {navItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) =>
                  `${navLinkClass} ${
                    isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4 ml-6">
          {!loading && user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${navLinkClass} ${
                    isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition">
                  Log In
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center p-4">
          <span className="text-xl font-bold text-blue-600">Stockify</span>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute w-full bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-2 pb-4">
              {navItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className={({ isActive }) =>
                    `block py-3 px-2 hover:text-blue-600 ${
                      isActive ? "text-blue-600 font-medium" : "text-gray-600"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="flex flex-col mt-4 pt-4 space-y-3">
                {!loading && !user ? (
                  <>
                    <NavLink to="/login">
                      <button className="w-fit px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition">
                        Log In
                      </button>
                    </NavLink>
                    <NavLink to="/signup">
                      <button className="w-fit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Sign Up
                      </button>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `${navLinkClass} ${
                          isActive
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600"
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                    <button
                      className="w-fit px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
