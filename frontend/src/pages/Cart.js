import React, {useContext, useEffect} from "react";
import Header from "../components/Header";
import "./css/Cart.css"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCart} from "../http/cartAPI";
import {getUserId} from "../http/userAPI";
import {PRODUCT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const CartItem = ({item}) => {
    const navigate = useNavigate()

    return (
        <div className="cart-item">
            <img className="cart-img" src={item.product.image_url} alt="Заглушка"
                 onClick={() => navigate(PRODUCT_ROUTE + '/' + item.product.slug)}/>
            <span className="cart-title"
                  onClick={() => navigate(PRODUCT_ROUTE + '/' + item.product.slug)}>
                {item.product.title}</span>
            <span className="cart-quantity">x{item.quantity}</span>
            <span className="cart-price">{item.price} ₽</span>
        </div>
    )
}

const CartList = observer(() => {
    const {cart} = useContext(Context)
    return (
        <div className="cart-left">
            {cart.cart.map((item) => <CartItem key={item.pk} item={item}/>)}
        </div>
    )

})


const Cart = observer(() => {
    const {cart} = useContext(Context)

    useEffect(() => {
        getUserId().then(promise => {
            localStorage.setItem('uid', promise.data.id)
        }).catch(e => {
            localStorage.removeItem('uid')
        })
        fetchCart().then(data => {
            cart.setTotalQuantity(data.data.total_quantity)
            cart.setTotalPrice(data.data.total_price)
            cart.setCart(data.data.items)
            localStorage.setItem('cartId', data.data.pk)
        })
    }, [cart])


    return (
        <div className="wrapper">
            <Header/>
            <div className="cart">
                <CartList/>
                <div className="cart-right">
                    <p className="cart-p">Количество предметов в заказе: {cart.totalQuantity}</p>
                    <p className="cart-p">Сумма: {cart.totalPrice} ₽</p>
                    <div className="btn-right">
                        <button className="card__order">Оформить заказ</button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Cart;