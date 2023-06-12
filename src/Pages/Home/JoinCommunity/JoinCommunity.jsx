import React from "react";
import "./JoinCommunity.css";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const JoinCommunity = () => {
    const [axiosSecure] = UseAxiosSecure();
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
    });
    const student = users.filter((user) => user.role == "Student");

    return (
        <div className="join mb-20">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="text-3xl md:text-5xl md:w-fit w-72 text-center font-semibold">
                    Trusted by Over {student.length}+ Students{" "}
                </h1>
                <p className="text-xs  w-72 text-center md:w-fit md:text-lg font-medium">
                    Join our community of students around the world helping you
                    succeed.
                </p>
                <div className="relative w-[180px]">
                    <button className="bg-[#b80924] px-5 py-3 rounded-lg font-semibold hover:text-[#b80924]  w-full z-20 absolute hover:bg-white">
                        Join Community
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinCommunity;
