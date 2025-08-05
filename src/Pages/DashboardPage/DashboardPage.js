import React, { useState } from 'react';
import { FaUserCircle, FaSun, FaMoon, FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Calendar from '../components/Calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 text-white p-4 rounded">
        <h1 className="text-2xl font-bold">GAFIS</h1>
        <div className="flex items-center gap-4">
          <FaUserCircle size={28} />
          <FiMenu size={28} />
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

          {/* Recordatorio del día seleccionado */}
          {selectedDate && reminders[selectedDate] && (
            <div className="bg-yellow-100 p-4 rounded-xl shadow border-l-4 border-yellow-500">
              <h3 className="text-yellow-800 font-semibold text-sm mb-1">📌 Recordatorio para {selectedDate}</h3>
              <p className="text-yellow-700 text-sm whitespace-pre-line">{reminders[selectedDate]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para recordatorio */}
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
    </div>
  );
}