import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/LoginRegistration/Login";
import Register from "../Pages/LoginRegistration/Register";
import Dashboard from "../Layouts/Dashboard";
import Instructors from "../Pages/Instructors/Instructors";
import PrivateRoute from "./PrivateRoutes";
import AdminOnly from "./AdminOnly";
import AddClass from "../Pages/Dashboard/InstructorsPage/AddClass";
import InstructorsOnly from "./InstructorsOnly";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers.jsx/AllUsers";
import Classes from "../Pages/Classes/Classes";
import MySelectedClass from "../Pages/Dashboard/Student/MySelectedClass";
import MyClasses from "../Pages/Dashboard/InstructorsPage/MyClasses";
import UpdateAclass from "../Pages/Dashboard/InstructorsPage/UpdateAclass";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Payments from "../Pages/Dashboard/Payments/Payments";
import MyEnrolled from "../Pages/Dashboard/Student/MyEnrolled";
import PaymentHistory from "../Pages/Dashboard/Student/PaymentHistory";
import GiveFeadback from "../Pages/Dashboard/Admin/GiveFeadback";
import ViewFeedback from "../Pages/Dashboard/InstructorsPage/ViewFeedback/ViewFeedback";

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
            {
                path: "instructors",
                element: <Instructors></Instructors>,
            },
            {
                path: "classes",
                element: <Classes></Classes>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>
        ),
        children: [
            {
                path: "allusers",
                element: (
                    <AdminOnly>
                        <AllUsers></AllUsers>
                    </AdminOnly>
                ),
            },
            {
                path: "addclass",
                element: (
                    <InstructorsOnly>
                        <AddClass></AddClass>
                    </InstructorsOnly>
                ),
            },
            {
                path: "manageClasses",
                element: (
                    <AdminOnly>
                        <ManageClasses></ManageClasses>
                    </AdminOnly>
                ),
            },
            {
                path: "selectedclass",
                element: <MySelectedClass></MySelectedClass>,
            },
            {
                path: "myclasses",
                element: (
                    <InstructorsOnly>
                        <MyClasses></MyClasses>
                    </InstructorsOnly>
                ),
            },
            {
                path: "myclasses/updateClass/:id",
                element: <UpdateAclass></UpdateAclass>,
            },
            {
                path: "payments/:id",
                element: <Payments></Payments>,
            },
            {
                path: "enrolledclass",
                element: <MyEnrolled></MyEnrolled>,
            },
            {
                path: "paymenthistory",
                element: <PaymentHistory></PaymentHistory>,
            },
            {
                path: "givefeadback/:id",
                element: (
                    <AdminOnly>
                        <GiveFeadback></GiveFeadback>
                    </AdminOnly>
                ),
            },
            {
                path: "viewfeedback/:id",
                element: (
                    <InstructorsOnly>
                        <ViewFeedback></ViewFeedback>
                    </InstructorsOnly>
                ),
            },
        ],
    },
]);

export default router;
