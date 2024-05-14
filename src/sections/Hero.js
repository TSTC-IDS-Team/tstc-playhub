import React from 'react';
import '../styles/Hero.css';  // Adjust path if necessary

const Hero = () => {


    return (
        <div className="hero">
            <div className="imageBackground">
                <img src={process.env.PUBLIC_URL + "/images/OpenDoor.jpeg"} alt="TSTC Playhub Logo"/>
            </div>
            <div className="content">
                <div className="contentBox">
                    <h1>Welcome to TSTC Playhub</h1>
                    <p>Your gateway to integrating fun and learning!</p>
                    <button className="ctaButton">Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
