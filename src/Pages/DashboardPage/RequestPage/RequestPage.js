import React, { useState } from 'react';
import { ArrowLeft, FileText, PlusCircle } from "lucide-react";
import logoGafis from "../../img/logo.png";
import { FiMenu } from "react-icons/fi";

export default function RequestPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: ''
  });

  const mockHistory = [
    { id: 1, title: "Solicitud de materiales", status: "Pendiente" },
    { id: 2, title: "Revisión de aula", status: "Confirmado" },
    { id: 3, title: "Cambio de horario", status: "Cancelado" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "text-yellow-700 bg-yellow-100 border-yellow-400";
      case "Confirmado":
        return "text-green-700 bg-green-100 border-green-400";
      case "Cancelado":
        return "text-red-700 bg-red-100 border-red-400";
      default:
        return "text-gray-700 bg-gray-100 border-gray-400";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud enviada:", formData);
    setShowCreateModal(false);
    setFormData({ titulo: '', descripcion: '', fecha: '' });
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-green-500 to-white p-4">
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowSidebar(false)}></div>
          <div className="relative z-50 w-64 h-full bg-green-700 text-white shadow-lg p-4">
            <button className="mb-4 text-white text-right w-full" onClick={() => setShowSidebar(false)}>X</button>
            <ul className="space-y-4">
              <li><a href="/dashboard" className="hover:underline">Inicio</a></li>
              <li><a href="/profile" className="hover:underline">Perfil</a></li>
              <li><a href="/formations" className="hover:underline">Formaciones</a></li>
              <li><a href="/" className="hover:underline">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      )}

      <header className="bg-green-600 text-white p-4 flex justify-between items-center rounded-md shadow">
        <div className="flex items-center gap-2">
          <img src={logoGafis} alt="GAFIS Logo" className="h-6" />
        </div>
        <button onClick={() => setShowSidebar(true)}>
          <FiMenu size={28} />
        </button>
      </header>

      <div className="flex justify-end mt-4">
        <a href="/dashboard">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <ArrowLeft className="text-black h-5 w-5" />
          </button>
        </a>
      </div>

      <div className="text-center mt-6">
        <h2 className="text-green-800 font-bold text-xl md:text-2xl">Solicitudes</h2>
        <p className="text-gray-600 mt-1">Consulta o crea nuevas solicitudes institucionales</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-sm hover:shadow-md transition">
          <PlusCircle className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-bold text-gray-800 mb-1">Nueva Solicitud</h3>
          <p className="text-center text-gray-600">Crea una nueva solicitud para el área administrativa.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-3 bg-green-500 text-white px-4 py-1 rounded-full text-sm hover:bg-green-600 transition">
            Crear
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-sm hover:shadow-md transition">
          <FileText className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-bold text-gray-800 mb-1">Historial</h3>
          <p className="text-center text-gray-600">Consulta el estado de tus solicitudes previas.</p>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="mt-3 bg-green-500 text-white px-4 py-1 rounded-full text-sm hover:bg-green-600 transition">
            Ver historial
          </button>
        </div>
      </div>

      {/* Modal para nueva solicitud */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Crear nueva solicitud</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Título</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Descripción</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" required></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Fecha</label>
                <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Historial desplegable */}
      {showHistory && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h4 className="text-lg font-semibold text-green-700 mb-3">Historial de Solicitudes</h4>
          <ul className="space-y-3">
            {mockHistory.map(item => (
              <li key={item.id} className="p-3 rounded flex justify-between items-center shadow-sm border border-gray-200">
                <span className="font-medium text-gray-800">{item.title}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
