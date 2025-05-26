"use client";

import { AppDispatch, RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";
import { formatDateIndo } from "@lib/utils";
import { fetchPaymentListAsync, setSelectedPayment, StorePaymentAsync } from "@redux/slices/paymentSlice";
import { useRouter } from "next/navigation";

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { payments, selectedPayment, paymentCode, isLoading, error } = useSelector((state: RootState) => state.payment);
  const order = useSelector((state: RootState) => state.order.data);

  const [hasSelectedPayment, setHasSelectedPayment] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchPaymentListAsync());
  }, [dispatch]);

  // Track if a payment method is selected
  useEffect(() => {
    setHasSelectedPayment(!!selectedPayment);
  }, [selectedPayment]);

  const submit = async () => {
    if (!selectedPayment) return; // Safety check, button should be disabled anyway

    const sizes = order?.sizes ?? {};

    const payload: PaymentStore = {
      channel_id: selectedPayment,
      payment_code: paymentCode,
      club: order?.club ?? "",
      name: order?.name ?? "",
      email: order?.email ?? "",
      date: order?.dateOrigin ?? "",
      phone: order?.phone ?? "",
      detail_address: order?.detailAddress ?? "",
      size_s: sizes["S"] ?? 0,
      size_m: sizes["M"] ?? 0,
      size_l: sizes["L"] ?? 0,
      size_xl: sizes["XL"] ?? 0,
      size_2xl: sizes["2XL"] ?? 0,
      size_3xl: sizes["3XL"] ?? 0,
      size_4xl: sizes["4XL"] ?? 0,
      size_5xl: sizes["5XL"] ?? 0,
      size_6xl: sizes["6XL"] ?? 0,
      size_7xl: sizes["7XL"] ?? 0,
    };

    const result = await dispatch(StorePaymentAsync({ payload })).unwrap();

    Cookies.set("order_id", result.order_id, {
      expires: 365,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("payment_access", result.payment_access, {
      expires: 365,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("payment_type", result.payment_type, {
      expires: 365,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("payment_expire", result.payment_expire, {
      expires: 365,
      secure: true,
      sameSite: "strict",
    });

    router.push("/success");
  };

  if (isLoading) return <div className="text-center text-white">Loading payments...</div>;
  if (error) return <div className="text-center text-red-500">Error loading payments: {error}</div>;

  return (
    <div className="min-h-screen bg-[url('/images/bg-texture.png')] bg-cover bg-center p-4 md:p-8 text-black font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Order Section */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded shadow-lg">
          <h2 className="text-3xl font-bold mb-4">BILLING ORDER</h2>
          <div className="flex justify-center md:justify-start mb-4">
            <img src="/images/t-shirt.png" alt="Shirt Front" className="h-40" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p>Date</p>
              <p className="font-bold text-lg">{formatDateIndo(order?.date ?? "")}</p>
            </div>
            <div>
              <p>Alamat Email</p>
              <p className="font-bold text-lg break-words">{order?.email}</p>
            </div>
            <div>
              <p>Nama</p>
              <p className="font-bold text-lg">{order?.name}</p>
            </div>
            <div>
              <p>Club</p>
              <p className="font-bold text-lg">{order?.club}</p>
            </div>
            <div>
              <p>Phone Number</p>
              <p className="font-bold text-lg">{order?.phone}</p>
            </div>
            <div>
              <p>Detail Address</p>
              <p className="font-bold text-lg break-words">{order?.detailAddress}</p>
            </div>
            <div className="col-span-2 mt-4">
              <p>Size Order</p>
              <ul className="list-none">
                {order?.sizes &&
                  Object.entries(order.sizes)
                    .filter(([_, qty]) => qty > 0)
                    .map(([size, qty]) => (
                      <li key={size} className="font-bold">{`${size} - ${qty}`}</li>
                    ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded shadow-lg flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Payment</h2>

          <div className="bg-white border border-gray-300 rounded p-4 mb-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-2xl font-bold text-green-700">Rp 155.000</p>
            </div>
          </div>

          <div className="border-t pt-4 flex-grow">
            <p className="text-sm font-semibold mb-2">Select Payment Method</p>
            {Array.isArray(payments) && payments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {payments.map((payment) => {
                  const isSelected = selectedPayment === payment.id;

                  return (
                    <div
                      key={payment.id}
                      role="button"
                      aria-selected={isSelected}
                      onClick={() => dispatch(setSelectedPayment(payment))}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition
                            ${
                                isSelected
                                ? "border-green-600 bg-green-50 ring-2 ring-green-400"
                                : "border-gray-300 bg-white hover:bg-gray-50"
                            }
                        `}
                    >
                      <img src={payment.logo} alt={payment.name} className="h-6 w-auto object-contain" />
                      <span className="font-medium text-sm">{payment.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 col-span-3">No payment methods available.</p>
            )}
          </div>

          <button
            onClick={submit}
            disabled={!hasSelectedPayment}
            className={`w-full mt-6 py-3 rounded font-bold text-lg text-white transition-colors
              ${
                hasSelectedPayment
                  ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
            aria-disabled={!hasSelectedPayment}
          >
            PAY NOW!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
