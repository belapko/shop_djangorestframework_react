import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
