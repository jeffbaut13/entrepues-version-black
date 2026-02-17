# Documentación del Sistema de Checkout

## 📋 Descripción General

El sistema de checkout es una solución completa para procesar reservas de restaurante con integración a pasarelas de pago. Utiliza un flujo minimalista one-page con datos temporales en localStorage hasta confirmar el pago.

## 🏗️ Arquitectura

### Store (Zustand)
- **checkoutStore.js**: Maneja todo el estado del checkout y flujo de pago
- **reservaStore.js**: Maneja datos temporales de la reserva

### Componentes Principales
- **Checkout.jsx**: Página principal one-page minimalista  
- **PlatosSeleccion.jsx**: Selección de platos → guarda en localStorage
- **Rutas**: `/checkout`, `/checkout/success`, `/checkout/cancel`

## 💾 Flujo de Datos

### 1. Selección de Platos
```javascript
// En PlatosSeleccion.jsx
const resultado = prepararDatosCheckout(platosSeleccionados);
localStorage.setItem('checkout:reserva:temp', JSON.stringify(checkoutData));
navigate("/checkout");
```

### 2. Checkout Principal
```javascript
// En Checkout.jsx
const resultado = cargarDatosReserva(); // Lee localStorage
// Formulario de contacto + método de pago
// Botón único de pagar
```

### 3. Procesamiento de Pago
```javascript
// En checkoutStore.js
const payloadPago = {
  amount: Math.round(montoFinal * 100), // En centavos
  currency: 'COP',
  customer: { name, email, phone },
  order: { reference, items },
  payment_method: metodoPago,
  return_url: '/checkout/success',
  cancel_url: '/checkout/cancel'
};
```

## 🎯 Estados del Checkout

### Estados Principales
- **Cargando datos**: Lee localStorage al entrar
- **Formulario activo**: Usuario completa datos de contacto  
- **Procesando pago**: Llamada a pasarela de pago
- **Pago exitoso**: Redirige a `/checkout/success`
- **Pago cancelado**: Redirige a `/checkout/cancel`

### Estados de Error
- **Sin datos**: Redirige a home si no hay reserva temporal
- **Validación**: Muestra errores de campos obligatorios
- **Pago fallido**: Permite reintentar

## 🌐 Integración con Pasarelas

### Datos Preparados para Pasarelas
```javascript
const payloadPago = {
  // Requerido por la mayoría de pasarelas
  amount: 1500000,           // En centavos (COP)
  currency: 'COP',
  description: 'Reserva restaurante - 2026-02-17',
  
  // Datos del cliente
  customer: {
    name: 'Juan Pérez',
    email: 'juan@email.com', 
    phone: '+57 123 456 7890'
  },
  
  // Datos de la orden
  order: {
    reference: 'REF-1708156800000',
    items: [...platosSeleccionados]
  },
  
  // Método y URLs
  payment_method: 'tarjeta',  // 'tarjeta', 'pse', 'nequi'
  return_url: 'https://mi-app.com/checkout/success',
  cancel_url: 'https://mi-app.com/checkout/cancel',
  notification_url: 'https://mi-app.com/api/webhook'
};
```

### Pasarelas Compatibles
- **Payments Mercado Pago** ✅
- **PayU Latam** ✅  
- **ePayco** ✅
- **Wompi** ✅
- **Pagadito** ✅

## 🔧 Configuración

### Variables de Entorno (Recomendadas)
```bash
VITE_PAYMENT_GATEWAY_URL=https://api.pagadito.com
VITE_PAYMENT_PUBLIC_KEY=pk_test_123456
VITE_PAYMENT_WEBHOOK_SECRET=whsec_123456
VITE_APP_URL=https://mi-app.com
```

### Store Configuration
```javascript
// En checkoutStore.js - Función iniciarPago()
const API_ENDPOINT = import.meta.env.VITE_PAYMENT_GATEWAY_URL;
const PUBLIC_KEY = import.meta.env.VITE_PAYMENT_PUBLIC_KEY;
```

## 🚀 Uso del Sistema

### 1. Flujo Normal
1. Usuario selecciona platos → `PlatosSeleccion.jsx`
2. Se guardan datos temporales → `localStorage + Zustand`  
3. Redirige a checkout → `/checkout`
4. Usuario completa formulario → contacto + método de pago
5. Click "Pagar" → envío a pasarela
6. Pago exitoso → `/checkout/success` + guardado en Firebase
7. Limpieza → `localStorage.removeItem()`

### 2. Casos Edge
- **Sin datos**: Redirige a home automáticamente
- **Pago cancelado**: Mantiene datos, permite reintentar
- **Error de red**: Muestra mensaje, permite reintentar  
- **Navegador cerrado**: Datos persisten en localStorage

## 📊 Datos Guardados

### localStorage Key: `checkout:reserva:temp`
```javascript
{
  id: "temp-1708156800000",
  fechaCreacion: "2026-02-17T10:00:00.000Z", 
  estado: "temporal",
  reservaData: {
    selectedDate: "2026-02-20T00:00:00.000Z",
    hour: "20", 
    minute: "30",
    adults: 2,
    children: 0,
    name: "", email: "", whatsapp: ""
  },
  platosSeleccionados: [
    {
      nombre: "Adulto 1",
      platos: [
        { nombre: "Pasta", precio: 25000, cantidad: 1 },
        { nombre: "Vino", precio: 35000, cantidad: 1 }
      ]
    }
  ]
}
```

## 🔒 Seguridad

### Medidas Implementadas
- **Validación client-side**: Campos obligatorios y formatos
- **Datos temporales**: No se almacena info sensible
- **URLs de retorno**: Verificación de origen  
- **Limpieza automática**: localStorage se limpia post-pago
- **Referencias únicas**: Previene duplicados

### Recomendaciones Adicionales
- Implementar validación server-side
- Usar HTTPS en producción  
- Configurar webhooks para confirmación
- Logs de transacciones para auditoría
- Rate limiting en endpoints de pago

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Grid Layout**: 2 columnas en desktop, stack en mobile
- **Animaciones**: Framer Motion para UX fluida
- **Estados visuales**: Loading, success, error claramente diferenciados

## 🛠️ Próximas Mejoras

- [ ] Integración real con pasarela específica  
- [ ] Webhooks para confirmación automática
- [ ] Historial de transacciones
- [ ] Modo offline con sincronización
- [ ] Tests unitarios del store
- [ ] Métricas de conversión