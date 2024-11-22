import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Tracks if the loader is visible
  const [iframeLoaded, setIframeLoaded] = useState(false); // Tracks if the Spline iframe has loaded
  const [showButton, setShowButton] = useState(false); // Tracks if the button should be shown

  useEffect(() => {
    // Start the 1-second buffer only after the iframe is loaded
    if (iframeLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false); // Hide the loader after 1 second
        setTimeout(() => {
          setShowButton(true); // Show the button 2 seconds after the loader is hidden
        }, 3000); // 3-second delay for the button
      }, 1000); // 1-second buffer for the loading cover

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [iframeLoaded]);

  const handleEnterZone = () => {
    navigate('/game-list'); // Navigate to the Game List page
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true); // Mark the iframe as loaded
  };

  return (
    <div className={styles.homeContainer}>
      {/* Full-page loader */}
      {isLoading && (
        <div className={`${styles.fullPageLoader} ${iframeLoaded ? styles.fadeOut : ''}`}>
          <div className={styles.spinner}></div>
          <p className={styles.loaderText}>Loading Stream Zone...</p>
        </div>
      )}

      {/* Embed the Spline project */}
      <div className={styles.splineContainer} style={{ opacity: isLoading ? 0 : 1 }}>
        <iframe
          src="https://my.spline.design/cardpasscopy-86d385d58aaec9040cb7d1480781dd5c/"
          frameBorder="0"
          width="100%"
          height="100%"
          className={styles.splineEmbed}
          title="Spline Project"
          onLoad={handleIframeLoad} // Detect when the iframe finishes loading
        ></iframe>
      </div>
      <h1 className={styles.title}>Steam Zone Unlocked</h1>

      {/* Fixed "Enter the Zone" button with fade-in animation */}
      <button
        className={`${styles.enterButton} ${showButton ? styles.fadeInButton : ''}`}
        onClick={handleEnterZone}
        style={{ display: showButton ? 'block' : 'none' }}
      >
        <b>Enter the Zone</b>
      </button>
    </div>
  );
};

export default Home;
