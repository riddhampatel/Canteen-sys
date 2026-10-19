import React from "react";
import SettingSidebar from "./SettingSidebar";
import SettingNav from "./SettingNav";
import SettingCard from "./Settingcard";
import { useState } from "react";

export default function Setting() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
      <SettingNav search={search} setSearch={setSearch} />
      <SettingCard search={search} />
    </div>
  );
}
