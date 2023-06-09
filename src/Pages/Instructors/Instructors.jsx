import React from "react";
import useAuth from "../../Hooks/useAuth";

const Instructors = () => {
    const { loading } = useAuth();
    console.log(loading);
    return (
        <div>
            <h1>Instructors</h1>
        </div>
    );
};

export default Instructors;
