import {
  LayoutDashboard,
  Users,
  Store,
  UserPlus,
  StoreIcon,
  KeyRound,
  LogOut,
  Star,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const adminMenu = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      title: "Stores",
      path: "/admin/stores",
      icon: Store,
    },
    {
      title: "Create User",
      path: "/admin/create-user",
      icon: UserPlus,
    },
    {
      title: "Create Store",
      path: "/admin/create-store",
      icon: StoreIcon,
    },
  ];

  const userMenu = [
    {
      title: "Stores",
      path: "/user/stores",
      icon: Store,
    },
    {
      title: "Change Password",
      path: "/user/change-password",
      icon: KeyRound,
    },
  ];

  const ownerMenu = [
    {
      title: "Dashboard",
      path: "/owner/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Change Password",
      path: "/owner/change-password",
      icon: KeyRound,
    },
  ];

  const menu =
    user?.role === "ADMIN"
      ? adminMenu
      : user?.role === "OWNER"
      ? ownerMenu
      : userMenu;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 px-8 py-7">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">

            <Star
              className="fill-white text-white"
              size={22}
            />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              RateHub
            </h2>

            <p className="text-sm text-slate-500">
              Store Rating
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8">

        <p className="mb-5 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.title}</span>

              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* Profile */}

      <div className="border-t border-slate-200 p-5">

        <div className="mb-5 rounded-2xl bg-slate-100 p-4">

          <h3 className="font-semibold text-slate-900">
            {user?.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {user?.role}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default DashboardSidebar;