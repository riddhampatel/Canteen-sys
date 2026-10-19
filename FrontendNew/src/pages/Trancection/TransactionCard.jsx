import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  Filter,
  Download,
  Utensils,
  TrendingUp,
  IdCard,
  Calendar,
  Banknote,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const DateFilter = ({ period, onPeriodChange }) => {
  const options = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  return (
    <div className="flex bg-surface-container-low rounded-lg p-1 border border-outline-variant">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onPeriodChange(opt.value)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
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

function Kpi({ icon: Icon, label, value, trend }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-primary-fixed rounded-lg text-primary">
          <Icon size={22} />
        </div>

        <span className="flex items-center gap-1 text-sm font-semibold text-emerald-700">
          <TrendingUp size={14} />
          {trend}
        </span>
      </div>

      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-5">
        {label}
      </p>

      <h3 className="text-[34px] font-bold text-on-background">{value}</h3>
    </div>
  );
}

// Search prop is for global search
export default function TransactionCard({ search = "" }) {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [period, setPeriod] = useState("week"); // "today" | "week" | "month"

  const [form, setForm] = useState({
    user_id: "",
    meal_type: "Breakfast",
    amount: "",
  });

  const [error, setError] = useState("");

  async function loadData() {
    try {
      const [transactions, userResult] = await Promise.all([
        fetch(`${API_BASE_URL}/transactions?period=${period}`).then(
          async (response) => {
            const result = await response.json();
            if (!response.ok) {
              throw new Error(result.error || "API request failed");
            }
            return result;
          },
        ),
        fetch(`${API_BASE_URL}/users`).then(async (response) => {
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "API request failed");
          }
          return result;
        }),
      ]);

      setUsers(userResult.users || []);

      const totalBilling = transactions.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

      setData({
        kpis: {
          totalMeals: transactions.length,
          totalBilling,
          activeConsumers: new Set(
            transactions.map((item) => item.user_id).filter(Boolean),
          ).size,
        },

        transactions: transactions.map((item) => ({
          ...item,
          employee_name: item.employee_name || "Canteen User",
          emp_id: item.emp_id || "-",
          formatted_date: item.created_at
            ? new Date(item.created_at).toLocaleString()
            : "-",
        })),
      });

      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  // Refetches whenever period changes
  useEffect(() => {
    loadData();
  }, [period]);

  async function createTransaction(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "API request failed");
      }

      setForm({
        user_id: "",
        meal_type: "Breakfast",
        amount: "",
      });

      setShowForm(false);
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  // CSV report export
  const handleExportCSV = () => {
    if (!data?.transactions?.length) {
      alert("No transaction records available to export.");
      return;
    }

    const csv = Papa.unparse(
      data.transactions.map((item) => ({
        "Employee Name": item.employee_name,
        "Employee ID": item.emp_id,
        "Meal Type": item.meal_type,
        "Amount (₹)": item.amount,
        "Date & Time": item.formatted_date,
      })),
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Billing_Report_${period}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const kpis = data?.kpis || {};

  // Search filtering logic
  const searchText = (search || "").toLowerCase().trim();
  const allTransactions = data?.transactions || [];

  const filteredTransactions = searchText
    ? allTransactions.filter(
        (item) =>
          (item.employee_name || "").toLowerCase().includes(searchText) ||
          (item.emp_id || "").toLowerCase().includes(searchText) ||
          (item.meal_type || "").toLowerCase().includes(searchText) ||
          String(item.amount || "").includes(searchText) ||
          (item.formatted_date || "").toLowerCase().includes(searchText),
      )
    : allTransactions;

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-bold text-on-background mb-1">
            Billing & Transactions
          </h2>
          <p className="text-[17px] text-on-surface-variant">
            Live consumption and billing records for{" "}
            {period === "today"
              ? "Today"
              : period === "week"
                ? "This Week"
                : "This Month"}
            .
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 transition cursor-pointer"
          >
            <Download size={18} />
            Export Report
          </button>

          <button
            onClick={() => setShowForm((visible) => !visible)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 transition cursor-pointer"
          >
            {showForm ? "Close" : "Record Meal"}
          </button>
        </div>
      </div>

      {/* Transaction Form */}
      {showForm && (
        <form
          onSubmit={createTransaction}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-5"
        >
          <select
            required
            value={form.user_id}
            onChange={(event) =>
              setForm({
                ...form,
                user_id: event.target.value,
              })
            }
            className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm outline-none focus:border-primary"
          >
            <option value="">Select employee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {/* {user.name} ({user.emp_id}) */}
                {user.name}
              </option>
            ))}
          </select>

          <select
            value={form.meal_type}
            onChange={(event) =>
              setForm({
                ...form,
                meal_type: event.target.value,
              })
            }
            className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm outline-none focus:border-primary"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Snacks</option>
            <option>Dinner</option>
          </select>

          <input
            required
            min="0"
            step="0.01"
            type="number"
            value={form.amount}
            onChange={(event) =>
              setForm({
                ...form,
                amount: event.target.value,
              })
            }
            placeholder="Amount"
            className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm outline-none focus:border-primary"
          />

          <button
            type="submit"
            className="bg-primary text-on-primary rounded-lg font-semibold text-sm hover:opacity-90 transition cursor-pointer"
          >
            Save Transaction
          </button>
        </form>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Kpi
          icon={Utensils}
          label={"Total meals"}
          value={kpis.totalMeals?.toLocaleString() || "--"}
          trend="12%"
        />

        <Kpi
          icon={Banknote}
          label={`Total Billing`}
          value={
            kpis.totalBilling == null
              ? "--"
              : `₹${kpis.totalBilling.toLocaleString()}`
          }
          trend="8%"
        />

        <Kpi
          icon={IdCard}
          label="Active Consumers"
          value={kpis.activeConsumers?.toLocaleString() || "--"}
          trend="0%"
        />
      </div>

      {/* Transaction Log Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden">
        {/* Table Header with DateFilter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-3.5 border-b border-outline-variant">
          <div className="text-sm font-semibold text-primary border-b-2 border-primary pb-2 sm:pb-0">
            Transaction Logs
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="px-6 py-4 text-xs text-on-surface-variant uppercase">
                  Employee
                </th>
                <th className="px-6 py-4 text-xs text-on-surface-variant uppercase">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-xs text-on-surface-variant uppercase">
                  Meal Type
                </th>
                <th className="px-6 py-4 text-xs text-on-surface-variant uppercase text-right">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-outline-variant/60 hover:bg-surface-container-low transition-colors"
                >
                  <td className="px-6 py-4">
                    <strong>{item.employee_name}</strong>
                    <span className="block text-xs text-outline font-mono">
                      {item.emp_id}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">{item.formatted_date}</td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-surface-container-highest text-on-surface rounded-full text-xs font-medium">
                      {item.meal_type}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-right">
                    ₹{item.amount}
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-sm text-on-surface-variant"
                  >
                    {searchText
                      ? `No transactions matching "${search}"`
                      : "No transactions found for this period."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
