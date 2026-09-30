
import MenuNav from "./MenuNav";
import MenuCard from "./MenuCard";
import MenuSidebar from "./MenuSidebar";

export default function Menu() {
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
      {/* <MenuSidebar /> */}
      <MenuNav />
      <MenuCard />
    </div>
  );
}
