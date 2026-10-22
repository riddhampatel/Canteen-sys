import React, { useState } from "react";
import { Search, Bell, X } from "lucide-react";

const UserNav = ({ search = "", setSearch }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="flex justify-between items-center w-full px-3.5 sm:px-6 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40 gap-3">
      {/* Mobile Search Overlay */}
      {mobileSearchOpen ? (
        <div className="flex sm:hidden items-center gap-2 w-full h-full animate-in fade-in duration-150">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
            />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch && setSearch(e.target.value)}
              placeholder="Search name, ID, department..."
              className="w-full h-10 pl-9 pr-3 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/60"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Close search"
            className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <>
          {/* Title  */}
          <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-on-surface truncate shrink-0">
              User Records
            </h2>

            {/* Desktop search */}
            <div className="hidden sm:flex flex-1 max-w-md lg:max-w-xl items-center min-w-0">
              <div className="relative w-full">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch && setSearch(e.target.value)}
                  placeholder="Search name, ID, department..."
                  className="w-full h-10 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/60"
                />
              </div>
            </div>
          </div>

          {/* Right Notifications & Admin Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Search"
              className="sm:hidden w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95"
            >
              <Search size={19} />
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors relative cursor-pointer active:scale-95"
            >
              <Bell size={19} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
            </button>

            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 ring-primary/30 transition-all">
              <img
                alt="Admin Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1M_SMTqyff6vWfGuqvBSGk-Mqp4z8MmvpdTwnKrc-Y1LOjBQjWKo0jr8URO5cYNjVLhI5_6_LAUFFwSaeHIQqhT738qq37xSvkw1I3Eur0keTUd45MfKz1S8ucU4_IafwYgImg-3emga57ITjysucznnxg6kiH81pmbdtXuLioc_kQQcu0fw7BRG7XEBs7csVTf2GpmqN_asQCVK7sRKhSZ6SJTjShCM-PZPwKudth77TGQ-CmZ2sK8a5K9dgx_Am3qCu0YXDwJY"
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default UserNav;
