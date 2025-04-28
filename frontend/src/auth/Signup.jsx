import React, { useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authThunks";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const InputWithIcon = ({
  icon,
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  passwordVisible,
  toggleVisibility,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="pl-10 pr-11 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder={placeholder}
        required
      />
      {id === "password" && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
          aria-label={passwordVisible ? "Hide password" : "Show password"}
        >
          {passwordVisible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  </div>
);

const isPasswordValid = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid(formData.password)) return;
    try {
      dispatch(signupUser(formData));
      navigate("/verify-email");
    } catch (error) {
      alert("Failed to sign up");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-2 pb-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg text-sm">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputWithIcon
              icon={<User className="h-5 w-5" />}
              label="Username"
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />

            <InputWithIcon
              icon={<Mail className="h-5 w-5" />}
              label="Email Address"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <InputWithIcon
              icon={<Lock className="h-5 w-5" />}
              label="Password"
              id="password"
              type={passwordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              passwordVisible={passwordVisible}
              toggleVisibility={() => setPasswordVisible(!passwordVisible)}
            />

            <PasswordStrengthMeter password={formData.password} />

            <button
              type="submit"
              disabled={loading || !isPasswordValid(formData.password)}
              className="w-auto flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-colors shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-150"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
