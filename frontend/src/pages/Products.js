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
import Footer from "../components/Footer";
import Pages from "../components/Pages";

const ProductItem = ({product}) => {
    const navigate = useNavigate()

    return (
        <div className="card">
            <div className="card__top">
                <span className="card__image" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
                    <img src={product.image_url} alt={product.title}/>
                </span>
            </div>
            <div className="card__bottom">
                <div className="card__prices">
                    <div className="card__price">{product.price}</div>
                </div>
                <span className="card__title" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
                    {product.title}
                </span>
                <button className="card__add">В корзину</button>
            </div>
            {/*<img src={product.image_url} alt={product.title}/>*/}
            {/*<p className="product-price">{product.price} ₽</p>*/}
            {/*<h2 onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>{product.title}</h2>*/}
            {/*<p className="product-description">{product.description}</p>*/}
            {/*<div className="add-to-cart">Купить</div>*/}
        </div>
    )
}

const ProductList = observer(() => {
    const {products} = useContext(Context)

    return (
        <main>
            <div className="cards">
                {products.products.map((product) => (<ProductItem key={product.id} product={product}/>))}
            </div>
        </main>
    )
})

const Products = observer(() => {
    const {products} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => products.setCategories(data.results))
        fetchProducts(null, 1).then(data => {
            products.setProducts(data.results)
            products.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchProducts(products.selectedCategory.id, products.page).then(data => {
            products.setProducts(data.results)
            products.setTotalCount(data.count)
        })
    }, [products.page, products.selectedCategory])

    return (
        <React.Fragment>
            <div className="wrapper">
                <Header/>
                <HeaderPresentation/>
                <Categories/>
                <ProductList/>
                <Pages />
                <Footer/>
            </div>
        </React.Fragment>
    )
});

export default Products;