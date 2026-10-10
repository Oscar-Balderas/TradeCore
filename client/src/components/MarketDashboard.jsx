import { useEffect, useState } from "react";
import "./MarketDashboard.css";

function MarketDashboard() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/market/prices", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch commodity prices");
        }

        const result = await response.json();

        const commodities = Object.entries(result.data?.prices || {}).map(
          ([id, commodity]) => ({
            id,
            ...commodity,
          }),
        );

        setPrices(commodities);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPrices();

    return () => controller.abort();
  }, []);

  return (
    <section className="market-dashboard">
      <div className="market-header">
        <div>
          <span className="market-label">GLOBAL COMMODITY MARKETS</span>
          <h2>Market Overview</h2>
          <p>Latest available international commodity reference prices.</p>
        </div>
      </div>

      {loading && <p>Loading market prices...</p>}

      {error && <p className="market-error">{error}</p>}

      {!loading && !error && (
        <div className="market-grid">
          {prices.map((commodity) => (
            <article className="market-card" key={commodity.id}>
              <h3>{commodity.title}</h3>

              <p className="market-price">
                ${commodity.value?.toLocaleString("en-US")}
              </p>

              <span className="market-unit">{commodity.units}</span>

              <div className="market-details">
                <p>
                  <span>Source:</span>
                  <strong>World Bank Pink Sheet</strong>
                </p>

                <p>
                  <span>Reference period:</span>
                  <strong>{commodity.date}</strong>
                </p>

                <p>
                  <span>Specific benchmark:</span>
                  <strong>Not identified</strong>
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MarketDashboard;
