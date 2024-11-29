import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Steam API proxy route
app.get("/steam-games", async (req, res) => {
  const { apiKey, steamId } = req.query;

  if (!apiKey || !steamId) {
    return res.status(400).json({ error: "API key and Steam ID are required" });
  }

  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`
    );

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching Steam API:", error);
    res.status(500).json({ error: "Failed to fetch Steam games" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
