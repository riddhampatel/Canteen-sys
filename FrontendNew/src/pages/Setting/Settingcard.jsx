import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ShieldCheck,
  Plus,
  Pencil,
  Megaphone,
  SendHorizontal,
  Sliders,
  CheckCircle2,
  Download,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import axios from "axios";
// import { MessageSquarePlus } from "lucide-react";

const emptyUser = {
  name: "",
  email: "",
  department: "",
  phone: "",
  role: "Employee",
  permissions: "Meal access",
};

const SettingCard = ({ search = "" }) => {
  const [data, setData] = useState(null);
  const [notice, setNotice] = useState({ title: "", message: "" });
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState(emptyUser);
  const [error, setError] = useState("");

  const [autoPublish, setAutoPublish] = useState(true);
  const [allowGuest, setAllowGuest] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  async function loadSettings() {
    const response = await fetch(`${API_BASE_URL}/settings`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "API request failed");
    }
    setData(result);
    setError("");
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function sendNotice(event) {
    event.preventDefault();

    const response = await fetch(`${API_BASE_URL}/settings/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notice),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "API request failed");
    }

    setNotice({ title: "", message: "" });
  }

  async function addUser(event) {
    event.preventDefault();

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userForm),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "API request failed");
    }

    setUserForm(emptyUser);
    setShowUserForm(false);
    await loadSettings();
  }

  const handleExportCSV = () => {
    if (!data?.staff?.length) {
      alert("No staff records available");
      return;
    }

    const csv = Papa.unparse(
      data.staff.map((person) => ({
        Name: person.name,
        Email: person.email,
        Role: person.role,
        Permissions: person.permissions,
      })),
    );

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const day = String(new Date().getDate()).padStart(2, "0");
    link.download = `Users_Report-${day}.csv`;

    link.click();

    URL.revokeObjectURL(url);
  };



  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h2 className="text-[40px] font-bold text-on-surface">Settings</h2>

        <p className="text-[17px] text-on-surface-variant">
          Staff roles and notifications.
        </p>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5 -mt-2">
        {/* Left Column (2 Spans): Roles & Notifications */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 justify-between mb-5 border-b border-outline-variant pb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary" />
                Role Management
              </h3>
              {/* //for csv button  */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Download size={18} />
                  User Report
                </button>
                <button
                  onClick={() => setShowUserForm((visible) => !visible)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <Plus size={16} />
                  {showUserForm ? "Close" : "Add User"}
                </button>
              </div>
            </div>

            {showUserForm && (
              <form
                onSubmit={addUser}
                className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 border-b border-outline-variant pb-5"
              >
                <input
                  required
                  value={userForm.name}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      name: event.target.value,
                    })
                  }
                  placeholder="Name"
                  className="w-full border border-outline-variant rounded-lg px-3.5 py-2.5 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />

                <input
                  required
                  type="email"
                  value={userForm.email}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      email: event.target.value,
                    })
                  }
                  placeholder="Email"
                  className="w-full border border-outline-variant rounded-lg px-3.5 py-2.5 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />

                <input
                  required
                  value={userForm.department}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      department: event.target.value,
                    })
                  }
                  placeholder="Department"
                  className="w-full border border-outline-variant rounded-lg px-3.5 py-2.5 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />

                <input
                  value={userForm.phone}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      phone: event.target.value,
                    })
                  }
                  placeholder="Phone"
                  className="w-full border border-outline-variant rounded-lg px-3.5 py-2.5 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />

                <select
                  value={userForm.role}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      role: event.target.value,
                    })
                  }
                  className="w-full border border-outline-variant rounded-lg px-3.5 py-2.5 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                >
                  <option>Employee</option>
                  <option>Operator</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>

                <input
                  value={userForm.permissions}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      permissions: event.target.value,
                    })
                  }
                  placeholder="Permissions"
                  className="w-full border border-outline-variant rounded-lg px-3.5 py-2.5 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />

                <button
                  type="submit"
                  className="sm:col-span-2 w-full bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-semibold text-sm py-2.5 transition-colors shadow-xs mt-1 cursor-pointer"
                >
                  Save User
                </button>
              </form>
            )}

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left min-w-130">
                <thead>
                  <tr className="border-b border-outline-variant text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    <th className="py-3 text-xl px-3">User</th>
                    <th className="py-3 text-xl px-3">Role</th>
                    <th className="py-3 text-xl px-3">Permissions</th>
                    <th />
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/40">
                  {(data?.staff || []).map((person) => (
                    <tr
                      key={person.id}
                      className="border-b border-outline-variant/50"
                    >
                      {/* <td className="py-3 flex items-center gap-3"> */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold shrink-0">
                            {person.name
                              ? person.name.slice(0, 2).toUpperCase()
                              : "US"}
                          </div>

                          <div className="min-w-0">
                            <strong className="block text-sm font-semibold text-on-surface truncate">
                              {person.name}
                            </strong>
                            <small className="block text-xs text-on-surface-variant truncate">
                              {person.email}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className=" inline-block bg-primary-container text-on-primary-container px-2.5 py-1 rounded-md text-xs font-semibold">
                          {person.role}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-xs sm:text-sm text-on-surface-variant">
                        {person.permissions}
                      </td>

                      {/* <td className="py-3 text-right">
                        <Pencil size={16} />
                      </td> */}
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <Pencil size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section>
          <div className="lg:col-span-1 flex flex-col gap-5 sm:gap-6 w-full">
            {/* 3. General Preferences */}
            <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant p-4 sm:p-5">
              <div className="mb-3 sm:md-4 border-b border-outline-variant/60 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                  <Sliders size={18} className="text-primary shrink-0" />
                  General Preferences
                </h3>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer select-none">
                  <div className="min-w-0 pr-3">
                    <div className="text-sm font-semibold text-on-surface">
                      Auto-publish Menus
                    </div>
                    <div className="text-xs text-on-surface-variant leading-tight">
                      Publish menus on approval.
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoPublish}
                    onClick={() => setAutoPublish(!autoPublish)}
                    className={` shrink-0 w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer focuse:outline-none focus:ring-2 focus:ring-primary/40 ${
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
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg hover:bg-surface-container-low transition-colors select-none">
                  <div>
                    <div className="text-sm font-semibold text-on-surface">
                      Allow Guest Orders
                    </div>
                    <div className="text-xs text-on-surface-variant leading-tight">
                      Enable unregistered checkouts.
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={allowGuest}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAllowGuest(!allowGuest);
                    }}
                    className={`shrink-0 w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 ${
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
                <div
                  onClick={() => setMaintenance(!maintenance)}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer select-none"
                >
                  <div className="min-w-0 pr-3">
                    <div className="text-sm font-semibold text-on-surface">
                      Maintenance Mode
                    </div>
                    <div className="text-xs text-on-surface-variant leading-tight">
                      Disable user-facing apps.
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={maintenance}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMaintenance(!maintenance);
                    }}
                    className={`shrink-0 w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-error/40 ${
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
            <section className="bg-primary-container text-on-primary-container rounded-xl shadow-xs p-4 sm:p-5 relative overflow-hidden">
              {/* Subtle Decorative Ambient Background Glow */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-base sm:text-lg font-bold mb-4 relative z-10 flex items-center justify-between">
                <span>System Status</span>
                <span
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400"
                  title="System Online"
                />
              </h3>
              <div className="space-y-3 relative z-10 text-xs sm:text-sm">
                <div className="flex justify-between items-center border-b border-on-primary-container/15 pb-2">
                  <span className="opacity-80">Version</span>
                  <span className="font-semibold font-mono text-xs sm:text-sm">
                    v2.4.1 (Stable)
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-on-primary-container/15 pb-2">
                  <span className="opacity-80">Last Backup</span>
                  <span className="font-semibold">Today, 04:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Server Load</span>
                  <span className="font-semibold flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 size={15} className="shrink-0" />
                    <span>Normal</span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="mt-5 sm:mt-6 w-full py-2.5 bg-on-primary-container text-primary-container rounded-lg font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs relative z-10"
              >
                Run Diagnostics
              </button>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingCard;
