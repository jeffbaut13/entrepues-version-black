import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { BREAKPOINTS } from "../constants/routes";

// Layout
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/admin/AdminLayout";

// Pages
import Video360Page from "../pages/Video360Page";
import NotFoundPage from "../pages/NotFoundPage";

// Admin Pages
import AdminPage from "../pages/admin/AdminPage";
import AdminReservasPage from "../pages/admin/AdminReservasPage";
import AdminConfigPage from "../pages/admin/AdminConfigPage";
import AdminStoragePage from "../pages/admin/AdminStoragePage";

// Components
import { Home } from "../components/home/Home";
import { Menu } from "../pages/Menu";
import { Checkout } from "../pages/Checkout";
import { CheckoutSucces } from "../pages/CheckoutSucces";
import { Reservar } from "../pages/Reservar";
import CheckoutLayout from "../components/layout/CheckoutLayout";
/**
 * Configuración centralizada de rutas de la aplicación
 * Define todas las rutas, sus componentes y lógica de renderizado
 */
function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Layout principal - contiene Header y Modal */}
        <Route element={<MainLayout />}>
          {/* Ruta principal - Home */}
          <Route path="/" element={<Home />} />

          {/* Ruta de descubrenos - Video 360 */}
          <Route path="/descubrenos" element={<Video360Page />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
        <Route path="/reservar" element={<Reservar />} />
        <Route element={<CheckoutLayout />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSucces />} />
          <Route path="/checkout/cancel" element={<Checkout />} />
        </Route>

        {/* Panel de Administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="reservas" element={<AdminReservasPage />} />
          <Route path="configuracion" element={<AdminConfigPage />} />
          <Route path="storage" element={<AdminStoragePage />} />
        </Route>

        {/* Ruta 404 - Cualquier ruta no encontrada (sin Layout) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
