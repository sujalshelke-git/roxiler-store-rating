import { useEffect, useState } from "react";
import { getDashboard } from "../../api/owner";
import Loader from "../../components/ui/Loader";

interface DashboardData {
  store: {
    id: string;
    name: string;
    email: string;
    address: string;
  };

  averageRating: number;

  totalRatings: number;

  ratings: {
    id: string;
    rating: number;
    createdAt: string;

    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

const OwnerDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] =
    useState<DashboardData | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await getDashboard();

      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <p className="text-red-500">
        Unable to load dashboard.
      </p>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Owner Dashboard
      </h1>

      {/* Store Information */}

      <div className="rounded-lg bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Store Information
        </h2>

        <div className="space-y-2">

          <p>
            <strong>Name:</strong>{" "}
            {data.store.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {data.store.email}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {data.store.address}
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div className="rounded-lg bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Average Rating
          </h3>

          <p className="mt-3 text-4xl font-bold text-blue-600">
            ⭐ {data.averageRating}
          </p>

        </div>

        <div className="rounded-lg bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Total Ratings
          </h3>

          <p className="mt-3 text-4xl font-bold text-green-600">
            {data.totalRatings}
          </p>

        </div>

      </div>

      {/* Ratings Table */}

      <div className="rounded-lg bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          User Ratings
        </h2>

        {data.ratings.length === 0 ? (
          <p>No ratings yet.</p>
        ) : (
          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  User
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-center">
                  Rating
                </th>

                <th className="px-4 py-3 text-center">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {data.ratings.map((rating) => (
                <tr
                  key={rating.id}
                  className="border-t"
                >
                  <td className="px-4 py-3">
                    {rating.user.name}
                  </td>

                  <td className="px-4 py-3">
                    {rating.user.email}
                  </td>

                  <td className="px-4 py-3 text-center">
                    ⭐ {rating.rating}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {new Date(
                      rating.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default OwnerDashboard;