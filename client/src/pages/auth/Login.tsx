import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Star } from "lucide-react";


const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const currentUser = await login(
        email.trim(),
        password
      );

      switch (currentUser.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "USER":
          navigate("/user/stores");
          break;

        case "OWNER":
          navigate("/owner/dashboard");
          break;

        default:
          navigate("/login");
      }
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen grid md:grid-cols-2">
    {/* Left Panel */}
    <div className="hidden md:flex flex-col justify-between bg-[#162D4F] px-12 py-8 text-white">
      <Link to="/" className="flex items-center gap-2">
        <Star
          size={18}
          className="fill-amber-400 text-amber-400"
        />
        <span className="text-xl font-bold">
          RateHub
        </span>
      </Link>

      <div className="max-w-sm">
        <h1 className="text-4xl font-bold leading-tight">
          One login.
          <br />
          Every role.
        </h1>

        <p className="mt-5 text-sm leading-7 text-slate-300">
          Shoppers rate. Owners listen. Admins govern.
          All backed by row-level security and
          role-based access.
        </p>
      </div>

      <p className="text-xs text-slate-400">
        © 2026 RateHub
      </p>
    </div>

    {/* Right Panel */}
    <div className="flex items-center justify-center bg-white px-8 py-8">
      <div className="w-full max-w-sm">

        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back
        </h1>

        <p className="mt-2 mb-6 text-sm text-slate-500">
          Sign in to continue to your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#162D4F]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#162D4F]"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#162D4F] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1c3b68] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-1 font-semibold text-[#162D4F] hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  </div>
);
};

export default Login;