import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { api } from "../services/api";

const LABEL_MAP = {
  "Afiliados ativos": "Active affiliates",
  "Comissões pendentes": "Pending commissions",
  "Conversões hoje": "Conversions today"
};

function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const result = await api.dashboardSummary();
        if (active) {
          setStats(result.stats || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const formattedStats = useMemo(
    () =>
      stats.map((item) => ({
        ...item,
        label: LABEL_MAP[item.label] || item.label
      })),
    [stats]
  );

  return (
    <main className="dashboard-root bg-app">
      <Sidebar />
      <section className="dashboard-content p-4 p-lg-5">
        <header className="dashboard-header mb-4 mb-lg-5">
          <p className="text-uppercase header-tag mb-2">Overview</p>
          <h1 className="h2 mb-2">Affiliate dashboard</h1>
          <p className="text-body-secondary mb-0">
            Daily visibility into partner performance and commission impact.
          </p>
        </header>

        {loading ? <p className="text-body-secondary">Loading metrics...</p> : null}
        {error ? <div className="alert alert-danger">{error}</div> : null}

        
      </section>
    </main>
  );
}

export default DashboardPage;
