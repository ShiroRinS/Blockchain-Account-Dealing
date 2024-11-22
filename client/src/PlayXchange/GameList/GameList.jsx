import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import styles from './GameList.module.css'; // Import CSS module

const GameList = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]); // State for storing games

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedGame = localStorage.getItem('formData'); // Fetch the game data
    if (storedGame) {
      const parsedGame = JSON.parse(storedGame);
      setGames([
        {
          id: 1,
          name: parsedGame.id,
          description: parsedGame.detail,
          price: parsedGame.price,
        },
      ]);
    }
  }, []);

  const handleCreatePost = () => {
    navigate('/create-post'); // Navigate to CreatePost page
  };

  const handleGameClick = (id) => {
    // Navigate to the IdDetails page with the game ID
    navigate('/id-details', { state: { id } }); // Pass the game ID as state
  };

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
        {games.length === 0 && <p>No games found. Create one!</p>} {/* Fallback when no games */}
      </div>
      <button className={styles.createPostButton} onClick={handleCreatePost}>
        +
      </button>
    </div>
  );
};

export default GameList;
