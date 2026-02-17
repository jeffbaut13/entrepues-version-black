import { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore";
import {
  CalendarDays,
  Trash2,
  Eye,
  X,
  Users,
  Clock,
  Mail,
  Phone,
  Search,
  RefreshCw,
  Loader2,
} from "lucide-react";

const Spinner = ({ size = 14, className = "" }) => (
  <Loader2 size={size} className={`animate-spin ${className}`} />
);

/**
 * Componente para gestionar las reservas del restaurante
 * Permite ver, buscar y eliminar reservas de Firestore
 */
export default function ReservasManager() {
  const {
    reservas,
    loading,
    actionLoading,
    cargarReservas,
    eliminarReservaAdmin,
    clearMessages,
  } = useAdminStore();

  const isActionLoading = (key) => actionLoading === key;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    cargarReservas();
  }, []);

  const handleDelete = async (id) => {
    await eliminarReservaAdmin(id);
    setConfirmDelete(null);
    setSelectedReserva(null);
  };

  const reservasFiltradas = reservas.filter((r) => {
    const query = searchQuery.toLowerCase();
    return (
      (r.name || "").toLowerCase().includes(query) ||
      (r.email || "").toLowerCase().includes(query) ||
      (r.whatsapp || "").toLowerCase().includes(query) ||
      (r.id || "").toLowerCase().includes(query)
    );
  });

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "—";
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString("es-CO");
    }
    return String(timestamp);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-danson mb-2">
            Gestión de Reservas
          </h2>
          <p className="text-[#fff6ea]/50 text-sm">
            {reservas.length} reserva{reservas.length !== 1 ? "s" : ""} encontrada{reservas.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => {
            cargarReservas();
            clearMessages();
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1412] rounded-lg text-sm text-[#fff6ea]/70 hover:text-[#fff6ea] hover:bg-[#352821]/50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Actualizar
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff6ea]/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nombre, email o teléfono..."
          className="w-full bg-[#1a1412] border border-[#352821]/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50"
        />
      </div>

      {/* Table */}
      <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 overflow-hidden">
        {loading && reservas.length === 0 ? (
          <div className="p-12 text-center text-[#fff6ea]/30 text-sm">
            Cargando reservas...
          </div>
        ) : reservasFiltradas.length === 0 ? (
          <div className="p-12 text-center text-[#fff6ea]/30 text-sm">
            <CalendarDays size={48} className="mx-auto mb-4 opacity-20" />
            {searchQuery ? "Sin resultados para la búsqueda" : "No hay reservas registradas"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#352821]/30 text-[#fff6ea]/50 text-xs">
                  <th className="text-left p-4 font-medium">Nombre</th>
                  <th className="text-left p-4 font-medium">Contacto</th>
                  <th className="text-left p-4 font-medium">Fecha</th>
                  <th className="text-left p-4 font-medium">Hora</th>
                  <th className="text-left p-4 font-medium">Personas</th>
                  <th className="text-left p-4 font-medium">Creada</th>
                  <th className="text-right p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#352821]/10">
                {reservasFiltradas.map((reserva) => (
                  <tr key={reserva.id} className="hover:bg-[#352821]/10 transition-colors">
                    <td className="p-4">
                      <span className="font-medium">{reserva.name || "—"}</span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-0.5">
                        {reserva.email && (
                          <div className="flex items-center gap-1.5 text-[#fff6ea]/60">
                            <Mail size={12} />
                            <span className="text-xs">{reserva.email}</span>
                          </div>
                        )}
                        {reserva.whatsapp && (
                          <div className="flex items-center gap-1.5 text-[#fff6ea]/60">
                            <Phone size={12} />
                            <span className="text-xs">{reserva.whatsapp}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-[#fff6ea]/70">
                      {reserva.selectedDate || reserva.date || "—"}
                    </td>
                    <td className="p-4 text-[#fff6ea]/70">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-amber-500/50" />
                        {reserva.hour || "—"}:{reserva.minute || "00"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-[#fff6ea]/70">
                        <Users size={12} className="text-amber-500/50" />
                        {(reserva.adults || 0) + (reserva.children || 0)}
                        <span className="text-xs text-[#fff6ea]/40 ml-1">
                          ({reserva.adults || 0}A + {reserva.children || 0}N
                          {reserva.mascotas ? ` + ${reserva.mascotas}M` : ""})
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-[#fff6ea]/40">
                      {formatTimestamp(reserva.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => setSelectedReserva(reserva)}
                          className="p-2 rounded-lg text-[#fff6ea]/40 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                          title="Ver detalle"
                        >
                          <Eye size={14} />
                        </button>

                        {confirmDelete === reserva.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(reserva.id)}
                              disabled={isActionLoading(`eliminarReserva_${reserva.id}`)}
                              className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center gap-1 disabled:opacity-50"
                            >
                              {isActionLoading(`eliminarReserva_${reserva.id}`) && <Spinner size={11} className="text-red-400" />}
                              Sí
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="px-2 py-1 rounded text-xs text-[#fff6ea]/40 hover:text-[#fff6ea]"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(reserva.id)}
                            className="p-2 rounded-lg text-[#fff6ea]/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReserva && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-[#352821]/30 flex items-center justify-between">
              <h3 className="font-medium text-amber-400">
                Detalle de Reserva
              </h3>
              <button
                onClick={() => setSelectedReserva(null)}
                className="p-1 text-[#fff6ea]/40 hover:text-[#fff6ea]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {Object.entries(selectedReserva).map(([key, value]) => (
                <div key={key} className="flex gap-3">
                  <span className="text-xs text-[#fff6ea]/40 w-32 flex-shrink-0 font-mono">
                    {key}
                  </span>
                  <span className="text-sm text-[#fff6ea]/80 break-all">
                    {typeof value === "object" && value !== null
                      ? JSON.stringify(value, null, 2)
                      : String(value ?? "—")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
