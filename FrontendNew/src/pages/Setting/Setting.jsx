import React from "react";
import SettingSidebar from "./SettingSidebar";
import SettingNav from "./SettingNav";
import SettingCard from "./SettingForm";

export default function Setting() {
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
      {/* <SettingSidebar /> */}
      <SettingNav />
      <SettingCard />
    </div>
  );
}




