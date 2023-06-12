import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const MyEnrolled = () => {
    const { user } = useAuth();
    const [courseData, setCourseData] = useState([]);

    const [axiosSecure] = UseAxiosSecure();

    const { data: payments = [], refetch: paymentsRefetch } = useQuery(
        ["payments"],
        async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    );

    useQuery(
        ["courses"],
        async () => {
            const coursePromises = payments.map(async (payment) => {
                const res = await axiosSecure.get(
                    `/instructors/classes/${payment.courseId}`
                );
                return res.data;
            });
            const courseResults = await Promise.all(coursePromises);
            setCourseData(courseResults);
        },
        {
            enabled: payments.length > 0,
        }
    );
    paymentsRefetch();

    return (
        <div className="px-4">
            <SectionTitle title={"My Enrolled Classes"}></SectionTitle>
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
                        </tr>
                    </thead>
                    <tbody>
                        {courseData.map((course, index) => (
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

                                <td className=" w-fit font-semibold text-xs space-y-2 ">
                                    <p className="">{course.className}</p>

                                    <p className="">{course.instructorName}</p>
                                </td>

                                <td>$ {course.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEnrolled;
