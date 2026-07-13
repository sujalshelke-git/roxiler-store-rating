import {
  BrowserRouter,
  
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Landing from "../pages/Landing"

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import CreateUser from "../pages/admin/CreateUser";
import CreateStore from "../pages/admin/CreateStore";


// User
import UserStores from "../pages/user/Stores";
import UserChangePassword from "../pages/user/ChangePassword";

// Owner
import OwnerDashboard from "../pages/owner/Dashboard";
import OwnerChangePassword from "../pages/owner/ChangePassword";

// Common
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* ================= ADMIN ================= */}

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<Users />}
          />

          <Route
            path="/admin/stores"
            element={<Stores />}
          />

          <Route
            path="/admin/create-user"
            element={<CreateUser />}
          />

          <Route
            path="/admin/create-store"
            element={<CreateStore />}
          />

          {/* ================= USER ================= */}

          <Route
            path="/user/stores"
            element={<UserStores />}
          />

          <Route
            path="/user/change-password"
            element={<UserChangePassword />}
          />

          {/* ================= OWNER ================= */}

          <Route
            path="/owner/dashboard"
            element={<OwnerDashboard />}
          />

          <Route
            path="/owner/change-password"
            element={<OwnerChangePassword />}
          />
        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;