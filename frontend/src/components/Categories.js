import "./css/Categories.css"
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";

const Categories = observer(() => {
    const {products} = useContext(Context)

    return (
        <div className="categories">
            <p className="category" onClick={() => products.setSelectedCategory("")}>Все</p>
            {products.categories.map(category =>
                <p key={category.id} onClick={() => products.setSelectedCategory(category)}
                   className="category">{category.title}</p>
            )}
        </div>
    )
})

export default Categories;