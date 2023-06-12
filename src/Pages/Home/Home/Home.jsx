import React from "react";
import TopBanner from "./TopBanner/TopBanner";
import PopulerClass from "./PopulerClass/PopulerClass";
import PopulerInstructors from "./PopulerInstructors/PopulerInstructors";
import JoinCommunity from "../JoinCommunity/JoinCommunity";

const Home = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div className="min-h-screen max-w-7xl mx-auto pt-16 md:pt-0">
            <TopBanner></TopBanner>
            <PopulerClass></PopulerClass>
            <PopulerInstructors></PopulerInstructors>
            <JoinCommunity></JoinCommunity>
        </div>
    );
};

export default Home;
