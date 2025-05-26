import React from "react";

import type { Metadata } from "next";
import Success from "@app/components/success/Success";

export const metadata: Metadata = {
  title: "Jamnas HTCI 2025 | Success",
  description: "Success",
};

const SuccessPage: React.FC = () => {
  return (
    <Success/>
  );
};

export default SuccessPage;
