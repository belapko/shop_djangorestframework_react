import React from "react";
import "./Products.css"

function Product({product}) {
    return (
        <div className="product">
            <img src={product.image_url} alt={product.title}/>
            <p className="product-price">{product.price} ₽</p>
            <h2>{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <div className="add-to-cart">Купить</div>
        </div>
    )
}

function Products({products}) {
    return (
        <main>
            {products.map((product) => (<Product key={product.id} product={product}/>))}
        </main>
    )
}

export default Products;