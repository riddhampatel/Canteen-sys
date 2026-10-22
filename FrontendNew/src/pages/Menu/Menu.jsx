import { useState } from "react";
import MenuNav from "./MenuNav2";
import MenuCard from "./MenuCard";

export default function Menu() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
      <MenuNav search={search} setSearch={setSearch} />
      <MenuCard search={search} />
    </div>
  );
}
