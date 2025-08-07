import React, { useState } from 'react';
import { FaUserCircle, FaSun, FaMoon, FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Calendar from '../components/Calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import logo from '../img/logo.png';
import gden from '../img/gden.png';
import gobierno from '../img/gobierno.png';
import logosena from '../img/logosena.png';
import mintrabajo from '../img/mintrabajo.png';

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState(() => {
    const stored = localStorage.getItem('reminders');
    return stored ? JSON.parse(stored) : {};
  });
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');
  const currentMonthName = format(today, 'MMMM', { locale: es }).toUpperCase();

  const highlights = Object.keys(reminders).reduce((acc, date) => {
    acc[date] = <FaBell className="text-yellow-500" />;
    return acc;
  }, {});

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleDayDoubleClick = (date) => {
    setSelectedDate(date);
    setReminder(reminders[date] || '');
    setShowModal(true);
  };

  const saveReminder = () => {
    const updated = { ...reminders, [selectedDate]: reminder };
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
    setShowModal(false);
  };

  const deleteReminder = () => {
    const updated = { ...reminders };
    delete updated[selectedDate];
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
    setShowModal(false);
  };

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header + Contenido principal */}

      {/* Sidebar lateral */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowSidebar(false)}></div>
          <div className="relative z-50 w-64 h-full bg-green-700 text-white shadow-lg p-4">
            <button className="mb-4 text-white text-right w-full" onClick={() => setShowSidebar(false)}>X</button>
            <ul className="space-y-4">
              <li><a href="/dashboard" className="hover:underline">Inicio</a></li>
              <li><a href="/profile" className="hover:underline">Perfil</a></li>
              <li><a href="#" className="hover:underline">Configuración</a></li>
              <li><a href="/request" className="hover:underline">Solicitudes</a></li>
              <li><a href="/formations" className="hover:underline">Formaciones</a></li>
              <li><a href="/" className="hover:underline">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      )}

      <main className="flex-1 bg-gradient-to-b from-green-500 to-white p-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-green-600 text-white p-4 rounded">
          <img src={logo} alt="GAFIS Logo" className="h-6" />
          <div className="flex items-center gap-4">
            <button className="bg-green p-2 rounded-full shadow hover:bg-gray-100 transition" >
              <a href="/profile"> <FaUserCircle size={20} /></a>
            </button>
            <button onClick={() => setShowSidebar(true)}>
              <FiMenu size={28} />
            </button>
          </div>
        </div>

        {/* Bienvenida */}
        <div className="mt-4">
          <button className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold shadow">
            BIENVENIDO JORGE CLARO
          </button>
        </div>

        {/* Buscador */}
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/2 px-4 py-2 rounded-full shadow border border-gray-300 focus:outline-none"
          />
        </div>

        {/* Selector de mes */}
        <div className="mt-4">
          <button className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold shadow">
            {format(selectedDate ? new Date(selectedDate) : today, 'MMMM', { locale: es }).toUpperCase()}
          </button>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Calendario */}
          <div className="w-full md:w-2/3">
            <Calendar
              selectedDate={today}
              highlights={highlights}
              onDayClick={handleDayClick}
              onDayDoubleClick={handleDayDoubleClick}
            />
          </div>

          {/* Tarjetas info + Recordatorio */}
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {/* Diurna */}
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 text-green-600">
                <FaSun />
                <p className="font-semibold">FORMACIÓN DIURNA</p>
              </div>
              <p className="text-sm">ANÁLISIS Y DESARROLLO DE SOFTWARE</p>
              <p className="text-sm">N° FICHA 2873817</p>
              <p className="text-sm mt-2">AMBIENTE DE FORMACIÓN ASIGNADA</p>
              <p className="font-bold">104</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            {/* Nocturna */}
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 text-gray-700">
                <FaMoon />
                <p className="font-semibold">FORMACIÓN NOCTURNA</p>
              </div>
              <p className="text-sm">ANÁLISIS Y DESARROLLO DE SOFTWARE</p>
              <p className="text-sm">N° FICHA 2873817</p>
              <p className="text-sm mt-2">AMBIENTE DE FORMACIÓN ASIGNADA</p>
              <p className="font-bold">104</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            {/* Recordatorio del día */}
            {selectedDate && reminders[selectedDate] && (
              <div className="bg-yellow-100 p-4 rounded-xl shadow border-l-4 border-yellow-500">
                <h3 className="text-yellow-800 font-semibold text-sm mb-1">📌 Recordatorio para {selectedDate}</h3>
                <p className="text-yellow-700 text-sm whitespace-pre-line">{reminders[selectedDate]}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-green-600">Recordatorio para {selectedDate}</h2>
            <textarea
              className="w-full border border-gray-300 p-2 rounded mb-4"
              rows="4"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              placeholder="Escribe tu recordatorio..."
            ></textarea>
            <div className="flex justify-between gap-2">
              <button onClick={deleteReminder} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
                Eliminar
              </button>
              <div className="flex gap-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                  Cancelar
                </button>
                <button onClick={saveReminder} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center bg-white border-t border-green-400 px-6 py-4">
        <div className="flex justify-center items-center gap-6 flex-wrap w-full h-full md:w-auto mb-4 md:mb-0">
          <img src={gden} alt="GDEN" className="h-20 object-contain" />
          <img src={gobierno} alt="Gobierno de Colombia" className="h-5 object-contain" />
        </div>
        <div className="text-center text-xs text-gray-700 max-w-xl px-1">
          <p>
            Servicio Nacional de Aprendizaje SENA - Dirección General <br />
            Calle 57 No. 8 - 69 Bogotá D.C. (Cundinamarca), Colombia <br />
            Conmutador Nacional (57 1) 5461500 - Extensiones <br />
            Atención presencial: lunes a viernes 8:00 a.m. a 5:30 p.m. <br />
            Todos los derechos 2025 SENA –
            <a href="https://www.sena.edu.co/es-co/Paginas/politicasCondicionesUso.aspx" className="underline text-blue-600 ml-1">
              Políticas de privacidad y condiciones uso Portal Web SENA
            </a> –
            <a href="https://portal.senasofiaplus.edu.co/index.php/seguridad/politica-de-confidencialidad" className="underline text-blue-600 ml-1">
              Política de seguridad y privacidad de la información
            </a>
          </p>
        </div>
        <div className="flex justify-center items-center gap-6 flex-wrap w-full md:w-auto mt-4 md:mt-0">
          <img src={mintrabajo} alt="Mintrabajo" className="h-10 object-contain" />
          <img src={logosena} alt="SENA" className="h-10 object-contain" />
        </div>
      </footer>
    </div>
  );
}
