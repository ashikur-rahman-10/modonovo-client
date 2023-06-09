import React from "react";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const MySelectedClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const { data: courses = [], refetch } = useQuery(["courses"], async () => {
        const res = await axiosSecure.get(`/carts/${user.email}`);
        return res.data;
    });
    console.log(courses);
    return (
        <div className="w-full max-w-7xl h-screen mx-auto px-4">
            <div>
                <SectionTitle title={"My Selected courses"}></SectionTitle>
                <div>
                    <div className="overflow-x-auto max-w-3xl mx-auto rounded-2xl border-b">
                        <table className="table w-fit md:w-full">
                            <thead>
                                <tr className="">
                                    <th>#</th>
                                    <th>Images</th>
                                    <th>
                                        Course Name <br /> Instructor Name
                                    </th>
                                    <th>Course Fee</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
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

                                        <td className=" w-fit font-semibold text-xs ">
                                            <p className="">
                                                {course.className}
                                            </p>
                                            <br />
                                            <p className="">
                                                {course.instructorName}
                                            </p>
                                        </td>

                                        <td>$ {course.price}</td>

                                        <td className=" w-fit flex flex-col gap-2">
                                            <Link
                                                to={"/payment"}
                                                className="btn btn-xs border-none hover:text-black text-white bg-sky-500 hover:bg-sky-200  py-1 rounded-md"
                                            >
                                                Pay
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    handleRemove(course._id);
                                                }}
                                                className="btn btn-xs border-none hover:text-black text-white bg-red-500 hover:bg-red-200  py-1 rounded-md"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySelectedClass;
