import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import styles from "./GameList.module.css"; // Import CSS module
import Web3 from "web3";
import tradeKeyAbi from "../../TradeKeyABI.json"; // Import your contract ABI here

// Replace with your deployed contract address
const contractAddress = "0x89eFcEBE8d6266E360602AAE1Ab5C434C59708C8";

const GameList = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post"); // Navigate to CreatePost page
  };

  const handleGetAllItems = async () => {
    try {
      const items = await contract.methods.getAllItemsDetails().call();
      const itemDetails = items[0].map((_, index) => ({
        seller: items[0][index],
        buyer: items[1][index],
        price: items[2][index],
        value: JSON.parse(items[3][index]), // Parse item.value as JSON
        available: items[4][index],
      }));
      setAllItems(itemDetails);
      console.log("itemDetails:", itemDetails);
    } catch (error) {
      console.error(error);
      alert("Error fetching item details");
    }
  };

  useEffect(() => {
    const loadWeb3AndContract = async () => {
      if (!window.ethereum) {
        alert("MetaMask not detected. Please install it to continue.");
        return;
      }

      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request accounts
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(tradeKeyAbi, contractAddress);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing web3 or contract:", error);
        alert("Failed to connect to MetaMask. Please check your setup.");
      }
    };

    loadWeb3AndContract();
  }, []);

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
    navigate("/id-details", { state: { id } }); // Pass the game ID as state
  };

  const games = [
    { id: 1, name: "Game 1", description: "Description 1", price: 10000 },
    { id: 2, name: "Game 2", description: "Description 2", price: 20000 },
  ];

  return (
    
    <div className={styles.gameListContainer}>
      <h1 className={styles.title}>Game List</h1>
      <div className={styles.games}>
        {allItems.map((item, index) => (
          <div
            key={index}
            className={styles.gameCard}
            onClick={() => handleGameClick(item.id || index)} // Add click handler (use item.id if it exists, else fallback to index)
          >
            <h2 className={styles.gameName}>Seller: {item.seller}</h2>
            <p className={styles.description}>Buyer: {item.buyer}</p>
            <p className={styles.price}>Price: {Web3.utils.fromWei(item.price, "ether")} ETH</p>
            <p className={styles.availability}>
              Available: {item.available ? "Yes" : "No"}
            </p>

            {/* Display item.value as a list */}
            <ul className={styles.detailsList}>
              {Object.entries(item.value).map(([key, value]) => (
                <li key={key} className={styles.detailsItem}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>

            <button className={styles.buyButton}>Buy!</button>
          </div>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Seller</th>
            <th>Buyer</th>
            <th>Price</th>
            <th>Details</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {allItems.map((item, index) => (
            <tr key={index}>
              <td>{item.seller}</td>
              <td>{item.buyer}</td>
              <td>{item.price}</td>
              <td>
                {/* Display parsed item.value as a list */}
                <ul>
                  {Object.entries(item.value).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{item.available ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <button className={styles.createPostButton} onClick={handleCreatePost}>
        +
      </button>
      <button onClick={handleGetAllItems}>Get Items</button>
      <button onClick={() => console.log("All items variable:", allItems)}>Log All Items</button>
      <button onClick={() => console.log("Item slice:", allItems.slice(0, 3))}>
        Test Array
      </button>
    </div>
  );
};

export default GameList;
