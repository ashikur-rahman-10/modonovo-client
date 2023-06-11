import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ cart, price }) => {
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = UseAxiosSecure();

    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post("/create-payment-intent", { price })
                .then((res) => {
                    // console.log(res.data.clientSecret);
                    // console.log(price);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            // console.log("error", error.message);
            setError(error.message);
        } else {
            // console.log("[PaymentMethod]", paymentMethod);
            setError("");
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        if (confirmError) {
            // console.log(confirmError);
        }

        console.log("payment intent", paymentIntent);
        setProcessing(false);

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                orderId: cart._id,
                courseId: cart.courseId,
                courseName: cart.courseName,
            };
            axiosSecure.post("/payments", payment).then((res) => {
                // console.log(res.data.insetResult);
                if (res.data?.insetResult?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment successfull",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        }
    };
    return (
        <div className="md:max-w-xl w-full px-4 mx-auto h-screen flex flex-col justify-center">
            <form
                onSubmit={handleSubmit}
                className="shadow-xl p-10 rounded-lg border"
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#5da3e8",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className="btn btn-sm hover:text-white btn-outline btn-info px-4 py-1 my-10"
                >
                    Pay
                </button>

                <p className="text-xs font-semibold text-error text-center">
                    {error}
                </p>
                {transactionId && (
                    <p className="text-green-500 text-xs font-semibold hover:text-green-600">
                        Transaction complete with transactionId: <br />{" "}
                        {transactionId}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CheckoutForm;
