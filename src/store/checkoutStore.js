import { create } from "zustand";
import { persist } from "zustand/middleware";
import { crearReservaPendienteDesdeCheckout } from "../firebase/actions";

const serializarNombre = (value = "") =>
  String(value)
    .replace(/\s+/g, " ")
    .trimStart();

const serializarEmail = (value = "") => String(value).trim().toLowerCase();

const serializarWhatsapp = (value = "") =>
  String(value)
    .replace(/\D/g, "")
    .slice(0, 10);

const validateName = (value) => {
  if (!value.trim()) {
    return "El nombre es requerido";
  }
  if (value.trim().length < 3) {
    return "El nombre debe tener al menos 3 caracteres";
  }
  return "";
};

const validateEmail = (value) => {
  if (!value.trim()) {
    return "El correo es requerido";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "El correo no es válido";
  }
  return "";
};

const validateWhatsapp = (value) => {
  if (!value.trim()) {
    return "El WhatsApp es requerido";
  }
  const onlyNumbers = value.replace(/\s/g, "");
  if (onlyNumbers.length !== 10) {
    return "Tu número debe contener 10 dígitos";
  }
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(onlyNumbers)) {
    return "El WhatsApp solo puede contener números";
  }
  return "";
};

/**
 * Store para manejar el flujo de checkout y pagos
 * Integra con pasarelas de pago y maneja el estado de la transacción
 */
export const useCheckoutStore = create(
  persist(
    (set, get) => ({
      // ===== ESTADO DEL CHECKOUT =====
      isLoading: false,
      pagoEnProceso: false,
      pagoCompletado: false,
      error: null,

      // ===== DATOS DE LA RESERVA =====
      datosReserva: null,
      datosContacto: {
        nombre: "",
        email: "",
        whatsapp: "",
        notas: "",
      },

      // ===== DATOS DE PAGO =====
      metodoPago: "tarjeta", // "tarjeta", "pse", "nequi", "efectivo"
      montoTotal: 0,
      descuentos: 0,
      impuestos: 0,
      montoFinal: 0,

      // ===== RESPUESTA DE FIREBASE =====
      reservaGuardada: null,

      // ===== DATOS DE LA TRANSACCIÓN =====
      transaccion: {
        id: null,
        estado: null, // "pendiente", "exitosa", "fallida", "cancelada"
        referencia: null,
        fechaCreacion: null,
        fechaActualizacion: null,
      },

      // ===== ACCIONES DE DATOS =====
      
      /**
       * Carga los datos de la reserva desde localStorage
       */
      cargarDatosReserva: () => {
        try {
          const stored = localStorage.getItem('checkout:reserva:temp');
          if (stored) {
            const datos = JSON.parse(stored);
            
            // Calcular totales
            const subtotal = datos.platosSeleccionados?.reduce((total, asistente) => {
              return total + (asistente.platos?.reduce((sum, plato) => {
                return sum + (plato.precio * plato.cantidad);
              }, 0) || 0);
            }, 0) || 0;

            const impuestos = subtotal * 0.19; // 19% IVA
            const montoFinal = subtotal + impuestos;

            set({
              datosReserva: datos,
              montoTotal: subtotal,
              impuestos: impuestos,
              montoFinal: montoFinal,
              datosContacto: {
                nombre: datos.reservaData?.name || "",
                email: datos.reservaData?.email || "",
                whatsapp: datos.reservaData?.whatsapp || "",
                notas: "",
              }
            });

            console.log('✅ Datos de reserva cargados:', datos);
            return { ok: true, data: datos };
          }
          
          throw new Error('No se encontraron datos de reserva');
        } catch (error) {
          console.error('❌ Error cargando datos de reserva:', error);
          set({ error: error.message });
          return { ok: false, error: error.message };
        }
      },

      /**
       * Actualiza los datos de contacto
       */
      updateDatosContacto: (datos) => {
        const datosSerializados = {
          ...datos,
        };

        if (Object.prototype.hasOwnProperty.call(datosSerializados, "nombre")) {
          datosSerializados.nombre = serializarNombre(datosSerializados.nombre);
        }
        if (Object.prototype.hasOwnProperty.call(datosSerializados, "email")) {
          datosSerializados.email = serializarEmail(datosSerializados.email);
        }
        if (
          Object.prototype.hasOwnProperty.call(datosSerializados, "whatsapp")
        ) {
          datosSerializados.whatsapp = serializarWhatsapp(
            datosSerializados.whatsapp
          );
        }

        set((state) => ({
          datosContacto: {
            ...state.datosContacto,
            ...datosSerializados,
          },
        }));
      },

      /**
       * Cambiar método de pago
       */
      setMetodoPago: (metodo) => {
        set({ metodoPago: metodo });
      },

      /**
       * Aplicar descuento
       */
      aplicarDescuento: (porcentaje) => {
        const { montoTotal, impuestos } = get();
        const descuento = montoTotal * (porcentaje / 100);
        const nuevoSubtotal = montoTotal - descuento;
        const nuevosImpuestos = nuevoSubtotal * 0.19;
        const nuevoTotal = nuevoSubtotal + nuevosImpuestos;

        set({
          descuentos: descuento,
          impuestos: nuevosImpuestos,
          montoFinal: nuevoTotal
        });
      },

      // ===== ACCIONES DE PAGO =====

      /**
       * Validar datos antes del pago
       */
      validarDatos: () => {
        const { datosContacto, datosReserva } = get();

        const errores = [];

        const nameError = validateName(datosContacto.nombre || "");
        const emailError = validateEmail(datosContacto.email || "");
        const whatsappError = validateWhatsapp(datosContacto.whatsapp || "");

        if (nameError) errores.push(nameError);
        if (emailError) errores.push(emailError);
        if (whatsappError) errores.push(whatsappError);

        if (!datosReserva) {
          errores.push('No hay datos de reserva válidos');
        }

        return {
          valido: errores.length === 0,
          errores
        };
      },

      /**
       * Iniciar proceso de pago
       */
      iniciarPago: async () => {
        const validacion = get().validarDatos();
        
        if (!validacion.valido) {
          set({ error: validacion.errores.join(', ') });
          return { ok: false, error: validacion.errores.join(', ') };
        }

        const transaccionInicial = {
          id: `TXN-${Date.now()}`,
          estado: "pending",
          referencia: `REF-${Date.now()}`,
          fechaCreacion: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString(),
        };

        set({
          pagoEnProceso: true,
          error: null,
          transaccion: transaccionInicial,
        });

        try {
          const {
            datosReserva,
            datosContacto,
            metodoPago,
            montoTotal,
            impuestos,
            montoFinal,
          } = get();

          const guardado = await crearReservaPendienteDesdeCheckout({
            datosReserva,
            datosContacto,
            metodoPago,
            montoTotal,
            impuestos,
            montoFinal,
            transaccion: transaccionInicial,
          });

          if (!guardado.ok) {
            throw new Error(guardado.error || "No se pudo guardar en Firebase");
          }

          // Pasarela deshabilitada por ahora: se retorna ok para mostrar success
          const reservaPersistida = {
            firestoreId: guardado.id,
            ...(guardado.data || {}),
          };

          try {
            localStorage.setItem(
              "checkout:firebase:response",
              JSON.stringify(reservaPersistida)
            );
          } catch (_) {}

          set((state) => ({
            pagoEnProceso: false,
            pagoCompletado: true,
            reservaGuardada: reservaPersistida,
            transaccion: {
              ...state.transaccion,
              estado: "pending",
              firestoreId: guardado.id,
              fechaActualizacion: new Date().toISOString(),
            },
          }));

          return {
            ok: true,
            firestoreId: guardado.id,
            data: guardado.data,
            status: "pending",
            paymentDisabled: true,
          };

        } catch (error) {
          console.error('❌ Error procesando pago:', error);
          
          set((state) => ({
            pagoEnProceso: false,
            error: error.message,
            transaccion: {
              ...state.transaccion,
              estado: 'fallida',
              fechaActualizacion: new Date().toISOString(),
            }
          }));

          return { ok: false, error: error.message };
        }
      },

      /**
       * Completar el proceso de pago
       */
      completarPago: async (exito = true) => {
        if (exito) {
          set((state) => ({
            pagoEnProceso: false,
            pagoCompletado: true,
            transaccion: {
              ...state.transaccion,
              estado: 'exitosa',
              fechaActualizacion: new Date().toISOString(),
            }
          }));

          // Aquí guardarías en Firebase la reserva confirmada
          await get().guardarReservaConfirmada();

        } else {
          set((state) => ({
            pagoEnProceso: false,
            error: 'El pago no pudo ser procesado',
            transaccion: {
              ...state.transaccion,
              estado: 'fallida',
              fechaActualizacion: new Date().toISOString(),
            }
          }));
        }
      },

      /**
       * Guardar reserva confirmada en Firebase
       */
      guardarReservaConfirmada: async () => {
        try {
          const { datosReserva, datosContacto, transaccion } = get();
          
          // Aquí iría la llamada real a Firebase
          const reservaConfirmada = {
            ...datosReserva,
            datosContacto,
            transaccion,
            estado: 'confirmada',
            fechaConfirmacion: new Date().toISOString(),
          };

          console.log('💾 Guardando reserva confirmada:', reservaConfirmada);
          
          // Limpiar datos temporales
          localStorage.removeItem('checkout:reserva:temp');
          
          return { ok: true, data: reservaConfirmada };
        } catch (error) {
          console.error('❌ Error guardando reserva:', error);
          return { ok: false, error: error.message };
        }
      },

      // ===== ACCIONES DE RESET =====
      
      /**
       * Resetear estado del checkout
       */
      resetCheckout: () => {
        set({
          isLoading: false,
          pagoEnProceso: false,
          pagoCompletado: false,
          error: null,
          datosReserva: null,
          datosContacto: {
            nombre: "",
            email: "",
            whatsapp: "",
            notas: "",
          },
          metodoPago: "tarjeta",
          montoTotal: 0,
          descuentos: 0,
          impuestos: 0,
          montoFinal: 0,
          reservaGuardada: null,
          transaccion: {
            id: null,
            estado: null,
            referencia: null,
            fechaCreacion: null,
            fechaActualizacion: null,
          },
        });

        localStorage.removeItem('checkout:reserva:temp');
        localStorage.removeItem("checkout:firebase:response");
      },

      /**
       * Limpiar errores
       */
      clearError: () => {
        set({ error: null });
      },

      obtenerReservaGuardada: () => {
        const { reservaGuardada } = get();
        if (reservaGuardada) return reservaGuardada;

        try {
          const raw = localStorage.getItem("checkout:firebase:response");
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          set({ reservaGuardada: parsed });
          return parsed;
        } catch (error) {
          console.error("❌ Error leyendo respuesta de Firebase:", error);
          return null;
        }
      },

      // ===== HELPERS DE DESARROLLO =====
      
      /**
       * Función helper para testing - simula datos de reserva
       */
      simularDatosReserva: () => {
        const datosPrueba = {
          id: `test-${Date.now()}`,
          fechaCreacion: new Date().toISOString(),
          estado: 'temporal',
          reservaData: {
            selectedDate: new Date(Date.now() + 86400000).toISOString(), // Mañana
            hour: "19",
            minute: "30", 
            adults: 2,
            children: 1,
            mascotas: 0,
            name: "Juan Pérez",
            email: "juan@ejemplo.com",
            whatsapp: "+57 123 456 7890"
          },
          platosSeleccionados: [
            {
              nombre: "Adulto 1",
              platos: [
                { nombre: "Pasta Carbonara", precio: 28000, cantidad: 1 },
                { nombre: "Vino Tinto", precio: 45000, cantidad: 1 }
              ]
            },
            {
              nombre: "Adulto 2", 
              platos: [
                { nombre: "Salmón Grillado", precio: 35000, cantidad: 1 },
                { nombre: "Cerveza", precio: 8000, cantidad: 2 }
              ]
            },
            {
              nombre: "Niño 1",
              platos: [
                { nombre: "Nuggets Pollo", precio: 15000, cantidad: 1 },
                { nombre: "Jugo Natural", precio: 6000, cantidad: 1 }
              ]
            }
          ]
        };

        localStorage.setItem('checkout:reserva:temp', JSON.stringify(datosPrueba));
        console.log('🧪 Datos de prueba guardados en localStorage');
        
        return get().cargarDatosReserva();
      },
    }),
    {
      name: "checkout:state:v1",
      version: 0,
    }
  )
);

export default useCheckoutStore;