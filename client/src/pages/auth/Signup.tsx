import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

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
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Full Name"
            className="w-full rounded border p-3"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full rounded border p-3"
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            className="w-full rounded border p-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded border p-3"
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            className="w-full rounded bg-blue-600 py-3 text-white"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="mt-4 text-center">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-600"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Signup;