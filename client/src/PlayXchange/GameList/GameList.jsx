import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import styles from './GameList.module.css'; // Import CSS module

const GameList = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post'); // Navigate to CreatePost page
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
          <div key={game.id} className={styles.gameCard}>
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
