import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../components/AllProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addProduct',
                element: <AddProduct />
            },
            {
                path: '/allProducts',
                element: <AllProducts />
            }
        ]
    },
]);
export default router;