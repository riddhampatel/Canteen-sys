import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  UsersRound,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";

const UserSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-surface-container-lowest border-r border-outline-variant py-6 px-4 fixed left-0 top-0 z-40 flex flex-col">
  
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-xs">
          <Utensils size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary truncate leading-tight">
            Canteen Admin
          </h1>
          <p className="text-xs text-on-surface-variant truncate font-medium">
            Enterprise Suite
          </p>
        </div>
      </div>

    
      <nav className="flex-1 flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container rounded-lg font-semibold text-sm transition-all"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/menu"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container rounded-lg font-semibold text-sm transition-all"
        >
          <Utensils size={20} />
          <span>Menu Management</span>
        </NavLink>

        <NavLink
          to="/users"
          className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold text-sm shadow-xs transition-all"
        >
          <UsersRound size={20} />
          <span>User Records</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container rounded-lg font-semibold text-sm transition-all"
        >
          <ReceiptIndianRupee size={20} />
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container rounded-lg font-semibold text-sm transition-all mt-auto"
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;
