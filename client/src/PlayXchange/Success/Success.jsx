import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';

const Success = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/game-list'); // Navigate to the Game List or home page
  };

  return (
    <div className={styles.successContainer}>
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

      {/* Success Message */}
      <div className={styles.successCard}>
        <h1 className={styles.title}>Transaction Successful!</h1>
        <p className={styles.message}>
          Your transaction has been completed successfully. Thank you for using PlayXChange!
        </p>
        <button className={styles.homeButton} onClick={handleGoToHome}>
          Back to Game List
        </button>
      </div>
    </div>
  );
};

export default Success;
