import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente reutilizable para mostrar video o imagen con fallback automático
 * @param {Object} props
 * @param {string} props.videoSrc - Ruta del video
 * @param {string} props.imageSrc - Ruta de la imagen de fallback
 * @param {string} props.alt - Texto alternativo para la imagen
 * @param {string} props.className - Clases CSS adicionales
 * @param {boolean} props.autoPlay - Si el video se reproduce automáticamente
 * @param {boolean} props.controls - Si mostrar controles del video
 * @param {boolean} props.muted - Si el video está silenciado
 * @param {boolean} props.loop - Si el video se repite
 * @param {boolean} props.animated - Si aplicar animaciones
 * @param {Object} props.animationVariants - Variantes de animación personalizadas
 * @param {string} props.posterImage - Imagen de poster para el video
 */
export const MediaDisplay = ({
  videoSrc,
  imageSrc,
  alt = "Media content",
  className = "w-full h-full object-cover shadow-lg",
  autoPlay = true,
  controls = false,
  muted = true,
  loop = true,
  animated = true,
  animationVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  posterImage = null
}) => {
  const [hasVideo, setHasVideo] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!videoSrc) {
      setMediaLoaded(true);
      return;
    }

    // Verificar si el video está disponible
    const checkVideo = async () => {
      try {
        const response = await fetch(videoSrc, { method: 'HEAD' });
        setHasVideo(response.ok);
      } catch (error) {
        console.log(`Video ${videoSrc} no está disponible:`, error);
        setHasVideo(false);
      } finally {
        setMediaLoaded(true);
      }
    };

    checkVideo();
  }, [videoSrc]);

  const handleVideoError = () => {
    console.log(`Error al cargar video: ${videoSrc}`);
    setVideoError(true);
  };

  const MediaContent = () => {
    if (!mediaLoaded) {
      // Mostrar imagen poster mientras carga, fallback a imageSrc
      const loadingImage = posterImage || imageSrc;
      
      if (loadingImage) {
        return (
          <div className="relative w-full h-full">
            <img 
              src={loadingImage}
              alt={alt}
              className={`${className} opacity-75`}
              style={{ width: '100%', height: '100%' }}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow">
                <span className="text-gray-700 text-sm">Cargando...</span>
              </div>
            </div>
          </div>
        );
      }
      
      return (
        <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center min-h-[200px]`}>
          <span className="text-gray-500">Cargando...</span>
        </div>
      );
    }

    // Si hay video disponible y no hay errores, mostrar video
    if (hasVideo && !videoError) {
      return (
        <video
          className={className}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          poster={posterImage || imageSrc}
          style={{ width: '100%', height: '100%' }}
          onError={handleVideoError}
          onLoadStart={() => console.log(`Cargando video: ${videoSrc}`)}
          onLoadedData={() => console.log(`Video cargado exitosamente: ${videoSrc}`)}
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback para navegadores que no soportan el formato */}
          <p>Tu navegador no soporta videos HTML5.</p>
        </video>
      );
    }

    // Fallback a imagen
    return (
      <div className="w-full h-full">
        <img 
          src={imageSrc}
          alt={alt}
          className={className}
          style={{ width: '100%', height: '100%' }}
          loading="lazy"
          onError={(e) => {
            console.log(`Error cargando imagen: ${imageSrc}`);
            e.target.src = '/imagenes/placeholder.jpg'; // Imagen de placeholder opcional
          }}
        />
      </div>
    );
  };

  if (animated) {
    return (
      <motion.div
        variants={animationVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full relative z-20"
      >
        <MediaContent />
      </motion.div>
    );
  }

  return <MediaContent />;
};

// Variantes de animación predefinidas para reutilizar
export const mediaAnimationPresets = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  }
};