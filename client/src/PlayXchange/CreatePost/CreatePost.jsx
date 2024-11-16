import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './CreatePost.module.css'; // Import CSS module

const CreatePost = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({
    id: '',
    streamApi: '',
    detail: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your logic to handle form data if needed
    navigate('/account-secret'); // Navigate to AccountSecret page
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
            required
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
            required
          />
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
            required
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
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>NEXT</button>
      </form>
    </div>
  );
};

export default CreatePost;
