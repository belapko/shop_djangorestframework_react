import './App.css';
import React, {useContext, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {getRefresh, getVerify} from "./http/userAPI";

const App = observer(() => {
    const {user} = useContext(Context)

    useEffect(() => {
        getVerify().then(promise => {
            if (promise.status === 200) {
                user.setUser(true)
                user.setIsAuth(true)
            }
        }).catch(e => {
            getRefresh().then(promise => {
                localStorage.setItem('access', promise.data.access)
                getVerify().then(() => {
                    user.setUser(true)
                    user.setIsAuth(true)
                })
            }).catch(e => {
                user.setUser({})
                user.setIsAuth(false)
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
            })
        })
    })

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );

})

export default App;
