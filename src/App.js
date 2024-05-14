import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import FAQ from "./pages/FAQ";

function App() {
    return (
        <Router >
            <div className="App">
                <Home/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faq" element={<FAQ />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
