import { useEffect, useState } from "react";

import { getDashboard } from "../../api/admin";

import Card from "../../components/ui/Card";

import type { DashboardData } from "../../types/dashboard";

const Dashboard = () => {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();

      setDashboard(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dashboard) {
    return <p>No data</p>;
  }

  return (
    <div>

      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <Card
          title="Users"
          value={dashboard.totalUsers}
        />

        <Card
          title="Stores"
          value={dashboard.totalStores}
        />

        <Card
          title="Ratings"
          value={dashboard.totalRatings}
        />

      </div>

    </div>
  );
};

export default Dashboard;