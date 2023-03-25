import React, {useContext, useState} from "react";
import "./css/Auth.css"
import {useNavigate, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                console.log(data)
                user.setUser(data)
                user.setIsAuth(true)
                navigate(SHOP_ROUTE)
            } else {
                await registration(email, password, rePassword);
                alert(`Подтверждение отправлено на почту ${email}`)
                navigate(LOGIN_ROUTE)
            }
        } catch (e) {
            let error = e.response.data[(Object.keys(e.response.data))[0]] /* какой ужас получился...... */
            alert(error)
            console.log(e)
        }
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-26">{isLogin ? "Авторизация" : "Регистрация"}</span>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input className="input100" type="email" name="email" value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   placeholder="reactrestshop@yandex.ru"/>
                            <span className="focus-input100" data-placeholder="Email"></span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <input className="input100" type="password" name="pass" placeholder="enter password"
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>
                        {isLogin ?
                            <div></div>
                            :
                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                <input className="input100" type="password" name="pass" placeholder="repeat password"
                                       value={rePassword} onChange={e => setRePassword(e.target.value)}/>
                                <span className="focus-input100" data-placeholder="Password"></span>
                            </div>
                        }
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <div className="login100-form-btn" onClick={click}>
                                    {isLogin ? "Войти" : "Зарегистрироваться"}
                                </div>
                            </div>
                        </div>
                        {isLogin ?
                            <div className="text-center p-t-115">
                                <span className="txt1">Нет аккаунта? </span>
                                <span className="txt2" onClick={() => navigate(REGISTRATION_ROUTE)}>
                                Зарегистрироваться
                            </span>
                            </div>
                            :
                            <div className="text-center p-t-115">
                                <span className="txt1">Есть аккаунт? </span>
                                <span className="txt2" onClick={() => navigate(LOGIN_ROUTE)}>
                                Войти
                            </span>
                            </div>
                        }
                        <div className="text-center">
                            <span className="txt2" onClick={() => navigate(SHOP_ROUTE)}>На главную</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default Auth;