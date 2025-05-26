import React from "react";

import type { Metadata } from "next";
import Success from "@app/components/success/Success";

export const metadata: Metadata = {
  title: "Admin | All Transaction",
  description: "All Transaction",
};

const SuccessPage: React.FC = () => {
  return (
    <Success/>
  );
};

export default SuccessPage;
