import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import TradeKeyABI from '../../TradeKeyABI.json'; // Ensure correct path
import styles from './IdDetails.module.css';

// Replace with your deployed smart contract address
const CONTRACT_ADDRESS = '0x35c0Ef45Ae9e003A6017B4ED0FCCb3108Ee26838';

const NewIdDetails = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Access the game ID from the state
  const [gameDetails, setGameDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!id) return;
      setLoading(true);

      try {
        if (!window.ethereum) {
          setError('MetaMask not detected. Please install it to interact with the blockchain.');
          setLoading(false);
          return;
        }

        // Connect to Ethereum provider (MetaMask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, TradeKeyABI, provider);

        // Fetch item details from the blockchain
        const item = await contract.items(id);

        // Parse item details
        const parsedValue = JSON.parse(item.value); // Assuming `value` contains JSON data
        setGameDetails({
          id,
          name: parsedValue.name || 'Unknown Game',
          description: parsedValue.description || 'No description available',
          sellBy: item.seller,
          price: ethers.utils.formatEther(item.price), // Convert price from wei to Ether
        });
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Failed to load game details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleBuy = async () => {
    if (!gameDetails) return;

    try {
      if (!window.ethereum) {
        alert('MetaMask not detected. Please install it to complete the purchase.');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TradeKeyABI, signer);

      // Trigger purchase transaction
      const transaction = await contract.purchase(id, {
        value: ethers.utils.parseEther(gameDetails.price), // Sending the required Ether amount
      });

      await transaction.wait();
      alert('Purchase successful!');
    } catch (err) {
      console.error('Error during purchase:', err);
      alert(
        'Purchase failed. Ensure you have enough funds, are connected to the correct network, and approve the transaction.'
      );
    }
  };

  if (!id) return <div>No game selected.</div>;
  if (loading) return <div>Loading game details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.idDetailsContainer}>
      <div className={styles.detailsCard}>
        <h1 className={styles.gameName}>{gameDetails.name}</h1>
        <p className={styles.description}>{gameDetails.description}</p>
        <p className={styles.sellBy}>Sell by: {gameDetails.sellBy}</p>
        <p className={styles.price}>
          Price: {gameDetails.price} ETH
          <br />
          <br />
          <button className={styles.buyButton} onClick={handleBuy}>
            Buy Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default NewIdDetails;
