import React from 'react';

const Banner = () => {
    return (
        <div style={{width: "100%",
            color: "white",
            backgroundColor: "#5CB85C",
            textAlign: "center",
            padding: "2rem",
            lineHeight: "1.5",
            boxShadow: "inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)"}}>
            <h1 style={{ fontSize: "3rem", color: "white"}}>
                BB Blog
            </h1>
            <p style={{ fontSize: "1.5rem" }}>Music makes you brave</p>
        </div>
    )
}

export default Banner;