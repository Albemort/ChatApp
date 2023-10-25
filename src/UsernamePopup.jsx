// Tämä moduuli käsittelee PopUp -ikkunan, jossa
// pyydetään käyttäjää antamaan käyttäjänimi.
// Käyttäjänimi näkyy keskustelussa ja se tallentuu tilaan.

import React, { useState } from 'react';

const UsernamePopup = ({ onClose }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    onClose(username);
  };

  return (
    <div className="overlay">
      <div className="popup-overlay">
        <div className="popup">
          <h2>Anna käyttäjänimesi</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className='b2' 
            onClick={handleSubmit} 
            // Tarkistus, ettei käyttäjänimi ole tyhjä.
            disabled={username.trim() === ''}>
              Tallenna
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsernamePopup;

