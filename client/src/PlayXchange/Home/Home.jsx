import React from 'react';
import styles from './Home.module.css'; // Import the CSS module

const Home = () => {
  // Function to handle "Enter the Zone" button click
  const handleEnterZone = () => {
    console.log("Entering the Zone...");
    // Navigate to the game list page or perform another action
    window.location.href = '/game-list'; // Adjust the path to your desired route
  };

  return (
    <div className="home-container">
      <div className="banner">
        <h1 className="title">Stream Zone Unlocked</h1>
        <button className="enter-button" onClick={handleEnterZone}>
          Enter the Zone
        </button>
      </div>
    </div>
  );
};

export default Home;
