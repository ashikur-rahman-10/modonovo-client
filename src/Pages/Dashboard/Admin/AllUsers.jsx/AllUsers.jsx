import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";

const AllUsers = () => {
    const token = localStorage.getItem("access-token");
    const [axiosSecure] = UseAxiosSecure();
    const { user } = useAuth();
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await fetch("http://localhost:5000/users", {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.json();
    });

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Make Admin",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/admin/${id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Make Admin Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        });
    };
    const handleMakeInstructor = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Make Instructor",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`users/instructors/${id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Make Instructor Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        });
    };
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
                        Total Users:{users?.length}
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
                                            <td className=" w-fit flex flex-col gap-2">
                                                <button
                                                    disabled={
                                                        user.role == "Admin"
                                                    }
                                                    onClick={() => {
                                                        handleMakeAdmin(
                                                            user._id
                                                        );
                                                    }}
                                                    className="btn btn-xs border-none text-black hover:text-white hover:bg-yellow-500 bg-yellow-200  py-1 rounded-md"
                                                >
                                                    Make Admin
                                                </button>
                                                <button
                                                    disabled={
                                                        user.role ==
                                                        "Instructor"
                                                    }
                                                    onClick={() => {
                                                        handleMakeInstructor(
                                                            user._id
                                                        );
                                                    }}
                                                    className="btn btn-xs border-none text-black hover:text-white hover:bg-sky-500 bg-sky-200  py-1 rounded-md"
                                                >
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
                                        <th className="w-fit">#</th>
                                        <th className="w-fit">Name & Email</th>
                                        <th className="w-fit">Role</th>
                                        <th className="w-fit">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user._id}>
                                            <th className="w-fit">
                                                {index + 1}
                                            </th>
                                            <td className=" w-fit font-semibold text-xs ">
                                                <p className="w-[100px] overflow-x-auto">
                                                    {" "}
                                                    {user.name}
                                                </p>{" "}
                                                <br />
                                                <p className=" w-[100px] overflow-x-auto ">
                                                    {user.email}
                                                </p>
                                            </td>

                                            <td className=" w-fit text-xs font-semibold">
                                                {user.role}
                                            </td>
                                            <td className=" w-fit flex flex-col gap-3">
                                                <button
                                                    disabled={
                                                        user.role == "Admin"
                                                    }
                                                    onClick={() => {
                                                        handleMakeAdmin(
                                                            user._id
                                                        );
                                                    }}
                                                    className="btn btn-xs border-none text-xs text-black h-fit hover:text-white hover:bg-yellow-500 bg-yellow-200  py-1 rounded-md"
                                                >
                                                    Make <br /> Admin
                                                </button>
                                                <button
                                                    disabled={
                                                        user.role ==
                                                        "Instructor"
                                                    }
                                                    onClick={() => {
                                                        handleMakeInstructor(
                                                            user._id
                                                        );
                                                    }}
                                                    className="btn btn-xs border-none text-xs text-black h-fit hover:text-white hover:bg-sky-500 bg-sky-200  py-1 rounded-md"
                                                >
                                                    Make <br /> Instructor
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
