import {
  Filter,
  Download,
  Utensils,
  TrendingUp,
  ReceiptIndianRupee,
  IdCard,
  Minus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Banknote,
} from "lucide-react";

const TransactionCard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-0 ">
        <div>
          <h2 className="text-4xl font-bold text-on-background mb-1">
            Billing & Transactions
          </h2>
          <p className="text-[17px] text-on-surface-variant">
            Overview of daily consumption and automated billing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold shadow-xs hover:bg-primary-container transition-all cursor-pointer"
          >
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPIs Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-1">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-fixed rounded-lg text-tertiary">
              <Utensils size={22} />
            </div>
            <span className="flex items-center gap-1 text-[14px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp size={14} />
              12%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Total Meals Today
            </p>
            <h3 className="text-[38px] font-bold text-on-background">1,248</h3>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-fixed rounded-lg text-secondary">
              <Banknote size={22} />
            </div>
            <span className="flex items-center gap-1 text-[14px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp size={14} />
              8%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Estimated Daily Billing
            </p>
            <h3 className="text-[38px] font-bold text-primary">₹4,14,336.00</h3>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary-fixed rounded-lg text-primary">
              <IdCard size={22} />
            </div>
            <span className="flex items-center gap-1 text-[14px] font-semibold text-outline bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant/50">
              <Minus size={14} />
              0%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Active Consumers
            </p>
            <h3 className="text-[38px] font-bold text-on-background">892</h3>
          </div>
        </div>
      </div>

      {/* Transaction Data Table Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden flex flex-col -mt-2 mb-5">
        {/* Table Tabs Header */}
        <div className="flex justify-between items-center px-6 py-3.5 border-b border-outline-variant bg-surface-container-low/40">
          <div className="flex gap-6">
            <button
              type="button"
              className="text-sm font-semibold pb-2 transition-colors cursor-pointer text-primary border-b-2   border-primary"
            >
              Daily Log
            </button>
            <button
              type="button"
              className="text-sm font-semibold pb-2 transition-colors cursor-pointer text-on-surface-variant hover:text-on-surface"
            >
              Monthly Summary
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <span>Oct 24, 2023</span>
            <button
              type="button"
              className="p-1 hover:bg-surface-container rounded transition-colors cursor-pointer"
            >
              <Calendar size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider w-1/4">
                  Employee
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider w-1/4">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider w-1/4">
                  Meal Type
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider w-1/4 text-right">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-outline-variant/60">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                {/* Employee */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-secondary-container text-on-secondary-container">
                      JS
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-on-surface">
                        John Smith
                      </span>

                      <span className="text-xs text-outline font-mono">
                        EMP-0421
                      </span>
                    </div>
                  </div>
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4 text-sm text-on-surface">
                  Oct 24 • 12:15 PM
                </td>

                {/* Meal Type */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface rounded-full text-xs font-medium inline-block">
                    Standard Lunch
                  </span>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">
                  ₹332
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                {/* Employee */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-tertiary-fixed text-on-tertiary-fixed">
                      ED
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-on-surface">
                        Emma Davis
                      </span>

                      <span className="text-xs text-outline font-mono">
                        EMP-0188
                      </span>
                    </div>
                  </div>
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4 text-sm text-on-surface">
                  Oct 24 • 12:05 PM
                </td>

                {/* Meal Type */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface rounded-full text-xs font-medium inline-block">
                    Premium Lunch
                  </span>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">
                  ₹540
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                {/* Employee */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-primary-fixed text-on-primary-fixed">
                      MR
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-on-surface">
                        Michael Ross
                      </span>

                      <span className="text-xs text-outline font-mono">
                        EMP-0922
                      </span>
                    </div>
                  </div>
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4 text-sm text-on-surface">
                  Oct 24 • 08:30 AM
                </td>

                {/* Meal Type */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface rounded-full text-xs font-medium inline-block">
                    Breakfast
                  </span>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">
                  ₹208
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                {/* Employee */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-secondary-container text-on-secondary-container">
                      SL
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-on-surface">
                        Sarah Lee
                      </span>

                      <span className="text-xs text-outline font-mono">
                        EMP-0331
                      </span>
                    </div>
                  </div>
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4 text-sm text-on-surface">
                  Oct 24 • 08:15 AM
                </td>

                {/* Meal Type */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface rounded-full text-xs font-medium inline-block">
                    Breakfast
                  </span>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">
                  ₹208
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest text-[15px] text-on-surface-variant">
          <span>Showing 1 to 10 of 1,248 entries</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled
              className="p-1.5 border border-outline-variant rounded bg-surface-container-lowest text-outline hover:bg-surface-container transition-colors disabled:opacity-40 cursor-not-allowed"
            >
              <ChevronLeft size={25} />
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-primary text-on-primary rounded font-semibold text-xs shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              className="px-3 py-1 border border-outline-variant bg-surface-container-lowest text-on-surface rounded font-semibold text-xs hover:bg-surface-container transition-colors cursor-pointer"
            >
              2
            </button>
            <button
              type="button"
              className="px-3 py-1 border border-outline-variant bg-surface-container-lowest text-on-surface rounded font-semibold text-xs hover:bg-surface-container transition-colors cursor-pointer"
            >
              3
            </button>
            <span className="px-1 text-outline">...</span>
            <button
              type="button"
              className="p-1.5 border border-outline-variant rounded bg-surface-container-lowest text-outline hover:bg-surface-container transition-colors cursor-pointer"
            >
              <ChevronRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransactionCard;
