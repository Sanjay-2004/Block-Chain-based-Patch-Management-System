import React from "react";
import './Styles.css'
function Error() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-text">Oops! The page you're looking for could not be found.</p>
        </div>
    );
}

export default Error;
