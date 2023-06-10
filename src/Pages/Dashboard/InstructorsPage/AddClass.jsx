import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
const AddClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        fetch(imageHostingUrl, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url;
                    const { price, className, availableSeats, details } = data;
                    const addedClass = {
                        className,
                        price: parseFloat(price),
                        availableSeats: parseInt(availableSeats),
                        image: imgUrl,
                        details,
                        instructorName: user.displayName,
                        instructorEmail: user.email,
                        status: "Pending",
                        enrolledStudent: 0,
                        feedback: "",
                    };
                    axiosSecure.post("/classes", addedClass).then((data) => {
                        if (data.data.acknowledged) {
                            Swal.fire({
                                icon: "success",
                                title: "Class Added Successfully",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            navigate("/dashboard/myclasses");
                            reset();
                        }
                    });
                }
            });
    };
    return (
        <div>
            <SectionTitle title={"Add a Class"}></SectionTitle>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-10 w-fit mx-auto"
                >
                    <div className="flex md:flex-row flex-col gap-4 w-full mx-auto">
                        <div className="form-control w-[300px] md:w-72">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Class Name
                                </span>
                            </label>
                            <input
                                type="text"
                                {...register("className", { required: true })}
                                placeholder="class name"
                                className="input input-bordered input-info w-full max-w-xl"
                            />
                        </div>
                        <div className="form-control w-[300px] md:w-72">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Image
                                </span>
                            </label>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="file-input file-input-bordered input-info w-full max-w-xs"
                            />
                        </div>
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
                                {...register("price", { required: true })}
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
                                {...register("availableSeats", {
                                    required: true,
                                })}
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
                            {...register("details", {
                                required: true,
                            })}
                            placeholder="Details"
                            className="textarea textarea-bordered textarea-info w-full"
                        />
                    </div>

                    <div className="flex w-full justify-center">
                        <input
                            className=" outline outline-info px-6 py-2 mt-10 rounded-3xl text-info hover:text-white font-semibold hover:bg-info"
                            type="submit"
                            value={"Submit"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
