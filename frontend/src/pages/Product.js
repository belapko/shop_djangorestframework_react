import "./css/Product.css"
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchOneProduct} from "../http/productsAPI";
import Header from "../components/Header";
import {addToCart} from "../http/cartAPI";

function Product() {
    const [product, setProduct] = useState([])
    const {slug} = useParams()


    useEffect(() => {
        fetchOneProduct(slug).then(data => setProduct(data))
    }, [slug])

    return (
        <>
            <div className="wrapper">
                <Header/>
                <div className="singlecard">
                    <div className="singlecard-left">
                        <img className="singlecard-img" src={product.image_url} alt={product.title}/>
                    </div>
                    <div className="singlecard-right">
                        <p className="singlecard-title">{product.title}</p>
                        <p className="singlecard-price">{product.price} руб.</p>
                        <p className="singlecard-description">{product.description}</p>
                        <div className="btn-right">
                            <button
                                className="card__add"
                                onClick={() => addToCart(localStorage.getItem('cartId'), product.pk)}
                            >В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;