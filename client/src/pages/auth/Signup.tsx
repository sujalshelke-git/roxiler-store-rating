import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Star } from "lucide-react";


const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      await axios.post("/auth/signup", form);

      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Signup failed"
      );
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
          Create your account
        </h1>

        <p className="mt-2 mb-6 text-sm text-slate-500">
          Sign up as a shopper to start rating stores.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              name="name"
              onChange={handleChange}
              placeholder="Between 20 to 60 characters"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#162D4F]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Address
            </label>

            <input
              name="address"
              onChange={handleChange}
              placeholder="Upto 400 characters"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#162D4F]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#162D4F]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="8-16 characters, one uppercase, 1 special case"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#162D4F]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#162D4F] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1c3b68]"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold text-[#162D4F] hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  </div>
);
};

export default Signup;