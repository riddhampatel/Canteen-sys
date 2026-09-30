import React, { useEffect, useState } from "react";

import {
  ShieldCheck,
  Plus,
  Pencil,
  Megaphone,
  SendHorizontal,
} from "lucide-react";


const API_BASE_URL = "http://localhost:5000/api";

const emptyUser = {
  name: "",
  email: "",
  department: "",
  phone: "",
  role: "Employee",
  permissions: "Meal access",
};

const SettingCard = () => {
  const [data, setData] = useState(null);
  const [notice, setNotice] = useState({ title: "", message: "" });
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState(emptyUser);
  const [error, setError] = useState("");

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

    // if (!notice.title || !notice.message) return;

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

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h2 className="text-[40px] font-bold text-on-surface">Settings</h2>

        <p className="text-[17px] text-on-surface-variant">
          Staff roles and notifications.
        </p>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant p-6">
          <div className="flex items-center justify-between mb-5 border-b border-outline-variant pb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <ShieldCheck size={20} className="text-primary" />
              Role Management
            </h3>

            <button
              onClick={() => setShowUserForm((visible) => !visible)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <Plus size={16} />
              {showUserForm ? "Close" : "Add User"}
            </button>
          </div>

          {showUserForm && (
            <form
              onSubmit={addUser}
              className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-3 border-b border-outline-variant pb-5"
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
                className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
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
                className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
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
                className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
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
                className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
              />

              <select
                value={userForm.role}
                onChange={(event) =>
                  setUserForm({
                    ...userForm,
                    role: event.target.value,
                  })
                }
                className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
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
                className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
              />

              <button
                type="submit"
                className="bg-primary text-on-primary rounded-lg font-semibold text-sm py-2"
              >
                Save User
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant text-sm text-on-surface-variant">
                  <th className="py-3">User</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Permissions</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {(data?.staff || []).map((person) => (
                  <tr
                    key={person.id}
                    className="border-b border-outline-variant/50"
                  >
                    <td className="py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-xs font-bold">
                        {person.name.slice(0, 2).toUpperCase()}
                      </div>

                      <span>
                        <strong className="block">{person.name}</strong>
                        <small className="text-on-surface-variant">
                          {person.email}
                        </small>
                      </span>
                    </td>

                    <td className="py-3">
                      <span className="bg-primary-container text-on-primary-container px-2.5 py-1 rounded text-xs font-semibold">
                        {person.role}
                      </span>
                    </td>

                    <td className="py-3 text-sm text-on-surface-variant">
                      {person.permissions}
                    </td>

                    <td className="py-3 text-right">
                      <Pencil size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant p-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-5">
            <Megaphone size={18} className="text-primary" />
            Send Notification
          </h3>

          <form onSubmit={sendNotice} className="flex flex-col gap-4">
            <input
              value={notice.title}
              onChange={(event) =>
                setNotice({
                  ...notice,
                  title: event.target.value,
                })
              }
              placeholder="Message title"
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
            />

            <textarea
              rows={3}
              value={notice.message}
              onChange={(event) =>
                setNotice({
                  ...notice,
                  message: event.target.value,
                })
              }
              placeholder="Message body"
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm resize-none"
            />

            <button
              type="submit"
              className="self-end bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <SendHorizontal size={16} />
              Send Now
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SettingCard;
