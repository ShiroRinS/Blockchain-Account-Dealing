import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountSecret.module.css';

const AccountSecret = () => {
  const navigate = useNavigate(); // For navigation
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Credentials:', credentials);
    // Save the formData object to localStorage as a JSON string
    localStorage.setItem('Credentials', JSON.stringify(credentials));
    // Add logic for saving or verifying credentials
    navigate('/confirmation'); // Replace with your next page route
  };

  const handleCancel = () => {
    navigate('/game-list'); // Navigate back to Game List
  };

  return (
    <div className={styles.accountSecretContainer}>
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

      {/* Form */}
      <div className={styles.formCard}>
        <h1 className={styles.title}>STEP 2</h1>
        <p className={styles.subtitle}>Put your username and password of Steam here</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>USERNAME</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter username"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter password"
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.createButton}>CREATE</button>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>CANCEL</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSecret;
