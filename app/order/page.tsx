import React from "react";

import type { Metadata } from "next";
import Order from "@app/components/order/Order";

export const metadata: Metadata = {
  title: "Admin | All Transaction",
  description: "All Transaction",
};

const OrderPage: React.FC = () => {
  return (
    <Order/>
  );
};

export default OrderPage;
