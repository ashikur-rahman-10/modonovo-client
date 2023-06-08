import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { FaBars } from "react-icons/fa";
import logo from "../assets/logo/logo2.png";

const Dashboard = () => {
    const isAdmin = true;
    const isStudent = false;
    const isInstructor = false;

    let navOptions;

    if (isAdmin) {
        navOptions = (
            <>
                <li>
                    <NavLink to={"adminHome"}>Admins Home</NavLink>
                </li>
                <li>
                    <NavLink to={"allusers"}>All Users</NavLink>
                </li>
            </>
        );
    } else if (isInstructor) {
        navOptions = (
            <>
                <li>
                    <NavLink>Instructors Home</NavLink>
                </li>
                <li>
                    <NavLink>Sidebar Item 2</NavLink>
                </li>
            </>
        );
    } else {
        navOptions = (
            <>
                <li>
                    <NavLink>Student</NavLink>
                </li>
                <li>
                    <NavLink>Sidebar Item 2</NavLink>
                </li>
            </>
        );
    }

    return (
        <div>
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
                    <FaBars></FaBars>
                </label>
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side h-screen">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 pt-12 uppercase text-base-content">
                        <Link to={"/"} className="w-full ml-4 mb-3">
                            <img className="w-28" src={logo} alt="" />
                        </Link>
                        {navOptions}
                        <div className="divider"></div>
                        <li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/"}>Instructors</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/"}>Classes</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
