import React from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageClasses = () => {
    const token = localStorage.getItem("access-token");
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const { data: classes = [], refetch } = useQuery(["classes"], async () => {
        const res = await axiosSecure.get("/classes");
        return res.data;
    });
    // console.log(classes);

    const handleApprove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Approve",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(
                    `/classes/status/approved/${id}`
                );
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Approves Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        });
    };

    const handleDeny = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Deny",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(
                    `/classes/status/denied/${id}`
                );
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Denied Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            }
        });
    };

    return (
        <div>
            <div>
                <SectionTitle title={"Manage Classes"}></SectionTitle>
            </div>
            <div className="p-4">
                <div className="overflow-x-auto rounded-2xl border-b">
                    <table className="table w-fit md:w-full">
                        <thead>
                            <tr className="">
                                <th>#</th>
                                <th>Images</th>
                                <th>Course Name</th>
                                <th>
                                    Istructor Name <br /> & Email
                                </th>
                                <th>Price</th>
                                <th>
                                    Available <br /> Seats
                                </th>
                                <th>
                                    Enrolled <br /> Student
                                </th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((course, index) => (
                                <tr
                                    key={course._id}
                                    className="text-xs font-medium"
                                >
                                    <th>{index + 1}</th>
                                    <td>
                                        {" "}
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={course.image} />
                                        </div>
                                    </td>
                                    <td>{course.className}</td>
                                    <td className=" w-fit font-semibold text-xs ">
                                        <p className="">
                                            {" "}
                                            {course.instructorName}
                                        </p>{" "}
                                        <br />
                                        <p className="">
                                            {course.instructorEmail}
                                        </p>
                                    </td>

                                    <td>{course.price}</td>
                                    <td>{course.availableSeats}</td>
                                    <td>{course?.enrolledStudent}</td>
                                    <td>{course?.status}</td>
                                    <td className=" w-fit flex flex-col gap-2">
                                        <button
                                            disabled={
                                                course.status == "Approved" ||
                                                course.status == "Denied"
                                            }
                                            onClick={() => {
                                                handleApprove(course._id);
                                            }}
                                            className="btn btn-xs border-none hover:text-black text-white bg-green-500 hover:bg-green-200  py-1 rounded-md"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            disabled={
                                                course.status == "Approved" ||
                                                course.status == "Denied"
                                            }
                                            onClick={() => {
                                                handleDeny(course._id);
                                            }}
                                            className="btn btn-xs border-none hover:text-black text-white bg-red-500 hover:bg-red-200  py-1 rounded-md"
                                        >
                                            Denny
                                        </button>

                                        <Link
                                            to={`/dashboard/givefeadback/${course._id}`}
                                        >
                                            <button className="btn btn-xs border-none hover:text-black text-white bg-sky-500 hover:bg-sky-200  py-1 rounded-md">
                                                Feedback
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;
