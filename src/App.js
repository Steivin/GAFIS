import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import ProfilePage from "./Pages/DashboardPage/ProfilePage/ProfilePage";
import DashboardAdmin from "./Pages/DashboardAdmin/DashboardAdmin";
import RequestPage from "./Pages/DashboardPage/RequestPage/RequestPage";
import FormationsPage from "./Pages/DashboardPage/FormationsPage/FormationsPage";
import ProfilePageAdmin from "./Pages/DashboardAdmin/ProfilePageAdmin/ProfilePageAdmin";
import CrudPage from "./Pages/DashboardAdmin/CrudAdminPage/CrudAdminPage";

// Protege rutas con autenticación Firebase
//import ProtectedRoute from "./Pages/Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*               Rutas publicas           */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/formations" element={<FormationsPage />} />
        <Route path="/profileAdmin" element={<ProfilePageAdmin />} />
        <Route path="/crud" element={<CrudPage />} />

        {/*               Rutas privadas           
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <DashboardPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              {" "}
              <UsersPage />{" "}
            </ProtectedRoute>
          }
        />
        */}

        {/* Ruta genérica para páginas no encontradas 
        <Route path="*" element={<NotFoundPage />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
