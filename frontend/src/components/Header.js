import React from "react";
import "./Header.css"

function Header() {
    return (
        <React.Fragment>
            <header>
                <div>
                    <a className="logo" href="">House Staff</a>
                    <ul className="nav">
                        <li>Корзина</li>
                        <li>Про нас</li>
                        <li>Контакты</li>
                        <li>Профиль</li>
                    </ul>
                </div>
                <div className="presentation"></div>
            </header>
        </React.Fragment>
    );
}

export default Header;