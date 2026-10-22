import React, { useState } from "react";
import { Bell, HelpCircle, Search, X } from "lucide-react";

const MenuNav = ({ search = "", setSearch }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="flex justify-between items-center w-full px-3.5 sm:px-6 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
      {/* Mobile Fullscreen Search Overlay */}
      {mobileSearchOpen ? (
        <div className="flex md:hidden items-center gap-2 w-full h-full animate-in fade-in duration-150">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch && setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-full border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline"
              placeholder="Search menus, items..."
              type="text"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Close search"
            className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <span className="font-bold text-xl sm:text-2xl text-primary shrink-0">
              CanteenPro
            </span>
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
              />
              <input
                value={search}
                onChange={(e) => setSearch && setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-surface-container-low rounded-full border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm w-48 lg:w-64 text-on-surface placeholder:text-outline transition-all"
                placeholder="Search menus, items..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open search"
              className="md:hidden text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors active:scale-95"
            >
              <Search size={19} />
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors active:scale-95"
            >
              <Bell size={19} />
            </button>

            <button
              type="button"
              aria-label="Help"
              className="hidden sm:flex text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors active:scale-95"
            >
              <HelpCircle size={19} />
            </button>

            <img
              alt="Administrator Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-outline-variant object-cover ml-1 cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqz5O4evZASUwE1Ndp_VJiSlTRq0XMPyPk-5cjvdpgVVtQXHABxinlgeMa2YR89AA9nAPF_2Y8SeW6V771Bgw45b1mJV8_cp3ildx-wRkreWUsfsFSNOwQOybusDJhSiRfw3CntpYI1MnMz3OE9BbMZ02Brrfm0TGDHq3yOQUSGGqtVjqK6b_rBHMcKmOiSaLOClu7zIK57_BZHrh_iOFI574p_FIfH8XrPdphlZCTc_J9rd7yp2zTqNSLXUa-FsbakUYU4m1hJUg"
            />
          </div>
        </>
      )}
    </header>
  );
};

export default MenuNav;
