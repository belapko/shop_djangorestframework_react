import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import axios from "axios";

const productsApiUrl = "http://127.0.0.1:8000/api/products/"

function App() {
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(productsApiUrl)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className="wrapper">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Products products={products}/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

    export default App;
