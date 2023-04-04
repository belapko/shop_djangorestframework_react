import React, {useContext, useEffect} from "react";
import Header from "../components/Header";
import "./css/Cart.css"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {addToCart, deleteFromCart, fetchCart} from "../http/cartAPI";
import {getUserId} from "../http/userAPI";
import {PRODUCT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51MeHv2BlkGzSfQiJKEicctgrCiWz4jpHYI1gh10mkLQJVn2zZfHKo2xfSteBfxUEoeDdCfWtT7G837tAeFZf8zst00E6eQEZAQ')

const CartItem = ({item}) => {
    const navigate = useNavigate()

    return (
        <div className="cart-item">
            <img className="cart-img" src={item.product.image_url} alt={item.product.title}
                 onClick={() => navigate(PRODUCT_ROUTE + '/' + item.product.slug)}/>
            <span className="cart-title"
                  onClick={() => navigate(PRODUCT_ROUTE + '/' + item.product.slug)}>
                {item.product.title}</span>
            <div className="cart-items-count">
                <button className="cart-minus" onClick={() => {
                    addToCart(localStorage.getItem('cartId'), item.product.pk, -1)
                    window.location.reload()
                }}>-
                </button>
                <span className="cart-quantity">{item.quantity}
            </span>
                <button className="cart-plus"
                        onClick={() => {
                            addToCart(localStorage.getItem('cartId'), item.product.pk, +1)
                            window.location.reload()
                        }}>+
                </button>
            </div>
            <span className="cart-price">{item.price} ₽</span>
            <span className="cart-delete" onClick={() => deleteFromCart(item.pk)}>Удалить</span>
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
    const {user} = useContext(Context)

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

    const clientSecret = user.getClientSecret()

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="wrapper">
            <Header/>
            {user.isAuth ?
                <div className="cart">
                    <CartList/>
                    <div className="cart-right">
                        <p className="cart-p">Количество предметов в заказе: {cart.totalQuantity}</p>
                        <p className="cart-p">Сумма: {cart.totalPrice} ₽</p>
                        <div className="btn-right">
                            <button className="card__order" onClick={() => {
                                fetch("http://localhost:8000/api/create-payment-intent/", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        'amount': cart.totalPrice,
                                        'uid': localStorage.getItem('uid'),
                                        'cartId': localStorage.getItem('cartId')
                                    })
                                })
                                    .then((res) => res.json())
                                    .then((data) => user.setClientSecret(data.clientSecret))
                            }}>Оформить заказ
                            </button>
                            {clientSecret && (
                                <div className="payment-form">
                                    <Elements options={options} stripe={stripePromise}>
                                        <CheckoutForm/>
                                    </Elements>
                                </div>
                            )}
                            <div className="test-cards">
                                <p>Success: 5555 5555 5555 4444 (AnyFutureDate) (Any3Digits)</p>
                                <p>Not success: 4000 0000 0000 0002 (AnyFutureDate) (Any3Digits)</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <h2 className="need-login">Для просмотра корзины требуется авторизация</h2>
            }
        </div>
    )
})

export default Cart;