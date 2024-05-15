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
                    videoElement.currentTime = 0; // Reset video to the start
                    videoElement.play(); // Ensure it plays again smoothly
                }, 1000); // Matches the transition time in CSS
            };

            videoElement.addEventListener('ended', handleVideoLoop);
            return () => {
                videoElement.removeEventListener('ended', handleVideoLoop);
            };
        }
    }, []);

    return (
        <div>
            <section className="hero">
                <video ref={videoRef} className="background-video" autoPlay loop muted>
                    <source
                        src="https://hero-video-bucket.s3.us-east-1.amazonaws.com/New_HMD.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaCXVzLWVhc3QtMiJIMEYCIQCjP7ur4%2BXCp5CsRZW21BcueO2R0DPDorkKNuiLTgSA4wIhAN1VYP9ZAsfbqIeIFfpP4SNAHr7QnbHt%2Fe76hjaPlcZ7Ku0CCJv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODUxNzI1NDk4MzM1Igzc%2B0lzDfE6ahf%2BR5YqwQKEFOd98guPIJXl6KW2if4mNipKQrZuOPCtqDjmBLfcEdtBIQMvGHYPQHiKneaqLKonJga5klCOi8W2MJsygRII09PiSXXlN2sdXr4uCeJcZ5nACGv1rRvIeGdT6PBKfrHBAFkFqN6WiP0nye%2FSmU8RvIMNrDUOlWVY4P3cjC6jLvFTuOSrO1AKbsq8WJ6aW5yQ1mBXcvsHpy9eopSBW8YCwZ1AEpZ26scGG0O%2FoIwfS%2FjlFkxJ%2BTS6ZmZ19PR8hkgZF16aK%2Bx0HKfHSXVqSwNcF9pJeNzBkqysM8NFDA5gqaoW5sLC8Zr7Cd6CSypSuf0AVIKj2SYaJ8TRL2ybA1bCnaOt2x84lYNo9ZC8s2pzHJlhRwGICHqstpIjSM0ouxAvdM7AIOw9JjOR0i4SCcQiqdYTJnCz7fP0xBa8PGuytXEw6o%2BQsgY6sgJPA4cJVPIw%2B7C7eWVNTQubiPbdyf0Hby3M5xfuo7D21lXmnFPkZmCHrs0bp%2FDyGD9fFHzi8BHtAjO%2BZzVFxK4XQxLlkEWJKkQUCV7sA26jDqjik3pKQO500kDFe9gG3xkNkoI4dFXqBBa4WwLY%2BD5z4hlDrMfDr6TFyi%2FA35MKKAsyrXz0bzwKOYL3lwcHZB%2FW%2BMoVOWQUuMBpajCRiPvFl6FIbDK0RJ5FY9JB%2FsoGQNClMEE3XMOA6jI9iAU3CutfBzDsWOAqS2%2Ff4nBGU2syonMOfWxXpG2dm4pf22SknrVDV9XMR82dl%2B2fgQniK87Ib%2FzXqMl5fIlY36T6NJfXHKLksi0zD4%2FtB%2B62RgYdM%2FWbFW9M7lFy6m8pC6U0DSFEG1BcWvVGtTIhUptc%2FQtTBJQ%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240515T014321Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA4MTWLW7PYIUVIUHD%2F20240515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9179dc6de62931ffe78eabd09384f98bd37feee5488234db1d73ab387e3d1509"
                        type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>

                <div className="content">
                    <h1>Welcome to TSTC Playhub</h1>
                    <p>Your gateway to integrating fun and learning!</p>
                    <button className="ctaButton">Get Started</button>
                </div>
            </section>
            <section className="additional-content">
                <h2>More Content</h2>
                <p>This is more content below the hero section that should be scrollable.</p>
            </section>
        </div>
    );
}

export default Hero;
