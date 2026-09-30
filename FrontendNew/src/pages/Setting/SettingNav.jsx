import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";

const SettingNav = () => {
  return (
   <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 bg-surface-container-lowest shadow-sm border-b border-outline-variant sticky top-0 z-40">
  
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-primary">Canteen Admin</span>
      </div>
      {/* Breadcrumb */}
      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block ">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all placeholder:text-outline"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-4 rounded-full hover:bg-surface-container-low"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full hover:bg-surface-container-low"
        >
          <HelpCircle size={20} />
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant cursor-pointer hover:border-primary transition-colors">
          <img
            alt="Administrator Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQo22GTxUFFYHjc21cRp6vbtQ6hRif90zTCnqjBOZYNfl4Uv7N0wUch-7nz9GVBVB65Jp_MOtzhbj_We0LiGRyQM-UCgWV8FEP7liyFVHgXyMSsrrL4Jx_OdTa_IEhAlFZB8_aIH6bUpWKYRa3ud3kR0rwyCtvftGm5CAJdRRGCwzUH6xCepYqHFr-yydYqY5asSjOFepmJjLy-vGKAFIVtXy4v352Iokqo2ZbHcKYktKUG7SzibSshP7aSCy9Jy6nf6wf8FliEM8"
          />
        </div>
      </div>
    </header>
  );
};

export default SettingNav;
