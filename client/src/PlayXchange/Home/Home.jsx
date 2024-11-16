import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  
    const handleEnterZone = () => {
      navigate('/game-list');
    };

    return (
        <button onClick={handleEnterZone}>Enter the Zone</button>
    );
};

export default Home;
