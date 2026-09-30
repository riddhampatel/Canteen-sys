import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  UsersRound,
  ReceiptIndianRupee,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Menu Management", path: "/menu", icon: Utensils },
  { name: "User Records", path: "/users", icon: UsersRound },
  { name: "Transactions", path: "/transactions", icon: ReceiptIndianRupee },
  { name: "Settings", path: "/settings", icon: Settings },
];

const SettingSidebar = () => {
  return (
   <aside className="w-64 h-screen bg-surface-container-lowest border-r border-outline-variant py-6 px-5 fixed left-0 top-0 z-40 flex flex-col">
      {/* Brand Area */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
          <Utensils size={20} />
        </div>
          <div className="overflow-hidden">
          <h1 className="text-[20px] font-bold text-primary leading-tight truncate">
            Canteen<br></br>Admin
          </h1>
          <p className="text-xs text-on-surface-variant font-medium truncate">
            Enterprise Suite
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 flex-grow">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-secondary-container text-on-secondary-container font-bold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-outline-variant px-6">
        <button
          type="button"
          className="flex items-center gap-3 px-3 py-2.5 w-full text-on-surface-variant hover:bg-error-container/40 rounded-lg text-[15px] font-semibold transition-colors cursor-pointer"
        >
          <LogOut size={19} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default SettingSidebar;
