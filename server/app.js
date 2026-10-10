const marketRoutes = require("./routes/market");
const express = require("express");
const router = require("./routes/operations");
const app = express();
app.use(express.json());
app.use("/api/operations", router);
app.use("/api/market", marketRoutes);
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "TradeCore API is running",
  });
});

module.exports = app;
