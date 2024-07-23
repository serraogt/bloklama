
import React, { useEffect, useState } from 'react'
import { process, setTime } from '../features/mockFeature/mockSlice';
import { useDispatch, useSelector } from 'react-redux';




const Countdown = () => {

    const dispatch = useDispatch();
    const time = useSelector((state) => state.mock.time)

    useEffect(() => {
        console.log("saniye: ", time);
        if (time > 0) {
          const timer = setTimeout(() => {
            dispatch(setTime(Number(time - 1)));
          }, 1000);
          return () => clearTimeout(timer);
        } else if (time === 0){
            console.log("süre bitti");
            dispatch(process())
        }
      }, [time]);

      const reset = () => {
        dispatch(setTime(Number(5)));
        dispatch(process())
      }
      
  return (
    <div>countdown :{time}</div>
  )
}

export default Countdown;