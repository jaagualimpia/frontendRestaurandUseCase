import { createBrowserRouter } from "react-router-dom";
import { IndexLayout } from "../layouts/IndexLayout";
import { OrderLayout } from "../layouts/OrderLayout";
import { ProductLayout } from "../layouts/ProductLayout";
import { OrderMakingLayout } from "../layouts/OrderMakingLayout";


export const pathVariable = createBrowserRouter([
    {
        path: "/",
        element: <IndexLayout/>
    },
    {
        path: "/orders",
        element: <OrderLayout/>
    },
    {
        path: "/orders/create",
        element: <OrderMakingLayout/>
    }
])