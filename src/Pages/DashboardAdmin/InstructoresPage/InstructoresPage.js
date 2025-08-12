import React, { useState } from "react";
import { Menu, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import logoGafis from "../../img/logo.png";

// Barra de progreso
const Progress = ({ value, className }) => (
    <div className={`bg-gray-300 rounded-full ${className}`}>
        <div
            className="bg-green-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${value}%` }}
        />
    </div>
);

// Lista de instructores (simulada)
const instructores = [
    {
        id: 1,
        nombre: "JORGE EMILIO CLARO BAYONA",
        horasCompletadas: 0,
        horasTotales: 165,
        formaciones: [
            {
                id: 1,
                titulo: "TECNOLOGO EN ANÁLISIS Y DESARROLLO DE SOFTWARE",
                ficha: "2873817",
                ambiente: "104",
            },
            {
                id: 2,
                titulo: "TECNOLOGO EN ANÁLISIS Y DESARROLLO DE SOFTWARE",
                ficha: "2845141",
                ambiente: "101",
            },
        ],
    },
    {
        id: 2,
        nombre: "MARÍA FERNANDA LÓPEZ",
        horasCompletadas: 40,
        horasTotales: 120,
        formaciones: [
            {
                id: 1,
                titulo: "FORMACIÓN EN PYTHON",
                ficha: "1234567",
                ambiente: "201",
            },
        ],
    },
];

// Página de lista de instructores
export function InstructoresPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-white p-4">
            {/* Sidebar */}
            {showSidebar && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black opacity-30"
                        onClick={() => setShowSidebar(false)}
                    ></div>
                    <div className="relative z-50 w-64 h-full bg-green-700 text-white shadow-lg p-4">
                        <button
                            className="mb-4 text-white text-right w-full"
                            onClick={() => setShowSidebar(false)}
                        >
                            X
                        </button>
                        <ul className="space-y-4">
                            <li><a href="/dashboard" className="hover:underline">Inicio</a></li>
                            <li><a href="/profile" className="hover:underline">Perfil</a></li>
                            <li><a href="/request" className="hover:underline">Solicitudes</a></li>
                            <li><a href="/" className="hover:underline">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="bg-green-600 text-white p-4 flex justify-between items-center rounded-md shadow">
                <img src={logoGafis} alt="GAFIS Logo" className="h-6" />
                <button onClick={() => setShowSidebar(true)}>
                    <Menu size={28} />
                </button>
            </header>

            {/* Lista */}
            <h1 className="text-2xl font-bold text-green-700 mt-6 mb-4">INSTRUCTORES</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {instructores.map((inst) => (
                    <div
                        key={inst.id}
                        className="flex items-center justify-between p-4 border-b hover:bg-green-50 cursor-pointer transition"
                        onClick={() => navigate(`/admin/instructor/${inst.id}`)}

                    >
                        <span className="text-green-700 font-semibold">{inst.nombre}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Página de detalle del instructor
export function InstructorDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const instructor = instructores.find((inst) => inst.id === parseInt(id));

    if (!instructor) return <p>Instructor no encontrado</p>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-400 to-white p-4">
            {/* Header */}
            <header className="bg-green-600 text-white p-4 flex justify-between items-center rounded-md shadow">
                <img src={logoGafis} alt="GAFIS Logo" className="h-6" />
                <button onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
            </header>

            {/* Info principal */}
            <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex-1 bg-white rounded-lg shadow p-4 text-center">
                    <p className="font-bold text-green-700">{instructor.nombre}</p>
                </div>
                <div className="flex-1 bg-white rounded-lg shadow p-4 text-center">
                    <p className="font-bold text-green-700">
                        HORAS COMPLETADAS: {instructor.horasCompletadas} de {instructor.horasTotales}
                    </p>
                    <Progress
                        value={(instructor.horasCompletadas / instructor.horasTotales) * 100}
                        className="h-3 mt-2"
                    />
                </div>
                <div className="flex-1 bg-white rounded-lg shadow p-4 text-center">
                    <p className="font-bold text-green-700 flex items-center justify-center gap-2">
                        HORARIO <Calendar size={20} />
                    </p>
                    <button className="mt-2 flex flex-col items-center text-red-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt="PDF" className="h-8" />
                        <span className="text-xs">EXPORTAR HORARIO</span>
                    </button>
                </div>
            </div>

            {/* Formaciones */}
            <div className="bg-white rounded-lg shadow p-4 mt-6">
                <h2 className="text-center text-green-700 font-bold mb-4">FORMACIONES ASIGNADAS</h2>
                {instructor.formaciones.map((form) => (
                    <div key={form.id} className="border-b py-2">
                        <p className="text-green-700 font-semibold">{form.titulo}</p>
                        <p className="text-green-500 text-sm">Ficha {form.ficha}</p>
                        <p className="text-green-500 text-sm">
                            Ambiente de formación {form.ambiente}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
