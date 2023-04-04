import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false /* _NameOfVar - переменная не может измениться (соглашение) */
        this._user = {}
        this._clientSecret = ''
        makeAutoObservable(this) /* mobx умничка следит за изменениями переменных this */
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setClientSecret(secret) {
        this._clientSecret = secret
    }

    /* переменные геттеры нужны для получения переменных из нашего состояния */
    /* вызываются только в том случае, если переменная, которая используется внутри была изменена */
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    getClientSecret() {
        return this._clientSecret
    }
}