import React from "react";
import { motion } from "framer-motion";
const InstructorsCard = ({ instructor }) => {
    const { name, photoURL, email } = instructor;
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
                        <img className="w-full h-60" src={photoURL} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <div className="space-y-3">
                            <p className=" font-medium">Email: {email}</p>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-sm hover:outline outline-info mt-8  py-2 hover:bg-transparent border-none  rounded-3xl hover:text-info text-white font-semibold bg-info">
                                Show Classes
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InstructorsCard;
