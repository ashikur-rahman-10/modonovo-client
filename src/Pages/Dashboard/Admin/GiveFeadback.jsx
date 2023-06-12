import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const GiveFeedback = () => {
    const { id } = useParams();
    const [axiosSecure] = UseAxiosSecure();

    const handleSend = async (event) => {
        event.preventDefault();
        const form = event.target;
        const message = form.message.value;
        const updates = { message };
        axiosSecure.patch(`/classes/feedback/${id}`, updates).then((data) => {
            if (data.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Review Send",
                    showConfirmButton: false,
                    timer: 1500,
                });
                event.target.reset();
            }
        });
    };

    return (
        <div>
            <SectionTitle title={"Write Feedback"}></SectionTitle>
            <div className="px-5 h-[70vh] flex justify-center items-center flex-col">
                <form onSubmit={handleSend} className="w-full max-w-md mx-auto">
                    <div className="form-control  w-full max-w-md mx-auto">
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Message"
                            name="message"
                            className="textarea input-bordered input-warning w-full max-w-md mx-auto"
                        />
                    </div>

                    <div className="w-full flex justify-center mt-10">
                        <button
                            type="submit"
                            className="text-white bg-warning font-semibold px-5 py-2 rounded-xl hover:text-warning hover:bg-white border border-warning"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GiveFeedback;
