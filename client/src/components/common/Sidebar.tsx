import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

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
  ];

  const ownerMenu = [
    {
      title: "Dashboard",
      path: "/owner/dashboard",
    },
  ];

  const menu =
    user?.role === "ADMIN"
      ? adminMenu
      : user?.role === "OWNER"
      ? ownerMenu
      : userMenu;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        Store Rating
      </div>

      <nav className="p-4">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded px-4 py-3 mb-2 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.title}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
};

export default Sidebar;