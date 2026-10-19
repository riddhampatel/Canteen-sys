// import React from "react";
// import { Calendar } from "lucide-react";
// export default function DateFilter({ period, onPeriodChange, customDate, onCustomDateChange }) {
//   const options = [
//     { key: "today", label: "Today" },
//     { key: "week", label: "This Week" },
//     { key: "month", label: "This Month" },
//   ];
//   return (
//     <div className="flex flex-wrap items-center gap-2">
//       <div className="flex bg-surface-container border border-outline-variant rounded-lg p-1">
//         {options.map((opt) => (
//           <button
//             key={opt.key}
//             type="button"
//             onClick={() => onPeriodChange(opt.key)}
//             className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
//               period === opt.key
//                 ? "bg-primary text-on-primary shadow-xs"
//                 : "text-on-surface-variant hover:text-on-surface"
//             }`}
//           >
//             {opt.label}
//           </button>
//         ))}
//       </div>
//       {onCustomDateChange && (
//         <div className="flex items-center gap-1.5 bg-surface-container border border-outline-variant rounded-lg px-2.5 py-1 text-xs">
//           <Calendar size={14} className="text-on-surface-variant" />
//           <input
//             type="date"
//             value={customDate || ""}
//             onChange={(e) => onCustomDateChange(e.target.value)}
//             className="bg-transparent text-on-surface outline-none cursor-pointer text-xs"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

export default function DateFilter({
  period,
  onPeriodChange,
  customDate,
  onCustomDateChange,
}) {
  const options = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Changed to inline-flex so it wraps tightly */}
      <div className="inline-flex bg-surface-container-low border border-outline-variant rounded-lg p-1 shadow-xs">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onPeriodChange(opt.key)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              period === opt.key
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {onCustomDateChange && (
        <div className="flex items-center gap-1.5 bg-surface-container-low border border-outline-variant rounded-lg px-2.5 py-1 text-xs">
          <Calendar size={14} className="text-on-surface-variant" />
          <input
            type="date"
            value={customDate || ""}
            onChange={(e) => onCustomDateChange(e.target.value)}
            className="bg-transparent text-on-surface outline-none cursor-pointer text-xs"
          />
        </div>
      )}
    </div>
  );
}
