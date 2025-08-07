import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import ProfilePage from "./Pages/DashboardPage/ProfilePage/ProfilePage";
import DashboardAdmin from "./Pages/DashboardAdmin/DashboardAdmin"

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
        <Route path="/Admin" element={<DashboardAdmin />} />

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
