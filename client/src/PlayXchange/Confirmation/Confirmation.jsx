import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and state access
import styles from './Confirmation.module.css';
<<<<<<< Updated upstream

const Confirmation = () => {
=======
import tradeKeyAbi from "../../TradeKeyABI.json"; // Import your contract ABI here
import adr from "../../address.txt"

const Confirmation = () => {
  const storedCredentials = localStorage.getItem('Credentials');
  const storedformData = localStorage.getItem('formData');
  const contractAddress = "0xd903dC0Ea5DF7451B59E0e34E6b3ACf868C62e56";

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

>>>>>>> Stashed changes
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve username and password from state
  const { username, password } = location.state || {
    username: 'Unknown',
    password: 'Unknown',
  };

  const handleConfirm = () => {
    console.log('Confirmed Credentials:', { username, password });
    // Add your logic to process or save the data
    navigate('/success'); // Navigate to a success page or next step
  };

  const handleCancel = () => {
    navigate('/account-secret'); // Navigate back to the previous page
  };

  return (
    <div className={styles.confirmationContainer}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <span className={styles.navItem} onClick={() => navigate('/game-list')}>
            Game list
          </span>
          <span className={styles.navTitle}>PlayXChange</span>
          <span className={styles.navItem}>id metamask</span>
        </nav>
      </header>

      {/* Confirmation Box */}
      <div className={styles.confirmationCard}>
        <h1 className={styles.title}>USERNAME: {username}</h1>
        <h1 className={styles.title}>PASSWORD: {password}</h1>
        <p className={styles.caution}>
          <strong>Caution: Please Review Before Confirming!</strong>
          <ul>
            <li>- Double-check the game name and App ID to ensure they’re correct.</li>
            <li>- Verify the transaction amount and confirm it matches your intended purchase or sale.</li>
            <li>- Transactions may be final and non-refundable. Make sure all details are accurate.</li>
            <li>- Once confirmed, this transaction cannot be reversed. Proceed only if you’re certain!</li>
          </ul>
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            CONFIRM
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
