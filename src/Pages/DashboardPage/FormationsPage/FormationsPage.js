import React, { useState } from 'react';
import { ArrowLeft, Menu } from "lucide-react";
import logoGafis from "../../img/logo.png";

// Componente Progress personalizado
const Progress = ({ value, className }) => (
  <div className={`bg-gray-300 rounded-full ${className}`}>
    <div 
      className="bg-green-500 h-full rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

// Componente Card personalizado
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

const formaciones = [
  {
    nombre: "TECNOLOGO EN ANALISIS Y DESARROLLO DE SOFTWARE",
    ficha: "2873817",
    ambiente: "104",
    completadas: 0,
    total: 48,
  },
  {
    nombre: "TECNOLOGO EN ANALISIS Y DESARROLLO DE SOFTWARE", 
    ficha: "2845141",
    ambiente: "101",
    completadas: 0,
    total: 48,
  },
];

export default function FormationsPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFormacion, setSelectedFormacion] = useState(null);
  const [horasCompletadas, setHorasCompletadas] = useState(
    formaciones.reduce((acc, formacion, index) => {
      acc[index] = formacion.completadas;
      return acc;
    }, {})
  );
  
  const progresoTotal = Object.values(horasCompletadas).reduce((acc, horas) => acc + horas, 0);
  const totalHoras = formaciones.reduce((acc, f) => acc + f.total, 0);
  const porcentajeTotal = (progresoTotal / totalHoras) * 100;

  const confirmarAsistencia = (formacionIndex) => {
    setHorasCompletadas(prev => ({
      ...prev,
      [formacionIndex]: Math.min(prev[formacionIndex] + 1, formaciones[formacionIndex].total)
    }));
    setSelectedFormacion(null);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-green-500 to-white p-4">
      {/* Sidebar igual al de solicitudes */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowSidebar(false)}></div>
          <div className="relative z-50 w-64 h-full bg-green-700 text-white shadow-lg p-4">
            <button className="mb-4 text-white text-right w-full" onClick={() => setShowSidebar(false)}>X</button>
            <ul className="space-y-4">
              <li><a href="/dashboard" className="hover:underline">Inicio</a></li>
              <li><a href="/profile" className="hover:underline">Perfil</a></li>
              <li><a href="/" className="hover:underline">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      )}

      {/* Header igual al de solicitudes */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center rounded-md shadow">
        <div className="flex items-center gap-2">
          <img src={logoGafis} alt="GAFIS Logo" className="h-6" />
        </div>
        <button onClick={() => setShowSidebar(true)}>
          <Menu size={28} />
        </button>
      </header>

      {/* Botón de regreso */}
      <div className="flex justify-end mt-4">
        <a href="/dashboard">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <ArrowLeft className="text-black h-5 w-5" />
          </button>
        </a>
      </div>

      {/* Tarjeta con información del usuario y progreso */}
      <div className="mt-6">
        <div className="flex gap-4 mb-6">
          {/* Tarjeta del usuario */}
          <Card className="flex-1 bg-white rounded-lg">
            <CardContent className="p-4">
              <h3 className="text-green-600 font-bold text-sm">JORGE EMILIO CLARO BAYONA</h3>
            </CardContent>
          </Card>
          
          {/* Tarjeta de progreso */}
          <Card className="flex-1 bg-white rounded-lg">
            <CardContent className="p-4">
              <div className="text-green-600 text-sm mb-2">
                <span className="font-semibold">HORAS COMPLETADAS:</span> {progresoTotal} de {totalHoras}
              </div>
              <div className="flex items-center gap-2">
                <Progress value={porcentajeTotal} className="h-2 flex-1" />
                <span className="text-green-600 text-sm font-bold">{Math.round(porcentajeTotal)}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección de formaciones */}
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-green-600 font-bold text-xl mb-2">FORMACIONES ASIGNADAS</h2>
            </div>

            <div className="space-y-4">
              {formaciones.map((formacion, index) => {
                const horasActuales = horasCompletadas[index];
                const porcentaje = (horasActuales / formacion.total) * 100;
                return (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div 
                      className="flex justify-between items-start mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      onClick={() => setSelectedFormacion(index)}
                    >
                      <div className="flex-1">
                        <p className="text-green-600 font-bold text-sm mb-1">
                          {formacion.nombre}
                        </p>
                        <p className="text-green-600 text-xs">
                          FICHA {formacion.ficha}/
                        </p>
                        <p className="text-green-600 text-xs">
                          AMBIENTE DE FORMACION {formacion.ambiente}
                        </p>
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-green-600 text-xs font-semibold mb-1">
                          CUMPLIMIENTO DE HORARIO:
                        </p>
                        <div className="flex items-center gap-2 mb-1">
                          <Progress value={porcentaje} className="h-2 w-32" />
                          <span className="text-green-600 text-sm font-bold">{Math.round(porcentaje)}%</span>
                        </div>
                        <p className="text-green-600 text-xs">
                          HORAS COMPLETADAS: {horasActuales} de {formacion.total}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de confirmación de asistencia */}
      {selectedFormacion !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Confirmar Asistencia</h3>
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                <strong>Formación:</strong> {formaciones[selectedFormacion].nombre}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Ficha:</strong> {formaciones[selectedFormacion].ficha}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Ambiente:</strong> {formaciones[selectedFormacion].ambiente}
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold mb-2">
                  Horas completadas actuales:
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {horasCompletadas[selectedFormacion]} / {formaciones[selectedFormacion].total}
                </p>
                <div className="mt-2">
                  <Progress 
                    value={(horasCompletadas[selectedFormacion] / formaciones[selectedFormacion].total) * 100} 
                    className="h-3" 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => setSelectedFormacion(null)} 
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => confirmarAsistencia(selectedFormacion)}
                disabled={horasCompletadas[selectedFormacion] >= formaciones[selectedFormacion].total}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {horasCompletadas[selectedFormacion] >= formaciones[selectedFormacion].total 
                  ? "Completado" 
                  : "Confirmar Asistencia"
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}