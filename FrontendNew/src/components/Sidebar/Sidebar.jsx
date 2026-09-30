import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  UsersRound,
  ReceiptIndianRupee,
  Settings,
  LogOut,
} from "lucide-react";



const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isDashboard = path === "/dashboard" || path === "/";
  const isMenu = path === "/menu";
  const isUser = path === "/users";
  const isTransaction = path === "/transactions";
  const isSetting = path === "/settings";

  const ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Menu Management", path: "/menu", icon: Utensils },
  { name: "User Records", path: "/users", icon: UsersRound },
  { name: "Transactions", path: "/transactions", icon: ReceiptIndianRupee },
  { name: "Settings", path: "/settings", icon: Settings },
];


  return (
    <aside className="w-64 h-screen bg-surface-container-lowest border-r border-outline-variant py-6 px-4 fixed left-0 top-0 z-40 flex flex-col shadow-xs">
      
      {/* Dynamic Brand Header */}
      <div className="flex items-center gap-3 mb-8 px-2">

        {isDashboard && (
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shadow-sm shrink-0">
            C
          </div>
        )}

        {isMenu && (
          <img
            className="w-10 h-10 rounded-full bg-surface-container-highest object-cover shadow-xs border border-outline-variant shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEYd1MEMoFC7kdw4OZdujkBJceoaIiNKjB6RCHLUbkC_rKtDEauI0N5TRacw69ybHWBB9eRaRJXynwusWjY2RhUcOckQeCXmOTHFcHoqvWhyaW7dNNNjBBpQjTBpKQmxzUR56Q1VUoEGhBU-IxXNhAnyowgbqwhFuHNUUJ41xqwq1c78JTM7cqP1MHJ8wRxmYmU_0iIfTrFo0PIe_ojQBFHx53VBJbjzmWUyDSpa7lVFoqEGrs07bZVYJ5HwarXkI_4iltmmPtm80"
          />
        )}
 
        {isTransaction && (
          <img
            className="w-10 h-10 rounded-lg object-cover shadow-xs border border-outline-variant shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrPKwUVkWfPhu7o1aDWix5VJBHKUmAL7bLIvKpwQYT5d4nBAu0cMLQnX84BfoCP0zzR1bYK7j96CoRAyLUsNjLEbBKeU5v9eQWWKusQYyzCwyK5t8TlXj8UemeBpZI2Hgy3F92z9vsCmw-1Pdiu3IJzVgDoPGCvq9jcM8D2Mqrf7LdrtbKiE1c7CAdTgk3JYUqMlxmOhi_uJ-qDMa2FG5jPJxXklYRhd7ZWYppI39kknUqDMTHNcdHHykfLStufd3Ohi0eo-AQGNs"
          />
        )}

        {!isDashboard && !isMenu && !isTransaction && (
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-xs">
            <Utensils size={20} />
          </div>
        )}

        {/* Brand Text */}
        <div className="overflow-hidden">
          <h1 className="text-lg font-bold text-on-surface leading-tight truncate">
            {isDashboard || isMenu ? "Admin Panel" : "Canteen Admin"}
          </h1>
          <p className="text-xs text-on-surface-variant font-medium truncate">
            {isDashboard || isMenu ? "Corporate HQ" : "Enterprise Suite"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
                  isActive
                    ? "bg-primary-fixed text-primary font-bold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {isTransaction && (
        <div className="mt-auto pt-4 border-t border-outline-variant flex items-center gap-3 px-2">
          <img
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
      )}

      {isSetting && (
        <div className="mt-auto pt-4 border-t border-outline-variant px-2">
          <button
            type="button"
            className="flex items-center gap-2.5 px-3 py-4.5 w-full text-[15px] font-semibold text-on-surface-variant hover:text-error hover:bg-error-container/40 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}

    </aside>
  );
};

export default Sidebar;
