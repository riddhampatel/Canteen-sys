import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Papa from "papaparse";

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
  Download,
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

export default function MenuCard({ search = "" }) {
  const [menu, setMenu] = useState({});
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [loading, setLoading] = useState(false);

  const date = new Date().toLocaleDateString("en-CA");

  async function loadMenu() {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load menu");
      }

      setMenu(data.menu || {});
      setError("");
    } catch (requestError) {
      setError(requestError.message || "Failed to load menu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  async function addItem(event) {
    event.preventDefault();
    try {
      setError("");

      if (!form.name.trim()) {
        setError("Please enter a menu item name.");
        return;
      }

      if (form.price === "" || Number(form.price) < 0) {
        setError("Please enter a valid price.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          price: Number(form.price),
          date,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add menu item");
      }
      setForm(emptyForm);
      setShowForm(false);
      await loadMenu();
    } catch (requestError) {
      setError(requestError.message || "Failed to add menu item");
    }
  }
  // toggle item
  async function toggleItem(id) {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/menu/${id}/toggle`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update menu item");
      }

      await loadMenu();
    } catch (requestError) {
      setError(requestError.message || "Failed to update menu item");
    }
  }

  async function removeItem(id) {
    if (!window.confirm("Remove this menu item?")) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove menu item");
      }

      await loadMenu();
    } catch (requestError) {
      setError(requestError.message || "Failed to remove menu item");
    }
  }
  function generateQr() {
    setQrValue((previousValue) => (previousValue ? "" : `LOCAL-MEAL-${date}`));
  }

  // csv report

  function handleExportCSV() {
    const items = Object.entries(menu).flatMap(([category, categoryItems]) =>
      categoryItems.map((item) => ({
        Category: category,
        Name: item.name,
        "Meal Type": item.meal_type,
        "Dietary Tag": item.dietary_tag,
        Price: item.price,
        Available: item.is_available ? "Yes" : "No",
        Date: date,
      })),
    );

    if (!items.length) {
      alert("No menu records available to export.");
      return;
    }

    const csv = Papa.unparse(items);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Menu_Report-${date}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  const searchText = (search || "").toLowerCase().trim();

  const filteredMenu = Object.fromEntries(
    Object.entries(menu).map(([category, items]) => [
      category,
      searchText
        ? items.filter(
            (item) =>
              item.name?.toLowerCase().includes(searchText) ||
              category.toLowerCase().includes(searchText) ||
              item.dietary_tag?.toLowerCase().includes(searchText) ||
              item.price.includes(searchText),
          )
        : items,
    ]),
  );

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
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 bg-surface-container text-primary font-semibold text-sm rounded-full border border-outline-variant"
            >
              <Calendar size={18} />
              Today
            </button>

            <button
              type="button"
              onClick={generateQr}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold text-sm rounded-full"
            >
              <QrCode size={18} />
              {qrValue ? "Hide QR" : "Generate Daily QR"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {qrValue && (
          <div className="mb-6 p-6 bg-white border border-outline-variant rounded-xl flex flex-col items-center">
            <h3 className="font-bold text-lg mb-4">Today's Meal QR Code</h3>

            <QRCodeCanvas
              value={qrValue}
              size={220}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />

            <p className="mt-4 text-xs text-on-surface-variant">
              Scan this QR code for today's meal
            </p>

            <p className="mt-1 text-xs font-mono text-on-surface-variant">
              {qrValue}
            </p>
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 transition"
          >
            <Plus size={17} />
            {showForm ? "Close" : "Add menu item"}
          </button>

          {/* <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container text-primary border border-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-on-primary transition"
          >
            <Download size={18} />
            Menu report
          </button> */}
        </div>

        {showForm && (
          <form
            onSubmit={addItem}
            className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-5"
          >
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              placeholder="Item name"
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm outline-none focus:border-primary"
            />

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
              {categories.map(([name]) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <select
              value={form.dietary_tag}
              onChange={(event) =>
                setForm({
                  ...form,
                  dietary_tag: event.target.value,
                })
              }
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm outline-none focus:border-primary"
            >
              <option value="Standard">Standard</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Pescatarian">Pescatarian</option>
            </select>

            <input
              required
              min="0"
              step="0.01"
              type="number"
              value={form.price}
              onChange={(event) =>
                setForm({
                  ...form,
                  price: event.target.value,
                })
              }
              placeholder="Price"
              className="border border-outline-variant rounded-lg px-3 py-2 bg-surface text-sm outline-none focus:border-primary"
            />

            <button
              type="submit"
              className="bg-primary text-on-primary rounded-lg font-semibold text-sm hover:opacity-90 transition"
            >
              Save item
            </button>
          </form>
        )}

        {loading && (
          <div className="mb-6 text-sm text-on-surface-variant">
            Loading menu...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map(([name, Icon, hours]) => {
            const categoryItems = filteredMenu[name] || [];

            return (
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

                        <p className="text-xs text-on-surface-variant">
                          {hours}
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-secondary-fixed rounded-full text-xs">
                      {categoryItems.length} items
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {categoryItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-2 py-2 border-b border-outline-variant/40"
                      >
                        <span className="text-sm flex-1">
                          <span
                            className={
                              item.is_available
                                ? ""
                                : "line-through text-on-surface-variant"
                            }
                          >
                            {item.name}
                          </span>

                          <small className="block text-xs text-on-surface-variant">
                            ₹{item.price} / {item.dietary_tag}
                          </small>
                        </span>

                        <button
                          type="button"
                          title={
                            item.is_available ? "Disable item" : "Enable item"
                          }
                          onClick={() => toggleItem(item.id)}
                          className={`p-1 ${
                            item.is_available
                              ? "text-emerald-600"
                              : "text-outline"
                          }`}
                        >
                          <Power size={16} />
                        </button>

                        <button
                          type="button"
                          title="Remove item"
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-error hover:opacity-70"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}

                    {!categoryItems.length && (
                      <li className="text-sm text-on-surface-variant py-2">
                        {searchText
                          ? "No matching items."
                          : "No items scheduled."}
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      ...emptyForm,
                      meal_type: name,
                    });

                    setShowForm(true);
                  }}
                  className="mt-6 w-full py-2 border border-dashed border-primary text-primary rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-primary hover:text-on-primary transition"
                >
                  <Plus size={14} />
                  Add Item
                </button>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
