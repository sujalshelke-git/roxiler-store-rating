import { useEffect, useState } from "react";
import {
  getUsers,
  type User,
} from "../../api/admin";

import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import UserDetailsModal from "../../components/admin/UserDetailsModal";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] =
    useState(1);

  const [selectedUserId, setSelectedUserId] =
    useState<string | null>(null);

  const [openModal, setOpenModal] =
    useState(false);

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsers(
        page,
        search
      );

      setUsers(res.data.data.users);

      setTotalPages(
        res.data.data.totalPages
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (id: string) => {
    setSelectedUserId(id);
    setOpenModal(true);
  };

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <input
          type="text"
          placeholder="Search users..."
          className="rounded-lg border p-2"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            headers={[
              "Name",
              "Email",
              "Address",
              "Role",
              "Action",
            ]}
          >
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50"
              >
                <td className="border-b px-4 py-3">
                  {user.name}
                </td>

                <td className="border-b px-4 py-3">
                  {user.email}
                </td>

                <td className="border-b px-4 py-3">
                  {user.address}
                </td>

                <td className="border-b px-4 py-3">
                  <span className="rounded bg-slate-100 px-3 py-1 text-sm">
                    {user.role}
                  </span>
                </td>

                <td className="border-b px-4 py-3">

                  <button
                    onClick={() =>
                      openDetails(user.id)
                    }
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    View
                  </button>

                </td>

              </tr>
            ))}
          </Table>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <UserDetailsModal
        userId={selectedUserId}
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
      />

    </div>
  );
};

export default Users;