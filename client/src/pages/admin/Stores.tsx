import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

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

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [order, setOrder] =
    useState<"asc" | "desc">("desc");

  const [totalPages, setTotalPages] =
    useState(1);

  const [selectedStoreId, setSelectedStoreId] =
    useState<string | null>(null);

  const [openModal, setOpenModal] =
    useState(false);

  useEffect(() => {
    loadStores();
  }, [page, search, sortBy, order]);

  const loadStores = async () => {
    try {
      setLoading(true);

      const res = await getStores(
        page,
        search,
        sortBy,
        order
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

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder(
        order === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortBy(field);
      setOrder("asc");
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
          placeholder="Search stores..."
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
              <button
                key="name"
                onClick={() =>
                  handleSort("name")
                }
                className="flex items-center gap-2 font-semibold hover:text-blue-600"
              >
                Store
                {sortBy === "name" &&
                  (order === "asc" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  ))}
              </button>,

              <button
                key="email"
                onClick={() =>
                  handleSort("email")
                }
                className="flex items-center gap-2 font-semibold hover:text-blue-600"
              >
                Email
                {sortBy === "email" &&
                  (order === "asc" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  ))}
              </button>,

              <button
                key="address"
                onClick={() =>
                  handleSort("address")
                }
                className="flex items-center gap-2 font-semibold hover:text-blue-600"
              >
                Address
                {sortBy === "address" &&
                  (order === "asc" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  ))}
              </button>,

              "Owner",

              <button
                key="averageRating"
                onClick={() =>
                  handleSort("averageRating")
                }
                className="flex items-center gap-2 font-semibold hover:text-blue-600"
              >
                Rating
                {sortBy ===
                  "averageRating" &&
                  (order === "asc" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  ))}
              </button>,

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