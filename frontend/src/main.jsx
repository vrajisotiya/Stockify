import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./features/auth/authThunks";
import DashboardLayout from "./DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import Order from "./dashboard/Order";
import Fund from "./dashboard/Fund";
import Holding from "./dashboard/Holding";
import Login from "./auth/Login";
import RequireAuth from "./components/RequireAuth";
import Signup from "./auth/Signup";
import "./index.css";
import ContactUs from "./landing/ContactUs";
import Features from "./landing/Features";
import AboutUs from "./landing/AboutUs";
import Layout from "./Layout";
import Home from "./landing/Home";
import NotFound from "./NotFound";
import EmailVerification from "./auth/EmailVerification";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<AboutUs />} />
      </Route>
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route path="" element={<Dashboard />} />
        <Route path="orders" element={<Order />} />
        <Route path="funds" element={<Fund />} />
        <Route path="holdings" element={<Holding />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
