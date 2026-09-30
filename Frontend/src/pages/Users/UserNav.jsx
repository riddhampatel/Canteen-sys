import React from "react";
import { Search, Filter, Bell } from "lucide-react";

const UserNav = () => {
  return (
    <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <h2 className="text-3xl font-semibold text-on-surface whitespace-nowrap">
          User Records
        </h2>

        {/* Search & Filter Cluster */}
        <div className="flex-1 max-w-2xl flex items-center gap-3.5 ml-5">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
            />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
            //   className="w-full h-11 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/60"
            // 
            className="w-full h-11 pl-10 pr-4 border border-outline-variant rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/60"
         
            />
          </div>

          <button
            type="button"
            className="h-11 px-4 bg-surface-container-low border border-outline-variant rounded-lg flex items-center gap-2 hover:bg-surface-container transition-colors text-on-surface-variant text-sm font-semibold cursor-pointer"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Right Notifications & Admin Profile */}
      <div className="flex items-center gap-4 ml-auto shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors relative cursor-pointer"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 ring-primary/30 transition-all">
          <img
            alt="Admin Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1M_SMTqyff6vWfGuqvBSGk-Mqp4z8MmvpdTwnKrc-Y1LOjBQjWKo0jr8URO5cYNjVLhI5_6_LAUFFwSaeHIQqhT738qq37xSvkw1I3Eur0keTUd45MfKz1S8ucU4_IafwYgImg-3emga57ITjysucznnxg6kiH81pmbdtXuLioc_kQQcu0fw7BRG7XEBs7csVTf2GpmqN_asQCVK7sRKhSZ6SJTjShCM-PZPwKudth77TGQ-CmZ2sK8a5K9dgx_Am3qCu0YXDwJY"
          />
        </div>
      </div>
    </header>
  );
};

export default UserNav;
