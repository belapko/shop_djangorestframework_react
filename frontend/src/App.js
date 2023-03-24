import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import AppRouter from "./components/AppRouter";

function App() {
    // let productsApiUrl = "http://127.0.0.1:8000/api/products/";
    // let categoriesApiUrl = "http://127.0.0.1:8000/api/categories/";
    //
    // const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState([]);
    //
    // useEffect(() => {
    //     fetch(productsApiUrl)
    //         .then(response => response.json())
    //         .then(
    //             (result) => {
    //                 setProducts(result.results);
    //             },
    //         );
    //     fetch(categoriesApiUrl)
    //         .then(response => response.json())
    //         .then(
    //             (result) => {
    //                 setCategories(result.results)
    //             }
    //         )
    // }, [categoriesApiUrl, productsApiUrl])
    //
    // console.log(categories)
    // console.log(products)

    return (
        <div className="wrapper">
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </div>
    );

}

export default App;
