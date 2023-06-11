import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const CheckoutForm = ({ cart, price }) => {
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = UseAxiosSecure();
    return <div></div>;
};

export default CheckoutForm;
