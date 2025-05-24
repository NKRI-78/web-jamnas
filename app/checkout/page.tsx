import React from "react";

import type { Metadata } from "next";

import Checkout from "@components/checkout/Checkout";

export const metadata: Metadata = {
  title: "Admin | All Transaction",
  description: "All Transaction",
};

const CheckoutPage: React.FC = () => {
  return (
    <Checkout/>
  );
};

export default CheckoutPage;
