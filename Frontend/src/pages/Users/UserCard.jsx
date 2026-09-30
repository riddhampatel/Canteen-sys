import React from "react";
import {
  RefreshCw,
  Calendar,
  ChevronDown,
  QrCode,
  Fingerprint,
  AlertTriangle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// const USERS_DATA = [
//   {
//     id: "01",
//     empId: "EMP-8492",
//     initials: "SJ",
//     name: "Sarah Jenkins",
//     department: "Engineering",
//     phone: "+1 (555) 019-2834",
//     synced: true,
//   },
//   {
//     id: "02",
//     empId: "EMP-3940",
//     initials: "MR",
//     name: "Michael Ross",
//     department: "Human Resources",
//     phone: "+1 (555) 832-1104",
//     synced: false,
//   },
//   {
//     id: "03",
//     empId: "EMP-9122",
//     initials: "EL",
//     name: "Elena Lopez",
//     department: "Marketing",
//     phone: "+1 (555) 443-9801",
//     synced: true,
//   },
// ];

const UserCard = () => {
  return (
    <div className="p-8 pt-3 pr-12 flex flex-col gap-6 max-w-7xl w-full mx-auto">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-[15px] text-on-surface ">
              Fingerprint Sync Active
            </span>
          </div>
          <p className="text-[14px] text-on-surface-variant flex items-center gap-1 font-normal">
            <RefreshCw size={14} className="text-outline" />
            Last synced 2 mins ago
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 border border-outline-variant rounded-lg flex items-center gap-2 text-on-surface hover:bg-surface-container-low transition-colors text-sm bg-surface-container-lowest cursor-pointer font-medium"
          >
            <Calendar size={18} className="text-outline" />
            <span className="font-normal">Oct 24, 2023</span>
            <ChevronDown size={16} className="text-outline ml-1" />
          </button>

          <button
            type="button"
            className="h-11 px-12 bg-primary text-on-primary rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-primary-container transition-all shadow-sm cursor-pointer"
          >
            <QrCode size={18} />
            <span>Generate Daily QR</span>
          </button>
        </div>
      </div>

      {/* Data Table Panel */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs flex flex-col overflow-hidden min-h-123.75">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1.5fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-3.5 bg-surface-container-low border-b border-outline-variant items-center text-[15px] font-semibold tracking-wider text-on-surface-variant">
          <div className="w-12 text-center">#</div>
          <div>Employee Name</div>
          <div>Employee ID</div>
          <div>Department & Contact</div>
          <div>Sync Status</div>
          <div className="w-12 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/40">
          {/* Row 1 */}
          <div className="grid grid-cols-[auto_1.5fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-surface-container-low/50 transition-colors group">
            <div className="w-12 text-center text-[15px] font-normal text-on-surface-variant">
              01
            </div>

            {/* Employee Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-x[15px] shrink-0">
                SJ
              </div>

              <span className="text-[17px] text-on-surface font-semibold">
                Sarah Jenkins
              </span>
            </div>

            {/* Employee ID */}
            <div>
              <span className="text-[15px] font-mono text-on-surface-variant bg-surface-container px-2.5 py-1 rounded inline-block">
                EMP-8492
              </span>
            </div>

            {/* Department & Contact */}
            <div className="flex flex-col">
              <span className="text-[15px] font-normal text-on-surface">
                Engineering
              </span>

              <span className="text-sm text-on-surface-variant">
                +1 (555) 019-2834
              </span>
            </div>

            {/* Sync Status */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[12px] font-semibold border border-emerald-300/40">
                <Fingerprint size={14} />
                Synced
              </span>
            </div>

            {/* Actions */}
            <div className="w-12 flex justify-end">
              <button
                type="button"
                aria-label="Actions"
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container hover:text-primary transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-[auto_1.5fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-surface-container-low/50 transition-colors group">
            <div className="w-12 text-center text-[15px] font-medium text-on-surface-variant">
              02
            </div>

            {/* Employee Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-[15px] shrink-0">
                MR
              </div>

              <span className="text-[17px] text-on-surface font-semibold">
                Michael Ross
              </span>
            </div>

            {/* Employee ID */}
            <div>
              <span className="text-[15px] font-mono text-on-surface-variant bg-surface-container px-2.5 py-1 rounded inline-block">
                EMP-3940
              </span>
            </div>

            {/* Department & Contact */}
            <div className="flex flex-col">
              <span className="text-[15px] font-normal text-on-surface">
                Human Resources
              </span>

              <span className="text-sm text-on-surface-variant">
                +1 (555) 832-1104
              </span>
            </div>

            {/* Sync Status */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-[12px] font-semibold border border-error/20">
                <AlertTriangle size={14} />
                Failed
              </span>
            </div>

            {/* Actions */}
            <div className="w-12 flex justify-end">
              <button
                type="button"
                aria-label="Actions"
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container hover:text-primary transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-[auto_1.5fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-surface-container-low/50 transition-colors group">
            <div className="w-12 text-center text-[15px] font-medium text-on-surface-variant">
              03
            </div>

            {/* Employee Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-[15px] shrink-0">
                EL
              </div>

              <span className="text-[17px] text-on-surface font-semibold">
                Elena Lopez
              </span>
            </div>

            {/* Employee ID */}
            <div>
              <span className="text-[15px] font-mono text-on-surface-variant bg-surface-container px-2.5 py-1 rounded inline-block">
                EMP-9122
              </span>
            </div>

            {/* Department & Contact */}
            <div className="flex flex-col">
              <span className="text-[15px] font-normal text-on-surface">
                Marketing
              </span>

              <span className="text-sm text-on-surface-variant">
                +1 (555) 443-9801
              </span>
            </div>

            {/* Sync Status */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[12px] font-semibold border border-emerald-300/40">
                <Fingerprint size={14} />
                Synced
              </span>
            </div>

            {/* Actions */}
            <div className="w-12 flex justify-end">
              <button
                type="button"
                aria-label="Actions"
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container hover:text-primary transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-3 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between text-[15px] text-on-surface-variant shrink-0">
          <span>Showing 1 to 3 of 124 records</span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-40 cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
