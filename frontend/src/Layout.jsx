import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./landing/Navbar";
import Footer from "./landing/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
