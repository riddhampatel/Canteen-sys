import React, { useEffect, useState } from "react";
import {
  RefreshCw,
  QrCode,
  Fingerprint,
  AlertTriangle,
  MoreVertical,
  Download,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import Papa from "papaparse";

export default function UserCard({ search = "" }) {
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

  const searchText = search.toLowerCase().trim();

  const filteredUsers = searchText
    ? users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchText) ||
          user.emp_id?.toLowerCase().includes(searchText) ||
          user.department?.toLowerCase().includes(searchText) ||
          user.phone?.toLowerCase().includes(searchText),
      )
    : users;

  // CSV Report
  function handleExportCSV() {
    const records = filteredUsers.length ? filteredUsers : users;

    if (!records.length) {
      alert("No user records available ");
      return;
    }

    const csv = Papa.unparse(
      records.map((user) => ({
        "Employee Name": user.name,
        "Employee ID": user.emp_id,
        Department: user.department,
        Phone: user.phone,
        // "Sync Status": user.fingerprint_synced ? "Synced" : "Pending",
      })),
    );

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const date = new Date().toISOString().split("T")[0];
    link.download = `Users-Report-${date}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-3.5 py-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 max-w-7xl w-full mx-auto">
      <div className="bg-surface-container-lowest rounded-xl sm:rounded-2xl border border-outline-variant p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-sm sm:text-[15px] text-on-surface">
              Fingerprint Sync Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
            <RefreshCw size={14} className="shrink-0" />
            Local user records
          </p>
        </div>
        <div className="flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-2 bg-primary text-on-primary rounded-xl sm:rounded-lg text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition"
          >
            <Download size={18} />
            User Report
          </button>
          <button
            type="button"
            className="h-10 sm:h-11 px-4 sm:px-5 bg-primary text-on-primary rounded-xl sm:rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition"
          >
            <QrCode size={17} />
            Generate Daily QR
          </button>
        </div>
      </div>
      {error && (
        <div className="p-3 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="bg-surface-container-lowest rounded-xl sm:rounded-2xl border border-outline-variant shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-165">
            <div className="grid grid-cols-[3rem_1.5fr_1fr_1.5fr_1fr_3rem] gap-4 px-4 sm:px-6 py-3.5 bg-surface-container-low border-b border-outline-variant items-center text-xs sm:text-sm font-semibold text-on-surface-variant">
              <div>#</div>
              <div>Employee Name</div>
              <div>Employee ID</div>
              <div>Department & Contact</div>
              <div>Sync Status</div>
              <div className="text-center">Action</div>
            </div>

            <div className="divide-y divide-outline-variant/40">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-[3rem_1.5fr_1fr_1.5fr_1fr_3rem] gap-4 px-4 sm:px-6 py-3.5 sm:py-4 items-center hover:bg-surface-container/40 transition-colors"
                  >
                    <div className="text-center text-xs sm:text-sm text-on-surface-variant font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                        {user.initials ||
                          user.name?.slice(0, 2).toUpperCase() ||
                          "??"}
                      </div>
                      <span className="font-semibold text-xs sm:text-sm text-on-surface truncate">
                        {user.name}
                      </span>
                    </div>

                    <span className="text-xs sm:text-sm font-mono text-on-surface-variant truncate">
                      {user.emp_id}
                    </span>

                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm text-on-surface block truncate font-medium">
                        {user.department}
                      </span>
                      <span className="block text-[11px] sm:text-xs text-on-surface-variant truncate mt-0.5">
                        {user.phone || "No phone"}
                      </span>
                    </div>
                    <div>
                      <button
                        title="Toggle fingerprint sync"
                        onClick={() => toggleSync(user.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition active:scale-95 ${
                          user.fingerprint_synced
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-error-container text-on-error-container hover:opacity-90"
                        }`}
                      >
                        {user.fingerprint_synced ? (
                          <Fingerprint size={13} />
                        ) : (
                          <AlertTriangle size={13} />
                        )}
                        {user.fingerprint_synced ? "Synced" : "Pending"}
                      </button>
                    </div>
                    <div className="flex  justify-center">
                      <button
                        type="button"
                        aria-label="Actions"
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition"
                      >
                        <MoreVertical size={17} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-10 text-center text-xm sm:text-sm text-on-surface-variant italic">
                  {searchText
                    ? `No users matching "${search}"`
                    : "No users found."}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 py-3 border-t border-outline-variant text-xs sm:text-sm text-on-surface-variant bg-surface-container-lowest">
          Showing {filteredUsers.length} of {users.length} records
        </div>
      </div>
    </div>
  );
}
