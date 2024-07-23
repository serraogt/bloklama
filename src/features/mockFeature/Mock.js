
import { useSelector, useDispatch } from 'react-redux';
import { process, setTime } from './mockSlice';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Countdown from '../../components/Countdown';

const Mock = () => {
    const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);
    const time = useSelector((state) => state.mock.time )
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setTime(10))
    };



    return (
        <div align="center">
            <Link to={'/'}> Home </Link>
            <button disabled={requestIsleniyorMu} onClick={handleClick}>
                send request
            </button>
            <Countdown />
        </div>
    );
};

export default Mock;
