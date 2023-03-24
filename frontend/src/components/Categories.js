import "./Categories.css"
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";

function Category({category}) {
    return (
        <p className="category">{category.title}</p>
    )
}

const Categories = observer(() => {
    const {products} = useContext(Context)

    return (
        <div className="categories">
            {products.categories.map(category =>
                <p key={category.id} onClick={() => products.setSelectedCategory(category)} className="category">{category.title}</p>
            )}
        </div>
    )
})

export default Categories;