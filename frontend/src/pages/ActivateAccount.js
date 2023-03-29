import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./css/ActivateAccount.css"
import {$host} from "../http";
import {LOGIN_ROUTE} from "../utils/consts";

const ActivateAccount = () => {
    const {uid, token} = useParams();
    const navigate = useNavigate()
    const activeClick = (e) => {
        $host.post('api/auth/users/activation/', {uid:uid, token:token})
            .then(() => {
                navigate(LOGIN_ROUTE)
            })
            .catch(err => {alert(err.response.data())})
    }

    return (
        <React.Fragment>
            <button className="activate-btn" onClick={activeClick}>Activate Now</button>
        </React.Fragment>
    )
}

export default ActivateAccount;