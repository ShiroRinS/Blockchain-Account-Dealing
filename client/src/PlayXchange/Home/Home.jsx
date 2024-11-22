import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import styles from './Home.module.css'; // Import CSS module

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleEnterZone = () => {
    navigate('/game-list'); // Navigate to the Game List page
  };

  return (
    <div className={styles.homeContainer}>
      {/* Embed the Spline project */}
      <div className={styles.splineContainer}>
        <iframe
          src="https://my.spline.design/cardpasscopy-86d385d58aaec9040cb7d1480781dd5c/"
          frameBorder="0"
          width="100%"
          height="100%"
          className={styles.splineFrame}
          title="Spline Project"
        ></iframe>
      </div>
      <div className={styles.banner}>
        <h1 className={styles.title}>Stream Zone Unlocked</h1>
        <button className={styles.enterButton} onClick={handleEnterZone}>
          Enter the Zone
        </button>
      </div>
    </div>
  );
};

export default Home;
