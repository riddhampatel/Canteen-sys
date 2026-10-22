
import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";

const TransactionNav = ({ search = "", setSearch }) => {
  return (
    <header className="flex justify-between items-center w-full px-3.5 sm:px-6 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40 gap-3">
      {/* Brand / Title */}
      <span className="font-bold text-xl sm:text-2xl text-primary shrink-0">
              CanteenPro
            </span>

      {/* Fluid Search Input */}
      <div className="flex-1 max-w-md min-w-0 sm:mr-0">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-outline"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container active:scale-95"
        >
          <Bell size={19} />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="hidden sm:flex text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container active:scale-95"
        >
          <HelpCircle size={19} />
        </button>

        <img
          alt="Administrator Profile"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-outline-variant object-cover cursor-pointer hover:border-primary transition-colors ml-1"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpFMOppBSGOvsyVmaPo63Hl8G_CHeZWcMYjoMHVFIzC6GbfY3R1W_XssbZa6YjEZ5E_wMY2yg9LvBuPz7BSuBnWXfyuT-TAgA-Hr3aX__osc0i_xVSK1q_8jy6xFpkVSc73dtNsfuyYXPl3drMF4nKHMrttFygt1cguV4pavQUpzVEKdYw267RvdIdzNNimDHHsllTfk-h3Wzy3AT5JgS4pncfEAhbGi86MPhxfDbc2qyiMHDv4_h6niQqyobcunrzjTFapRaZO4I"
        />
      </div>
    </header>
  );
};

export default TransactionNav;
