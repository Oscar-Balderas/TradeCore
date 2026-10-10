import { useState } from "react";
import OperationForm from "./components/OperationForm";
import OperationsList from "./components/OperationsList";
import MarketDashboard from "./components/MarketDashboard";
import MarketHistory from "./components/MarketHistory";
import MarketGuide from "./components/MarketGuide";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOperationCreated = () => {
    setRefreshKey((previousKey) => previousKey + 1);
  };

  return (
    <main>
      <h1>TradeCore</h1>
      <h2>International Trade Management</h2>
      <p>Manage your import and export operations from one platform.</p>

      <OperationForm onOperationCreated={handleOperationCreated} />

      <OperationsList refreshKey={refreshKey} />

      <MarketDashboard />
      <MarketHistory />
      <MarketGuide />
    </main>
  );
}

export default App;
