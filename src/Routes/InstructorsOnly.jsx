import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import CustomLoader from "../Components/customLoader/CustomLoader";
import UseInstructor from "../Hooks/UseInstructor";

const InstructorsOnly = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation;
    const { isInstructor, isInstructorLoading } = UseInstructor();
    // console.log(isAdmin);
    if (loading || isInstructorLoading) {
        return <CustomLoader></CustomLoader>;
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to={"/"}></Navigate>;
};

export default InstructorsOnly;
