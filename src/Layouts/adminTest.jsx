import React from "react";
import UseAdmin from "../Hooks/UseAdmin";

const AdminTest = () => {
    const { isAdmin } = UseAdmin();
    console.log(isAdmin);
    return (
        <div>
            <h1>hello</h1>
        </div>
    );
};

export default AdminTest;
