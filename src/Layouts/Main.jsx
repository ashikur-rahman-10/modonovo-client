import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../Components/Navigationbar/NavigationBar";
import Footer from "../Components/Footer/Footer";

const Main = () => {
    return (
        <div>
            <div className="fixed top-0 z-50">
                <NavigationBar></NavigationBar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
