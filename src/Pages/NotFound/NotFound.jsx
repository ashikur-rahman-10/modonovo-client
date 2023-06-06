import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="text-center">
                <img
                    className="lg:w-[80%] mx-auto"
                    src="/src/assets/404.gif"
                    alt=""
                />
                <div className="mt-10">
                    <Link
                        to={"/"}
                        className="text-info outline outline-info px-4 py-2 rounded-3xl font-semibold hover:bg-info hover:text-white"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
