import React from "react";
import Marquee from "react-fast-marquee";

const SectionTitle = ({ title }) => {
    return (
        <div className="w-full max-w-md mx-auto flex bg-transparent justify-center my-10">
            <Marquee>
                <p className="text-4xl text-center py-2 uppercase">{title}</p>
            </Marquee>
        </div>
    );
};

export default SectionTitle;
