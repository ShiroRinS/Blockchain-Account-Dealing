import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import styles from "./IdDetails.module.css";
import tradeKeyAbi from "../../TradeKeyABI.json"; // ABI for the smart contract

const CONTRACT_ADDRESS = "0xd903dC0Ea5DF7451B59E0e34E6b3ACf868C62e56"; // Replace with your contract address

const IdDetails = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Access the game ID from the state

  const [gameDetails, setGameDetails] = useState(null);
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      if (!window.ethereum) {
        setError("MetaMask not detected. Please install it to continue.");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const contract = new web3.eth.Contract(tradeKeyAbi, CONTRACT_ADDRESS);

        // Fetch individual game details
        const item = await contract.methods.items(id).call();
        const parsedValue = JSON.parse(item.value || "{}");
        setGameDetails({
          seller: item.seller,
          buyer: item.buyer,
          price: web3.utils.fromWei(item.price, "ether"),
          value: parsedValue,
          available: item.available,
        });

        // Fetch all game details
        const allItemsDetails = await contract.methods.getAllItemsDetails().call();
        const { sellers, buyers, prices, values, availabilities } = allItemsDetails;
        const formattedGames = values.map((value, index) => ({
          id: index,
          name: JSON.parse(value)?.name || `Game ${index + 1}`,
          price: web3.utils.fromWei(prices[index], "ether"),
          seller: sellers[index],
          buyer: buyers[index],
          available: availabilities[index],
        }));
        setGamesList(formattedGames);
      } catch (err) {
        console.error("Error fetching game data:", err);
        setError("Failed to fetch game details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  if (loading) return <p>Loading game details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.idDetailsContainer}>
      {/* Game Details Section */}
      <div className={styles.detailsCard}>
        <h1 className={styles.gameName}>
          {gameDetails?.value?.name || "Unknown Game"}
        </h1>
        <p className={styles.description}>
          {gameDetails?.value?.description || "No description available."}
        </p>
        <p className={styles.sellBy}>
          Sell by: {gameDetails?.seller || "???"}
        </p>
        <p className={styles.price}>
          Price: {gameDetails?.price || "N/A"} ETH
          <br />
          <br />
          <button
            className={styles.buyButton}
            disabled={!gameDetails?.available}
          >
            {gameDetails?.available ? "Buy!!!" : "Not Available"}
          </button>
        </p>
      </div>

      {/* Game List Section */}
      <div className={styles.gameList}>
        <h2 className={styles.gameListTitle}>Game List</h2>
        <ul className={styles.list}>
          {gamesList.map((game) => (
            <li key={game.id} className={styles.listItem}>
              Game Name: {game.name}{" "}
              <span className={styles.appId}>App ID: {game.id}</span>
              <span className={styles.priceTag}>Price: {game.price} ETH</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IdDetails;
