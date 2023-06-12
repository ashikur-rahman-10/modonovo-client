import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import {
    FaBars,
    FaBook,
    FaBookMedical,
    FaBookReader,
    FaCheck,
    FaClipboardList,
    FaHome,
    FaUserSecret,
    FaUsers,
    FaBookOpen,
    FaWallet,
} from "react-icons/fa";
import logo from "../assets/logo/logo2.png";
import { motion } from "framer-motion";
import UseAdmin from "../Hooks/UseAdmin";
import CustomLoader from "../Components/customLoader/CustomLoader";
import useAuth from "../Hooks/useAuth";
import UseInstructor from "../Hooks/UseInstructor";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <CustomLoader></CustomLoader>;
    }
    const { isAdmin } = UseAdmin();
    const { isInstructor } = UseInstructor();
    let navOptions;

    if (isAdmin) {
        navOptions = (
            <>
                <li>
                    <NavLink to={"manageClasses"}>
                        <FaClipboardList></FaClipboardList> Manage Classes
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"allusers"}>
                        {" "}
                        <FaUsers></FaUsers> All Users
                    </NavLink>
                </li>
            </>
        );
    } else if (isInstructor) {
        navOptions = (
            <>
                <li>
                    <NavLink to={"myclasses"}>
                        <FaBookReader></FaBookReader> My classes
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"addclass"}>
                        <FaBookMedical></FaBookMedical> Add A Class
                    </NavLink>
                </li>
            </>
        );
    } else {
        navOptions = (
            <>
                <li>
                    <NavLink to={"selectedclass"}>
                        <FaCheck></FaCheck> My Selected Classes
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"enrolledclass"}>
                        <FaBookOpen></FaBookOpen> My Enrolled Classes
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"paymenthistory"}>
                        <FaWallet></FaWallet> payment history
                    </NavLink>
                </li>
            </>
        );
    }

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div>
            <Helmet>
                <title>ModoNovo | Dashboaard</title>
            </Helmet>
            <div className="drawer drawer-mobile">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <label
                    htmlFor="my-drawer-2"
                    className="p-3 text-2xl top-0 w-full bg-black opacity-20 absolute z-20 drawer-button lg:hidden"
                >
                    <FaBars className="text-white"></FaBars>
                </label>
                <div className="drawer-content pt-10 md:pt-0">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side h-screen">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 pt-12 uppercase text-base-content">
                        <Link to={"/"} className="w-full ml-4 my-3">
                            <img className="w-28" src={logo} alt="" />
                        </Link>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ rotate: 360, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            {navOptions}
                        </motion.div>
                        <div className="divider"></div>
                        <li>
                            <NavLink to={"/"}>
                                <FaHome></FaHome> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/instructors"}>
                                <FaUserSecret></FaUserSecret> Instructors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/classes"}>
                                <FaBook></FaBook> Classes
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
