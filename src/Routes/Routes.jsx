import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/LoginRegistration/Login";
import Register from "../Pages/LoginRegistration/Register";
import Dashboard from "../Layouts/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers.jsx/AllUsers";
import AdminTest from "../Layouts/adminTest";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <NotFound></NotFound>,
    },
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "allusers",
                element: <AllUsers></AllUsers>,
            },
        ],
    },
    // {
    //     path: "dashboard",
    //     element: <AdminTest></AdminTest>,
    // },
]);

export default router;
