import React, { useEffect, useState } from "react";
import {
  ArrowUp,
  Utensils,
  BriefcaseBusiness,
  CircleCheck,
  Dot,
  Search,
  Check,
  TriangleAlert,
  CircleAlert,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const DashCards = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/dash/stats`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "API request failed");
        }
        return result;
      })
      .then(setData)
      .catch((requestError) => setError(requestError.message));
  }, []);

  const stats = data?.stats;
  const recent = data?.whoAteToday || [];

  return (
    <main className="flex-1 flex flex-col w-full mx-auto px-4 md:px-8 py-6 pb-24 md:pb-8 max-w-7xl">
      {/* ================= Stats Grid ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
              Total Meals Today
            </div>
            <div className="text-4xl font-bold text-primary">
              {stats?.totalMealsToday?.toLocaleString() || "--"}
            </div>
            <div className="text-sm text-secondary mt-2 flex items-center gap-1">
              <ArrowUp size={16} className="text-emerald-600" />
              <span className="text-emerald-600 font-semibold">12%</span>
              <span>vs yesterday</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
            <Utensils size={22} />
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
              Active Employees
            </div>
            <div className="text-4xl font-bold text-primary">
              {stats?.activeEmployees?.toLocaleString() || "--"}
            </div>
            <div className="text-sm text-secondary mt-2 flex items-center gap-1">
              <span className="text-outline text-base font-bold">-</span>
              <span>Stable capacity</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
            <BriefcaseBusiness size={22} />
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
              Today's Menu Status
            </div>
            <div className="text-4xl font-bold text-primary">
              {stats?.menuStatus || "--"}
            </div>
            <div className="text-sm text-secondary mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>All stations operational</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <CircleCheck size={22} />
          </div>
        </div>
      </section>

      {/* ================= Complex Section: Table & Alerts ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Area */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="font-bold text-2xl text-on-surface">
              Who Ate Today
            </h2>

            <div className="relative w-full sm:w-64">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                className="bg-surface w-full pl-10 pr-4 py-2 border border-outline-variant rounded-md text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Search employee..."
                type="text"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Employee
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Time
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Meal Type
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recent.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-outline-variant hover:bg-surface-container-low transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">
                        {item.initials}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-on-surface">
                          {item.employee_name}
                        </div>
                        <div className="text-on-surface-variant text-xs">
                          {item.department}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant">{item.time}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-surface-container-highest text-on-surface rounded-full text-xs font-medium">
                        {item.meal_type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-emerald-600 font-medium text-xs">
                        <Check size={16} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-outline-variant bg-surface flex justify-center">
            <button className="text-primary font-semibold text-sm hover:underline cursor-pointer">
              View All Records
            </button>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col gap-6">
          <h2 className="font-bold text-xl text-on-surface">System Alerts</h2>
          {error && <p className="text-sm text-error">{error}</p>}

          <div className="flex flex-col gap-4">
            {/* Warning Alert */}
            <div className="flex gap-3.5 items-start p-4 bg-error-container rounded-lg border border-red-200">
              <TriangleAlert size={20} className="text-error mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm text-on-error-container">
                  {data?.alerts?.[0]?.title || "No active alerts"}
                </div>
                <div className="text-xs text-on-error-container mt-1 opacity-85">
                  {data?.alerts?.[0]?.message || "No local alerts are active."}
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="flex gap-3.5 items-start p-4 bg-surface-container-low rounded-lg border border-outline-variant">
              <CircleAlert size={20} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-sm text-on-surface">
                  {data?.alerts?.[1]?.title || "Menu service connected"}
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  {data?.alerts?.[1]?.message ||
                    "dashboard data is ready for review."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashCards;
