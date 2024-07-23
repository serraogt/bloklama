import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  
  const [saniye, setSaniye] = useState(0);
  const [message, setMessage] = useState('');
  const [uyari, setUyari] = useState('');
  const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);
  const [canSubmit, setCanSubmit] = useState(!requestIsleniyorMu);

  useEffect(() => {
    if (saniye > 0) {
      const timer = setTimeout(() => {
        setSaniye(saniye - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (saniye === 0 && message) {
      setUyari('Request işlendi');
      setCanSubmit(true);
    }
  }, [saniye]);

  const handleButtonClick = (message) => {
    setCanSubmit(false);
    setUyari('');
    setMessage(message);
    setSaniye(parseInt(message, 10));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div align="center">
          <Link to={'/mock'}> Other Page </Link>
          <div>
          <button 
            disabled={!canSubmit} 
            onClick={() => handleButtonClick('5')}
          >
            Buton 1
          </button>
          <button  
            disabled={!canSubmit} 
            onClick={() => handleButtonClick('3')}
          >
            Buton 2
          </button>
          <div id="saniye">{saniye}</div>
          <div id="uyari">{uyari}</div>
        </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
