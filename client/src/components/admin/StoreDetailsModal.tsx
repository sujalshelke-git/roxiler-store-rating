import { useEffect, useState } from "react";
import { getStoreDetails } from "../../api/admin";
import Loader from "../ui/Loader";

interface Props {
  storeId: string | null;
  open: boolean;
  onClose: () => void;
}

interface StoreDetails {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: string;
  averageRating: number;

  owner: {
    id: string;
    name: string;
    email: string;
    address: string;
  };

  ratings: {
    id: string;
    rating: number;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

const StoreDetailsModal = ({
  storeId,
  open,
  onClose,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [store, setStore] =
    useState<StoreDetails | null>(null);

  useEffect(() => {
    if (open && storeId) {
      loadStore();
    }
  }, [open, storeId]);

  const loadStore = async () => {
    try {
      setLoading(true);

      const res = await getStoreDetails(
        storeId!
      );

      setStore(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Store Details
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
        ) : store ? (
          <>
            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="font-semibold">
                  Store Name
                </p>

                <p>{store.name}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Email
                </p>

                <p>{store.email}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Address
                </p>

                <p>{store.address}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Average Rating
                </p>

                <p>⭐ {store.averageRating}</p>
              </div>

            </div>

            <div className="mt-8">

              <h3 className="mb-3 text-lg font-semibold">
                Store Owner
              </h3>

              <div className="rounded-lg border bg-slate-50 p-4">

                <p>
                  <strong>Name:</strong>{" "}
                  {store.owner.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {store.owner.email}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {store.owner.address}
                </p>

              </div>

            </div>

            <div className="mt-8">

              <h3 className="mb-3 text-lg font-semibold">
                Ratings
              </h3>

              {store.ratings.length === 0 ? (
                <p>No Ratings Yet</p>
              ) : (
                <table className="w-full border">

                  <thead className="bg-slate-100">

                    <tr>

                      <th className="border p-2">
                        User
                      </th>

                      <th className="border p-2">
                        Email
                      </th>

                      <th className="border p-2">
                        Rating
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {store.ratings.map(
                      (rating) => (
                        <tr key={rating.id}>

                          <td className="border p-2">
                            {rating.user.name}
                          </td>

                          <td className="border p-2">
                            {rating.user.email}
                          </td>

                          <td className="border p-2">
                            ⭐ {rating.rating}
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>
              )}

            </div>
          </>
        ) : (
          <p>Store not found.</p>
        )}

      </div>

    </div>
  );
};

export default StoreDetailsModal;