import Sidebar from "../../components/adminpage/sidebar/Sidebar";
import TestDashboard from "../../components/testDashboard/TestDashboard";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar className="md:w-1/4" />
      <TestDashboard className="md:w-3/4" style={{ marginTop: "20px" }} />{" "}
      <Outlet />
    </div>
  );
};

export default DashboardPage;
