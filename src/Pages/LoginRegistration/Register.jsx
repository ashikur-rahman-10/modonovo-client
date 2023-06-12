import React, { useState } from "react";
import loginImg from "../../assets/loginGirl.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const { createUser, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const { name, email, password, photo, confirmPass, gender, phone } =
            data;

        if (password === confirmPass) {
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
                        const savedUser = {
                            name,
                            email,
                            photoURL: imgUrl,
                            gender,
                            phone,
                            role: "Student",
                        };

                        createUser(email, password)
                            .then((result) => {
                                const loggedUser = result.user;
                                updateUser(name, imgUrl)
                                    .then((result) => {
                                        fetch("http://localhost:5000/users", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(savedUser),
                                        });

                                        Swal.fire({
                                            icon: "success",
                                            title: "User Created Successfully Please Login to continue",
                                            showConfirmButton: false,
                                            timer: 1500,
                                        });

                                        logout()
                                            .then((result) => {
                                                navigate("/login");
                                            })
                                            .catch((error) => {});
                                    })
                                    .catch((error) => {
                                        console.log(error.message);
                                    });
                                console.log(loggedUser);
                            })
                            .catch((error) => {
                                console.log(error.message);
                            });
                    }
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Password is not matching",
                showConfirmButton: false,
                timer: 1500,
            });
            console.log(savedUser);
            return;
        }
    };

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div className="min-h-screen w-full max-w-7xl py-16 mx-auto flex items-center justify-center">
            <Helmet>
                <title>ModoNovo | Sign up</title>
            </Helmet>
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
                                {...register("name", { required: true })}
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
                                {...register("email", { required: true })}
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
                                {...register("password", {
                                    pattern:
                                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,}/,
                                    minLength: 6,
                                    required: true,
                                })}
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
                        {(errors.password?.type === "pattern" ||
                            errors.password?.type === "minLength") && (
                            <span className="text-xs text-red-600 mt-3">
                                password is less than 6 characters, don't have a
                                capital letter, don't have a special character
                            </span>
                        )}
                        <div className="form-control w-full h-fit relative">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                placeholder="type your password again"
                                {...register("confirmPass", { required: true })}
                                className="input input-bordered input-info"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="file-input file-input-bordered input-info w-full"
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
                                {...register("gender", {
                                    required: true,
                                })}
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
