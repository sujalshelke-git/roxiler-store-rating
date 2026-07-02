import { useEffect, useState } from "react";
import {
  getStores,
  submitRating,
  updateRating,
  type Store,
} from "../../api/user";

import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import RatingModal from "../../components/user/RatingModal";

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(1);

  const [selectedStore, setSelectedStore] =
    useState<Store | null>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  useEffect(() => {
    loadStores();
  }, [page, search]);

  const loadStores = async () => {
    try {
      setLoading(true);

      const res = await getStores(
        page,
        search
      );

      setStores(res.data.data.stores);

      setTotalPages(
        res.data.data.totalPages
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openRatingModal = (
    store: Store
  ) => {
    setSelectedStore(store);
    setModalOpen(true);
  };

  const handleRating = async (
    rating: number
  ) => {
    if (!selectedStore) return;

    try {
      if (
        selectedStore.userRating === null
      ) {
        await submitRating(
          selectedStore.id,
          rating
        );
      } else {
        await updateRating(
          selectedStore.id,
          rating
        );
      }

      setModalOpen(false);

      loadStores();

      alert("Rating saved successfully.");
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Something went wrong"
      );
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Stores
          </h1>

          <p className="text-gray-500">
            Browse stores and rate them.
          </p>

        </div>

        <input
          type="text"
          placeholder="Search store..."
          className="w-72 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
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
          <div className="overflow-hidden rounded-lg bg-white shadow">

            <table className="min-w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="px-4 py-3 text-left">
                    Store
                  </th>

                  <th className="px-4 py-3 text-left">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left">
                    Address
                  </th>

                  <th className="px-4 py-3 text-center">
                    Average Rating
                  </th>

                  <th className="px-4 py-3 text-center">
                    Your Rating
                  </th>

                  <th className="px-4 py-3 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {stores.map((store) => (
                  <tr
                    key={store.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">
                      {store.name}
                    </td>

                    <td className="px-4 py-3">
                      {store.email}
                    </td>

                    <td className="px-4 py-3">
                      {store.address}
                    </td>

                    <td className="px-4 py-3 text-center">
                      ⭐ {store.averageRating}
                    </td>

                    <td className="px-4 py-3 text-center">

                      {store.userRating
                        ? `⭐ ${store.userRating}`
                        : "-"}

                    </td>

                    <td className="px-4 py-3 text-center">

                      <button
                        onClick={() =>
                          openRatingModal(
                            store
                          )
                        }
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        {store.userRating
                          ? "Update Rating"
                          : "Rate Store"}
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

        </>
      )}

      <RatingModal
        open={modalOpen}
        initialRating={
          selectedStore?.userRating ?? 1
        }
        onClose={() =>
          setModalOpen(false)
        }
        onSubmit={handleRating}
      />

    </div>
  );
};

export default Stores;