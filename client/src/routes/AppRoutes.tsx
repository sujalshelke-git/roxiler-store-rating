import {
  BrowserRouter,
  
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import CreateUser from "../pages/admin/CreateUser";
import CreateStore from "../pages/admin/CreateStore";

import UserStores from "../pages/user/Stores";
import OwnerDashboard from "../pages/owner/Dashboard";

import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Admin */}

          <Route
            path="admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="admin/users"
            element={<Users />}
          />

          <Route
            path="admin/stores"
            element={<Stores />}
          />

          <Route
            path="admin/create-user"
            element={<CreateUser />}
          />

          <Route
            path="admin/create-store"
            element={<CreateStore />}
          />

          {/* User */}

          <Route
            path="user/stores"
            element={<UserStores />}
          />

          {/* Owner */}

          <Route
            path="owner/dashboard"
            element={<OwnerDashboard />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;