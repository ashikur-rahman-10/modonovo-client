import React from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../../../Components/customLoader/CustomLoader";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import ClassCard from "../../../../Components/ClassCard";
import banner from "../../../../assets/clasesBanner/classBanner.jpg";

const PopulerClass = () => {
    const [axiosSecure] = UseAxiosSecure();

    const {
        data: popularClass = [],
        refetch: popularClassRefetch,
        isLoading,
    } = useQuery(["popularClass"], async () => {
        const res = await axiosSecure.get(`/classes/top`);
        return res.data;
    });
    if (isLoading) {
        return <CustomLoader></CustomLoader>;
    }
    return (
        <div className="bg-[url('https://i.ibb.co/Tt3yVSS/clothes-designers-working-store.jpg')] bg-fixed py-10 my-20">
            <SectionTitle title={"our Popular Classes"}></SectionTitle>
            <div className="grid md:grid-cols-3 w-fit gap-10 mx-auto p-4">
                {popularClass.map((course) => (
                    <ClassCard key={course._id} course={course}></ClassCard>
                ))}
            </div>
        </div>
    );
};

export default PopulerClass;
