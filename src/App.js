import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import FAQ from "./pages/FAQ";

import InstructorDashboard from "./pages/InstructorDashboard";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";


function App() {
    return (
        <Router >
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/*" element={<InstructorDashboard />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
