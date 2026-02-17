import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  Settings,
  ImageIcon,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import useAdminStore from "../../store/adminStore";

const NAV_ITEMS = [
  { id: "productos", label: "Productos", icon: UtensilsCrossed, path: "/admin" },
  { id: "reservas", label: "Reservas", icon: CalendarDays, path: "/admin/reservas" },
  { id: "configuracion", label: "Configuración", icon: Settings, path: "/admin/configuracion" },
  { id: "storage", label: "Imágenes", icon: ImageIcon, path: "/admin/storage" },
];

export default function AdminLayout() {
  const location = useLocation();
  const { error, successMessage, clearMessages } = useAdminStore();

  const getActiveSection = () => {
    if (location.pathname === "/admin") return "productos";
    const segment = location.pathname.split("/admin/")[1];
    return segment || "productos";
  };

  const activeSection = getActiveSection();

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#fff6ea] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1412] border-r border-[#352821]/30 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-[#352821]/30">
          <Link to="/" className="flex items-center gap-2 text-[#fff6ea]/70 hover:text-[#fff6ea] transition-colors text-sm mb-4">
            <ArrowLeft size={16} />
            <span>Volver al sitio</span>
          </Link>
          <div className="flex items-center gap-3">
            <LayoutDashboard size={24} className="text-amber-500" />
            <h1 className="text-xl font-bold font-danson">Admin Panel</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "text-[#fff6ea]/60 hover:bg-[#352821]/30 hover:text-[#fff6ea]"
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#352821]/30">
          <p className="text-xs text-[#fff6ea]/30 text-center">
            Entrepues Admin v1.0
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        {/* Toast messages */}
        {(error || successMessage) && (
          <div className="fixed top-4 right-4 z-50" style={{ animation: 'slideDown 0.3s ease-out' }}>
            <div
              className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md backdrop-blur-sm ${
                error
                  ? "bg-red-500/20 border border-red-500/40 text-red-300"
                  : "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
              }`}
            >
              {error ? (
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
              )}
              <span className="text-sm flex-1">{error || successMessage}</span>
              <button
                onClick={clearMessages}
                className="text-current opacity-60 hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
