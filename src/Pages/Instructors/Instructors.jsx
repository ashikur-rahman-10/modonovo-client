import React from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import InstructorsCard from "../../Components/InstructorsCard";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
    const [axiosSecure] = UseAxiosSecure();
    const { data: instructors = [], refetch } = useQuery(
        ["instructors"],
        async () => {
            const res = await axiosSecure.get("/users/instructors");
            return res.data;
        }
    );
    // console.log(instructors);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div className="w-full max-w-7xl mx-auto pt-20 min-h-screen p-4">
            <Helmet>
                <title>ModoNovo | Instructors</title>
            </Helmet>
            <SectionTitle title={"Our Instructors"}></SectionTitle>
            <div className="grid md:grid-cols-3 w-fit mx-auto gap-10">
                {instructors.map((i) => (
                    <InstructorsCard
                        key={i._id}
                        instructor={i}
                    ></InstructorsCard>
                ))}
            </div>
        </div>
    );
};

export default Instructors;
