import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">

      <div>
        <h1 className="text-xl font-semibold">
          Welcome
        </h1>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <span>{user?.name}</span>

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;