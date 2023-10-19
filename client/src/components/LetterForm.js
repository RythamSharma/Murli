import React, { useState, useEffect } from "react";
import "./Styles/LetterForm.css";
import musicFile from "./mahabharat.mp3";
import murli from "./images/murli3.png";
import useSpeechRecognition from "./hooks/useSpeechRecognitionhook.ts";
import Spinner from "./Spinner";

function LetterForm() {
  const {
    text,
    isListening,
    stopListening,
    startListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [spokenText, setSpokenText] = useState(""); 
  const [showLetter, setShowLetter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");
  const [language, setLanguage] = useState("");
  const [audio, setAudio] = useState(new Audio(musicFile));
  const [useMicrophone, setUseMicrophone] = useState(true); 

  const playMusic = () => {
    audio.play();
  };

  useEffect(() => {
    if (text) {
      setSpokenText((prevSpokenText) => prevSpokenText + " " + text);
      setMessage(text);
    }
  }, [text]);

  const toggleInputMode = () => {
    setUseMicrophone((prevMode) => !prevMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      message: useMicrophone ? spokenText : message,
      language,
    };
  
    if (useMicrophone && !spokenText) {
      console.error("Please start speaking before requesting guidance.");
      return;
    } else if (!useMicrophone && !message) {
      console.error("Please enter your message before requesting guidance.");
      return;
    }
  
    try {
      setLoading(true);
      console.log(data.message + " where the text is");
      const queryParams = new URLSearchParams(data).toString();
      const response = await fetch(
        `https://murliapi2.onrender.com/sendmessage?${queryParams}`
      );
      const responseJson = await response.json();
  
      if (response.ok) {
        console.log(responseJson);
  
        setLetter(responseJson.letter);
        setShowLetter(true);
        playMusic();
      } else {
        console.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="header grid justify-items-center">
        <img
          className=" w-44 lg:w-60  mb-6 md:mb-11 mt-3"
          src={murli}
          alt="murli logo"
        />
      </div>
      <div className="letter-container  text-white ">
        <h1 className=" text-3xl mb-5 md:mb-0 letter-heading grid justify-items-center text-white lg:text-4xl ">
          Letter To Lord Krishna
        </h1>
        <form onSubmit={handleSubmit} className={` ${useMicrophone?"justify-center":" n"} px-6 grid `}>
          <div className="form-group m-2 ">
            <label htmlFor="username" className="form-label">
              Your Name:
            </label>
            <input
              type="text"
              className="form-control outline-none "
              id="username"
              style={{
                border: "none",
                borderBottom: "1px solid white",
                background: "none",
                marginLeft: "10px",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="language" className="form-label">
              Language:
            </label>
            <input
              type="text"
              className="form-control outline-none "
              style={{
                border: "none",
                borderBottom: "1px solid white",
                background: "none",
                marginLeft: "10px",
              }}
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <label htmlFor="message" className="form-label text-xl mx-3 my-11">
            Lord Krishna is listening speak your heart out 🤍
          </label>
          {useMicrophone ? (
            <div className="form-group m-2">
              <div
                className="form-control rounded-2xl outline-none p-2 "
                id="message"
                value={message}
                style={{
                  border: "0px solid white",
                  background: "none",
                  marginLeft: "10px",
                  width: "90vw",
                }}
              >
                "{spokenText}" 
              </div>
              <svg
                onClick={startListening}
                xmlns="http://www.w3.org/2000/svg"
                version="1.2"
                viewBox="0 0 24 24"
                width={70}
                className="cursor-pointer m-auto"
                id="Microphone"
                >
                <path
                  d="M12 16c2.206 0 4-1.795 4-4V6c0-2.206-1.794-4-4-4S8 3.794 8 6v6c0 2.205 1.794 4 4 4zm7-4v-2a1 1 0 1 0-2 0v2c0 2.757-2.243 5-5 5s-5-2.243-5-5v-2a1 1 0 1 0-2 0v2c0 3.52 2.613 6.432 6 6.92V20H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-1.08c3.387-.488 6-3.4 6-6.92z"
                  fill="#ffffff"
                  className="color000000 svgShape"
                  ></path>
              </svg>
              {isListening && <Spinner />}
            </div>
          ) : (
            <div className="form-group m-2">
              <textarea
                className="form-control rounded-2xl w-full text-white bg-transparent outline-none border-2 border-white border-solid p-2"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="8"
                required
              ></textarea>
            </div>
          )}
          <button
            type="submit"
            className="bg-white text-black font-bold py-2 px-4 rounded-full mx-3 mt-5"
            disabled={loading}
          >
            {loading ? "Loading..." : "Ask For Guidance"}
          </button>
          <button onClick={toggleInputMode} className="text-white underline cursor-pointer mt-3">
            {useMicrophone ? "Switch to Text Input" : "Switch to Microphone Input"}
          </button>
        </form>
        {showLetter && (
          <div className="letter-display">
            <h2 className="letter-display-heading px-7 pt-7 pb-4 ">
              Letter from Lord Krishna
            </h2>
            <div className="letter-message">
              <p
                className="tracking-wider letter-p rounded-3xl"
                style={{ paddingLeft: "25px", paddingRight: "25px" }}
              >
                "{letter}"
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LetterForm;
