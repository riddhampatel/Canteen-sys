import React from "react";
import TransactionSidebar from "./TransactionSidebar";
import TransactionNav from "./TransactionNav";
import TransactionCard from "./TransactionCard";

export default function Transaction() {
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
      {/* <TransactionSidebar /> */}
      <TransactionNav />
      <TransactionCard />
    </div>
  );
}
