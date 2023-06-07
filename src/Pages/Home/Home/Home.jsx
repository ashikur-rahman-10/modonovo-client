import React from "react";

const Home = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div className="min-h-screen max-w-7xl mx-auto pt-16">
            <h1>Home</h1>
        </div>
    );
};

export default Home;
