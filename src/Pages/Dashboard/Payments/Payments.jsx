import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import CustomLoader from "../../../Components/customLoader/CustomLoader";
import { data } from "autoprefixer";

const Payments = () => {
    const [selectedCourse, setSelectedCourse] = useState();
    const { id } = useParams();

    const [axiosSecure] = UseAxiosSecure();
    const { data: course = [], refetch } = useQuery(["course"], async () => {
        const res = await axiosSecure.get(`/carts/saved/${id}`);
        return res.data;
    });

    // console.log(course.courseId);
    // const { data: selectedCourse = [] } = useQuery(
    //     ["selectedCourse"],
    //     async () => {
    //         const res = await axiosSecure.get(
    //             `/instructors/classes/${course.courseId}`
    //         );
    //         return res.data;
    //     }
    // );

    // console.log(selectedCourse);

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
    return (
        // <div>
        //     {selectedCourse.availableSeats > 0 ? (
        //         <div>
        //             <Elements stripe={stripePromise}>
        //                 <CheckoutForm
        //                     cart={course}
        //                     price={course.price}
        //                 ></CheckoutForm>
        //             </Elements>
        //         </div>
        //     ) : (
        //         <div>All seats are booked.</div>
        //     )}
        // </div>
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={course} price={course.price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payments;
