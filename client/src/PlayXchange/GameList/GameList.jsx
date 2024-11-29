import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameList.module.css";
import Web3 from "web3";
import tradeKeyAbi from "../../TradeKeyABI.json";

// Replace with your deployed contract address
const contractAddress = "0x4e6610eEBADB64Df6c0b2322C3B1823Da4e1fcdB";

const GameList = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const loadWeb3AndContract = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install it to continue.");
      return;
    }

    try {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      console.log("Connected account:", accounts[0]);

      const contractInstance = new web3Instance.eth.Contract(
        tradeKeyAbi,
        contractAddress
      );
      setContract(contractInstance);
      console.log("Contract initialized:", contractInstance);
    } catch (error) {
      console.error("Error initializing web3 or contract:", error);
      alert("Failed to connect to MetaMask. Please check your setup.");
    }
  };

  const fetchAllItems = async () => {
    if (contract) {
      try {
        const items = await contract.methods.getAllItemsDetails().call();
        console.log("Raw items from contract:", items);

        const itemDetails = items[0].map((_, index) => ({
          seller: items[0][index],
          buyer: items[1][index],
          price: items[2][index],
          value: JSON.parse(items[3][index]), // Parse item.value as JSON
          available: items[4][index],
        }));
        setAllItems(itemDetails);
        console.log("Parsed item details:", itemDetails);
      } catch (error) {
        console.error("Error fetching item details:", error);
        alert("Error fetching item details");
      }
    }
  };

  useEffect(() => {
    loadWeb3AndContract();
  }, []);

  useEffect(() => {
    fetchAllItems();
  }, [contract]);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        alert("MetaMask is locked or no account selected.");
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const handleGameClick = (id) => {
    navigate("/id-details", { state: { id } });
  };

  return (
    <div className={styles.gameListContainer}>
      <h1 className={styles.title}>Game List</h1>
      <div className={styles.titleDecoration}>
        <span>H</span>
        <span>I</span>
        <span>G</span>
        <span>H</span>
        <span>E</span>
        <span>R</span>
      </div>


      {allItems.map((item, index) => (
  <div
    key={index}
    className={styles.gameCard}
    onClick={() => handleGameClick(item.id || index)}
  >
    <h2 className={styles.gameName}>Seller: {item.seller}</h2>
    <p className={styles.description}>Buyer: {item.buyer}</p>
    <p className={styles.price}>
      Price: {Web3.utils.fromWei(item.price, "ether")} ETH
    </p>
    <p className={styles.availability}>
      Available: {item.available ? "Yes" : "No"}
    </p>
    <ul className={styles.detailsList}>
      {Object.entries(item.value).map(([key, value]) => {
        // Hide sensitive fields like 'password'
        if (key.toLowerCase() === "password") return null;
        return (
          <li key={key} className={styles.detailsItem}>
            <strong>{key}:</strong> {value}
          </li>
        );
      })}
    </ul>
    <button className={styles.buyButton}>Buy!</button>
  </div>
))}


      <button
        className={styles.createPostButton}
        onClick={handleCreatePost}
      >
        +
      </button>
    </div>
  );
};

export default GameList;
