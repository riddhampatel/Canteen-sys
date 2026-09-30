import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";

const TransactionNav = () => {
  return (
   <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
     {/* Search Input */}
      <div className="w-1/3 max-w-md">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-outline"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1.5 rounded-full hover:bg-surface-container"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1.5 rounded-full hover:bg-surface-container"
        >
          <HelpCircle size={20} />
        </button>

        <img
          alt="Administrator Profile"
          className="w-8 h-8 rounded-full border border-outline-variant object-cover cursor-pointer hover:border-primary transition-colors ml-1"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpFMOppBSGOvsyVmaPo63Hl8G_CHeZWcMYjoMHVFIzC6GbfY3R1W_XssbZa6YjEZ5E_wMY2yg9LvBuPz7BSuBnWXfyuT-TAgA-Hr3aX__osc0i_xVSK1q_8jy6xFpkVSc73dtNsfuyYXPl3drMF4nKHMrttFygt1cguV4pavQUpzVEKdYw267RvdIdzNNimDHHsllTfk-h3Wzy3AT5JgS4pncfEAhbGi86MPhxfDbc2qyiMHDv4_h6niQqyobcunrzjTFapRaZO4I"
        />
      </div>
    </header>
  );
};

export default TransactionNav;
