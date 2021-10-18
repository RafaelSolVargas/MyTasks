/* Libraries */
import React from "react";
import HashLoader from 'react-spinners/HashLoader'
/* CSS */
import './loading.css'

/* This component render and loading screen with z-index above all, and he can get called with
the loading boolean, that defines if he will render or not, and the message string that shows an
customized message below the loading icon
*/
const Loading = ({ loading, message }) => {
    return loading ? (
        <>
            <div className='overlay-content'>
                <HashLoader color={"#0CE928"}></HashLoader>
                <span className="message">{message}</span>
            </div>
        </>
    ) : null;


};

export default Loading;
