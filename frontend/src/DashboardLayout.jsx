import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./dashboard/Navbar";
import Stocklist from "./dashboard/Stocklist";

export default function DashboardLayout() {
  return (
    <div className=" bg-gray-50 h-screen flex flex-col ">
      <Navbar />

      <div className="flex flex-grow overflow-hidden">
        <Stocklist />

        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
