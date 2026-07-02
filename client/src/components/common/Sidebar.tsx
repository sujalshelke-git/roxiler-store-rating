import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const adminMenu = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      path: "/admin/users",
    },
    {
      title: "Stores",
      path: "/admin/stores",
    },
    {
      title: "Create User",
      path: "/admin/create-user",
    },
    {
      title: "Create Store",
      path: "/admin/create-store",
    },
  ];

  const userMenu = [
    {
      title: "Stores",
      path: "/user/stores",
    },
    {
    title: "Change Password",
    path: "/user/change-password",
  },
  ];

  const ownerMenu = [
    {
      title: "Dashboard",
      path: "/owner/dashboard",
    },
    {
      title: "Change Password",
      path: "/owner/change-password",
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white">

      {/* Logo */}

      <div className="border-b border-slate-700 p-6">

        <h1 className="text-2xl font-bold">
          Store Rating
        </h1>

      </div>

      {/* User Info */}

      <div className="border-b border-slate-700 px-6 py-4">

        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-slate-400">
          {user?.role}
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mb-2 block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.title}
          </NavLink>
        ))}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-700 p-4">

        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium transition hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;