import {
    ACTIVATION_ROUTE,
    ADMIN_ROUTE,
    CART_ROUTE,
    LOGIN_ROUTE,
    PRODUCT_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Auth from "./pages/Auth";
import ActivateAccount from "./pages/ActivateAccount";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Products
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: Product
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ACTIVATION_ROUTE + '/:uid/:token',
        Component: ActivateAccount
    }
]