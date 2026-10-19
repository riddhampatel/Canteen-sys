import React from "react";
import TransactionSidebar from "./TransactionSidebar";
import TransactionNav from "./TransactionNav";
// import TransactionCard from "./TransactionCard";
import TransactionCard from "./TransactionCard";
import { useState } from "react";

export default function Transaction() {
  const [search, setSearch] = useState(""); // gsearch
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
      {/* <TransactionSidebar /> */}
      <TransactionNav search={search} setSearch={setSearch} />
      <TransactionCard search={search} />
    </div>
  );
}
