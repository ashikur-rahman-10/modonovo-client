import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo2.png";
import "./NavigationBar.css";

const NavigationBar = () => {
    const user = null;
    const navbarOptions = (
        <div className="flex lg:flex-row md:items-center uppercase  flex-col gap-2">
            <NavLink
                to={"/"}
                className="hover:text-blue-400 hover:bg-slate-200 hover:bg-opacity-30  py-2 px-3 rounded-xl"
            >
                HOME
            </NavLink>
            <NavLink
                to={"/instructors"}
                className="hover:text-blue-400 hover:bg-slate-200 hover:bg-opacity-30  py-2 px-3 rounded-xl"
            >
                Instructors
            </NavLink>
            <NavLink
                to={"/classes"}
                className="hover:text-blue-400 hover:bg-slate-200 hover:bg-opacity-30  py-2 px-3 rounded-xl"
            >
                Classes
            </NavLink>

            <NavLink
                to={"/dashboard"}
                className="hover:text-blue-400 hover:bg-slate-200 hover:bg-opacity-30  py-2 px-3 rounded-xl"
            >
                Dashboard
            </NavLink>
            {user && (
                <button className="hover:text-blue-400 hover:bg-slate-200 hover:bg-opacity-30  py-2 px-3 rounded-xl">
                    Log Out
                </button>
            )}
        </div>
    );
    return (
        <div className="w-full bg-black bg-opacity-10 text-white mx-auto">
            <div className="navbar w-full max-w-7xl mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm  bg-black bg-opacity-40 dropdown-content mt-3 p-2 shadow rounded-box w-52"
                        >
                            {navbarOptions}
                        </ul>
                    </div>
                    <Link
                        to={"/"}
                        className="hover:shadow normal-case flex flex-col rounded-lg  lg:text-3xl text-lg font-bold"
                    >
                        <img className="h-12" src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navbarOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end md:mr-4">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 outline outline-success rounded-full">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} />
                                    ) : (
                                        <img src={avatar} />
                                    )}
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-4 space-y-2 p-2 shadow bg-black bg-opacity-40 rounded-box w-52"
                            >
                                <li>
                                    <Link className=" bg-gray-400 bg-opacity-50 hover:bg-opacity-20 ">
                                        {user.displayName}
                                    </Link>
                                </li>
                                <li>
                                    <Link className=" bg-gray-400 bg-opacity-50 hover:bg-opacity-20 ">
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className=" bg-red-600 bg-opacity-70  font-medium  hover:bg-opacity-20 "
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <NavLink
                                to={"/login"}
                                className="hover:text-sky-400 hover:bg-slate-200 hover:bg-opacity-30  py-2 px-3 rounded-xl md:mr-10 mr-5"
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
