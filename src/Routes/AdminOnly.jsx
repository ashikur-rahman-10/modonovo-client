import React from "react";
import useAuth from "../Hooks/useAuth";
import UseAdmin from "../Hooks/UseAdmin";
import { Navigate, useLocation } from "react-router-dom";
import CustomLoader from "../Components/customLoader/CustomLoader";

const AdminOnly = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation;
    const { isAdmin, isAdminLoading } = UseAdmin();
    // console.log(isAdmin);
    if (loading || isAdminLoading) {
        return <CustomLoader></CustomLoader>;
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={"/"}></Navigate>;
};

export default AdminOnly;
