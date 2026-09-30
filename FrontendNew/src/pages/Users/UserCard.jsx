import React, { useEffect, useState } from "react";
import {
  RefreshCw,
  Calendar,
  QrCode,
  Fingerprint,
  AlertTriangle,
  MoreVertical,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export default function UserCard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }
      setUsers(data.users || []);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function toggleSync(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}/sync`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }
      await loadUsers();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="p-8 pt-3 pr-12 flex flex-col gap-6 max-w-7xl w-full mx-auto">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[15px]">
              Fingerprint Sync Active
            </span>
          </div>
          <p className="text-[14px] text-on-surface-variant flex items-center gap-1 mt-1">
            <RefreshCw size={14} />
            Local user records
          </p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-5 border border-outline-variant rounded-lg flex items-center gap-2 text-sm">
            <Calendar size={18} />
            Today
          </button>
          <button className="h-11 px-5 bg-primary text-on-primary rounded-lg font-semibold text-sm flex items-center gap-2">
            <QrCode size={18} />
            Generate Daily QR
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs overflow-hidden">
        <div className="grid grid-cols-[auto_1.5fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-3.5 bg-surface-container-low border-b border-outline-variant items-center text-sm font-semibold text-on-surface-variant">
          <div>#</div>
          <div>Employee Name</div>
          <div>Employee ID</div>
          <div>Department & Contact</div>
          <div>Sync Status</div>
          <div />
        </div>
        <div className="divide-y divide-outline-variant/40">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-[auto_1.5fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-4 items-center"
            >
              <div className="w-8 text-center text-sm text-on-surface-variant">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center font-bold text-sm">
                  {user.initials}
                </div>
                <span className="font-semibold">{user.name}</span>
              </div>
              <span className="text-sm font-mono text-on-surface-variant">
                {user.emp_id}
              </span>
              <div>
                <span className="text-sm">{user.department}</span>
                <span className="block text-xs text-on-surface-variant">
                  {user.phone || "No phone"}
                </span>
              </div>
              <button
                title="Toggle fingerprint sync"
                onClick={() => toggleSync(user.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${user.fingerprint_synced ? "bg-emerald-50 text-emerald-700" : "bg-error-container text-on-error-container"}`}
              >
                {user.fingerprint_synced ? (
                  <Fingerprint size={14} />
                ) : (
                  <AlertTriangle size={14} />
                )}
                {user.fingerprint_synced ? "Synced" : "Pending"}
              </button>
              <button aria-label="Actions">
                <MoreVertical size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 border-t border-outline-variant text-sm text-on-surface-variant">
          Showing {users.length} records
        </div>
      </div>
    </div>
  );
}
