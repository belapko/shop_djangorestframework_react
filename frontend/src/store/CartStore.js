import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._cart = [] /* _NameOfVar - переменная не может измениться (соглашение) */
        this._products = []
        this._total_quantity = 0
        this._total_price = 0
        makeAutoObservable(this) /* mobx умничка следит за изменениями переменных this */
    }

    setCart(cart) {
        this._cart = [...cart]
    }

    setProducts(products) {
        this._products = products
    }

    setTotalQuantity(total_quantity) {
        this._total_quantity = total_quantity
    }

    setTotalPrice(total_price) {
        this._total_price = total_price
    }

    get cart() {
        return this._cart
    }

    get products() {
        return this._products
    }

    get totalQuantity() {
        return this._total_quantity
    }

    get totalPrice() {
        return this._total_price
    }
}