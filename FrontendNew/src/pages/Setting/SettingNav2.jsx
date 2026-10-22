import React, { useState } from "react";
import { Search, Bell, HelpCircle, X } from "lucide-react";

const SettingNav = ({ search = "", setSearch }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className=" flex justify-between items-center w-full px-3.5 sm:px-6 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
      {mobileSearchOpen ? (
        <div className="flex lg:hidden items-center gap-2 w-full h-full animate-in fade-in duration-150">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
            />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch && setSearch(e.target.value)}
              placeholder="Search settings..."
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-outline"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Close search"
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg sm:text-xl font-bold text-primary truncate">
              Canteen Admin
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Desktop Search */}
            <div className="relative hidden lg:block">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch && setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48 xl:w-64 transition-all placeholder:text-outline"
              />
            </div>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Search"
              className="lg:hidden text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container-low active:scale-95"
            >
              <Search size={19} />
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container-low active:scale-95"
            >
              <Bell size={19} />
            </button>

            <button
              type="button"
              aria-label="Help"
              className="hidden sm:flex text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container-low active:scale-95"
            >
              <HelpCircle size={19} />
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant cursor-pointer hover:border-primary transition-colors ml-1">
              <img
                alt="Administrator Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQo22GTxUFFYHjc21cRp6vbtQ6hRif90zTCnqjBOZYNfl4Uv7N0wUch-7nz9GVBVB65Jp_MOtzhbj_We0LiGRyQM-UCgWV8FEP7liyFVHgXyMSsrrL4Jx_OdTa_IEhAlFZB8_aIH6bUpWKYRa3ud3kR0rwyCtvftGm5CAJdRRGCwzUH6xCepYqHFr-yydYqY5asSjOFepmJjLy-vGKAFIVtXy4v352Iokqo2ZbHcKYktKUG7SzibSshP7aSCy9Jy6nf6wf8FliEM8"
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default SettingNav;
