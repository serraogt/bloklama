import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { process, setTime } from '../features/mockFeature/mockSlice';
import Countdown from "../components/Countdown"
import axios from "axios";
import Blocker from '../components/Blocker';
import Contact from './Contact';
import { useNavigate } from 'react-router-dom';


function Home() {

  const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);
  const dispatch = useDispatch();


  const history = useNavigate();
  // useEffect(() => {
  //   if (history.action === "POP")
  //     console.log("Back button used. Not running stuff");
  //   else console.log("useEffect called in home");
  // }, []);



    // useEffect(() => {
    //   const handleBeforeUnload = (event) => {
    //     event.preventDefault();
    //     console.log("before");

    //   };
    //   window.addEventListener('beforeunload', handleBeforeUnload);
    //   return () => {

    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    //   };
    // }, []);


    
  // const handleAnyClick = (funct,message) => {
  //   console.log("handleAnyClick calisti")
  //   if (!requestIsleniyorMu){ //request işlenmiyor. Fonksiyona git
  //     funct(message)
  //   }
  //   else {
  //     console.log("şu anda işlenen bir request var. bu buton çalışmıyor")
  //   }
  // };


  // Set up Axios interceptors once
  // useEffect(() => {
  //   const interceptor = axios.interceptors.request.use(
  //     (config) => {
  //       if (requestIsleniyorMu) {
  //         console.log("Başka bir request işleniyor");
  //         return Promise.reject(new Error("Request in progress"));
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   // Cleanup interceptor on component unmount
  //   return () => {
  //     axios.interceptors.request.eject(interceptor);
  //   };
  // }, [requestIsleniyorMu]);


const handleButtonClick = (message) => {

  // document.body.style.pointerEvents = 'none';
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          console.log("RESPONSE DÖNDÜ.");
          dispatch(setTime(Number(message)));
          console.log(message + " saniyelik calisti");
        })
        .catch(error => {
          console.error(error);
        });
    
  };

  

return (
  <div className="App">
    <header className="App-header">
      <div align="center">
        <Link to={requestIsleniyorMu ? '#' : '/mock'} disabled={requestIsleniyorMu}> Other Page </Link>
        <div>
          
          <button
            // disabled={requestIsleniyorMu} 
            onClick={() => handleButtonClick(5)}
          >
            5 SANİYE
          </button>
          <button
            // disabled={requestIsleniyorMu} 
            onClick={() => handleButtonClick(3)}
          >
            3 SANİYE
          </button>
          <Countdown />
          <div>
          <Link to={'/block'}>blok fonksiyonu</Link>
          </div>
          <Link to={'/use'}> use blocker</Link>
          <div> <Link to={'/contacts/9'}> Contact</Link> </div>
        </div>
      </div>
    </header>
  </div>
);
}

export default Home;
