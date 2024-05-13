import React from 'react';
import '../styles/Features.css'; // Ensure this is correctly linked

const Feature = ({ title, description, image }) => (
    <div className="feature">
        <img src={image} alt={title} className="featureImage" />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

const Features = () => {
    const features = [
        {
            title: "Interactive Learning",
            description: "Engage with educational content dynamically.",
            image: "/images/FuturisticHMD.jpeg"
        },
        {
            title: "Customizable Courses",
            description: "Adapt resources to fit your teaching style and needs.",
            image: "/images/CustomGames.webp"
        },
        {
            title: "Collaborative Tools",
            description: "Work together with educators across disciplines.",
            image: "/images/Coloborative.jpeg"
        }
    ];

    return (
        <div className="features">
            {features.map(feature => <Feature key={feature.title} {...feature} />)}
        </div>
    );
}

export default Features;
