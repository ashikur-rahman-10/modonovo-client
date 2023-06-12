import React from "react";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import moment from "moment";

const PaymentHistory = () => {
    const { user } = useAuth();

    const [axiosSecure] = UseAxiosSecure();

    const { data: payments = [], refetch: paymentsRefetch } = useQuery(
        ["payments"],
        async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    );
    return (
        <div className="px-4">
            <SectionTitle title={"Payment History"}></SectionTitle>
            <div className="overflow-x-auto max-w-3xl mx-auto rounded-2xl border-b">
                <table className="table w-full  md:w-full">
                    <thead>
                        <tr className="">
                            <th>#</th>
                            <th>
                                Date
                                <br />
                                TransactionId
                            </th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr
                                key={payment._id}
                                className="text-xs font-medium"
                            >
                                <th>{index + 1}</th>

                                <td className=" w-fit font-semibold text-xs ">
                                    <p className="">
                                        {moment(payment.date).format(
                                            "MMMM DD, YYYY, HH:mm:ss A"
                                        )}
                                    </p>
                                    <br />
                                    <p className="">{payment.transactionId}</p>
                                </td>

                                <td>$ {payment.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
