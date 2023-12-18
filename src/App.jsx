import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ThemeContext from './ThemeContext';
import './App.css';

function App() {
const [generateAlibi, setGenerateAlibi] = useState("");
 const [loadng, setLoading] = useState(false);

  const fetchAlibi = (excuse) => {
    setLoading(true);
    setTimeout(() => {
      Axios.get(`https://excuser-three.vercel.app/v1/excuse/${excuse}/`).then((res) => {
        setGenerateAlibi(res.data[0].excuse);
        setLoading(false);
      });
    }, 3000);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pagaeLanguage: 'en',
        autoDisplay : false,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    
  }, []);

  return(
    <ThemeContext.Provider value={isDarkMode}>
        <div
          id="google_translate_element"
          className={`App ${isDarkMode ? "dark" : "light"}`}>
        <h1>alibi generator</h1> 
          <div className='App'>
          <button className='glow-on-over' onClick={() => fetchAlibi("family")} >family</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("office")} >office</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("children")} >children</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("college")} >college</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("party")} >party</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("funny")} >funny</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("unbelievable")} >unbelievable</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("developers")} >developers</button>
            <button className='glow-on-over' onClick={() => fetchAlibi("gaming")} >gaming</button>
          </div>
          <div className='spinner' >
          {!loadng ? (
            <p className='text'>{generateAlibi}</p>
          ) : (
            <div>
              <PacmanLoader color={isDarkMode ? "white" : "hsla(168, 5%, 3%, 1)"} size={100} />
            </div>
            )}
            <button className="glow-on-hover theme" onClick={toggleTheme}>toggle theme</button>
          </div>
        </div>
    </ThemeContext.Provider>
  );
}


export default App;
  