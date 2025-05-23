import React from "react";

import type { Metadata } from "next";

import AllTransactionPPOB from "@components/transaction/ppob";

export const metadata: Metadata = {
  title: "Admin | PPOB Transaction",
  description: "PPOB Transaction",
};

const TransactionPPOBPage: React.FC = () => {
  return (
    <AllTransactionPPOB />
  );
};

export default TransactionPPOBPage;
