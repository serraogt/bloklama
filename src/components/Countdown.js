
import React, { useEffect, useState } from 'react'
import { process, setFalse, setTime, setTrue } from '../features/mockFeature/mockSlice';
import { useDispatch, useSelector } from 'react-redux';




const Countdown = () => {

    const dispatch = useDispatch();
    const time = useSelector((state) => state.mock.time)
    const status = useSelector((state) => state.mock.requestIsleniyor)

    useEffect(() => {
      dispatch(setTrue())
        console.log("saniye: ", time);
        if (time > 0) {
          const timer = setTimeout(() => {
            dispatch(setTime(Number(time - 1)));
          }, 1000);
          return () => clearTimeout(timer);
        } else if (time === 0){
            console.log("süre bitti");
            dispatch(setFalse())
        
        }
      }, [time]);

      const reset = () => {
        dispatch(setTime(Number(0)));
        dispatch(process())
      }
      
  return (
    <div>countdown :{time}</div>
  )
}

export default Countdown;