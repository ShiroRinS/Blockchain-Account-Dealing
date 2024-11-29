import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./IdDetails.module.css";
import Web3 from "web3";
import tradeKeyAbi from "../../TradeKeyABI.json";

const contractAddress = "0x4e6610eEBADB64Df6c0b2322C3B1823Da4e1fcdB";

const IdDetails = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Access the game ID passed as state

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);
  const [ownedGames, setOwnedGames] = useState([]);

  const loadWeb3AndContract = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install it to continue.");
      return;
    }

    try {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const contractInstance = new web3Instance.eth.Contract(
        tradeKeyAbi,
        contractAddress
      );
      setContract(contractInstance);
    } catch (error) {
      console.error("Error initializing Web3 or contract:", error);
      alert("Failed to connect to MetaMask. Please check your setup.");
    }
  };

  const fetchGameDetails = async () => {
    if (contract) {
      try {
        const items = await contract.methods.getAllItemsDetails().call();
        const itemDetails = items[0].map((_, index) => ({
          id: index,
          seller: items[0][index],
          buyer: items[1][index],
          price: Web3.utils.fromWei(items[2][index], "ether"), // Convert price to Ether
          value: JSON.parse(items[3][index]), // Parse the value as JSON
          available: items[4][index],
        }));
        const selectedGame = itemDetails.find((item) => item.id === id);
        setGameDetails(selectedGame || null);

        if (selectedGame && selectedGame.value?.streamApi && selectedGame.value?.id) {
          fetchSteamGames(selectedGame.value.streamApi, selectedGame.value.id);
        }
      } catch (error) {
        console.error("Error fetching game details:", error);
        alert("Error fetching game details.");
      }
    }
  };

  const fetchSteamGames = async (apiKey, steamId) => {
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`
      );
      const data = await response.json();
      if (data && data.response && data.response.games) {
        setOwnedGames(data.response.games);
      } else {
        setOwnedGames([]);
      }
    } catch (error) {
      console.error("Error fetching games from Steam API via public proxy:", error);
      alert("Error fetching Steam games.");
    }
  };
  

  useEffect(() => {
    loadWeb3AndContract();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchGameDetails();
    }
  }, [contract]);

  return (
    <div className={styles.idDetailsContainer}>
      {gameDetails ? (
        <div className={styles.detailsCard}>
          <h2 className={styles.gameName}>
            <strong>{gameDetails.value?.detail || "No Details Available"}</strong>
          </h2>
          <p className={styles.price}>
            <strong>Price: {gameDetails.price} ETH</strong>
          </p>
          <p className={styles.description}>
            <strong>Steam Username:</strong> {gameDetails.value?.username || "N/A"}
            <br />
            <strong>Seller:</strong> {gameDetails.seller}
          </p>
          <p className={styles.availability}>
            <strong>Available:</strong> {gameDetails.available ? "Yes" : "No"}
          </p>
          <button className={styles.buyButton}>Buy!</button>
        </div>
      ) : (
        <p>Loading game details...</p>
      )}

      {/* Steam Games Section */}
      <div className={styles.steamGamesContainer}>
        <h2 className={styles.sectionTitle}>Steam Games</h2>
        {ownedGames.length > 0 ? (
          <ul className={styles.gamesList}>
            {ownedGames.map((game) => (
              <li key={game.appid} className={styles.gameItem}>
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
                  alt={game.name}
                  className={styles.gameImage}
                />
                <p className={styles.gameName}>{game.name}</p>
                <p className={styles.gamePlaytime}>
                  Playtime: {(game.playtime_forever / 60).toFixed(2)} hours
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No games found for this Steam account.</p>
        )}
      </div>
    </div>
  );
};

export default IdDetails;
