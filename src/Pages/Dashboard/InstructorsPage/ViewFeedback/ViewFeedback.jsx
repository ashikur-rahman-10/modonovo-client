import React from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const ViewFeedback = () => {
    const { id } = useParams();
    const [axiosSecure] = UseAxiosSecure();
    const { data: feedback = [], refetch } = useQuery(
        ["feedback"],
        async () => {
            const res = await axiosSecure.get(`/classes/feedback/${id}`);
            return res.data;
        }
    );
    // console.log(feedback);
    return (
        <div>
            <SectionTitle title={"Feedback"}></SectionTitle>
            <div className="p-10">
                <p>{feedback.feedback}</p>
            </div>
        </div>
    );
};

export default ViewFeedback;
