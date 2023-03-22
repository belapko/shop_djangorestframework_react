import React, {useEffect} from "react";
import "./Categories.css"

function Category({category}) {
    return (
        <p className="category">{category.title}</p>
    )
}

function Categories({categories}) {
    return (
        <div className="categories">
            {categories.map(category => (<Category category={category} key={category.id}/>))}
        </div>
    )
}

export default Categories;