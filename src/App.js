import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/InstructorDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import HomePage from "./pages/Home";

function App() {
    return (
        <Router >
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/dashboard" element={<InstructorDashboard />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
