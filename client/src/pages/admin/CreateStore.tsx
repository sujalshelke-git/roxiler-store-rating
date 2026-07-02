import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createStore,
  getUsers,
  type User,
} from "../../api/admin";

const CreateStore = () => {
  const navigate = useNavigate();

  const [owners, setOwners] = useState<User[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    try {
      const res = await getUsers(1, "");

      const users: User[] = res.data.data.users;

      setOwners(
        users.filter(
          (user) => user.role === "OWNER"
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

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

      await createStore(form);

      alert("Store created successfully");

      navigate("/admin/stores");
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
        Create Store
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          name="name"
          placeholder="Store Name"
          className="w-full rounded border p-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Store Email"
          className="w-full rounded border p-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Store Address"
          className="w-full rounded border p-3"
          value={form.address}
          onChange={handleChange}
          required
        />

        <select
          name="ownerId"
          className="w-full rounded border p-3"
          value={form.ownerId}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Owner
          </option>

          {owners.map((owner) => (
            <option
              key={owner.id}
              value={owner.id}
            >
              {owner.name}
            </option>
          ))}
        </select>

        <button
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 font-semibold text-white"
        >
          {loading
            ? "Creating..."
            : "Create Store"}
        </button>

      </form>

    </div>
  );
};

export default CreateStore;