import React from "react";

const SectionTitle = ({ title }) => {
    return (
        <div className="w-full flex justify-center my-10">
            <p className="text-4xl text-center border-y-2 py-2 uppercase">
                {title}
            </p>
        </div>
    );
};

export default SectionTitle;
