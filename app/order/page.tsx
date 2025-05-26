import React from "react";

import type { Metadata } from "next";
import Order from "@app/components/order/Order";

export const metadata: Metadata = {
  title: "Jamnas HTCI 2025 | Order",
  description: "Order",
};

const OrderPage: React.FC = () => {
  return (
    <Order/>
  );
};

export default OrderPage;
