import React from "react";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payments = () => {
    const { id } = useParams();
    const [axiosSecure] = UseAxiosSecure();
    const { data: course = [], refetch } = useQuery(["course"], async () => {
        const res = await axiosSecure.get(`/carts/saved/${id}`);
        return res.data;
    });

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={course} price={course.price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payments;
