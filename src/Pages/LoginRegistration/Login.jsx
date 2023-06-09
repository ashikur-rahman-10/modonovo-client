import React, { useState } from "react";
import loginImg from "../../assets/loginGirl.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { set, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const { loginWithPass } = useAuth();
    const location = useLocation();
    const from = location.state?.pathname || "/";
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        loginWithPass(data.email, data.password)
            .then((result) => {
                setError("");
                Swal.fire({
                    icon: "success",
                    title: "User Login Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from);
            })
            .catch((error) => {
                setError(error.message);
                console.log(error.message);
            });
        // console.log(data);
    };

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div className="min-h-screen w-full max-w-7xl py-16 mx-auto flex items-center justify-center">
            <div className="flex md:flex-row flex-col-reverse items-center justify-center w-full ">
                <div className="md:w-1/2 ">
                    <img src={loginImg} alt="" />
                </div>
                <div className="md:w-1/2 p-4 w-full max-w-md md:ml-20">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="shadow-md rounded-xl  md:p-10 p-6 "
                    >
                        <h1 className="text-center md:text-4xl text-2xl my-10">
                            Login
                        </h1>
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
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                placeholder="password"
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
                        {error && (
                            <span>
                                <p className="text-xs font-medium text-error mt-5">
                                    {error}
                                </p>
                            </span>
                        )}
                        <div>
                            <input
                                type="submit"
                                placeholder="password"
                                value={"Login"}
                                className="input input-bordered w-full hover:bg-transparent hover:text-info bg-info text-white my-7 input-info"
                            />
                        </div>
                        <div className="divider">Or</div>
                        <GoogleLogin></GoogleLogin>
                        <div className="flex items-center justify-center">
                            <Link
                                to={"/register"}
                                className="text-xs hover:underline text-warning font-medium"
                            >
                                Are you new? | Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
