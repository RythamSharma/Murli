import React, { useState } from 'react';
import LetterDisplay from './LetterDisplay';
import './Styles/LetterForm.css';

function LetterForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      message,
    };

    try {
      // Start loading
      setLoading(true);

      // Send a GET request to /sendmessage with query parameters
      const queryParams = new URLSearchParams(data).toString();
      const response = await fetch(`https://murliapi2.onrender.com/sendmessage?${queryParams}`);
      const responseJson = await response.json();

      if (response.ok) {
        // Assuming the response is JSON, you can parse it like this:
        console.log(responseJson);

        setLetter(responseJson.letter);
        setShowLetter(true);
      } else {
        console.error('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Stop loading, whether the request succeeds or fails
      setLoading(false);
    }
  };

  return (
    <div className="letter-container">
      <h1 className="letter-heading">Letter to Lord Krishna</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Your Name:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">Your Message to Lord Krishna:</label>
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Show Letter'}
        </button>
      </form>
      {showLetter && (
        <div className="letter-display">
          <h2 className="letter-display-heading">Letter from Lord Krishna</h2>
          <div className="letter-message">
            <p>{letter}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LetterForm;
