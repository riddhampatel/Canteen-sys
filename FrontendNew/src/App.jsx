import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import NavBar from "./components/Navbar/NavBar";


import Dashboard from "./pages/Dashboard/Dashboard";
import Menu from "./pages/Menu/Menu";
import User from "./pages/Users/User";
import Transaction from "./pages/Trancection/Transaction";
import Setting from "./pages/Setting/Setting";

export default function App() {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface">

      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-w-0 min-h-screen">
        {/* <NavBar /> */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/users" element={<User />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
