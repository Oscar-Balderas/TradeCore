import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./MarketHistory.css";

const commodities = [
  { id: "gold", name: "Gold" },
  { id: "silver", name: "Silver" },
  { id: "copper", name: "Copper" },
  { id: "crude-oil-brent", name: "Crude Oil - Brent" },
];

function MarketHistory() {
  const [selectedCommodity, setSelectedCommodity] = useState("gold");
  const [history, setHistory] = useState([]);
  const [commodityInfo, setCommodityInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHistory() {
      setLoading(true);
      setError("");
      setHistory([]);
      setCommodityInfo(null);

      try {
        const response = await fetch(
          `/api/market/history/${selectedCommodity}?limit=12`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Unable to load historical prices.");
        }

        const result = await response.json();

        const records = result.data?.data || [];

        const formattedHistory = records
          .filter((record) => Number.isFinite(record.value))
          .map((record) => ({
            date: record.date,
            price: record.value,
          }))
          .reverse();

        if (!controller.signal.aborted) {
          setHistory(formattedHistory);
          setCommodityInfo(result.data);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchHistory();

    return () => controller.abort();
  }, [selectedCommodity]);

  return (
    <section className="market-history">
      <div className="market-history-header">
        <div>
          <span className="market-history-label">
            HISTORICAL COMMODITY PRICES
          </span>

          <h2>Market Price History</h2>

          <p>Explore historical international commodity reference prices.</p>
        </div>

        <div className="market-history-filter">
          <label htmlFor="commodity-select">Commodity</label>

          <select
            id="commodity-select"
            value={selectedCommodity}
            onChange={(event) => setSelectedCommodity(event.target.value)}
          >
            {commodities.map((commodity) => (
              <option key={commodity.id} value={commodity.id}>
                {commodity.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading historical prices...</p>}

      {error && <p className="market-history-error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="market-history-info">
            <h3>{commodityInfo?.title}</h3>

            <p>Unit: {commodityInfo?.units || "Not specified"}</p>

            <p>Source: World Bank Pink Sheet</p>

            <p>Frequency: Monthly</p>
          </div>

          {history.length > 0 ? (
            <div className="market-history-chart">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={history}>
                  <CartesianGrid stroke="#353842" strokeDasharray="3 3" />

                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    stroke="#9ca3af"
                    tick={{ fontSize: 11 }}
                    width={75}
                    domain={["auto", "auto"]}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `USD ${Number(value).toLocaleString("en-US")}`,
                      "Reference price",
                    ]}
                    contentStyle={{
                      backgroundColor: "#20232b",
                      border: "1px solid #d4af37",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#d4af37"
                    strokeWidth={3}
                    dot={{ fill: "#d4af37", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>No historical data available.</p>
          )}
        </>
      )}
    </section>
  );
}

export default MarketHistory;
