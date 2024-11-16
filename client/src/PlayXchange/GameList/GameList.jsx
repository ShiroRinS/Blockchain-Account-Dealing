import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameList.module.css'; // Import the CSS module

const GameList = () => {
  // Sample data for the game list (replace with API data later)
  const games = [
    {
      id: 1,
      name: 'ID Game 1',
      description: 'Some description about the game goes here.',
      price: 10000,
    },
    {
      id: 2,
      name: 'ID Game 2',
      description: 'Another description for the second game.',
      price: 10000,
    },
    {
      id: 3,
      name: 'ID Game 3',
      description: 'Yet another game description.',
      price: 10000,
    },
  ];

  const handleBuy = (gameId) => {
    console.log(`Game ${gameId} purchased!`);
    // Add functionality to handle game purchase
  };

  return (
    <div className={styles.gameListContainer}>
      <h1 className={styles.title}>Game List</h1>
      <div className={styles.games}>
        {games.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <h2 className={styles.gameName}>{game.name}</h2>
            <p className={styles.description}>{game.description}</p>
            <p className={styles.price}>Price: {game.price}</p>
            <button
              className={styles.buyButton}
              onClick={() => handleBuy(game.id)}
            >
              Buy!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
