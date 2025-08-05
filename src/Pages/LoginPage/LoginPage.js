import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen bg-cover bg-center" >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />

      {/* Flecha desplegable */}
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="absolute top-10 right-10 z-20 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition"
      >
        <span className="text-xl">{showLogin ? '▲' : '▼'}</span>
      </button>

      {/* Formulario de Login */}
      {showLogin && (
        <div className="absolute right-10 top-20 z-20 w-80 bg-white bg-opacity-90 rounded-lg shadow-lg p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">GAFIS</h2>

          <form>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Rol</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-400">
                <option>Instructor</option>
                <option>Aprendiz</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Número de documento</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-400" />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-400" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <a href="#" className="text-sm text-green-600 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <button  type="submit"  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition">
              <a href="/dashboard">Ingresar</a>
            </button>
          </form>
        </div>
      )}

  );
}

export default App;