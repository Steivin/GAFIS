import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";

// Protege rutas con autenticación Firebase
//import ProtectedRoute from "./Pages/Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*               Rutas publicas           */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

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
