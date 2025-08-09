import React, { useState } from "react";
import { PlusCircle, Edit, Trash2, User, Users, BookOpen, Building } from "lucide-react";
import logo from '../../img/logo.png';
import { FiMenu } from "react-icons/fi";
import { ArrowLeft} from "lucide-react";

export default function CrudAdminPage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Instructor 1", tipo: "Instructor", estado: "Activo" },
    { id: 2, nombre: "Instructor 2", tipo: "Instructor", estado: "Inactivo" },
  ]);

  const [formaciones, setFormaciones] = useState([
    { id: 1, nombre: "Formación A", tipo: "Formación", estado: "Activo" },
    { id: 2, nombre: "Formación B", tipo: "Formación", estado: "Activo" },
  ]);

  const [ambientes, setAmbientes] = useState([
    { id: 1, nombre: "Ambiente 101", tipo: "Ambiente", estado: "Activo" },
    { id:2, nombre: "Ambiente 202", tipo: "Ambiente", estado: "Inactivo" },
  ]);

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    estado: "Activo",
  });

  const tipos = ["Instructor", "Formación", "Ambiente"];

  const adminOptions = [
    {
      key: "usuarios",
      label: "Usuarios",
      icon: Users,
      description: "Gestiona instructores y usuarios del sistema",
      color: "bg-blue-500 hover:bg-blue-600",
      count: usuarios.length
    },
    {
      key: "formaciones",
      label: "Formaciones",
      icon: BookOpen,
      description: "Administra los programas de formación",
      color: "bg-green-500 hover:bg-green-600",
      count: formaciones.length
    },
    {
      key: "ambientes",
      label: "Ambientes",
      icon: Building,
      description: "Controla los espacios de aprendizaje",
      color: "bg-purple-500 hover:bg-purple-600",
      count: ambientes.length
    }
  ];

  const getCurrentData = () => {
    switch (selectedSection) {
      case "usuarios":
        return usuarios;
      case "formaciones":
        return formaciones;
      case "ambientes":
        return ambientes;
      default:
        return [];
    }
  };

  const setCurrentData = (newData) => {
    switch (selectedSection) {
      case "usuarios":
        setUsuarios(newData);
        break;
      case "formaciones":
        setFormaciones(newData);
        break;
      case "ambientes":
        setAmbientes(newData);
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.nombre.trim() || !formData.tipo.trim()) return;
    
    const currentData = getCurrentData();
    if (editingItem) {
      setCurrentData(
        currentData.map((item) =>
          item.id === editingItem.id ? { ...editingItem, ...formData } : item
        )
      );
    } else {
      setCurrentData([
        ...currentData,
        { id: Date.now(), ...formData },
      ]);
    }
    setShowModal(false);
    setEditingItem(null);
    setFormData({ nombre: "", tipo: "", estado: "Activo" });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      tipo: item.tipo,
      estado: item.estado,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCurrentData(getCurrentData().filter((item) => item.id !== id));
  };

  const handleBackToDashboard = () => {
    setSelectedSection(null);
  };

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
              <li><a href="/profile" className="hover:underline">Perfil</a></li>
              <li><a href="/formations" className="hover:underline">Formaciones</a></li>
              <li><a href="/" className="hover:underline">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      )}

      <header className="bg-green-600 text-white p-4 flex justify-between items-center rounded-md shadow">
        <div className="flex items-center gap-2">
          <img src={logo} alt="GAFIS Logo" className="h-6" />
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

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-4 lg:p-6 pt-24 min-h-screen">
        {!selectedSection ? (
          /* Dashboard - Vista principal con opciones de administración */
          <div>
            <div className="mb-8">
              
            </div>

            {/* Cards de opciones administrativas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={option.key}
                    onClick={() => setSelectedSection(option.key)}
                    className={`${option.color} text-white rounded-xl p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent size={32} />
                      <span className="text-2xl font-bold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        {option.count}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{option.label}</h3>
                    <p className="text-white text-opacity-90 text-sm">{option.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Estadísticas adicionales */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{usuarios.length}</div>
                  <div className="text-sm text-gray-600">Total Usuarios</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formaciones.length}</div>
                  <div className="text-sm text-gray-600">Total Formaciones</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{ambientes.length}</div>
                  <div className="text-sm text-gray-600">Total Ambientes</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Vista de gestión CRUD */
          <div>
            {/* Header de sección - responsive */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h1 className="text-xl sm:text-2xl font-bold capitalize">{selectedSection}</h1>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition w-full sm:w-auto"
              >
                <PlusCircle size={18} /> 
                <span className="sm:inline">Nuevo registro</span>
              </button>
            </div>

            {/* Tabla responsive */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Vista mobile - cards */}
              <div className="block sm:hidden">
                {getCurrentData().map((item) => (
                  <div key={item.id} className="border-b p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.nombre}</h3>
                        <p className="text-sm text-gray-600">{item.tipo}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.estado === "Activo" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.estado}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vista desktop - tabla */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-gray-700">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Nombre</th>
                      <th className="text-left py-3 px-4 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="py-3 px-4 text-center font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentData().map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-medium">{item.nombre}</td>
                        <td className="py-3 px-4">{item.tipo}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.estado === "Activo" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.estado}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mensaje cuando no hay datos */}
              {getCurrentData().length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No hay registros disponibles
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                {editingItem ? "Editar registro" : "Nuevo registro"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Tipo</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    {tipos.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      setFormData({ nombre: "", tipo: "", estado: "Activo" });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition order-2 sm:order-1"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition order-1 sm:order-2"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}