import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { process, setTime } from '../features/mockFeature/mockSlice';
import Countdown from "../components/Countdown"


function Home() {
  

  const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);

  const dispatch = useDispatch();


  const handleButtonClick = (message) => {

    dispatch(process());
    dispatch(setTime(Number(message)))
  };

  return (
    <div className="App">
      <header className="App-header">
        <div align="center">
          <Link to={'/mock'} > Other Page </Link>
          <div>
          <button 
            disabled={requestIsleniyorMu} 
            onClick={() => handleButtonClick(5)}
          >
            5 SANİYE
          </button>
          <button  
            disabled={requestIsleniyorMu} 
            onClick={() => handleButtonClick(3)}
          >
            3 SANİYE
          </button>
          <Countdown/>
        </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
