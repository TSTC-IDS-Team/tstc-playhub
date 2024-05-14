import React from 'react';
import '../styles/FAQ.css';  // Ensure the CSS file is linked correctly

const faqs = [
    {
        question: "How do I customize a course?",
        answer: "You can customize courses by accessing the course settings and modifying the variables and parameters that align with your teaching goals.",
        
    },
    {
        question: "What interactive tools are available?",
        answer: "Our platform offers a variety of interactive tools, including quizzes, puzzles, and interactive diagrams, all designed to enhance learning and engagement.",
       
    },
    {
        question: "How can interactive learning help my students?",
        answer: "Interactive learning promotes active engagement, improves retention, and helps students develop critical thinking skills by making the learning process more dynamic and personalized.",
       
    },
    {
        question: "How do I add a game to my course?",
        answer: "We have made it easy for you to add a game to your course. Simply go through the list of games you want to add to your course, add it to your list of games. Copy the provided URL code and paste the link!",

    },
    {
        question: "What if I want to add a game mechanic to the game that I have?",
        answer: "We are always wanting to hear feedback from both instructors and students about our games. If there is a specific mechanic or gameplay attribute you want to add just ask!",

    },
    {
        question: "How can these be graded?",
        answer: "We are able to integrate with both SCORM and Canvas directly to add these games as a graded assignment. We can also give feedback like how long did it take the student to complete this task, did they replay it, which part did they struggle in the most and many more!"

    }
];

const FAQ = () => {
    return (
        <div className="faq-page" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/FAQRobot.jpeg)` }}>
            <div className="faq-header">
                <h1>Frequently Asked Questions</h1>
            </div>
            <div className="faq-content">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <h2>{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
