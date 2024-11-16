import React, { useState } from 'react';
import styles from './CreatePost.module.css'; // Import CSS module

const CreatePost = () => {
  const [formData, setFormData] = useState({
    id: '',
    streamApi: '',
    detail: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add functionality to process the form data (e.g., send it to an API)
  };

  return (
    <div className={styles.createPostContainer}>
      <h1 className={styles.title}>STEP 1</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id" className={styles.label}>ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter ID"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="streamApi" className={styles.label}>STREAM API</label>
          <input
            type="text"
            id="streamApi"
            name="streamApi"
            value={formData.streamApi}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter Stream API"
          />
          <p className={styles.apiLink}>
            Link API: <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer">https://steamcommunity.com/dev/apikey</a>
          </p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="detail" className={styles.label}>DETAIL</label>
          <textarea
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Enter details"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>PRICE</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter price"
          />
        </div>
        <button type="submit" className={styles.submitButton}>NEXT</button>
      </form>
    </div>
  );
};

export default CreatePost;
