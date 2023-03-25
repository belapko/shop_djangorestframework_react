import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import "./css/Pages.css"


const Pages = observer(() => {
    const {products} = useContext(Context)
    const pageCount = Math.ceil(products.totalCount / products.limit)
    const pages = []
    for (let i = 0; i <pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <div className="pagination">
            {pages.map(page =>
            <p className={products.page === page ? "active" : "not-active"} key={page} onClick={() => products.setPage(page)}>{page}</p>
            )}
        </div>
    )
})

export default Pages;