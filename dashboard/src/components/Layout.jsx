import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, History,
  Settings, LogOut, Menu, X
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.jpeg";

const navItems = [
  { to: "/",          icon: LayoutDashboard, label: "Dashboard" },
  { to: "/inventory", icon: Package,          label: "Inventori"  },
  { to: "/history",   icon: History,          label: "Riwayat"    },
  { to: "/settings",  icon: Settings,         label: "Pengaturan" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => navigate("/login");

  const Sidebar = ({ mobile = false }) => (
    <aside className={`
      ${mobile ? "flex" : "hidden lg:flex"}
      flex-col h-full bg-white border-r border-gray-100 w-64 shrink-0
    `}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
           <img
                src={logo}
                alt="Logo Warungku"
                className="w-9 h-9 rounded-xl object-cover"
            />
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm leading-tight">Warungku</p>
          <p className="text-xs text-gray-400">Manajemen Toko</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
               ${isActive
                 ? "bg-primary text-white shadow-sm"
                 : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
               }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm
                     font-medium text-gray-500 hover:bg-red-50 hover:text-danger transition-all"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-neutral overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4 flex items-center gap-3 shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">Warung Bu Sari</p>
            <p className="text-xs text-gray-400">Selamat datang kembali 👋</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}