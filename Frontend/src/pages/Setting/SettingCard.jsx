import React, { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Edit,
  Send,
  Sliders,
  CheckCircle2,
  Pencil,
  Megaphone,
  SendHorizontal 
} from "lucide-react";

const SettingCard = () => {
  // Toggle 
  const [autoPublish, setAutoPublish] = useState(true);
  const [allowGuest, setAllowGuest] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  // For Form 
  const [audience, setAudience] = useState("All Employees");
  const [msgTitle, setMsgTitle] = useState("");
  const [msgBody, setMsgBody] = useState("");

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Page Title */}
      <div>
        <h2 className="text-[40px] font-bold text-on-surface -mt-2.5 mb-1">Settings</h2>
        <p className="text-[17px] text-on-surface-variant">
          Manage system preferences, user roles, and communications.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5 -mt-2 ">
        {/* Left Column (2 Spans): Roles & Notifications */}
        <div className="lg:col-span-2 flex flex-col gap-8">
        
          <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-6 border-b border-outline-variant/60 pb-4">
              <div>
                <h3 className="text-[20px] font-semibold text-on-surface flex items-center gap-2">
                  <ShieldCheck size={20} className="text-primary" />
                  Role Management
                </h3>
                <p className="text-[15px] text-on-surface-variant mt-0.5">
                  Configure permissions for canteen staff and administrators.
                </p>
              </div>

              <button
                type="button"
                className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus  size={16} />
                <span>Add User</span>
              </button>
            </div>

            {/* Manual Roles Table */}
            <div className="overflow-x-auto -mt-3">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant text-[15px] font-semibold  tracking-wider text-on-surface-variant ">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Permissions</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50 text-sm">
                  {/* Row 1: Jane Doe */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0">
                        JD
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">
                          Jane Doe
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          jane.doe@corp.com
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-primary-container text-on-primary-container px-2.5 py-1 rounded text-[13px] font-semibold inline-block">
                        Super Admin
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[14px] font-normal text-on-surface-variant">
                      All Access
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-surface-container cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>

                  {/* Row 2: Mark Smith */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-xs shrink-0">
                        MS
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">
                          Mark Smith
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          mark.smith@corp.com
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-surface-container-high text-on-surface border border-outline-variant px-2.5 py-1 rounded text-[13px] font-semibold inline-block">
                        Menu Manager
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[14px] font-normal text-on-surface-variant">
                      Menus, Categories
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        
                        className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-surface-container cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>

                  {/* Row 3: Sarah Jones */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs shrink-0">
                        SJ
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">
                          Sarah Jones
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          sarah.jones@corp.com
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-surface-container-high text-on-surface border border-outline-variant px-2.5 py-1 rounded text-[13px] font-semibold inline-block">
                        Cashier
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[14px] font-normal text-on-surface-variant">
                      Transactions Only
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        
                        className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-full hover:bg-surface-container cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Notifications Section */}
          <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant p-6 -mb-3">
            <div className="mb-6 border-b border-outline-variant/60 pb-4">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <Megaphone  size={18} className="text-primary" />
                Send Notification
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Broadcast messages or reminders to employee devices.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-xs font-semibold  tracking-wider text-on-surface mb-2">
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg px-3 py-2 bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                >
                  <option>All Employees</option>
                  <option>Subscribed to Daily Menu</option>
                  <option>Specific Department</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold  tracking-wider text-on-surface mb-2">
                  Message Title
                </label>
                <input
                  type="text"
                  value={msgTitle}
                  onChange={(e) => setMsgTitle(e.target.value)}
                  placeholder="e.g., Reminder: Select your lunch"
                  className="w-full border border-outline-variant rounded-lg px-3 py-2 bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm placeholder:text-outline"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold  tracking-wider text-on-surface mb-2">
                  Message Body
                </label>
                <textarea
                  rows={3}
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  placeholder="Enter broadcast details here..."
                  className="w-full border border-outline-variant rounded-lg px-3 py-2 bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm resize-none placeholder:text-outline"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors border border-outline-variant cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <SendHorizontal  size={16} />
                  <span>Send Now</span>
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right Column (1 Span): Preferences & System Info */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* 3. General Preferences */}
          <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant p-6">
            <div className="mb-4 border-b border-outline-variant/60 pb-3">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <Sliders size={18} className="text-primary" />
                General Preferences
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors">
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    Auto-publish Menus
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    Publish menus on approval.
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoPublish}
                  onClick={() => setAutoPublish(!autoPublish)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    autoPublish ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      autoPublish ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors">
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    Allow Guest Orders
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    Enable unregistered checkouts.
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={allowGuest}
                  onClick={() => setAllowGuest(!allowGuest)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    allowGuest ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      allowGuest ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors">
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    Maintenance Mode
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    Disable user-facing apps.
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={maintenance}
                  onClick={() => setMaintenance(!maintenance)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    maintenance ? "bg-error" : "bg-outline-variant"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      maintenance ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* 4. System Status Card */}
          <section className="bg-primary-container text-on-primary-container rounded-xl shadow-xs p-6 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-4 relative z-10">
              System Status
            </h3>
            <div className="space-y-3.5 relative z-10 text-sm">
              <div className="flex justify-between items-center border-b border-on-primary-container/20 pb-2">
                <span className="opacity-90">Version</span>
                <span className="font-semibold">v2.4.1 (Stable)</span>
              </div>
              <div className="flex justify-between items-center border-b border-on-primary-container/20 pb-2">
                <span className="opacity-90">Last Backup</span>
                <span className="font-semibold">Today, 04:00 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">Server Load</span>
                <span className="font-semibold flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 size={16} />
                  Normal
                </span>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full py-2.5 bg-on-primary-container text-primary-container rounded-lg font-semibold text-sm hover:bg-white transition-colors cursor-pointer shadow-xs"
            >
              Run Diagnostics
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingCard;
