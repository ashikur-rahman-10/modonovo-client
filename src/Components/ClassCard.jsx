import React from "react";
import { Link } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import UseInstructor from "../Hooks/UseInstructor";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";

const ClassCard = ({ course, handleSelectClass }) => {
    const { className, price, availableSeats, image, instructorName, _id } =
        course;
    const { user } = useAuth();
    let conditionalButton;
    if (user) {
        const { isAdmin } = UseAdmin();
        const { isInstructor } = UseInstructor();
        conditionalButton = (
            <button
                onClick={() => {
                    handleSelectClass(_id);
                }}
                disabled={isAdmin || isInstructor || availableSeats < 1}
                className="btn btn-sm hover:outline outline-info   py-2 hover:bg-transparent border-none  rounded-3xl hover:text-info text-white font-semibold bg-info"
            >
                Select Now
            </button>
        );
    } else {
        conditionalButton = (
            <button
                onClick={() => {
                    handleSelectClass(_id);
                }}
                disabled={availableSeats < 1}
                className="btn btn-sm hover:outline outline-info   py-2 hover:bg-transparent border-none  rounded-3xl hover:text-info text-white font-semibold bg-info"
            >
                Select Now
            </button>
        );
    }

    return (
        <div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <div className="card card-compact md:w-80 bg-base-100 shadow-xl">
                    <figure>
                        <img className="w-full h-52" src={image} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{className}</h2>
                        <div className="space-y-3">
                            <p className=" font-medium">
                                Instructor: {instructorName}
                            </p>
                            <p className="text-xs font-semibold">
                                Seats Available: {availableSeats}
                            </p>
                            <p className="text-lg font-semibold">
                                Course Fee: ${price}
                            </p>
                            <Link className="text-xs text-warning hover:underline">
                                View Details
                            </Link>
                        </div>
                        <div className="card-actions justify-end">
                            {conditionalButton}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ClassCard;
