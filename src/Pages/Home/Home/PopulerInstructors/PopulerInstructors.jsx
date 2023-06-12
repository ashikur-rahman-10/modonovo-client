import React from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import Instructors from "../../../Instructors/Instructors";
import InstructorsCard from "../../../../Components/InstructorsCard";

const PopulerInstructors = () => {
    const [axiosSecure] = UseAxiosSecure();
    const { data: popularInstructors = [], refetch } = useQuery(
        ["popularInstructors"],
        async () => {
            const res = await axiosSecure.get("/instructors/popular");
            return res.data;
        }
    );

    return (
        <div className="bg-[url('https://img.freepik.com/free-photo/cup-man-achievement-success-honor_1150-1719.jpg?w=996&t=st=1686551300~exp=1686551900~hmac=33254a3aaa42ceed6eb0f2a8dfefa17a339d6b8571880ae874725ac5fc281960')] bg-fixed py-10 my-20">
            <SectionTitle title={"Popular Instructors"}></SectionTitle>
            <div className="grid md:grid-cols-3 w-fit mx-auto gap-10 px-4">
                {popularInstructors.map((instructor) => (
                    <InstructorsCard
                        key={instructor._id}
                        instructor={instructor}
                    ></InstructorsCard>
                ))}
            </div>
        </div>
    );
};

export default PopulerInstructors;
