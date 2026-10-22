import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ArrowUp,
  Utensils,
  BriefcaseBusiness,
  CircleCheck,
  Search,
  Check,
  TriangleAlert,
  CircleAlert,
  Download,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Date filter tabs component
const DateFilter = ({ period, onPeriodChange }) => {
  const options = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  return (
    <div className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex bg-surface-container-low rounded-lg p-1 border border-outline-variant shadow-xs">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onPeriodChange(opt.value)}
          className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
            period === opt.value
              ? "bg-primary text-on-primary shadow-xs"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

// Meal theme colors
const MEAL_COLORS = {
  breakfast: "#2563eb", // Blue
  lunch: "#16a34a", // Green
  snacks: "#f59e0b", // Amber
  dinner: "#8b5cf6", // Purple
};

const DashCards = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("today"); // today and week and month

  const loadDashboard = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/dash/stats?period=${period}`,
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "API request failed");
      setData(result);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [period]);

  // Derived data
  const stats = data?.stats || {};
  const recent = data?.whoAteToday || [];
  const alerts = data?.alerts || [];

  const recentFiltered = recent.filter((item) =>
    item.employee_name?.toLowerCase().includes(search.toLowerCase()),
  );

  // CSV Report export
  const handleExportCSV = () => {
    if (!recentFiltered.length) {
      alert("No records available to export.");
      return;
    }

    const csv = Papa.unparse(
      recentFiltered.map((item) => ({
        Employee: item.employee_name,
        Department: item.department,
        Time: item.time,
        "Meal Type": item.meal_type,
        Status: item.status,
      })),
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Meals_Report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const getChartData = () => {
    if (period === "today") {
      return [
        {
          label: "Today",
          breakfast: recent.filter((i) => i.meal_type === "Breakfast").length,
          lunch: recent.filter((i) => i.meal_type === "Lunch").length,
          snacks: recent.filter((i) => i.meal_type === "Snacks").length,
          dinner: recent.filter((i) => i.meal_type === "Dinner").length,
        },
      ];
    }

    const rawTrend = data?.dailyTrend || [];
    return rawTrend.map((item) => {
      const count = item.count || 0;

      return {
        label: period === "month" ? item.display_date : item.label,

        breakfast:
          item.breakfast !== null && item.breakfast !== undefined
            ? item.breakfast
            : null,

        lunch:
          item.lunch !== null && item.lunch !== undefined ? item.lunch : null,

        snacks:
          item.snacks !== null && item.snacks !== undefined
            ? item.snacks
            : null,

        dinner:
          item.dinner !== null && item.dinner !== undefined
            ? item.dinner
            : null,
      };
    });
  };

  const chartData = getChartData();

  // const barSize = period === "today" ? 100 : period === "week" ? 14 : 7;
  const barSize = period === "today" ? 55 : period === "week" ? 12 : 6;

  return (
    // <main className="flex-1 flex flex-col w-full mx-auto px-4 md:px-8 py-6 pb-24 md:pb-8 max-w-7xl">
    <main className="flex-1 flex flex-col w-full mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 pb-20 md:pb-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-sm mt-0.5 text-on-surface-variant">
            Monitoring meal service
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 mb-6 sm:mb-8">
        {/* Total Meals */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 sm:p-5 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1 truncate">
              Total Meals
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary truncate">
              {stats.totalMealsToday?.toLocaleString() || "--"}
            </div>
            <div className="text-xs sm:text-sm text-secondary mt-1.5 flex items-center gap-1">
              <ArrowUp size={15} className="text-emerald-600 shrink-0" />
              <span className="truncate">meal consumption</span>
            </div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
            <Utensils className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 sm:p-5 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1 truncate">
              Active Employees
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary truncate">
              {stats.activeEmployees?.toLocaleString() || "--"}
            </div>
            <div className="text-xs sm:text-sm text-secondary mt-1.5 flex items-center gap-1">
              <span className="text-outline text-xs sm:text-sm font-bold">
                -
              </span>
              <span className="truncate">Current employees</span>
            </div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
            <BriefcaseBusiness className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
        </div>

        {/* Menu Status */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 sm:p-5 flex items-start justify-between gap-3 sm:col-span-2 lg:col-span-1">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1 truncate">
              Today's Menu Status
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary truncate">
              {stats.menuStatus || "--"}
            </div>
            <div className="text-xs sm:text-sm text-secondary mt-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="truncate">Menu service</span>
            </div>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <CircleCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
        </div>
      </section>

      {/* Main Bar Chart  */}
      <section className="grid grid-cols-1 gap-6 mb-6 sm:mb-8">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-5">
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-on-surface">
                {period === "today"
                  ? "Today's Meal Volume"
                  : period === "week"
                    ? "Weekly Meal Volume"
                    : "Monthly Meal Volume"}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Meal visual representation
              </p>
            </div>

            <DateFilter period={period} onPeriodChange={setPeriod} />
          </div>

          {/* Chart */}
          <div className="h-64 sm:h-80 w-full">
            {chartData && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: period === "month" ? 25 : 10,
                  }}
                  barGap={period === "today" ? 8 : 2}
                  barCategoryGap={period === "today" ? "20%" : "12%"}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    interval={0}
                    tick={{ fontSize: 9 }}
                    angle={period === "month" || period === "week" ? -35 : 0}
                    textAnchor={
                      period === "month" || period === "week" ? "end" : "middle"
                    }
                    height={period === "month" || period === "week" ? 45 : 30}
                  />

                  <YAxis
                    tick={{ fontSize: 11 }}
                    allowDecimals={false}
                    width={35}
                  />
                  <Tooltip
                    labelFormatter={(label, payload) => {
                      const itemData = payload?.[0]?.payload;
                      return itemData?.time
                        ? `${label} (${itemData.time})`
                        : label;
                    }}
                  />

                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{
                      paddingTop: "0px",
                      paddingBottom: "12px",
                      fontSize: "11px",
                    }}
                  />

                  <Bar
                    dataKey="breakfast"
                    name="Breakfast"
                    fill={MEAL_COLORS.breakfast}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={barSize}
                  />
                  <Bar
                    dataKey="lunch"
                    name="Lunch"
                    fill={MEAL_COLORS.lunch}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={barSize}
                  />
                  <Bar
                    dataKey="snacks"
                    name="Snacks"
                    fill={MEAL_COLORS.snacks}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={barSize}
                  />
                  <Bar
                    dataKey="dinner"
                    name="Dinner"
                    fill={MEAL_COLORS.dinner}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={barSize}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs sm:text-sm text-on-surface-variant">
                No meal data available for this period.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Table & Alerts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Container */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <h2 className="font-bold text-lg sm:text-xl text-on-surface">
              Who Ate Today
            </h2>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleExportCSV}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-xs sm:text-sm font-semibold hover:opacity-90 transition cursor-pointer w-full sm:w-auto shrink-0 shadow-xs"
              >
                <Download size={16} />
                Export CSV
              </button>

              <div className="relative w-full sm:w-56">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  className="bg-surface w-full pl-9 pr-3 py-1.5 sm:py-2 border border-outline-variant rounded-md text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Search employee..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-error-container text-on-error-container text-xs sm:text-sm">
              {error}
            </div>
          )}

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-120">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Employee
                  </th>
                  <th className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Time
                  </th>
                  <th className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Meal Type
                  </th>
                  <th className="p-3 sm:p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm">
                {recentFiltered.length > 0 ? (
                  recentFiltered.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-outline-variant hover:bg-surface-container-low transition-colors"
                    >
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">
                            {item.initials}
                          </div>
                          <div>
                            <div className="font-medium text-xs sm:text-sm text-on-surface">
                              {item.employee_name}
                            </div>
                            <div className="text-on-surface-variant text-[11px] sm:text-xs">
                              {item.department}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap text-on-surface-variant">
                        {item.time}
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface rounded-full text-[11px] sm:text-xs font-medium">
                          {item.meal_type}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-emerald-600 font-medium text-xs">
                          <Check size={16} />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-6 text-center text-xs sm:text-sm  text-on-surface-variant"
                    >
                      {search
                        ? "No employees found."
                        : "No meals recorded today."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3.5  border-t border-outline-variant bg-surface flex justify-center">
            <button className="text-primary font-semibold text-xs sm:text-sm hover:underline cursor-pointer">
              View All Records
            </button>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 sm:p-6 flex flex-col gap-4">
          <h2 className="font-bold text-lg sm:text-xl text-on-surface">
            System Alerts
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-start p-3 sm:p-4 bg-error-container rounded-lg border border-red-200">
              <TriangleAlert size={18} className="text-error mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-xs sm:text-sm text-on-error-container">
                  {alerts[0]?.title || "No active alerts"}
                </div>
                <div className="text-[11px] sm:text-xs text-on-error-container mt-0.5 opacity-85">
                  {alerts[0]?.message || "No local alerts are active."}
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 sm:p-4 bg-surface-container-low rounded-lg border border-outline-variant">
              <CircleAlert size={18} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-xs sm:text-sm text-on-surface">
                  {alerts[1]?.title || "Dashboard connected"}
                </div>
                <div className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5">
                  {alerts[1]?.message || "Dashboard data is ready for review."}
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
