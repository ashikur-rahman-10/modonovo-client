import React from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const MyClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const { data: courses = [], refetch } = useQuery(["courses"], async () => {
        const res = await axiosSecure.get(`/classes/${user.email}`);
        return res.data;
    });
    console.log(courses);
    return (
        <div>
            <div>
                <SectionTitle title={"My Added Classes"}></SectionTitle>
            </div>
            <div>
                <div className="overflow-x-auto max-w-4xl mx-auto rounded-2xl border-b">
                    <table className="table w-fit md:w-full">
                        <thead>
                            <tr className="">
                                <th>#</th>
                                <th>Images</th>
                                <th>Course Name</th>
                                <th>Course Fee</th>
                                <th>
                                    Enrolled <br /> Students
                                </th>
                                <th>
                                    Seats <br />
                                    Available
                                </th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Feedback</th>
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
                                        <p className="">{course.className}</p>
                                    </td>

                                    <td>$ {course.price}</td>
                                    <td>{course.enrolledStudent}</td>
                                    <td>{course.availableSeats}</td>
                                    <td>{course.status}</td>
                                    <td className=" w-fit flex flex-col gap-2">
                                        <Link
                                            to={"/edit"}
                                            className="btn btn-xs border-none hover:text-black text-white bg-sky-500 hover:bg-sky-200  py-1 rounded-md"
                                        >
                                            Update
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
                                    <td>
                                        <Link className="btn btn-xs border-none hover:text-black text-white bg-amber-500 hover:bg-amber-200  py-1 rounded-md">
                                            View
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

export default MyClasses;
