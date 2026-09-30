import DashNav from "./DashNav.jsx";
import DashCards from "./DashCard.jsx";
import DashSidebar from "./DashSidebar.jsx";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-surface">
        {/* <DashSidebar/> */}
      <DashNav />
      <DashCards />
    </div>
  );
}


