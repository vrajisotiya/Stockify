import React, { useState, useEffect } from "react";
import { Menu, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../features/auth/authSlice";
import { logoutUser } from "../features/auth/authThunks";
import toast from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Holdings", path: "/dashboard/holdings" },
    { name: "Funds", path: "/dashboard/funds" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = async () => {
    try {
      dispatch(logoutUser());
      dispatch(logoutAction());
      toast.success("Logged out successfully");
    } catch (err) {
      alert("Failed to logout");
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-sm border-b">
      <div className="hidden lg:flex justify-between items-center py-3 px-6 bg-white">
        <div className="flex items-center ">
          <NavLink to="/">
            <span className="text-2xl font-bold text-blue-600 ">Stockify</span>
          </NavLink>
        </div>
        <div className="flex items-center space-x-6 ml-auto">
          {navItems.map((item, index) => (
            <NavLink
              to={item.path}
              end={item.path === "/dashboard"}
              key={index}
              className={({ isActive }) =>
                `flex items-center cursor-pointer hover:text-blue-600  ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              <span className="ml-1">{item.name}</span>
            </NavLink>
          ))}

          <div className="flex items-center ml-6 border-l pl-6">
            <button
              onClick={logout}
              className="ml-4 flex items-center text-gray-700 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-150"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="font-medium">Logout</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center ml-4">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 font-medium">{user.username}</span>
          </div>
        </div>
      </div>

      <div className="lg:hidden bg-white border-b shadow-sm">
        <div className="flex justify-between items-center p-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="bg-white border-t border-gray-100 p-3">
            {navItems.map((item, index) => (
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                key={index}
                className={({ isActive }) =>
                  `flex items-center py-3 cursor-pointer ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
