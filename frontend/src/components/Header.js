import React, {useContext} from "react";
import "./css/Header.css"
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";

const Header = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
        localStorage.removeItem('uid')
        window.location.reload()
    }
    return (
        <React.Fragment>
            <header>
                <div>
                    <span className="logo" onClick={() => navigate(SHOP_ROUTE)}>House Staff</span>
                    {user.isAuth ?
                    <ul className="nav">
                        <li onClick={() => navigate(CART_ROUTE)}>Корзина</li>
                        <li>Про нас</li>
                        <li>Контакты</li>
                        <li>Профиль</li>
                        <li onClick={() => logout()}>Выйти</li>
                    </ul>
                        :
                        <ul className="nav">
                        <li onClick={() => navigate(CART_ROUTE)}>Корзина</li>
                        <li>Про нас</li>
                        <li>Контакты</li>
                        <li>Профиль</li>
                        <li onClick={() => navigate(LOGIN_ROUTE)}>Войти</li>
                    </ul>
                    }
                </div>
            </header>
        </React.Fragment>
    );
})

export default Header;