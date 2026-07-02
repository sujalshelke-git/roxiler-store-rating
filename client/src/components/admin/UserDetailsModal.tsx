import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/admin";
import Loader from "../ui/Loader";

interface Props {
  userId: string | null;
  open: boolean;
  onClose: () => void;
}

interface UserDetails {
  id: string;
  name: string;
  email: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  store: {
    id: string;
    name: string;
    email: string;
    address: string;
  } | null;
  ratings: {
    id: string;
    rating: number;
    store: {
      id: string;
      name: string;
    };
  }[];
}

const UserDetailsModal = ({
  userId,
  open,
  onClose,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] =
    useState<UserDetails | null>(null);

  useEffect(() => {
    if (open && userId) {
      loadUser();
    }
  }, [open, userId]);

  const loadUser = async () => {
    try {
      setLoading(true);

      const res = await getUserDetails(userId!);

      setUser(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        {loading ? (
          <Loader />
        ) : user ? (
          <>
            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="font-semibold">
                  Name
                </p>
                <p>{user.name}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Email
                </p>
                <p>{user.email}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Address
                </p>
                <p>{user.address}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Role
                </p>
                <p>{user.role}</p>
              </div>

            </div>

            {user.store && (
              <div className="mt-6">

                <h3 className="mb-2 text-lg font-semibold">
                  Store
                </h3>

                <div className="rounded bg-slate-100 p-3">
                  <p>{user.store.name}</p>
                  <p>{user.store.email}</p>
                  <p>{user.store.address}</p>
                </div>

              </div>
            )}

            <div className="mt-6">

              <h3 className="mb-3 text-lg font-semibold">
                Ratings
              </h3>

              {user.ratings.length === 0 ? (
                <p>No Ratings</p>
              ) : (
                <table className="w-full border">

                  <thead className="bg-slate-100">

                    <tr>
                      <th className="border p-2">
                        Store
                      </th>

                      <th className="border p-2">
                        Rating
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {user.ratings.map((rating) => (
                      <tr key={rating.id}>

                        <td className="border p-2">
                          {rating.store.name}
                        </td>

                        <td className="border p-2">
                          ⭐ {rating.rating}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>
              )}

            </div>
          </>
        ) : (
          <p>User not found.</p>
        )}

      </div>

    </div>
  );
};

export default UserDetailsModal;