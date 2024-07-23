import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { process } from './mockSlice';
import { Link } from 'react-router-dom';

const Mock = () => {
    const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(process());
    };

    return (
        <div align="center">
            <Link to={'/'}> Home </Link>
            <button disabled={requestIsleniyorMu} onClick={handleClick}>
                send request
            </button>
        </div>
    );
};

export default Mock;
