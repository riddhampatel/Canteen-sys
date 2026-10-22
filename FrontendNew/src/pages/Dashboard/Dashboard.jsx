import DashNav from "./DashNav.jsx";
import DashCards from "./DashCard.jsx";
import { useState } from "react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
      <DashNav search={search} />
      <DashCards search={search} setSearch={setSearch} />
    </div>
  );
}
