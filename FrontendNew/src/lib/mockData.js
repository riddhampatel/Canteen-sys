export const dashboardData = {
  stats: {
    totalMealsToday: 128,
    activeEmployees: 64,
    menuStatus: "Operational",
  },
  whoAteToday: [
    { id: 1, initials: "AK", employee_name: "Aarav Kumar", department: "Engineering", time: "08:42 AM", meal_type: "Breakfast", status: "Completed" },
    { id: 2, initials: "PS", employee_name: "Priya Shah", department: "Finance", time: "12:18 PM", meal_type: "Lunch", status: "Completed" },
    { id: 3, initials: "RM", employee_name: "Rohan Mehta", department: "Operations", time: "01:05 PM", meal_type: "Lunch", status: "Completed" },
  ],
  alerts: [],
};

export const menuData = {
  Breakfast: [
    { id: 1, name: "Oatmeal with Berries", dietary_tag: "Vegan", price: 95, is_available: true },
    { id: 2, name: "Masala Dosa", dietary_tag: "Vegetarian", price: 85, is_available: true },
  ],
  Lunch: [
    { id: 3, name: "Grilled Chicken Caesar", dietary_tag: "Standard", price: 250, is_available: true },
    { id: 4, name: "Lentil Soup & Bread", dietary_tag: "Vegan", price: 180, is_available: true },
  ],
  Snacks: [
    { id: 5, name: "Fresh Fruit Bowl", dietary_tag: "Vegan", price: 90, is_available: true },
  ],
  Dinner: [
    { id: 6, name: "Paneer Butter Masala", dietary_tag: "Vegetarian", price: 250, is_available: true },
  ],
};

export const userData = [
  { id: 1, initials: "AK", name: "Aarav Kumar", emp_id: "EMP-001", department: "Engineering", phone: "+91 98765 43210", fingerprint_synced: true },
  { id: 2, initials: "PS", name: "Priya Shah", emp_id: "EMP-002", department: "Finance", phone: "+91 98765 43211", fingerprint_synced: true },
  { id: 3, initials: "RM", name: "Rohan Mehta", emp_id: "EMP-003", department: "Operations", phone: "+91 98765 43212", fingerprint_synced: false },
];

export const transactionData = {
  kpis: { totalMeals: 128, totalBilling: 18450, activeConsumers: 64 },
  transactions: [
    { id: 1, employee_name: "Aarav Kumar", emp_id: "EMP-001", formatted_date: "Sep 30, 2026 08:42 AM", meal_type: "Breakfast", amount: 95 },
    { id: 2, employee_name: "Priya Shah", emp_id: "EMP-002", formatted_date: "Sep 30, 2026 12:18 PM", meal_type: "Lunch", amount: 250 },
    { id: 3, employee_name: "Rohan Mehta", emp_id: "EMP-003", formatted_date: "Sep 30, 2026 01:05 PM", meal_type: "Lunch", amount: 180 },
  ],
};

export const settingsData = {
  preferences: {
    autoPublishMenus: true,
    allowGuestOrders: false,
    maintenanceMode: false,
  },
  staff: [
    { id: 1, name: "Aarav Kumar", email: "aarav@canteen.local", role: "Manager", permissions: "Full access" },
    { id: 2, name: "Priya Shah", email: "priya@canteen.local", role: "Operator", permissions: "Menu and orders" },
  ],
};
