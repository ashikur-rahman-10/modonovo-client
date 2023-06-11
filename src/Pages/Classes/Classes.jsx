import React, { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import ClassCard from "../../Components/ClassCard";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [axiosSecure] = UseAxiosSecure();
    useEffect(() => {
        fetch("http://localhost:5000/classes")
            .then((res) => res.json())
            .then((data) => {
                setClasses(data);
            });
    }, []);
    // console.log(classes);
    const approvedClasses = classes.filter(
        (course) => course.status == "Approved"
    );

    const handleSelectClass = (id) => {
        const seletedClass = approvedClasses.find((s) => s._id == id);
        const { className, price, image, instructorName, _id, availableSeats } =
            seletedClass;
        if (user) {
            const savedClass = {
                className,
                price,
                image,
                instructorName,
                email: user.email,
                courseId: _id,
                availableSeats,
            };
            axiosSecure.post("/carts", savedClass).then((data) => {
                if (data.data.acknowledged) {
                    Swal.fire({
                        icon: "success",
                        title: "Class Added Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        } else {
            Swal.fire({
                // title: "Are you sure?",
                text: "You won't be add without login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: location });
                }
            });
        }
    };
    return (
        <div className="min-h-screen w-full max-w-7xl mx-auto pt-20 p-4">
            <SectionTitle title={"All Classes"}></SectionTitle>
            <div className="grid md:grid-cols-3 w-fit gap-10 mx-auto">
                {approvedClasses.map((course) => (
                    <ClassCard
                        key={course._id}
                        course={course}
                        handleSelectClass={handleSelectClass}
                    ></ClassCard>
                ))}
            </div>
        </div>
    );
};

export default Classes;
