import {makeAutoObservable} from "mobx";

export default class ProductsStore {
    constructor() {
        this._categories = [] /* _NameOfVar - переменная не может измениться (соглашение) */
        this._products = []
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 4
        makeAutoObservable(this) /* mobx умничка следит за изменениями переменных this */
    }

    setCategories(categories) {
        this._categories = categories
    }
    setProducts(products) {
        this._products = [...products]
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    /* переменные геттеры нужны для получения переменных из нашего состояния */
    /* вызываются только в том случае, если переменная, которая используется внутри была изменена */
    get categories() {
        return this._categories
    }
    get products() {
        return this._products
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}