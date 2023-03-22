import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Categories from "./components/Categories";

function App() {
    let productsApiUrl = "http://127.0.0.1:8000/api/products/";
    let categoriesApiUrl = "http://127.0.0.1:8000/api/categories/";

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect((num) => {
        fetch(productsApiUrl +  (num != null ? num : ""))
            .then(response => response.json())
            .then(
                (result) => {
                    setProducts(result);
                },
            );
        fetch(categoriesApiUrl)
            .then(response => response.json())
            .then(
                (result) => {
                    setCategories(result)
                }
            )
    }, [categoriesApiUrl, productsApiUrl])

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Header/>
                <Categories categories={categories}/>
                <Routes>
                    <Route path="/" element={<Products products={products}/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );

}

export default App;
