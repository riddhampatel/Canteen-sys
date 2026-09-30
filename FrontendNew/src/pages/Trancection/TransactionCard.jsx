import React, { useEffect, useState } from "react";

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

export default function TransactionCard() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    meal_type: "Breakfast",
    amount: "",
  });

  const [error, setError] = useState("");

  async function loadData() {
    try {
      const [transactions, userResult] = await Promise.all([
        fetch(`${API_BASE_URL}/transactions`).then(async (response) => {
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "API request failed");
          }
          return result;
        }),
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

  useEffect(() => {
    loadData();
  }, []);

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

  const kpis = data?.kpis || {};

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-bold text-on-background mb-1">
            Billing & Transactions
          </h2>

          <p className="text-[17px] text-on-surface-variant">
            Live consumption and billing records.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold">
            <Filter size={18} />
            Filter
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold"
          >
            <Download size={18} />
            Export Report
          </button>

          <button
            onClick={() => setShowForm((visible) => !visible)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold"
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
            className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
          >
            <option value="">Select employee</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.emp_id})
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
            className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
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
            className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
          />

          <button
            type="submit"
            className="bg-primary text-on-primary rounded-lg font-semibold text-sm"
          >
            Save Transaction
          </button>
        </form>
      )}

      {/* Error */}
      {error && <p className="text-sm text-error">{error}</p>}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Kpi
          icon={Utensils}
          label="Total Meals"
          value={kpis.totalMeals?.toLocaleString() || "--"}
          trend="12%"
        />

        <Kpi
          icon={Banknote}
          label="Total Billing"
          value={
            kpis.totalBilling == null
              ? "--"
              : `₹${Number(kpis.totalBilling).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}`
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

      {/* Daily Log */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden">
        <div className="flex justify-between items-center px-6 py-3.5 border-b border-outline-variant">
          <div className="text-sm font-semibold text-primary border-b-2 border-primary pb-2">
            Daily Log
          </div>

          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            Today
            <Calendar size={16} />
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
              {(data?.transactions || []).map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-outline-variant/60"
                >
                  <td className="px-6 py-4">
                    <strong>{item.employee_name}</strong>

                    <span className="block text-xs text-outline font-mono">
                      {item.emp_id}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">{item.formatted_date}</td>

                  <td className="px-6 py-4">{item.meal_type}</td>

                  <td className="px-6 py-4 text-sm font-bold text-right">
                    ₹{item.amount}
                  </td>
                </tr>
              ))}

              {data?.transactions?.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-sm text-on-surface-variant"
                  >
                    No transactions found.
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
