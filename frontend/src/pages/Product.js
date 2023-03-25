import "./css/Product.css"
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchOneProduct} from "../http/productsAPI";
import Header from "../components/Header";

function Product() {
    const [product, setProduct] = useState([])
    const {id} = useParams()

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [id])

    return (
        <>
            <div className="wrapper">
                <Header/>
                <div className="singlecard">
                    <div className="singlecard-left">
                        <img src={product.image_url} alt={product.title}/>
                    </div>
                    <div className="singlecard-right">
                        <p className="singlecard-title">{product.title}</p>
                        <p className="singlecard-price">{product.price} руб.</p>
                        <p className="singlecard-description">{product.description}</p>
                        <div className="btn-right">
                            <button className="card__add">В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;