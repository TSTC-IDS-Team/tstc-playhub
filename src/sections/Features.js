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
            description: "Revitalize your classroom with our cutting-edge interactive learning tools. Engage your students like never before by incorporating games that make learning both fun and memorable. Our platform enables you to breathe new life into traditional coursework, enhancing comprehension and retention through dynamic educational content. Embrace this innovative approach to education and watch as your students thrive, fostering a deeper understanding and a genuine enthusiasm for learning.",
            image: `${process.env.PUBLIC_URL}/images/FuturisticHMD.jpeg`

        },
        {
            title: "Customizable Courses",
            description: "Tailor each course to perfection with our dynamic educational platform. Offering unparalleled flexibility, this tool allows instructors to modify exposed variables and settings within games, crafting a truly personalized teaching experience. Empower your pedagogical approach by adjusting resources to seamlessly align with your teaching style and objectives. Make every course uniquely yours — where your vision sets the limits.",
            image: `${process.env.PUBLIC_URL}/images/CustomGames.webp`

        },
        {
            title: "Collaborative Tools",
            description: "Unite with our Instructional Design Support Team to transform your visionary concepts into tangible realities. Leveraging cutting-edge technology and advanced game engines, we collaborate closely with you to materialize any project you envision. With us, the only limit is your imagination!",
            image: `${process.env.PUBLIC_URL}/images/Coloborative.jpeg`

        }
    ];

    return (
        <div className="features section-gradient">
            {features.map(feature => <Feature key={feature.title} {...feature} />)}
        </div>
    );
}

export default Features;
