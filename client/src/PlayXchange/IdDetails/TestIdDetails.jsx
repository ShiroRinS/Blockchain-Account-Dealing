import React, { useState, useEffect } from "react";
import styles from "./IdDetails.module.css"; // Make sure to create your CSS module for styling

const STEAM_API_KEY = "FC06F2A1AA1471DA7842B3A160E4E16D"; // Replace with your Steam API key
const STEAM_ID = "76561198368819079"; // Replace with your Steam ID

const TestIdDetails = () => {
  const [steamGames, setSteamGames] = useState([]); // For storing Steam games
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch Steam games data when the component mounts
  useEffect(() => {
    const fetchSteamGames = async () => {
      try {
        const response = await fetch(
          `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true&format=json`
        );
        const data = await response.json();

        if (data?.response?.games) {
          setSteamGames(data.response.games); // Store the games in state
        } else {
          setError("No games found for this Steam ID.");
        }
      } catch (err) {
        console.error("Error fetching Steam games:", err);
        setError("Failed to fetch Steam games. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSteamGames();
  }, []); // Empty dependency array to run once when the component mounts

  if (loading) return <p>Loading Steam games...</p>; // Show loading text
  if (error) return <p className={styles.error}>{error}</p>; // Show error message

  return (
    <div className={styles.steamGameList}>
      <h2 className={styles.gameListTitle}>Your Steam Games</h2>
      <ul className={styles.list}>
        {steamGames.map((game) => (
          <li key={game.appid} className={styles.listItem}>
            <p>Game Name: {game.name}</p>
            <p>App ID: {game.appid}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestIdDetails;
