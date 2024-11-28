<<<<<<< Updated upstream
import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import styles from './GameList.module.css'; // Import CSS module
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import styles from "./GameList.module.css"; // Import CSS module
import Web3 from "web3";
import tradeKeyAbi from "../../TradeKeyABI.json"; // Import your contract ABI here
import adr from "../../address.txt";

// Replace with your deployed contract address
const contractAddress = "0xd903dC0Ea5DF7451B59E0e34E6b3ACf868C62e56";
>>>>>>> Stashed changes

const GameList = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post'); // Navigate to CreatePost page
  };

  const handleGameClick = (id) => {
    // Navigate to the IdDetails page with the game ID
    navigate('/id-details', { state: { id } }); // Pass the game ID as state
  };

  const games = [
    { id: 1, name: 'Game 1', description: 'Description 1', price: 10000 },
    { id: 2, name: 'Game 2', description: 'Description 2', price: 20000 },
  ];

  return (
    <div className={styles.gameListContainer}>
      <h1 className={styles.title}>Game List</h1>
      <div className={styles.games}>
        {games.map((game) => (
          <div
            key={game.id}
            className={styles.gameCard}
            onClick={() => handleGameClick(game.id)} // Add click handler
          >
            <h2 className={styles.gameName}>{game.name}</h2>
            <p className={styles.description}>{game.description}</p>
            <p className={styles.price}>Price: {game.price}</p>
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
