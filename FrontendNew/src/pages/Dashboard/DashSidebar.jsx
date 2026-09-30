import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  UsersRound,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";

const DashSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant py-6 px-4 fixed left-0 top-0 z-40">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shadow-sm shrink-0">
          C
        </div>
        <div>
          <div className="text-xl font-bold text-on-surface leading-tight">
            Admin Panel
          </div>
          <div className="text-xs text-on-surface-variant font-medium">
            Corporate HQ
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg text-primary font-bold bg-primary-fixed shadow-xs"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/menu"
          className="flex items-center gap-3 p-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-highest transition-all"
        >
          <Utensils size={20} />
          <span>Menu Management</span>
        </NavLink>

        <NavLink
          to="/users"
          className="flex items-center gap-3 p-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-highest transition-all"
        >
          <UsersRound size={20} />
          <span>User Records</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className="flex items-center gap-3 p-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-highest transition-all"
        >
          <ReceiptIndianRupee size={20} />
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-lg text-on-secondary-fixed-variant hover:bg-surface-container-highest transition-all"
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default DashSidebar;
