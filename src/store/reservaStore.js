import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  guardarReservaEnFirestore,
  obtenerSiguienteNumeroReserva,
} from "../firebase/firestore";
import useCartStore from "./cartStore";

const STORAGE_KEY = "reserva:state:v1";

/**
 * Store unificado para manejar:
 * 1. Estado del modal de reserva (UI)
 * 2. Datos de la reserva
 * 3. Persistencia en localStorage
 * 4. Envío a Firestore
 */
export const useReservaStore = create(
  persist(
    (set, get) => ({
      // ===== ESTADO DEL MODAL =====
      isBookingOpen: false,
      originOpen: "", // Rastrear de dónde se abrió el modal
      currentStep: 0,
      completedSteps: [false, false, false, false],
      showResumen: false, // Flag para mostrar el resumen (todos los pasos completados)
      showMenu: false, // Flag para mostrar el menú
      showThankYou: false, // Flag para mostrar la página de agradecimiento

      // ===== DATOS DE LA RESERVA =====
      reservaData: {
        selectedDate: new Date().toISOString(),
        hour: "09",
        minute: "00",
        adults: 1,
        children: 0, // Límite: adultos + niños no puede exceder 6
        mascotas: 0, // Límite: máximo 4 mascotas
        name: "",
        email: "",
        whatsapp: "",
      },
      reservaResult: {},

      // ===== DATOS DE SELECCIÓN DE PLATOS =====
      platosSeleccionados: {}, // Estructura: { asistenteIndex: [platos] }

      updatePlatosSeleccionados: (datos) =>
        set({
          platosSeleccionados: datos,
        }),

      guardarPlatosSeleccionados: (firestoreId, platosData) => {
        set((state) => ({
          platosSeleccionados: {
            firestoreId,
            fecha: new Date().toISOString(),
            platosSeleccionados: platosData,
          },
        }));
      },

      obtenerPlatosSeleccionados: () => get().platosSeleccionados,

      resetPlatosSeleccionados: () =>
        set({
          platosSeleccionados: {},
        }),

      setReservaResult: (data) =>
        set({
          reservaResult: data,
        }),

      // ===== DATOS TEMPORALES PARA CHECKOUT =====
      
      /** 
       * Prepara y guarda los datos temporales para el checkout
       * Incluye validación y persistencia en localStorage
       */
      prepararDatosCheckout: (platosSeleccionados) => {
        const { reservaData } = get();
        
        // Crear estructura temporal para checkout
        const checkoutData = {
          id: `temp-${Date.now()}`,
          fechaCreacion: new Date().toISOString(),
          estado: 'temporal',
          reservaData: reservaData,
          platosSeleccionados: platosSeleccionados,
          uiState: {
            showMenu: true,
          },
          validado: true
        };

        try {
          // Guardar en localStorage como backup
          localStorage.setItem('checkout:reserva:temp', JSON.stringify(checkoutData));
          
          // Actualizar estado de Zustand
          set((state) => ({
            platosSeleccionados: {
              ...state.platosSeleccionados,
              checkoutData: checkoutData
            }
          }));

          console.log('✅ Datos preparados para checkout:', checkoutData);
          return { ok: true, data: checkoutData };
        } catch (error) {
          console.error('❌ Error preparando datos para checkout:', error);
          return { ok: false, error: error.message };
        }
      },

      /** 
       * Obtiene los datos temporales del checkout desde Zustand o localStorage
       */
      obtenerDatosCheckout: () => {
        try {
          // Primero intentar desde Zustand
          const state = get();
          if (state.platosSeleccionados?.checkoutData) {
            return state.platosSeleccionados.checkoutData;
          }

          // Si no está en Zustand, intentar desde localStorage
          const stored = localStorage.getItem('checkout:reserva:temp');
          if (stored) {
            return JSON.parse(stored);
          }

          return null;
        } catch (error) {
          console.error('❌ Error obteniendo datos de checkout:', error);
          return null;
        }
      },

      /** 
       * Limpia los datos temporales del checkout
       */
      limpiarDatosCheckout: () => {
        try {
          localStorage.removeItem('checkout:reserva:temp');
          set((state) => ({
            platosSeleccionados: {
              ...state.platosSeleccionados,
              checkoutData: null
            }
          }));
        } catch (error) {
          console.error('❌ Error limpiando datos de checkout:', error);
        }
      },

      // ===== ESTADO DE ENVÍO =====

      isSending: false,
      lastSentAt: null,

      // ===== ACCIONES DEL MODAL =====
      openBooking: () => {
        const { showResumen, currentStep } = get();
        // Si el resumen ya está completo, abre directamente en el resumen
        if (showResumen) {
          set({ isBookingOpen: true, currentStep: 4 });
        } else {
          set({ isBookingOpen: true });
        }
      },
      openBookingWithOrigin: (origin = "") => {
        const { showResumen } = get();
        // Si el resumen ya está completo, abre directamente en el resumen
        if (showResumen) {
          set({ isBookingOpen: true, originOpen: origin, currentStep: 4 });
        } else {
          set({ isBookingOpen: true, originOpen: origin });
        }
      },
      closeBooking: () => set({ isBookingOpen: false, originOpen: "" }),

      setOriginOpen: (origin) => set({ originOpen: origin }),
      clearOriginOpen: () => set({ originOpen: "" }),

      // ===== ACCIONES DE PASOS =====
      setCurrentStep: (step) => {
        set({ currentStep: step });
        // Persistir el currentStep inmediatamente
        localStorage.setItem("reserva:currentStep", JSON.stringify(step));
      },
      setCompletedSteps: (steps) => {
        // Solo actualizar los pasos completados, NO activar resumen automáticamente
        set({ completedSteps: steps });
      },

      // Acción para marcar que el resumen fue mostrado (todos pasos completados)
      markResumenAsShown: () => set({ showResumen: true, currentStep: 4 }),

      // Acción para volver a editar (desde el resumen)
      editarReserva: (stepToEdit) => {
        set({
          currentStep: stepToEdit,
          showResumen: false,
          showThankYou: false,
        });
        // Persistir el currentStep inmediatamente
        localStorage.setItem("reserva:currentStep", JSON.stringify(stepToEdit));
      },

      // Acción para mostrar Thank You Page después de enviar
      showThankYouPage: () => {
        set({
          showThankYou: true,
          showResumen: false,
        });
      },
      // Acción para mostrar Thank You Page después de enviar
      showMenuSelected: (state) => {
        const nextShowMenu = state !== undefined ? state : true;
        set({
          showMenu: nextShowMenu,
        });

        try {
          const raw = localStorage.getItem("checkout:reserva:temp");
          if (raw) {
            const parsed = JSON.parse(raw);
            const actualizado = {
              ...parsed,
              uiState: {
                ...(parsed?.uiState || {}),
                showMenu: nextShowMenu,
              },
            };
            localStorage.setItem(
              "checkout:reserva:temp",
              JSON.stringify(actualizado)
            );
          }
        } catch (error) {
          console.error("❌ Error sincronizando showMenu en checkout temp:", error);
        }
      },

      // Acción para cerrar Thank You y resetear todo EXCEPTO reservaResult
      closeThankYou: () => {
        set({
          showThankYou: false,
          isBookingOpen: false,
          currentStep: 0,
          completedSteps: [false, false, false, false],
          showResumen: false,
          reservaData: {
            selectedDate: new Date().toISOString(),
            hour: "09",
            minute: "00",
            adults: 1,
            children: 0,
            mascotas: 0,
            name: "",
            email: "",
            whatsapp: "",
          },
          // reservaResult se mantiene intacto
        });
        // Solo limpiar el carrito
        localStorage.removeItem("carrito:items:v1");
        // El store se persiste automáticamente con reservaResult intacto
      },

      // ===== ACCIONES DE DATOS =====
      updateReservaData: (data) =>
        set((state) => {
          const newData = { ...state.reservaData, ...data };

          // Validación: máximo 6 personas (adultos + niños)
          const totalPersonas = (newData.adults || 0) + (newData.children || 0);
          if (totalPersonas > 6) {
            console.warn("⚠️ No se puede exceder 6 personas en total");
            return state; // No actualizar si excede el límite
          }

          // Validación: máximo 4 mascotas
          if ((newData.mascotas || 0) > 4) {
            console.warn("⚠️ No se pueden agregar más de 4 mascotas");
            return state; // No actualizar si excede el límite
          }

          return {
            reservaData: newData,
          };
        }),

      /** Guarda el objeto completo en localStorage y en estado */
      guardarDatos: (payload) => {
        try {
          // Validar límites antes de guardar
          const totalPersonas = (payload.adults || 0) + (payload.children || 0);
          if (totalPersonas > 6) {
            console.warn("⚠️ No se puede exceder 6 personas en total");
            return;
          }
          if ((payload.mascotas || 0) > 4) {
            console.warn("⚠️ No se pueden agregar más de 4 mascotas");
            return;
          }

          set({
            reservaData: payload,
          });
        } catch (error) {
          console.error("Error guardando datos", error);
        }
      },

      // ===== RESET =====
      resetReserva: () =>
        set({
          currentStep: 0,
          completedSteps: [false, false, false, false],
          showResumen: false,
          showThankYou: false,
          platosSeleccionados: {},
          reservaData: {
            selectedDate: new Date().toISOString(),
            hour: "09",
            minute: "00",
            adults: 1,
            children: 0,
            mascotas: 0,
            name: "",
            email: "",
            whatsapp: "",
          },
        }),

      // ===== ENVÍO A FIRESTORE =====
      /**
       * Envía los datos a Firestore incluyendo productos del carrito
       * @param {Object} extras - Datos adicionales opcionales
       * @returns {Promise<{ok: boolean, id?: string, error?: string}>}
       */
      enviarDatos: async (productos = {}) => {
        set({ isSending: true });
        const { reservaData } = get();

        if (!reservaData) {
          set({ isSending: false });
          return { ok: false, error: "No hay datos para enviar" };
        }

        // Obtener productos del carrito
        const cartItems = useCartStore.getState().cartItems;
        const productosFormateados = useCartStore.getState().getFormattedCart();

        // Formatear fecha
        const fecha = new Date(reservaData.selectedDate);
        const fechaFormateada = fecha.toLocaleDateString("es-CO", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        // Formatear hora a "HH:MM am/pm"
        const hour24 = parseInt(reservaData.hour);
        const minute = reservaData.minute;
        let hour12 = hour24;
        let period = "am";

        if (hour24 >= 12) {
          period = "pm";
          if (hour24 > 12) {
            hour12 = hour24 - 12;
          }
        }
        if (hour24 === 0) {
          hour12 = 12;
        }

        const horaFormateada = `${String(hour12).padStart(
          2,
          "0"
        )}:${minute} ${period}`;

        const numeroReserva = await obtenerSiguienteNumeroReserva();
        const numeroReservaFormateado = String(numeroReserva).padStart(4, "0");

        const payload = {
          "numero-de-reserva": numeroReservaFormateado,
          nombre: reservaData.name,
          email: reservaData.email,
          whatsapp: reservaData.whatsapp,
          fecha: fechaFormateada,
          hora: horaFormateada,
          adultos: reservaData.adults,
          ninos: reservaData.children,
          mascotas: reservaData.mascotas,
          productos: productosFormateados,
          cantidadProductos: cartItems.length,
          totalProductos: useCartStore.getState().getCartItemsCount(),
          montoTotal: useCartStore.getState().getCartTotal(),

          estado: "confirmada",
          fechaCreacion: new Date().toISOString(),
        };

        try {
          const res = await guardarReservaEnFirestore(payload);
          if (!res.ok) throw new Error(res.error);

          // Guardar el resultado completo con id de Firestore y todos los datos
          const resultado = {
            firestoreId: res.id,
            ...payload,
          };

          set({
            reservaResult: resultado,
            isSending: false,
          });

          return { ok: true, id: res.id, data: payload };
        } catch (error) {
          set({ isSending: false, reservaResult: {} });
          console.error("❌ Error enviando reserva:", error);
          return { ok: false, error: error.message || "Error desconocido" };
        }
      },

      /**
       * Validar que hay productos antes de procesar
       */
      validarCarrito: () => {
        const cartItems = useCartStore.getState().cartItems;
        if (!cartItems || cartItems.length === 0) {
          return { valid: false, error: "El carrito está vacío" };
        }
        return { valid: true };
      },

      /** Limpia el localStorage manualmente */
      limpiarStorage: () => {
        try {
          set({
            reservaData: {
              selectedDate: new Date().toISOString(),
              hour: "09",
              minute: "00",
              adults: 1,
              children: 0,
              mascotas: 0,
              name: "",
              email: "",
              whatsapp: "",
            },
          });
        } catch (_) {}
      },

      /** Limpia completamente todo incluyendo reservaResult */
      limpiarTodo: () => {
        set({
          showThankYou: false,
          isBookingOpen: false,
          currentStep: 0,
          completedSteps: [false, false, false, false],
          showResumen: false,
          reservaData: {
            selectedDate: new Date().toISOString(),
            hour: "09",
            minute: "00",
            adults: 1,
            children: 0,
            mascotas: 0,
            name: "",
            email: "",
            whatsapp: "",
          },
          reservaResult: {}, // Limpiar también el resultado
        });
        localStorage.removeItem("reserva:state:v1");
        localStorage.removeItem("carrito:items:v1");
      },
    }),
    {
      name: "reserva:state:v1",
      version: 0,
    }
  )
);

export default useReservaStore;
