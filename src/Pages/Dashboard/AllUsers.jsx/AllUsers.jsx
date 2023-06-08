import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await fetch("http://localhost:5000/users");
        return res.json();
    });
    // console.log(users);
    return (
        <div className="w-full min-h-full">
            <SectionTitle title={"All Users"}></SectionTitle>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <div className="md:my-20 px-1 md:px-10 md:pt-10 pt-2 pb-5 md:pb-10 bg-base-100  mx-auto w-fit md:w-full max-w-4xl rounded-2xl">
                    <h1 className="text-2xl mb-5 text-center ">
                        Total Users:{users.length}
                    </h1>
                    <div className="hidden md:block">
                        <div className="overflow-x-auto rounded-2xl border-b">
                            <table className="table w-fit md:w-full">
                                <thead>
                                    <tr className="">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className="text-xs font-medium"
                                        >
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td className="flex flex-col gap-2">
                                                <button className="bg-yellow-200 px-3 py-1 rounded-md">
                                                    Make Admin
                                                </button>
                                                <button className="bg-sky-200 px-3 py-1 rounded-md">
                                                    Make Instructor
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* For Mobile Devices */}
                    <div className="md:hidden">
                        <div className="rounded-2xl border-b ">
                            <table className="table">
                                <thead>
                                    <tr className="">
                                        <th>#</th>
                                        <th>Name & Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user._id}>
                                            <th>{index + 1}</th>
                                            <td className="font-semibold text-xs ">
                                                <p className="w-28 overflow-x-auto">
                                                    {" "}
                                                    {user.name}
                                                </p>{" "}
                                                <br />
                                                <p className=" w-28 overflow-x-auto ">
                                                    {user.email}
                                                </p>
                                            </td>

                                            <td className="text-xs font-semibold">
                                                {user.role}
                                            </td>
                                            <td className="flex flex-col gap-3">
                                                <button className="bg-yellow-200 text-xs font-semibold px-1 py-1 rounded-md">
                                                    Make Admin
                                                </button>
                                                <button className="bg-sky-200 text-xs font-semibold px-1 py-1 rounded-md">
                                                    Make Instructor
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AllUsers;
