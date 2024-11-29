import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameList.module.css";
import Web3 from "web3";
import tradeKeyAbi from "../../TradeKeyABI.json";

// Replace with your deployed contract address
const contractAddress = "0x8A32399Cdf47f2271e9Ca8CDcC2Ec59b5616D5E8";

const GameList = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null); // Track middle card
  const navigate = useNavigate();
  const containerRef = useRef(null);

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

  const handleScroll = () => {
    const container = containerRef.current;
    const cards = container.querySelectorAll(`.${styles.gameCard}`);

    let middleIndex = null;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const centerDistance = Math.abs(
        cardRect.top + cardRect.height / 2 - window.innerHeight / 2
      );

      if (centerDistance < closestDistance) {
        closestDistance = centerDistance;
        middleIndex = index;
      }
    });

    setActiveCardIndex(middleIndex);
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

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGameClick = (id) => {
    navigate("/id-details", { state: { id } });
  };

  return (
    <div className={styles.gameListContainer}>
      <span className={styles.titleDecoration}>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
        <span>I</span>
      </span>

      <span className={styles.space}></span>
      <span className={styles.space}></span>

      <h1 className={styles.title}>Game List</h1>
      <span className={styles.space}></span>
      <span className={styles.space}></span>
      <h2 className={styles.titleGlitch}>V V V</h2>

      <span className={styles.space}></span>

      <div className={styles.games} ref={containerRef}>
        {allItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.gameCard} ${
              index === activeCardIndex ? styles.middleCard : ""
            }`}
            onClick={() => handleGameClick(item.id || index)}
          >
            <h2 className={styles.gameName}>
              {item.value?.detail ? (
                <span>
                  <strong> {item.value.detail} </strong>
                </span>
              ) : (
                "No Details Available"
              )}
            </h2>

            <p className={styles.price}>
              <strong>
                Price: {Web3.utils.fromWei(item.price, "ether")} ETH
              </strong>
            </p>
            <p className={styles.description}>
              <strong>Steam Username:</strong> {item.value?.username || "N/A"}
              <br />
              <strong>Seller:</strong> {item.seller}
            </p>
            <p
              className={
                item.available ? styles.availableYes : styles.availableNo
              }
            >
              <strong>Available:</strong> {item.available ? "Yes" : "No"}
            </p>

            <button className={styles.buyButton}>Buy!</button>
          </div>
        ))}
      </div>
      <button className={styles.createPostButton} onClick={handleCreatePost}>
        +
      </button>
    </div>
  );
};

export default GameList;
