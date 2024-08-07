
import { useSelector, useDispatch } from 'react-redux';
import { process, setTime } from './mockSlice';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Countdown from '../../components/Countdown';

const Mock = () => {
    const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);
    const time = useSelector((state) => state.mock.time)
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setTime(10))
        dispatch(process())
        console.log("mock calisti")

    };

    const [value, setValue] = React.useState("");

    // // Block navigating elsewhere when data has been entered into the input
    // let blocker = useBlocker(
    //     ({ currentLocation, nextLocation }) =>
    //         value !== "" &&
    //         currentLocation.pathname !== nextLocation.pathname
    // );


    // // const navigate = useNavigate();

    // useEffect(() => {
    //   const unblock = useBlocker((location, action) => {
    //     if (window.confirm("Sayfadan çıkmak istediğinizden emin misiniz?")) {
    //       unblock(); // Allow the navigation if the user confirms
    //       navigate(location.pathname); // Proceed with the navigation
    //     }
    //   });
  
    //   return () => {
    //     unblock(); // Cleanup the blocker when the component unmounts
    //   };
    // }, [navigate]);


    return (
        <div align="center">
            <Link to={requestIsleniyorMu ? '#' : '/'}  > Home </Link>
            <button disabled={requestIsleniyorMu} onClick={handleClick}>
                send request
            </button>
            <Countdown />
            {/* <form method="post">
                <label>
                    Enter some important data:
                    <input
                        name="data"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </label>
                <button type="submit">Save</button>

                {blocker.state === "blocked" ? (
                    <div>
                        <p>Are you sure you want to leave?</p>
                        <button onClick={() => blocker.proceed()}>
                            Proceed
                        </button>
                        <button onClick={() => blocker.reset()}>
                            Cancel
                        </button>
                    </div>
                ) : null}
            </form> */}

        </div>
    );
};

export default Mock;
