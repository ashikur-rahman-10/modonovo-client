import React from "react";
import loader from "../../assets/BookSpinner.gif";
const CustomLoader = () => {
    return (
        <div className="h-screen bg-white w-full flex justify-center items-center">
            <img src={loader} alt="" />
        </div>
    );
};

export default CustomLoader;
