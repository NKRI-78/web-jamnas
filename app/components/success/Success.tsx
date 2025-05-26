"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const SuccessPage: React.FC = () => {
    const [paymentInfo, setPaymentInfo] = useState({
        orderId: "",
        access: "",
        type: "",
        expire: ""
    });

    useEffect(() => {
        const orderId = Cookies.get("order_id") ?? "";
        const access = Cookies.get("payment_access") ?? "";
        const type = Cookies.get("payment_type") ?? "";
        const expire = Cookies.get("payment_expire") ?? "";

        setPaymentInfo({ orderId, access, type, expire });
    }, []);

    return (
        <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover flex items-center justify-center text-center p-6">
            <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
                <p className="text-gray-700 mb-6">Thank you for your order. Below are your payment details:</p>

                <div className="mb-6 space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold text-gray-700">Order ID</span>
                        <span className="text-gray-900 break-all text-right">{paymentInfo.orderId}</span>
                    </div>
                    <div className="flex flex-col gap-2 border-b pb-4">
                        <span className="font-semibold text-gray-700">Payment Info</span>

                        {paymentInfo.type === "emoney" ? (
                            <>
                                <p className="text-sm text-gray-600">Scan the QR code below to complete your payment:</p>
                                <img
                                    src={paymentInfo.access}
                                    alt="QR Code"
                                    className="w-60 h-60 mx-auto border rounded-md"
                                />
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-gray-600">Virtual Account Number:</p>
                                <p className="text-lg font-mono text-gray-900 break-all text-center">{paymentInfo.access}</p>
                            </>
                        )}
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold text-gray-700">Expires At</span>
                        <span className="text-gray-900">{paymentInfo.expire}</span>
                    </div>
                </div>

                <a href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-semibold">
                    Back to Home
                </a>
            </div>
        </div>
    );
};

export default SuccessPage;
