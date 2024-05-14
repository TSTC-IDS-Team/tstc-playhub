import React, { useRef, useEffect } from 'react';
import '../styles/Hero.css';  // Adjust path if necessary

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleVideoLoop = () => {
                videoElement.style.opacity = '0';
                setTimeout(() => {
                    videoElement.style.opacity = '1';
                    videoElement.play(); // Ensure it plays again smoothly
                }, 1); // Matches the transition time
            };

            videoElement.addEventListener('ended', handleVideoLoop);
            return () => {
                videoElement.removeEventListener('ended', handleVideoLoop);
            };
        }
    }, []);

    return (
        <div className="hero">
            <video autoPlay loop muted ref={videoRef} className="videoBackground">
                <source src="/videos/HMDVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <h1>Welcome to TSTC Playhub</h1>
                <p>Your gateway to integrating fun and learning!</p>
                <button className="ctaButton">Get Started</button>
            </div>
        </div>
    );
}

export default Hero;
