import React, { useEffect, useState } from "react";
import {
  Calendar,
  QrCode,
  Coffee,
  UtensilsCrossed,
  IceCreamCone,
  CookingPot,
  Plus,
  Trash2,
  Power,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const categories = [
  ["Breakfast", Coffee, "07:30 - 10:00"],
  ["Lunch", UtensilsCrossed, "11:30 - 14:30"],
  ["Snacks", IceCreamCone, "15:00 - 17:00"],
  ["Dinner", CookingPot, "18:30 - 21:00"],
];

const emptyForm = {
  name: "",
  meal_type: "Breakfast",
  dietary_tag: "Standard",
  price: "",
};

export default function MenuCard() {
  const [menu, setMenu] = useState({});
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [qrMessage, setQrMessage] = useState("");

  const date = new Date().toISOString().split("T")[0];

  async function loadMenu() {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }
      setMenu(data.menu || {});
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    loadMenu();
  }, [date]);

  async function addItem(event) {
    event.preventDefault();

    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), date }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }
    setForm(emptyForm);
    setShowForm(false);
    await loadMenu();
  }

  async function toggleItem(id) {
    const response = await fetch(`${API_BASE_URL}/menu/${id}/toggle`, {
      method: "PATCH",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }
    await loadMenu();
  }

  async function removeItem(id) {
    if (!window.confirm("Remove this menu item?")) return;

    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }
    await loadMenu();
  }

  function generateQr() {
    setQrMessage(`QR ready: LOCAL-${Date.now()}`);
  }

  return (
    <main className="flex-1 min-w-0 pb-20 md:pb-8">
      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-bold text-3xl md:text-4xl text-on-surface">
              Menu Management
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant mt-1">
              Manage today's local menu offerings.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container text-primary font-semibold text-sm rounded-full border border-outline-variant">
              <Calendar size={18} />
              Today
            </button>
            <button
              onClick={generateQr}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold text-sm rounded-full"
            >
              <QrCode size={18} />
              Generate Daily QR
            </button>
          </div>
        </div>
        {error && <p className="mb-6 text-sm text-error">{error}</p>}
        {qrMessage && (
          <p className="mb-6 text-sm text-emerald-700">{qrMessage}</p>
        )}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold"
        >
          <Plus size={16} />
          {showForm ? "Close" : "Add menu item"}
        </button>
        {showForm && (
          <form
            onSubmit={addItem}
            className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-5"
          >
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              placeholder="Item name"
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
            />
            <select
              value={form.meal_type}
              onChange={(event) =>
                setForm({ ...form, meal_type: event.target.value })
              }
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
            >
              {categories.map(([name]) => (
                <option key={name}>{name}</option>
              ))}
            </select>
            <select
              value={form.dietary_tag}
              onChange={(event) =>
                setForm({ ...form, dietary_tag: event.target.value })
              }
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
            >
              <option>Standard</option>
              <option>Vegan</option>
              <option>Vegetarian</option>
              <option>Pescatarian</option>
            </select>
            <input
              required
              min="0"
              step="0.01"
              type="number"
              value={form.price}
              onChange={(event) =>
                setForm({ ...form, price: event.target.value })
              }
              placeholder="Price"
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary rounded-lg font-semibold text-sm"
            >
              Save item
            </button>
          </form>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map(([name, Icon, hours]) => (
            <section
              key={name}
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between min-h-64"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{name}</h3>
                      <p className="text-xs text-on-surface-variant">{hours}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-secondary-fixed rounded-full text-xs">
                    {(menu[name] || []).length} items
                  </span>
                </div>
                <ul className="space-y-3">
                  {(menu[name] || []).map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 py-2 border-b border-outline-variant/40"
                    >
                      <span className="text-sm flex-1">
                        {item.name}
                        <small className="block text-xs text-on-surface-variant">
                          ₹{item.price} / {item.dietary_tag}
                        </small>
                      </span>
                      <button
                        title="Toggle availability"
                        onClick={() => toggleItem(item.id)}
                        className={`p-1 ${item.is_available ? "text-emerald-600" : "text-outline"}`}
                      >
                        <Power size={16} />
                      </button>
                      <button
                        title="Remove item"
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                  {!(menu[name] || []).length && (
                    <li className="text-sm text-on-surface-variant">
                      No items scheduled.
                    </li>
                  )}
                </ul>
              </div>
              <button
                onClick={() => {
                  setForm({ ...emptyForm, meal_type: name });
                  setShowForm(true);
                }}
                className="mt-6 w-full py-2 border border-dashed border-primary text-primary rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Plus size={14} />
                Add Item
              </button>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
