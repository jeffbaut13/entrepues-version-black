import { useState, useEffect, useRef } from "react";
import useAdminStore from "../../store/adminStore";
import {
  ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  FolderOpen,
  X,
  Loader2,
} from "lucide-react";

const Spinner = ({ size = 14, className = "" }) => (
  <Loader2 size={size} className={`animate-spin ${className}`} />
);

const CARPETAS = ["productos", "categorias", "platos", "banners", "general"];

/**
 * Componente para gestionar imágenes en Firebase Storage
 * Permite subir, listar, copiar URL y eliminar imágenes
 */
export default function StorageManager() {
  const {
    imagenes,
    carpetaStorage,
    loading,
    actionLoading,
    setCarpetaStorage,
    cargarImagenes,
    subirImagenAdmin,
    eliminarImagenAdmin,
    clearMessages,
  } = useAdminStore();

  const isActionLoading = (key) => actionLoading === key;

  const [copiedUrl, setCopiedUrl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [customFolder, setCustomFolder] = useState("");
  const [showCustomFolder, setShowCustomFolder] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    cargarImagenes(carpetaStorage);
  }, [carpetaStorage]);

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      await subirImagenAdmin(file, carpetaStorage);
    }
  };

  const handleFileChange = (e) => {
    handleUpload(e.target.files);
    e.target.value = "";
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error("Error copiando URL:", err);
    }
  };

  const handleDelete = async (fullPath) => {
    await eliminarImagenAdmin(fullPath, carpetaStorage);
    setConfirmDelete(null);
  };

  const handleCustomFolder = (e) => {
    e.preventDefault();
    if (customFolder.trim()) {
      setCarpetaStorage(customFolder.trim());
      setShowCustomFolder(false);
      setCustomFolder("");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-danson mb-2">
            Gestión de Imágenes
          </h2>
          <p className="text-[#fff6ea]/50 text-sm">
            Sube, visualiza y gestiona imágenes en Firebase Storage
          </p>
        </div>
        <button
          onClick={() => {
            cargarImagenes(carpetaStorage);
            clearMessages();
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1412] rounded-lg text-sm text-[#fff6ea]/70 hover:text-[#fff6ea] hover:bg-[#352821]/50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Actualizar
        </button>
      </div>

      {/* Carpetas */}
      <div className="flex gap-2 mb-6 flex-wrap items-center">
        {CARPETAS.map((carpeta) => (
          <button
            key={carpeta}
            onClick={() => setCarpetaStorage(carpeta)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              carpetaStorage === carpeta
                ? "bg-amber-500 text-[#0b0b0b]"
                : "bg-[#1a1412] text-[#fff6ea]/60 hover:bg-[#352821]/50 hover:text-[#fff6ea]"
            }`}
          >
            <FolderOpen size={14} />
            {carpeta}
          </button>
        ))}

        {/* Carpeta personalizada */}
        {!showCustomFolder ? (
          <button
            onClick={() => setShowCustomFolder(true)}
            className="px-3 py-2 rounded-lg text-sm bg-[#1a1412] text-[#fff6ea]/40 hover:text-[#fff6ea] border border-dashed border-[#352821]/30 hover:border-amber-500/30 transition-colors"
          >
            + Otra carpeta
          </button>
        ) : (
          <form onSubmit={handleCustomFolder} className="flex gap-1">
            <input
              type="text"
              value={customFolder}
              onChange={(e) => setCustomFolder(e.target.value)}
              placeholder="nombre/carpeta"
              autoFocus
              className="bg-[#0b0b0b] border border-[#352821]/50 rounded-lg px-3 py-2 text-sm text-[#fff6ea] placeholder:text-[#fff6ea]/30 focus:outline-none focus:border-amber-500/50 w-40"
            />
            <button
              type="submit"
              className="px-2 py-2 bg-amber-500 text-[#0b0b0b] rounded-lg text-sm"
            >
              Ir
            </button>
            <button
              type="button"
              onClick={() => setShowCustomFolder(false)}
              className="px-2 py-2 text-[#fff6ea]/40 hover:text-[#fff6ea]"
            >
              <X size={14} />
            </button>
          </form>
        )}
      </div>

      {/* Upload zone */}
      <div
        className={`mb-6 border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          dragActive
            ? "border-amber-500 bg-amber-500/10"
            : "border-[#352821]/30 hover:border-amber-500/30 hover:bg-[#1a1412]"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload
          size={32}
          className={`mx-auto mb-3 ${
            dragActive ? "text-amber-500" : "text-[#fff6ea]/20"
          }`}
        />
        <p className="text-sm text-[#fff6ea]/50 mb-1">
          Arrastra imágenes aquí o haz clic para seleccionar
        </p>
        <p className="text-xs text-[#fff6ea]/30">
          Se subirán a la carpeta: <span className="text-amber-500/70">{carpetaStorage}/</span>
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Images grid */}
      {loading && imagenes.length === 0 ? (
        <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 p-12 text-center text-[#fff6ea]/30 text-sm">
          Cargando imágenes...
        </div>
      ) : imagenes.length === 0 ? (
        <div className="bg-[#1a1412] rounded-xl border border-[#352821]/30 p-12 text-center">
          <ImageIcon size={48} className="mx-auto mb-4 text-[#fff6ea]/10" />
          <p className="text-[#fff6ea]/30 text-sm">
            No hay imágenes en esta carpeta
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {imagenes.map((img) => (
            <div
              key={img.fullPath}
              className="bg-[#1a1412] rounded-xl border border-[#352821]/30 overflow-hidden group"
            >
              {/* Image */}
              <div
                className="aspect-square bg-[#352821]/20 cursor-pointer relative overflow-hidden"
                onClick={() => setPreviewImage(img)}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-xs text-[#fff6ea]/70 truncate mb-2" title={img.name}>
                  {img.name}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCopyUrl(img.url)}
                    className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                      copiedUrl === img.url
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-[#352821]/20 text-[#fff6ea]/50 hover:text-amber-400 hover:bg-amber-500/10"
                    }`}
                  >
                    {copiedUrl === img.url ? (
                      <>
                        <Check size={12} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        URL
                      </>
                    )}
                  </button>

                  {confirmDelete === img.fullPath ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(img.fullPath)}
                        disabled={isActionLoading(`eliminarImagen_${img.fullPath}`)}
                        className="px-2 py-1.5 rounded-lg text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center gap-1 disabled:opacity-50"
                      >
                        {isActionLoading(`eliminarImagen_${img.fullPath}`) && <Spinner size={11} className="text-red-400" />}
                        Sí
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-2 py-1.5 rounded-lg text-xs text-[#fff6ea]/40"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(img.fullPath)}
                      className="p-1.5 rounded-lg text-[#fff6ea]/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="max-w-3xl max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white"
            >
              <X size={24} />
            </button>
            <img
              src={previewImage.url}
              alt={previewImage.name}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="mt-3 flex items-center gap-3">
              <p className="text-sm text-white/70 flex-1 truncate">
                {previewImage.fullPath}
              </p>
              <button
                onClick={() => handleCopyUrl(previewImage.url)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg text-xs hover:bg-amber-500/30 transition-colors"
              >
                <Copy size={12} />
                Copiar URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
