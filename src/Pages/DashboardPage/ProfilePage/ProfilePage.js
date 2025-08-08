import React, { useState } from 'react';
import { ArrowLeft} from "lucide-react";
import logoGafis from "../../img/logo.png";
import userAvatar from "../../img/profile.png";
import { FiMenu } from "react-icons/fi";


export default function ProfilePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex-1 bg-gradient-to-b from-green-500 to-white p-4">
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowSidebar(false)}></div>
          <div className="relative z-50 w-64 h-full bg-green-700 text-white shadow-lg p-4">
            <button className="mb-4 text-white text-right w-full" onClick={() => setShowSidebar(false)}>X</button>
            <ul className="space-y-4">
              <li><a href="/dashboard" className="hover:underline">Inicio</a></li>
              <li><a href="/request" className="hover:underline">Solicitudes</a></li>
              <li><a href="/formations" className="hover:underline">Formaciones</a></li>
              <li><a href="/" className="hover:underline">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center rounded-md shadow">
        <div className="flex items-center gap-2">
          <img src={logoGafis} alt="GAFIS Logo" className="h-6" />
        </div>
        <button onClick={() => setShowSidebar(true)}>
          <FiMenu size={28} />
        </button>
      </header>

      {/* Botón regresar */}
      <div className="flex justify-end mt-4">
        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition" >
          <a href="/dashboard"> <ArrowLeft className="text-black h-5 w-5" /></a>
        </button>
      </div>

      {/* Perfil */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={userAvatar}
          alt="Perfil"
          className="w-32 h-32 rounded-full border-4 border-white shadow-md"
        />
        <span className="mt-4 bg-white text-green-600 font-bold px-6 py-2 rounded-full shadow text-center text-sm md:text-base">
          JORGE EMILIO CLARO BAYONA
        </span>
      </div>

      {/* Tarjetas de información */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Información básica */}
        <div className="bg-white shadow rounded-lg p-4 text-sm">
          <h3 className="font-bold mb-2 text-gray-800">INFORMACIÓN BÁSICA</h3>
          <p><strong>Documento:</strong><br />1095977535 de Ocaña</p>
          <p className="mt-2"><strong>Fecha de Nacimiento:</strong><br />5 de Marzo del 2004 de Ocaña</p>
          <p className="mt-2"><strong>Sexo:</strong><br />Masculino</p>
          <p className="mt-2"><strong>Dirección y Teléfono:</strong><br />Calle 12 # 11-79 Centro</p>
          <p className="mt-2"><strong>Correo Electrónico:</strong><br />jorge12354@gmail.com</p>
        </div>

        {/* Información institucional */}
        <div className="bg-white shadow rounded-lg p-4 text-sm">
          <h3 className="font-bold mb-2 text-gray-800">INFORMACIÓN INSTITUCIONAL</h3>
          <p><strong>Código:</strong><br />123541</p>
          <p className="mt-2"><strong>Fecha de ingreso:</strong><br />6 de Marzo del 2024 de Ocaña</p>
          <p className="mt-2"><strong>Antigüedad:</strong><br />7 meses</p>
        </div>
      </div>
    </div>
  );
}
