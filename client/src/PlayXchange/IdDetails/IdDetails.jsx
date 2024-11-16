import React from 'react';
import { useLocation } from 'react-router-dom'; // To access the passed state
import styles from './IdDetails.module.css'; // Import CSS module

const IdDetails = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Access the game ID from the state

  // Example data for the selected game
  const gamesData = [
    {
      id: 1,
      name: 'Game 1',
      description:
        'Lorem ipsum dolor sit amet consectetur. In sed luctus elit elementum eros cursus risus.',
      sellBy: 'PlayerX',
      price: '10,000',
    },
    {
      id: 2,
      name: 'Game 2',
      description:
        'Another fascinating game with unique elements and an engaging storyline.',
      sellBy: 'GamerY',
      price: '20,000',
    },
  ];

  // Find the selected game based on the ID
  const gameDetails = gamesData.find((game) => game.id === id) || {};

  return (
    <div className={styles.idDetailsContainer}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <span className={styles.navItem} onClick={() => window.history.back()}>
            Game list
          </span>
          <span className={styles.navTitle}>PlayXChange</span>
          <span className={styles.navItem}>id metamask</span>
        </nav>
      </header>

      {/* Game Details */}
      <div className={styles.detailsCard}>
        <h1 className={styles.gameName}>{gameDetails.name || 'Unknown Game'}</h1>
        <p className={styles.description}>{gameDetails.description || 'No description available.'}</p>
        <p className={styles.sellBy}>Sell by: {gameDetails.sellBy || '???'}</p>
        <p className={styles.price}>
          {gameDetails.price || 'N/A'}
          <br /><br />
          <button className={styles.buyButton}>Buy!!!</button>
        </p>
      </div>

      {/* Game List Section */}
      <div className={styles.gameList}>
        <h2 className={styles.gameListTitle}>Game List</h2>
        <ul className={styles.list}>
          {gamesData.map((game) => (
            <li key={game.id} className={styles.listItem}>
              Game Name: {game.name} <span className={styles.appId}>App ID: {game.id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IdDetails;
