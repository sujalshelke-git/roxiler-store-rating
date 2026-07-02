import { useEffect, useState } from "react";
import {
  getStores,
  type Store,
} from "../../api/admin";

import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import StoreDetailsModal from "../../components/admin/StoreDetailsModal";

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] =
    useState(1);

  const [selectedStoreId, setSelectedStoreId] =
    useState<string | null>(null);

  const [openModal, setOpenModal] =
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (id: string) => {
    setSelectedStoreId(id);
    setOpenModal(true);
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Stores
          </h1>

          <p className="text-gray-500">
            Manage all registered stores
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
          <Table
            headers={[
              "Store",
              "Email",
              "Address",
              "Owner",
              "Rating",
              "Action",
            ]}
          >
            {stores.map((store) => (
              <tr
                key={store.id}
                className="hover:bg-slate-50"
              >
                <td className="border-b px-4 py-3">
                  {store.name}
                </td>

                <td className="border-b px-4 py-3">
                  {store.email}
                </td>

                <td className="border-b px-4 py-3">
                  {store.address}
                </td>

                <td className="border-b px-4 py-3">
                  {store.owner.name}
                </td>

                <td className="border-b px-4 py-3">
                  ⭐ {store.averageRating}
                </td>

                <td className="border-b px-4 py-3">

                  <button
                    onClick={() =>
                      openDetails(store.id)
                    }
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
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

      <StoreDetailsModal
        storeId={selectedStoreId}
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
      />

    </div>
  );
};

export default Stores;