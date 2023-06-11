import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const DashboardHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const { data: currentUser = [], refetch } = useQuery(
        ["email"],
        async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    );

    const { name, photoURL, email, phone, role, gender } = currentUser;
    return (
        <div>
            <SectionTitle title={`${name}`}></SectionTitle>
            <div className="w-full flex justify-center mt-20">
                <img
                    className="w-40 h-40 rounded-full"
                    src={photoURL}
                    alt={name}
                />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="p-4 mt-10 font-medium">
                    <p>Email: {email}</p>
                    <p>Phone: {phone}</p>
                    <p>Gender: {gender}</p>
                    <p>Role: {role}</p>
                </div>
            </div>
            <div className="w-full text-center mt-10">
                <button className="btn btn-sm hover:outline outline-info   py-2 hover:bg-transparent border-none  rounded-3xl hover:text-info text-white font-semibold bg-info">
                    Edit info
                </button>
            </div>
        </div>
    );
};

export default DashboardHome;
