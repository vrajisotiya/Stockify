import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/check-auth`,
        {},
        {
          withCredentials: true,
        }
      );
      const user = res.data.user;
      if (user && user.isVerified) {
        return user;
      } else {
        return rejectWithValue("Not verified");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      return rejectWithValue(
        error.response?.data?.message || "Not authenticated"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        return data.user;
      } else {
        return rejectWithValue(data.message || "Login failed.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/signup`,
        userData,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        return data.user;
      } else {
        return rejectWithValue(data.message || "Signup failed.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred during signup. Please try again."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const verifyEmailCode = createAsyncThunk(
  "auth/verifyEmailCode",
  async (code, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/verify-email`,
        { code },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        return data.message;
      } else {
        return rejectWithValue("Verification failed.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred during verification."
      );
    }
  }
);

export const sendResetLink = createAsyncThunk(
  "auth/sendResetLink",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email,
      });
      return data.message || "Reset link sent successfully.";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset link."
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/reset-password/${token}`,
        {
          password,
        }
      );
      return data.message || "Password reset successful.";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed."
      );
    }
  }
);
