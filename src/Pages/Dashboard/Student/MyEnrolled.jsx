import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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

    console.log(courseData);

    return <div></div>;
};

export default MyEnrolled;
