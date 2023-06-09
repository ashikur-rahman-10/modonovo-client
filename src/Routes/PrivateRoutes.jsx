import React, { useContext } from "react";
// import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import CustomLoader from "../Components/customLoader/CustomLoader";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <CustomLoader></CustomLoader>;
    }
    if (user) {
        return children;
    }
    return <Navigate to={"/login"} state={location} replace></Navigate>;
};

export default PrivateRoute;
