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
      {/* Success Message */}
      <div className={styles.successCard}>
        <h1 className={styles.title}>Listing Successful!</h1>
        <p className={styles.message}>
          Your listing has been posted on the PlayXChange market, fortune favors you!!
        </p>
        <button className={styles.homeButton} onClick={handleGoToHome}>
          Back to Game List
        </button>
      </div>
    </div>
  );
};

export default Success;
