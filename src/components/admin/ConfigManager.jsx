import { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore";
import { Settings, Save, RefreshCw, Edit3, X, ChevronDown, ChevronRight } from "lucide-react";

/**
 * Componente para gestionar la configuración del restaurante en Firestore
 * Lee y edita documentos de la colección "configuracion"
 */
export default function ConfigManager() {
  const {
    configuracion,
    loading,
    cargarConfiguracion,
    actualizarConfiguracionAdmin,
    clearMessages,
  } = useAdminStore();

  const [editingDoc, setEditingDoc] = useState(null);
  const [editData, setEditData] = useState({});
  const [expandedDocs, setExpandedDocs] = useState({});

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const toggleExpand = (docId) => {
    setExpandedDocs((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const handleEdit = (doc) => {
    setEditingDoc(doc.id);
    // Crear copia del documento sin el id
    const { id, ...data } = doc;
    setEditData(data);
    setExpandedDocs((prev) => ({ ...prev, [doc.id]: true }));
  };

  const handleSave = async () => {
    if (!editingDoc) return;
    await actualizarConfiguracionAdmin(editingDoc, editData);
    setEditingDoc(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingDoc(null);
    setEditData({});
    clearMessages();
  };

  const handleFieldChange = (key, value) => {
    setEditData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return "null";
    if (typeof value === "object") {
      if (value.seconds) {
        // Firestore Timestamp
        return new Date(value.seconds * 1000).toLocaleString("es-CO");
      }
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const inferInputType = (value) => {
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "checkbox";
    return "text";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-danson mb-2">
            Configuración
          </h2>
          <p className="text-[#fff6ea]/50 text-sm">
            Administra los documentos de la colección "configuracion"
          </p>
        </div>
        <button
          onClick={() => {
            cargarConfiguracion();
            clearMessages();
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1412] rounded-lg text-sm text-[#fff6ea]/70 hover:text-[#fff6ea] hover:bg-[#352821]/50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Actualizar
        </button>
      </div>

      {/* Lista de documentos */}
      <div className="space-y-4">
        {loading && configuracion.length === 0 ? (
          <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 p-12 text-center text-[#fff6ea]/30 text-sm">
            Cargando configuración...
          </div>
        ) : configuracion.length === 0 ? (
          <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 p-12 text-center">
            <Settings size={48} className="mx-auto mb-4 text-[#fff6ea]/10" />
            <p className="text-[#fff6ea]/30 text-sm">
              No hay documentos de configuración
            </p>
          </div>
        ) : (
          configuracion.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#1a1412] rounded-xl border border-[#352821]/30 overflow-hidden"
            >
              {/* Document header */}
              <div className="p-4 border-b border-[#352821]/30 flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(doc.id)}
                  className="flex items-center gap-2 text-left flex-1"
                >
                  {expandedDocs[doc.id] ? (
                    <ChevronDown size={16} className="text-amber-500" />
                  ) : (
                    <ChevronRight size={16} className="text-[#fff6ea]/30" />
                  )}
                  <Settings size={16} className="text-amber-500" />
                  <span className="font-medium text-sm">{doc.id}</span>
                  <span className="text-xs text-[#fff6ea]/30 ml-2">
                    ({Object.keys(doc).length - 1} campos)
                  </span>
                </button>

                <div className="flex gap-1">
                  {editingDoc === doc.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-[#0b0b0b] rounded-lg text-xs font-medium hover:bg-amber-400 transition-colors disabled:opacity-50"
                      >
                        <Save size={12} />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[#fff6ea]/50 hover:text-[#fff6ea] text-xs"
                      >
                        <X size={12} />
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(doc)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[#fff6ea]/50 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg text-xs transition-colors"
                    >
                      <Edit3 size={12} />
                      Editar
                    </button>
                  )}
                </div>
              </div>

              {/* Document fields */}
              {expandedDocs[doc.id] && (
                <div className="divide-y divide-[#352821]/10">
                  {Object.entries(doc)
                    .filter(([key]) => key !== "id")
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-start gap-4 p-4 hover:bg-[#352821]/10"
                      >
                        <span className="text-xs text-[#fff6ea]/50 w-40 flex-shrink-0 font-mono py-1">
                          {key}
                        </span>

                        {editingDoc === doc.id ? (
                          <div className="flex-1">
                            {inferInputType(value) === "number" ? (
                              <input
                                type="number"
                                value={editData[key] ?? ""}
                                onChange={(e) =>
                                  handleFieldChange(key, Number(e.target.value))
                                }
                                className="w-full bg-[#0b0b0b] border border-[#352821]/50 rounded-lg px-3 py-1.5 text-sm text-[#fff6ea] focus:outline-none focus:border-amber-500/50"
                              />
                            ) : inferInputType(value) === "checkbox" ? (
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editData[key] ?? false}
                                  onChange={(e) =>
                                    handleFieldChange(key, e.target.checked)
                                  }
                                  className="rounded"
                                />
                                <span className="text-sm text-[#fff6ea]/70">
                                  {String(editData[key])}
                                </span>
                              </label>
                            ) : typeof value === "object" ? (
                              <textarea
                                value={
                                  typeof editData[key] === "object"
                                    ? JSON.stringify(editData[key], null, 2)
                                    : editData[key] ?? ""
                                }
                                onChange={(e) => {
                                  try {
                                    handleFieldChange(
                                      key,
                                      JSON.parse(e.target.value)
                                    );
                                  } catch {
                                    handleFieldChange(key, e.target.value);
                                  }
                                }}
                                rows={3}
                                className="w-full bg-[#0b0b0b] border border-[#352821]/50 rounded-lg px-3 py-1.5 text-sm text-[#fff6ea] font-mono focus:outline-none focus:border-amber-500/50 resize-none"
                              />
                            ) : (
                              <input
                                type="text"
                                value={editData[key] ?? ""}
                                onChange={(e) =>
                                  handleFieldChange(key, e.target.value)
                                }
                                className="w-full bg-[#0b0b0b] border border-[#352821]/50 rounded-lg px-3 py-1.5 text-sm text-[#fff6ea] focus:outline-none focus:border-amber-500/50"
                              />
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-[#fff6ea]/70 break-all flex-1 font-mono">
                            {renderValue(value)}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
