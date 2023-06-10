import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const UpdateAclass = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [axiosSecure] = UseAxiosSecure();
    const { data: course = [], refetch } = useQuery(["course"], async () => {
        const res = await axiosSecure.get(`/instructors/classes/${id}`);
        return res.data;
    });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const price = form.price.value;
        const availableSeats = form.availableSeats.value;
        const details = form.details.value;
        const updatedClass = {
            className,
            price: parseFloat(price),
            availableSeats: parseInt(availableSeats),
            details,
        };
        // console.log(updatedClass);
        axiosSecure
            .patch(`/instructors/classes/${id}`, updatedClass)
            .then((data) => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Class Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                    navigate("/dashboard/myclasses");
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Class Data is Same as previous",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    return (
        <div>
            <SectionTitle title={"Update a Class"}></SectionTitle>
            <div>
                <form onSubmit={handleOnSubmit} className="p-10 w-fit mx-auto">
                    <div className="form-control w-[300px] md:w-full">
                        <label className="label">
                            <span className="label-text font-medium">
                                Class Name
                            </span>
                        </label>
                        <input
                            type="text"
                            defaultValue={course.className}
                            name="className"
                            placeholder="class name"
                            className="input input-bordered input-info w-full "
                        />
                    </div>

                    <div className="flex md:flex-row flex-col gap-4 w-full mx-auto">
                        <div className="form-control w-[300px] md:w-72">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Price
                                </span>
                            </label>
                            <input
                                type="text"
                                defaultValue={course.price}
                                name="price"
                                placeholder="price"
                                className="input input-bordered input-info w-full max-w-xl"
                            />
                        </div>
                        <div className="form-control w-[300px] md:w-72">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Available Seats
                                </span>
                            </label>
                            <input
                                type="number"
                                defaultValue={course.availableSeats}
                                name="availableSeats"
                                placeholder="Available Seats"
                                className="input input-bordered input-info w-full max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="form-control w-[300px] md:w-full mx-auto">
                        <label className="label">
                            <span className="label-text font-medium">
                                Details
                            </span>
                        </label>
                        <textarea
                            type="text"
                            defaultValue={course.details}
                            name="details"
                            placeholder="Details"
                            className="textarea textarea-bordered textarea-info w-full"
                        />
                    </div>

                    <div className="flex w-full justify-center">
                        <input
                            className=" outline outline-info px-6 py-2 mt-10 rounded-3xl text-info hover:text-white font-semibold hover:bg-info"
                            type="submit"
                            value={"Update"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAclass;
