import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import ProfilePage from "./Pages/DashboardPage/ProfilePage/ProfilePage";
import DashboardAdmin from "./Pages/DashboardAdmin/DashboardAdmin";
import RequestPage from "./Pages/DashboardPage/RequestPage/RequestPage";
import FormationsPage from "./Pages/DashboardPage/FormationsPage/FormationsPage";
import ProfilePageAdmin from "./Pages/DashboardAdmin/ProfilePageAdmin/ProfilePageAdmin";
import CrudPage from "./Pages/DashboardAdmin/CrudAdminPage/CrudAdminPage";
import AsignacionesPage from "./Pages/DashboardAdmin/AsignacionesPage/AsignacionesPage";
import { InstructorDetalle, InstructoresPage } from "./Pages/DashboardAdmin/InstructoresPage/InstructoresPage";

// ⬇️ Importa el provider del contexto global de instructores/asignaciones
import { InstructorsProvider } from "./context/InstructorsContext";

function App() {
  return (
    <BrowserRouter>
      {/* ⬇️ Envolvemos todas las rutas para compartir estado entre páginas */}
      <InstructorsProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/formations" element={<FormationsPage />} />
          <Route path="/profileAdmin" element={<ProfilePageAdmin />} />
          <Route path="/crud" element={<CrudPage />} />

          {/* Admin */}
          <Route path="/admin/asignaciones" element={<AsignacionesPage />} />
          <Route path="/admin/instructores" element={<InstructoresPage />} />
          <Route path="/admin/instructor/:id" element={<InstructorDetalle />} />
        </Routes>
      </InstructorsProvider>
    </BrowserRouter>
  );
}

export default App;
