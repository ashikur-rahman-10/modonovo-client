import React, { useState } from "react";
import loginImg from "../../assets/loginGirl.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";

const Register = () => {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <div className="min-h-screen w-full max-w-7xl py-16 mx-auto flex items-center justify-center">
            <div className="flex md:flex-row-reverse flex-col-reverse items-center justify-center w-full ">
                <div className="md:w-1/2 ">
                    <img src={loginImg} alt="" />
                </div>
                <div className="md:w-1/2 p-4 w-full max-w-md md:ml-20">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="shadow-md rounded-xl  md:p-10 p-6 "
                    >
                        <h1 className="text-center md:text-4xl text-2xl my-10 md:my-5">
                            Sign Up
                        </h1>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="name"
                                {...register("name")}
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                {...register("email")}
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control w-full h-fit relative">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                placeholder="new password"
                                {...register("password")}
                                className="input input-bordered input-info"
                            />
                            <span
                                onClick={() => {
                                    setShow(!show);
                                }}
                                className="absolute bottom-4 right-3"
                            >
                                {show ? (
                                    <FaEyeSlash></FaEyeSlash>
                                ) : (
                                    <FaEye></FaEye>
                                )}
                            </span>
                        </div>
                        <div className="form-control w-full h-fit relative">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                placeholder="type your password again"
                                {...register("confirmPass")}
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Photo url"
                                {...register("photo")}
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="phone number (optional)"
                                {...register("phone")}
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <select
                                {...register("gender")}
                                className="select select-info w-full "
                            >
                                <option value={""}>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="submit"
                                placeholder="password"
                                value={"Register"}
                                className="input input-bordered w-full hover:bg-transparent hover:text-info bg-info text-white my-7 input-info"
                            />
                        </div>
                        <div className="divider">Or</div>
                        <GoogleLogin></GoogleLogin>
                        <div className="flex items-center justify-center">
                            <Link
                                to={"/login"}
                                className="text-xs hover:underline text-warning font-medium"
                            >
                                Already have account? | Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
