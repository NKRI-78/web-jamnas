import React from "react";

import type { Metadata } from "next";

import Checkout from "@components/checkout/Checkout";

export const metadata: Metadata = {
  title: "Jamnas HTCI 2025 | Checkout",
  description: "Checkout",
};

const CheckoutPage: React.FC = () => {
  return (
    <Checkout/>
  );
};

export default CheckoutPage;
