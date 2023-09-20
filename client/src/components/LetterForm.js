import React, { useState, useEffect } from 'react';
import './Styles/LetterForm.css';
import musicFile from './mahabharat.mp3';
import murli from './images/murli3.png';

function LetterForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');
  const [language, setLanguage] = useState('');
  const [audio, setAudio] = useState(new Audio(musicFile)); // Create an audio state

  const playMusic = () => {
    // Play music when called
    audio.play();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      message,
      language,
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
        playMusic(); // Play music when the "Show Letter" button is clicked
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
    <>
    <div className="header grid justify-items-center">
      <img className=' w-44 lg:w-60  mb-6 md:mb-11 mt-3' src={murli} alt="murli logo"/>
    </div>
    <div className="letter-container  text-white " >
      <h1 className=" text-3xl mb-5 md:mb-0 letter-heading grid justify-items-center text-white lg:text-4xl ">Letter To Lord Krishna</h1>
      <form onSubmit={handleSubmit} className=' px-6 grid justify-center' >
        <div className="form-group m-2 ">
          <label htmlFor="username" className="form-label">Your Name:</label>
          <input
            type="text"
            className="form-control outline-none "
            id="username"
            style={{border:'none', borderBottom:'1px solid white', background:'none',marginLeft:'10px'}}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="language" className="form-label">Language:</label>
          <input
            type="text"
            className="form-control outline-none "
            style={{border:'none', borderBottom:'1px solid white', background:'none',marginLeft:'10px'}}
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
          <label htmlFor="message" className="form-label mx-3 my-5">Your Message to Lord Krishna :</label>
        <div className="form-group m-2">
          <textarea
            className="form-control rounded-2xl outline-none p-2 "
            id="message"
            value={message}
            style={{border:'1px solid white', background:'none',marginLeft:'10px',width:'90vw'}}
            onChange={(e) => setMessage(e.target.value)}
            rows="10"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-white text-black font-bold py-2 px-4 rounded-full mx-3" disabled={loading}>
          {loading ? 'Loading...' : 'Ask For Guidance'}
        </button>
      </form>
      {showLetter && (
        <div className="letter-display">
          <h2 className="letter-display-heading px-7 pt-7 pb-4 ">Letter from Lord Krishna</h2>
          <div className="letter-message">
            <p className='tracking-wider letter-p rounded-3xl' style={{paddingLeft:'25px',paddingRight:'25px'}} >"{letter}"</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default LetterForm;
