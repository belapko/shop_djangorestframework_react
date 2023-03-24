import React, {useContext, useEffect} from "react";
import "./Products.css"
import Header from "../components/Header";
import HeaderPresentation from "../components/HeaderPresentation";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchProducts} from "../http/productsAPI";
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../utils/consts";
import Categories from "../components/Categories";

const ProductItem = ({product}) => {
    const navigate = useNavigate()

    return (
        <div className="product">
            <img src={product.image_url} alt={product.title}/>
            <p className="product-price">{product.price} ₽</p>
            <h2 onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <div className="add-to-cart">Купить</div>
        </div>
    )
}

const ProductList = observer(() => {
    const {products} = useContext(Context)

    return (
        <main>
            {products.products.map((product) => (<ProductItem key={product.id} product={product}/>))}
        </main>
    )
})

const Products = observer(() => {
    const {products} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => products.setCategories(data.results))
        fetchProducts(null, 1, 2).then(data => {
            products.setProducts(data.results)
            products.setTotalCount(data.count)
        })
    }, [])

    return (
        <React.Fragment>
            <Header/>
            <HeaderPresentation/>
            <Categories/>
            <ProductList/>
        </React.Fragment>
    )
});

export default Products;