import { useState } from "react";
import fondologin from "../img/FondoLogin.jpg";
import gafislogo from "../img/GafisLogin.png";
import Logo from "../img/logo.png";

function LoginPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fondologin})` }}>
      <img
        src={gafislogo}
        alt="Logo"
        className="absolute top-4 left-4 w-30 h-24 max-sm:w-20 max-sm:h-16 z-20"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />

      {/* Botón desplegable */}
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="absolute top-1/2 right-0 z-20 bg-white rounded shadow-lg p-2 sm:p-3 hover:bg-gray-100 duration-700 transform -translate-y-1/2 bg-opacity-30"
        aria-expanded={showLogin}
        aria-controls="login-form"
      >
        <span className="text-lg sm:text-xl">{showLogin ? "▶" : "◀"}</span>
      </button>

      {/* Formulario de Login */}
      <div
        id="login-form"
        className={`absolute top-1/2 z-20 w-72 sm:w-80 bg-white bg-opacity-20 rounded-lg shadow-lg p-4 sm:p-6 backdrop-blur-md transform -translate-y-1/2 transition-all duration-700 ease-in-out
      ${showLogin
            ? "right-12 sm:right-[calc(2.5rem+2.5rem+0.5rem)] opacity-100"
            : "right-0 opacity-0 pointer-events-none"}
    `}
      >
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="GAFIS" className="h-12 sm:h-14" />
        </div>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">Rol</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring focus:ring-green-400">
              <option>Instructor</option>
              <option>Administrador</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
              Número de documento
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-xs sm:text-sm text-green-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition text-sm sm:text-base"
          >
            <a href="/dashboard">Ingresar</a>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
