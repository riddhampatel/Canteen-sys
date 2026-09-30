import React from "react";
import {
  Calendar,
  QrCode,
  Fullscreen,
  Coffee,
  Pencil,
  UtensilsCrossed,
  IceCreamCone,
  CookingPot,
  Plus,
} from "lucide-react";

const MenuCard = () => {
  return (
    <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-bold text-3xl md:text-4xl text-on-surface">
              Menu Management
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant mt-1">
              Configure daily offerings and operational timings.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container text-primary font-semibold text-sm rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer">
              <Calendar size={18} />
              Select Date
            </button>
            <button className=" shadow-primary/40 flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold text-sm rounded-full shadow-md hover:bg-primary-container transition-all cursor-pointer">
              <QrCode size={18} />
              Generate Daily QR
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Date & QR Prominent Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Date Card */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-on-surface">Today's Menu</h2>
                <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full font-semibold text-xs">
                  Active
                </span>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                Oct 24, 2023
              </div>
              <p className="text-sm text-on-surface-variant">
                Tuesday • Week 42
              </p>
            </div>

            {/* Display Daily QR Card */}
            <div className="bg-primary-fixed p-6 rounded-xl border border-outline-variant relative overflow-hidden group cursor-pointer transition-all hover:shadow-md">
              <div className="absolute -right-6 -top-6 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <QrCode size={140} className="text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl text-primary mb-2">
                  Display Daily QR
                </h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  Generate code for entry scanners and mobile check-ins.
                </p>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-on-primary rounded-lg font-semibold text-sm transition-colors hover:bg-primary-container cursor-pointer shadow-sm">
                  <Fullscreen size={18} />
                  Present to Screen
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Meal Categories Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Breakfast */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center">
                      <Coffee size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-on-surface">Breakfast</h3>
                      <p className="text-xs text-on-surface-variant font-medium">07:30 - 10:00</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary hover:bg-surface-container p-2 rounded-full transition-colors cursor-pointer">
                    <Pencil size={16} />
                  </button>
                </div>

                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/40">
                    <span className="text-sm text-on-surface">Scrambled Eggs & Toast</span>
                    <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded font-medium">Standard</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-sm text-on-surface">Oatmeal with Berries</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Vegan</span>
                  </li>
                </ul>
              </div>

              <button className="mt-6 w-full py-2 border border-dashed border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-1 cursor-pointer">
                <Plus size={14} /> Add Item
              </button>
            </div>

            {/* 2. Lunch */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center">
                      <UtensilsCrossed size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-on-surface">Lunch</h3>
                      <p className="text-xs text-on-surface-variant font-medium">11:30 - 14:30</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary hover:bg-surface-container p-2 rounded-full transition-colors cursor-pointer">
                    <Pencil size={16} />
                  </button>
                </div>

                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/40">
                    <span className="text-sm text-on-surface">Grilled Chicken Caesar</span>
                    <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded font-medium">Standard</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/40">
                    <span className="text-sm text-on-surface">Lentil Soup & Bread</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Vegan</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-sm text-on-surface">Beef Stroganoff</span>
                    <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded font-medium">Standard</span>
                  </li>
                </ul>
              </div>

              <button className="mt-6 w-full py-2 border border-dashed border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-1 cursor-pointer">
                <Plus size={14} /> Add Item
              </button>
            </div>

            {/* 3. Snacks */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center">
                      <IceCreamCone size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-on-surface">Snacks</h3>
                      <p className="text-xs text-on-surface-variant font-medium">15:00 - 17:00</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary hover:bg-surface-container p-2 rounded-full transition-colors cursor-pointer">
                    <Pencil size={16} />
                  </button>
                </div>

                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-outline-variant/40">
                    <span className="text-sm text-on-surface">Fresh Fruit Bowl</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Vegan</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-sm text-on-surface">Assorted Pastries</span>
                    <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded font-medium">Standard</span>
                  </li>
                </ul>
              </div>

              <button className="mt-6 w-full py-2 border border-dashed border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-1 cursor-pointer">
                <Plus size={14} /> Add Item
              </button>
            </div>

            {/* 4. Dinner */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center">
                      <CookingPot size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-on-surface">Dinner</h3>
                      <p className="text-xs text-on-surface-variant font-medium">18:30 - 21:00</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary hover:bg-surface-container p-2 rounded-full transition-colors cursor-pointer">
                    <Pencil size={16} />
                  </button>
                </div>

                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2">
                    <span className="text-sm text-on-surface">Baked Salmon & Quinoa</span>
                    <span className="text-xs bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded font-medium">Pescatarian</span>
                  </li>
                </ul>
              </div>

              <button className="mt-6 w-full py-2 border border-dashed border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-1 cursor-pointer">
                <Plus size={14} /> Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MenuCard;
