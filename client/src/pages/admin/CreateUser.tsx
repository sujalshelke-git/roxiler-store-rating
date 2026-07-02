import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/admin";

const CreateUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

      await createUser({
        name: form.name,
        email: form.email,
        address: form.address,
        password: form.password,
        role:
          form.role as
            | "ADMIN"
            | "OWNER"
            | "USER",
      });

      alert("User created successfully");

      navigate("/admin/users");
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Create User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          name="name"
          placeholder="Full Name"
          className="w-full rounded border p-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded border p-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          className="w-full rounded border p-3"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded border p-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full rounded border p-3"
          value={form.role}
          onChange={handleChange}
        >
          <option value="USER">
            USER
          </option>

          <option value="OWNER">
            OWNER
          </option>

          <option value="ADMIN">
            ADMIN
          </option>
        </select>

        <button
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 font-semibold text-white"
        >
          {loading
            ? "Creating..."
            : "Create User"}
        </button>

      </form>

    </div>
  );
};

export default CreateUser;