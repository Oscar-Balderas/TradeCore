import "../components/DashboardStats.css";

function DashboardStats({ operations }) {
  const totalOperations = operations.length;

  const confirmedOperations = operations.filter(
    (operation) => operation.status === "Confirmed",
  ).length;

  const negotiationOperations = operations.filter(
    (operation) => operation.status === "Negotiation",
  ).length;

  return (
    <section className="dashboard-stats">
      <div className="stat-card">
        <h3>Total Operations</h3>
        <p>{totalOperations}</p>
      </div>

      <div className="stat-card">
        <h3>Confirmed</h3>
        <p>{confirmedOperations}</p>
      </div>

      <div className="stat-card">
        <h3>Negotiation</h3>
        <p>{negotiationOperations}</p>
      </div>
    </section>
  );
}

export default DashboardStats;
