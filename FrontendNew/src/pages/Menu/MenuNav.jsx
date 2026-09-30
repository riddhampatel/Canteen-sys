import React from "react";
import { Bell, HelpCircle, Search } from "lucide-react";

const MenuNav = () => {
  return (
   <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <div className="font-bold text-2xl text-primary">
          CanteenPro
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low rounded-full border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm w-64 text-on-surface placeholder:text-outline transition-all"
            placeholder="Search menus, items..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors cursor-pointer active:opacity-80"
        > 
          <Bell size={20} />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors cursor-pointer active:opacity-80"
        >
          <HelpCircle size={20} />
        </button>

        <img
          alt="Administrator Profile"
          className="w-8 h-8 rounded-full border border-outline-variant object-cover ml-2"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqz5O4evZASUwE1Ndp_VJiSlTRq0XMPyPk-5cjvdpgVVtQXHABxinlgeMa2YR89AA9nAPF_2Y8SeW6V771Bgw45b1mJV8_cp3ildx-wRkreWUsfsFSNOwQOybusDJhSiRfw3CntpYI1MnMz3OE9BbMZ02Brrfm0TGDHq3yOQUSGGqtVjqK6b_rBHMcKmOiSaLOClu7zIK57_BZHrh_iOFI574p_FIfH8XrPdphlZCTc_J9rd7yp2zTqNSLXUa-FsbakUYU4m1hJUg"
        />
      </div>
    </header>
  );
};

export default MenuNav;
