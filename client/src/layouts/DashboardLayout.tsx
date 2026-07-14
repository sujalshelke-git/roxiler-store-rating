import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/common/DashboardSidebar";
import DashboardNavbar from "../components/common/DashboardNavbar";
const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}

      <DashboardSidebar />

      {/* Right Section */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navbar */}

        <DashboardNavbar />

        {/* Page Content */}

        <main className="flex-1 overflow-y-auto p-8">

          <div className="mx-auto w-full max-w-7xl">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;