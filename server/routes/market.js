const express = require("express");

const { getCachedData, setCachedData } = require("../utils/marketCache");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.SUGRA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Sugra API key is not configured",
      });
    }

    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return res.status(502).json({
        message: "Failed to fetch market data from Sugra",
        providerStatus: response.status,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Sugra API error:", error.message);

    return res.status(500).json({
      message: "Error connecting to Sugra API",
    });
  }
});

router.get("/catalog", async (req, res) => {
  try {
    const apiKey = process.env.SUGRA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Sugra API key is not configured",
      });
    }

    const response = await fetch(
      "https://sugra.ai/api/v1/commodities/catalog",
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      return res.status(502).json({
        message: "Failed to fetch commodity catalog",
        providerStatus: response.status,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Commodity catalog error:", error.message);

    return res.status(500).json({
      message: "Error connecting to commodity catalog",
    });
  }
});

router.get("/prices", async (req, res) => {
  try {
    const apiKey = process.env.SUGRA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Sugra API key is not configured",
      });
    }

    const cacheKey = "commodity-prices";
    const cachedData = getCachedData(cacheKey);

    if (cachedData !== null) {
      console.log("Commodity prices served from cache");

      return res.status(200).json(cachedData);
    }

    const response = await fetch("https://sugra.ai/api/v1/commodities/prices", {
      headers: {
        "x-api-key": apiKey,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return res.status(502).json({
        message: "Failed to fetch commodity prices",
        providerStatus: response.status,
      });
    }

    const data = await response.json();

    setCachedData(cacheKey, data, 720);

    console.log("Commodity prices fetched from Sugra");

    return res.status(200).json(data);
  } catch (error) {
    console.error("Commodity prices error:", error.message);

    return res.status(502).json({
      message: "Error connecting to commodity prices",
    });
  }
});

router.get("/oil", async (req, res) => {
  try {
    const apiKey = process.env.SUGRA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Sugra API key is not configured",
      });
    }

    const response = await fetch(
      "https://sugra.ai/api/v1/commodities/energy/petroleum?limit=30",
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      return res.status(502).json({
        message: "Failed to fetch crude oil prices",
        providerStatus: response.status,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Crude oil prices error:", error.message);

    return res.status(500).json({
      message: "Error connecting to crude oil prices",
    });
  }
});

router.get("/gas", async (req, res) => {
  try {
    const apiKey = process.env.SUGRA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Sugra API key is not configured",
      });
    }

    const response = await fetch(
      "https://sugra.ai/api/v1/commodities/energy/natural-gas?frequency=daily&limit=30",
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      return res.status(502).json({
        message: "Failed to fetch natural gas prices",
        providerStatus: response.status,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Natural gas API error:", error.message);

    return res.status(500).json({
      message: "Error connecting to natural gas API",
    });
  }
});

router.get("/history/:commodityId", async (req, res) => {
  try {
    const apiKey = process.env.SUGRA_API_KEY;
    const { commodityId } = req.params;
    const limit = Number(req.query.limit ?? 60);

    if (!apiKey) {
      return res.status(500).json({
        message: "Sugra API key is not configured",
      });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 240) {
      return res.status(400).json({
        message: "Limit must be an integer between 1 and 240",
      });
    }

    // 1. Buscar los datos en nuestra caché
    const cacheKey = `history-${commodityId}-${limit}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      console.log(`Commodity history served from cache: ${commodityId}`);
      return res.status(200).json(cachedData);
    }

    // 2. Consultar Sugra si no tenemos datos guardados
    const url = `https://sugra.ai/api/v1/commodities/${encodeURIComponent(commodityId)}?limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        message: "Failed to fetch commodity historical prices",
        providerStatus: response.status,
      });
    }

    const data = await response.json();

    // 3. Guardar los datos durante 12 horas
    setCachedData(cacheKey, data, 720);

    console.log(`Commodity history fetched from Sugra: ${commodityId}`);

    // 4. Enviar los datos al frontend
    return res.status(200).json(data);
  } catch (error) {
    console.error("Commodity history error:", error.message);

    return res.status(500).json({
      message: "Error connecting to commodity history API",
    });
  }
});

module.exports = router;
