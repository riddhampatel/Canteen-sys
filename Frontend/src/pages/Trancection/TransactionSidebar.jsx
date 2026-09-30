import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  UsersRound,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Menu Management", path: "/menu", icon: Utensils },
  { name: "User Records", path: "/users", icon: UsersRound },
  { name: "Transactions", path: "/transactions", icon: ReceiptIndianRupee },
  { name: "Settings", path: "/settings", icon: Settings },
];

const TransactionSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-surface-container-lowest border-r border-outline-variant py-6 px-5 fixed left-0 top-0 z-40 flex flex-col">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <img
          alt="Canteen Management Logo"
          className="w-10 h-10 rounded-lg object-cover shadow-xs border border-outline-variant"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrPKwUVkWfPhu7o1aDWix5VJBHKUmAL7bLIvKpwQYT5d4nBAu0cMLQnX84BfoCP0zzR1bYK7j96CoRAyLUsNjLEbBKeU5v9eQWWKusQYyzCwyK5t8TlXj8UemeBpZI2Hgy3F92z9vsCmw-1Pdiu3IJzVgDoPGCvq9jcM8D2Mqrf7LdrtbKiE1c7CAdTgk3JYUqMlxmOhi_uJ-qDMa2FG5jPJxXklYRhd7ZWYppI39kknUqDMTHNcdHHykfLStufd3Ohi0eo-AQGNs"
        />
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
      <nav className="flex-1 flex flex-col gap-2">
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

      {/* Admin Profile Footer */}
      <div className="mt-auto pt-4 border-t border-outline-variant flex items-center gap-3 px-2 pb-2">
        <img
          alt="Admin Profile"
          className="w-8 h-8 rounded-full object-cover border border-outline-variant shrink-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHTZ1uHDRuboIhQb6wZxoyCDyq94Nr4jW2xpKJ8GHsduu6Vx0pffB7gWo8KuFB3THkF4geOoUtL8npPW0gzvEI1eeKgyI7rIAm7v5zuIJISijyGjtNygZmwGDret8y69BGU0pbxb7ESjfx552sdPXZdUhJae2qnTlmPSH3IL0PldkhXhYl8I2kwitWacc3bZL2DnfmPf2LaNPskgAQJL2HivPIpaP1cp_e6AFNUF4eeuu4OWiGkwZFTOk5JfH7Ia54DmK3A3pjIj0"
        />
        <div className="flex flex-col overflow-hidden">
          <span className="text-xs font-semibold text-on-surface truncate">
            Admin User
          </span>
          <span className="text-xs text-outline truncate">
            admin@canteen.co
          </span>
        </div>
      </div>
    </aside>
  );
};

export default TransactionSidebar;
