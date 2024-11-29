import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Web3 from 'web3'; // Ensure you have web3 installed
import styles from './Confirmation.module.css';
import tradeKeyAbi from "../../TradeKeyABI.json"; // Import your contract ABI here

const Confirmation = () => {
  const storedCredentials = localStorage.getItem('Credentials');
  const storedformData = localStorage.getItem('formData');
  const contractAddress = "0x4e6610eEBADB64Df6c0b2322C3B1823Da4e1fcdB";

  // State management
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  // Parse stored data
  const credentials = storedCredentials ? JSON.parse(storedCredentials) : {};
  const formData = storedformData ? JSON.parse(storedformData) : {};
  const { username, password } = credentials;
  const { price, ...restOfformData } = formData;

  const priceforsubmit = formData.price ? parseFloat(formData.price) : null;
  const mergedData = { ...credentials, ...restOfformData };
  const value = JSON.stringify(mergedData);

  const navigate = useNavigate();

  // Initialize web3 and contract
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

  // Handle account changes in MetaMask
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

  // Handle price and value submission
  const handleSetPriceAndValue = async () => {
    if (!priceforsubmit || !value) {
      alert("Please ensure both price and value are entered correctly.");
      return;
    }

    try {
      await contract.methods
        .setPriceAndValue(Web3.utils.toWei(priceforsubmit.toString(), "ether"), value)
        .send({ from: account });

      console.log("Price:", priceforsubmit)
      console.log("Value:", value)
      navigate('/success');
    } catch (error) {
      console.error("Error setting price and value:", error);
      alert("Failed to set price and value. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate('/account-secret');
  };

  return (
    <div className={styles.confirmationContainer}>

      {/* Confirmation Box */}
      <div className={styles.confirmationCard}>
        <h1 className={styles.title}>USERNAME: {username || "N/A"}</h1>
        <h1 className={styles.title}>PASSWORD: {password ? password.replace(/./g, '*') : "N/A"}</h1>
        <p className={styles.caution}>
          <strong>Caution: Please Review Before Confirming!</strong>
          <ul>
            <li>Double-check the game name and App ID to ensure they’re correct.</li>
            <li>Verify the transaction amount and confirm it matches your intended purchase or sale.</li>
            <li>Transactions may be final and non-refundable. Make sure all details are accurate.</li>
            <li>Once confirmed, this transaction cannot be reversed. Proceed only if you’re certain!</li>
          </ul>
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={handleSetPriceAndValue}>CONFIRM</button>
          <button className={styles.cancelButton} onClick={handleCancel}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
