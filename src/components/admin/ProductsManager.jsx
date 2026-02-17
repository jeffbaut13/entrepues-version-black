import { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronRight,
  Search,
  Package,
  FolderOpen,
  Loader2,
} from "lucide-react";

/** Spinner inline para botones */
const Spinner = ({ size = 14, className = "" }) => (
  <Loader2 size={size} className={`animate-spin ${className}`} />
);

// Campos fijos que no se muestran como "custom"
const FIXED_KEYS = ["id", "nombre", "precio", "descripcion", "img", "subcategoria"];

/**
 * Componente para gestionar productos del menú
 * Permite CRUD de subcategorías y productos dentro de cada categoría
 * Soporta campos dinámicos (agregar/eliminar campos custom a un producto)
 */
export default function ProductsManager() {
  const {
    categorias,
    categoriaSeleccionada,
    subcategorias,
    subcategoriaSeleccionada,
    productos,
    productoEditando,
    loading,
    actionLoading,
    setCategoriaSeleccionada,
    setSubcategoriaSeleccionada,
    setProductoEditando,
    cargarSubcategorias,
    cargarProductos,
    guardarProductoAdmin,
    eliminarProductoAdmin,
    crearSubcategoriaAdmin,
    eliminarSubcategoriaAdmin,
    clearMessages,
  } = useAdminStore();

  const [showProductForm, setShowProductForm] = useState(false);
  const [showSubcategoriaForm, setShowSubcategoriaForm] = useState(false);
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Formulario producto — campos fijos
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    precio: "",
    descripcion: "",
    img: "",
  });

  // Campos custom dinámicos [{key, value}]
  const [customFields, setCustomFields] = useState([]);
  const [newFieldKey, setNewFieldKey] = useState("");

  // Cargar subcategorías al cambiar categoría
  useEffect(() => {
    if (categoriaSeleccionada) {
      cargarSubcategorias(categoriaSeleccionada);
    }
  }, [categoriaSeleccionada]);

  // Cargar productos al seleccionar subcategoría
  useEffect(() => {
    if (categoriaSeleccionada && subcategoriaSeleccionada) {
      cargarProductos(categoriaSeleccionada, subcategoriaSeleccionada);
    }
  }, [subcategoriaSeleccionada]);

  // Rellenar formulario al editar (incluyendo campos dinámicos)
  useEffect(() => {
    if (productoEditando) {
      setFormData({
        id: productoEditando.id,
        nombre: productoEditando.nombre || "",
        precio: productoEditando.precio || "",
        descripcion: productoEditando.descripcion || "",
        img: productoEditando.img || "",
      });
      // Extraer campos custom del producto
      const extras = Object.entries(productoEditando)
        .filter(([key]) => !FIXED_KEYS.includes(key))
        .map(([key, value]) => ({ key, value: String(value) }));
      setCustomFields(extras);
      setShowProductForm(true);
    }
  }, [productoEditando]);

  const handleSubmitProducto = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.nombre || !formData.precio) return;

    // Al editar, usar el ID original tal cual; solo sanitizar al crear nuevo
    const productoId = productoEditando
      ? productoEditando.id
      : formData.id
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "");

    // Construir datos: campos fijos + custom
    const datos = {
      nombre: formData.nombre,
      precio: Number(formData.precio),
      descripcion: formData.descripcion,
      img: formData.img,
    };
    customFields.forEach(({ key, value }) => {
      if (key.trim()) {
        const num = Number(value);
        datos[key.trim()] = !isNaN(num) && value.trim() !== "" ? num : value;
      }
    });

    await guardarProductoAdmin(
      categoriaSeleccionada,
      subcategoriaSeleccionada,
      productoId,
      datos
    );

    resetForm();
  };

  const handleDeleteProducto = async (productoId) => {
    await eliminarProductoAdmin(
      categoriaSeleccionada,
      subcategoriaSeleccionada,
      productoId
    );
    setConfirmDelete(null);
  };

  const handleCrearSubcategoria = async (e) => {
    e.preventDefault();
    if (!nuevaSubcategoria.trim()) return;

    const nombre = nuevaSubcategoria
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-záéíóúñü0-9_]/g, "");

    await crearSubcategoriaAdmin(categoriaSeleccionada, nombre);
    setNuevaSubcategoria("");
    setShowSubcategoriaForm(false);
  };

  const handleDeleteSubcategoria = async (subcategoria) => {
    if (!window.confirm(`¿Eliminar la subcategoría "${subcategoria}" y todos sus productos?`)) return;
    await eliminarSubcategoriaAdmin(categoriaSeleccionada, subcategoria);
  };

  // ===== Custom fields =====
  const addCustomField = () => {
    if (!newFieldKey.trim()) return;
    const key = newFieldKey.trim().toLowerCase().replace(/\s+/g, "_");
    if (FIXED_KEYS.includes(key) || customFields.some((f) => f.key === key)) return;
    setCustomFields([...customFields, { key, value: "" }]);
    setNewFieldKey("");
  };
  const removeCustomField = (index) =>
    setCustomFields(customFields.filter((_, i) => i !== index));
  const updateCustomField = (index, field, val) => {
    const updated = [...customFields];
    updated[index] = { ...updated[index], [field]: val };
    setCustomFields(updated);
  };

  const resetForm = () => {
    setFormData({ id: "", nombre: "", precio: "", descripcion: "", img: "" });
    setCustomFields([]);
    setNewFieldKey("");
    setProductoEditando(null);
    setShowProductForm(false);
    clearMessages();
  };

  const productosFiltrados = productos.filter((p) =>
    (p.nombre || p.id).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCategoria = (cat) =>
    cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, " ");

  const isActionLoading = (key) => actionLoading === key;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-danson mb-2">
          Gestión de Productos
        </h2>
        <p className="text-[#fff6ea]/50 text-sm">
          Administra las categorías, subcategorías y productos del menú
        </p>
      </div>

      {/* Categorías tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategoriaSeleccionada(cat);
              clearMessages();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              categoriaSeleccionada === cat
                ? "bg-amber-500 text-[#0b0b0b]"
                : "bg-[#1a1412] text-[#fff6ea]/60 hover:bg-[#352821]/50 hover:text-[#fff6ea]"
            }`}
          >
            {formatCategoria(cat)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Subcategorías */}
        <div className="col-span-4">
          <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 overflow-hidden">
            <div className="p-4 border-b border-[#352821]/30 flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <FolderOpen size={16} className="text-amber-500" />
                Subcategorías
              </h3>
              <button
                onClick={() => setShowSubcategoriaForm(!showSubcategoriaForm)}
                className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {showSubcategoriaForm && (
              <form onSubmit={handleCrearSubcategoria} className="p-3 border-b border-[#352821]/30">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevaSubcategoria}
                    onChange={(e) => setNuevaSubcategoria(e.target.value)}
                    placeholder="Nombre de subcategoría"
                    className="flex-1 bg-[#0b0b0b] border border-[#352821]/50 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50"
                  />
                  <button
                    type="submit"
                    disabled={isActionLoading("crearSubcategoria")}
                    className="px-3 py-2 bg-amber-500 text-[#0b0b0b] rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isActionLoading("crearSubcategoria") ? <Spinner size={14} /> : <Save size={14} />}
                  </button>
                </div>
              </form>
            )}

            <div className="max-h-[400px] overflow-y-auto">
              {loading && subcategorias.length === 0 ? (
                <div className="p-4 flex items-center justify-center gap-2 text-[#fff6ea]/30 text-sm">
                  <Spinner size={16} /> Cargando...
                </div>
              ) : subcategorias.length === 0 ? (
                <p className="p-4 text-sm text-[#fff6ea]/30 text-center">
                  Sin subcategorías
                </p>
              ) : (
                subcategorias.map((sub) => (
                  <div
                    key={sub.id}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all border-b border-[#352821]/10 ${
                      subcategoriaSeleccionada === sub.id
                        ? "bg-amber-500/10 text-amber-400"
                        : "hover:bg-[#352821]/20 text-[#fff6ea]/70"
                    }`}
                  >
                    <button
                      onClick={() => setSubcategoriaSeleccionada(sub.id)}
                      className="flex-1 text-left text-sm flex items-center gap-2"
                    >
                      <ChevronRight
                        size={14}
                        className={subcategoriaSeleccionada === sub.id ? "text-amber-400" : "text-[#fff6ea]/20"}
                      />
                      {formatCategoria(sub.id)}
                    </button>
                    <button
                      onClick={() => handleDeleteSubcategoria(sub.id)}
                      disabled={isActionLoading(`eliminarSubcategoria_${sub.id}`)}
                      className="p-1 rounded text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      {isActionLoading(`eliminarSubcategoria_${sub.id}`) ? (
                        <Spinner size={13} className="text-red-400" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="col-span-8">
          {subcategoriaSeleccionada ? (
            <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 overflow-hidden">
              {/* Header productos */}
              <div className="p-4 border-b border-[#352821]/30 flex items-center justify-between gap-4">
                <h3 className="font-medium flex items-center gap-2 whitespace-nowrap">
                  <Package size={16} className="text-amber-500" />
                  Productos de{" "}
                  <span className="text-amber-400">
                    {formatCategoria(subcategoriaSeleccionada)}
                  </span>
                </h3>
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <div className="relative max-w-xs flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#fff6ea]/30" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar..."
                      className="w-full bg-[#0b0b0b] border border-[#352821]/50 rounded-lg pl-9 pr-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowProductForm(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-[#0b0b0b] rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors whitespace-nowrap"
                  >
                    <Plus size={14} />
                    Nuevo
                  </button>
                </div>
              </div>

              {/* Formulario producto */}
              {showProductForm && (
                <div className="p-4 border-b border-[#352821]/30 bg-[#0b0b0b]/50">
                  <form onSubmit={handleSubmitProducto}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-[#fff6ea]/50 mb-1">
                          ID del producto *
                        </label>
                        <input
                          type="text"
                          value={formData.id}
                          onChange={(e) =>
                            setFormData({ ...formData, id: e.target.value })
                          }
                          placeholder="ej: arepas_mixtas"
                          disabled={!!productoEditando}
                          className="w-full bg-[#1a1412] border border-[#352821]/50 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#fff6ea]/50 mb-1">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) =>
                            setFormData({ ...formData, nombre: e.target.value })
                          }
                          placeholder="Nombre del producto"
                          className="w-full bg-[#1a1412] border border-[#352821]/50 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#fff6ea]/50 mb-1">
                          Precio *
                        </label>
                        <input
                          type="number"
                          value={formData.precio}
                          onChange={(e) =>
                            setFormData({ ...formData, precio: e.target.value })
                          }
                          placeholder="24000"
                          className="w-full bg-[#1a1412] border border-[#352821]/50 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#fff6ea]/50 mb-1">
                          URL Imagen
                        </label>
                        <input
                          type="text"
                          value={formData.img}
                          onChange={(e) =>
                            setFormData({ ...formData, img: e.target.value })
                          }
                          placeholder="/platos/imagen.jpg o URL de Storage"
                          className="w-full bg-[#1a1412] border border-[#352821]/50 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs text-[#fff6ea]/50 mb-1">
                        Descripción
                      </label>
                      <textarea
                        value={formData.descripcion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descripcion: e.target.value,
                          })
                        }
                        placeholder="Descripción del producto..."
                        rows={2}
                        className="w-full bg-[#1a1412] border border-[#352821]/50 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50 resize-none"
                      />
                    </div>

                    {/* ===== Campos dinámicos ===== */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-[#fff6ea]/50 font-medium">
                          Campos adicionales
                        </label>
                        <span className="text-xs text-[#fff6ea]/30">
                          {customFields.length} campo{customFields.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {customFields.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {customFields.map((field, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 bg-[#1a1412] border border-[#352821]/30 rounded-lg p-2"
                            >
                              <span className="text-xs text-amber-400/70 font-mono min-w-[100px] px-2 py-1 bg-amber-500/5 rounded">
                                {field.key}
                              </span>
                              <input
                                type="text"
                                value={field.value}
                                onChange={(e) => updateCustomField(index, "value", e.target.value)}
                                placeholder="Valor..."
                                className="flex-1 bg-[#0b0b0b] border border-[#352821]/50 rounded-lg px-3 py-1.5 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50"
                              />
                              <button
                                type="button"
                                onClick={() => removeCustomField(index)}
                                className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Eliminar campo"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newFieldKey}
                          onChange={(e) => setNewFieldKey(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") { e.preventDefault(); addCustomField(); }
                          }}
                          placeholder="Nombre del campo (ej: region, alergenos, tipo...)"
                          className="flex-1 bg-[#1a1412] border border-dashed border-[#352821]/40 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/20 focus:outline-none focus:border-amber-500/40"
                        />
                        <button
                          type="button"
                          onClick={addCustomField}
                          disabled={!newFieldKey.trim()}
                          className="px-3 py-2 rounded-lg text-sm bg-[#352821]/30 text-[#fff6ea]/50 hover:text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:hover:bg-[#352821]/30 disabled:hover:text-[#fff6ea]/50"
                        >
                          <Plus size={14} />
                          Agregar
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 rounded-lg text-sm text-[#fff6ea]/60 hover:text-[#fff6ea] hover:bg-[#352821]/30 transition-colors flex items-center gap-1.5"
                      >
                        <X size={14} />
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isActionLoading("guardarProducto")}
                        className="px-4 py-2 bg-amber-500 text-[#0b0b0b] rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors flex items-center gap-1.5 disabled:opacity-70 min-w-[160px] justify-center"
                      >
                        {isActionLoading("guardarProducto") ? (
                          <><Spinner size={14} /> Guardando...</>
                        ) : (
                          <><Save size={14} /> {productoEditando ? "Actualizar" : "Crear"} Producto</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Lista de productos */}
              <div className="divide-y divide-[#352821]/10">
                {loading && productos.length === 0 ? (
                  <div className="p-8 text-center text-[#fff6ea]/30 text-sm flex items-center justify-center gap-2">
                    <Spinner size={18} /> Cargando productos...
                  </div>
                ) : productosFiltrados.length === 0 ? (
                  <div className="p-8 text-center text-[#fff6ea]/30 text-sm">
                    {searchQuery
                      ? "Sin resultados para la búsqueda"
                      : "Sin productos en esta subcategoría"}
                  </div>
                ) : (
                  productosFiltrados.map((producto) => {
                    const extraFields = Object.entries(producto).filter(
                      ([key]) => !FIXED_KEYS.includes(key)
                    );
                    const isDeleting = isActionLoading(`eliminarProducto_${producto.id}`);

                    return (
                      <div
                        key={producto.id}
                        className={`p-4 hover:bg-[#352821]/10 transition-colors group ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Imagen */}
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#352821]/30 flex-shrink-0">
                            {producto.img ? (
                              <img
                                src={producto.img}
                                alt={producto.nombre}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = "none"; }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={20} className="text-[#fff6ea]/20" />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">
                              {producto.nombre || producto.id}
                            </h4>
                            <p className="text-xs text-[#fff6ea]/40 truncate">
                              ID: {producto.id}
                              {producto.descripcion && ` • ${producto.descripcion}`}
                            </p>
                          </div>

                          {/* Precio */}
                          <span className="text-sm font-medium text-amber-400 whitespace-nowrap">
                            ${producto.precio?.toLocaleString?.() || producto.precio}
                          </span>

                          {/* Acciones */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setProductoEditando(producto)}
                              className="p-2 rounded-lg text-[#fff6ea]/40 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                              title="Editar"
                            >
                              <Edit3 size={14} />
                            </button>

                            {confirmDelete === producto.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDeleteProducto(producto.id)}
                                  disabled={isDeleting}
                                  className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center gap-1 disabled:opacity-50"
                                >
                                  {isDeleting && <Spinner size={11} className="text-red-400" />}
                                  Confirmar
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
                                onClick={() => setConfirmDelete(producto.id)}
                                className="p-2 rounded-lg text-[#fff6ea]/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Campos extra del producto */}
                        {extraFields.length > 0 && (
                          <div className="mt-2 ml-16 flex flex-wrap gap-1.5">
                            {extraFields.map(([key, value]) => (
                              <span
                                key={key}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#352821]/20 text-xs"
                              >
                                <span className="text-amber-500/60 font-mono">{key}:</span>
                                <span className="text-[#fff6ea]/60">{String(value)}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 p-12 flex flex-col items-center justify-center text-center">
              <FolderOpen size={48} className="text-[#fff6ea]/10 mb-4" />
              <p className="text-[#fff6ea]/30 text-sm">
                Selecciona una subcategoría para ver sus productos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
