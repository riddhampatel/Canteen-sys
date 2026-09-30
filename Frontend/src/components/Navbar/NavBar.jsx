
import React from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, HelpCircle } from "lucide-react";

const PAGE = {
  "/dashboard": {
    title: "Dashboard Overview",
    placeholder: "Search dashboard...",
    showSearch: false,
  },
  "/menu": {
    title: "CanteenPro",
    placeholder: "Search menus, items...",
    showSearch: true,
  },
  "/users": {
    title: "User Records",
    placeholder: "Search by name, ID, or department...",
    showSearch: true,
  },
  "/transactions": {
    title: "Transactions",
    placeholder: "Search transactions...",
    showSearch: true,
  },
  "/settings": {
    title: "Settings",
    placeholder: "Search settings...",
    showSearch: false,
  },
};

const NavBar = () => {
  const location = useLocation();
  const current = PAGE[location.pathname] || {
    title: "Canteen Admin",
    placeholder: "Search...",
    showSearch: true,
  };

  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-8 sticky top-0 z-30 shadow-xs">
      {/* Left: Dynamic Title or Search Bar */}
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <h2 className="text-xl font-bold text-primary whitespace-nowrap">
          {current.title}
        </h2>

        {current.showSearch && (
          <div className="relative w-full max-w-md hidden sm:block">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
            />
            <input
              type="text"
              placeholder={current.placeholder}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
            />
          </div>
        )}
      </div>

      {/* Right: Identical on all pages (Notifications, Help, Profile) */}
      <div className="flex items-center gap-3 ml-4 shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container-high relative"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
        </button>

        <button
          type="button"
          aria-label="Help"
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container-high"
        >
          <HelpCircle size={20} />
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:border-primary transition-colors ml-1">
          <img
            alt="Administrator Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnI829QwM6JZx8-ExDMSlBH-hG1wRsRcs3lRWt0Ujyv77RMDNv2mQjkVls29doFV0UwpGTpaaAz0W3XJBqqKTW_CgNovpc13OoasQC3abOt5gjrknXeSKVajSWRCKzW_JVzzzHblaTeItxtFYAW2p9VNyzVc9sGvYaKoMI0-RxvZVMuHzxQPdB2THvf8d2PJ4-s0GngafLETDoDOYfu3lLqV9TgBCclBn0_tuEgjHh-d7OJ-Qxu7Xxp5sBmEoEkEqkIqtgZ5Oh_Bo"
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
