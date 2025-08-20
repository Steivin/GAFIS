// src/Pages/DashboardAdmin/InstructoresPage/InstructoresPage.js
import React, { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    Menu,
    Calendar,
    ArrowLeft,
    ChevronRight,
    FileDown,
} from "lucide-react";
import logoGafis from "../../img/logo.png";
import { useInstructors } from "../../../context/InstructorsContext";

/* ----------------------------- Barra Progreso ----------------------------- */
const Progress = ({ value, className = "" }) => {
    const clamped = Math.max(0, Math.min(100, value ?? 0));
    return (
        <div className={`h-3 w-full rounded-full bg-gray-200 ${className}`}>
            <div
                className="h-3 rounded-full bg-green-600 transition-[width] duration-300"
                style={{ width: `${clamped}%` }}
            />
        </div>
    );
};

/* =============================== LISTA PAGE =============================== */
export function InstructoresPage() {
    const { instructors, assignmentsByInstructor } = useInstructors();
    const navigate = useNavigate();

    const data = useMemo(
        () =>
            instructors.map((i) => ({
                ...i,
                asignaciones: assignmentsByInstructor[i.id]?.length || 0,
            })),
        [instructors, assignmentsByInstructor]
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-500 to-white">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-green-600 text-white">
                <div className="h-14 px-4 md:px-6 flex items-center justify-between">
                    <img src={logoGafis} alt="GAFIS" className="h-6" />
                    <div className="flex items-center gap-2">
                        {/* Flecha atrás (a Admin) */}
                        <button
                            onClick={() => navigate(-1)}
                            className="h-8 w-8 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition"
                            aria-label="Volver"
                            title="Volver"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            onClick={() => navigate("/admin")}
                            className="hidden md:grid h-8 px-3 place-items-center rounded-full bg-white/15 hover:bg-white/25 text-sm"
                            title="Inicio admin"
                        >
                            Admin
                        </button>
                        <button
                            className="h-8 w-8 grid place-items-center rounded-md bg-white/15 hover:bg-white/25"
                            title="Menú"
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Título */}
            <div className="px-4 md:px-6 pt-5">
                <h1 className="text-white/95 font-bold text-2xl tracking-wide drop-shadow-sm">
                    INSTRUCTORES
                </h1>
            </div>

            {/* Lista */}
            <main className="px-4 md:px-6 py-4">
                <div className="max-w-5xl mx-auto rounded-2xl bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/10 overflow-hidden">
                    {data.map((inst, idx) => (
                        <button
                            key={inst.id}
                            onClick={() => navigate(`/admin/instructor/${inst.id}`)}
                            className={`w-full flex items-center justify-between gap-3 px-4 md:px-5 py-4 hover:bg-green-50 transition ${idx > 0 ? "border-t border-gray-200/70" : ""
                                }`}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-green-100 ring-1 ring-green-300 grid place-items-center shrink-0">
                                    <span className="text-green-700 font-semibold">
                                        {inst.nombre?.[0] ?? "I"}
                                    </span>
                                </div>
                                <span className="text-green-700 font-semibold truncate">
                                    {inst.nombre}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 ring-1 ring-green-200">
                                    {inst.asignaciones} asignación(es)
                                </span>
                                <ChevronRight className="text-green-600" size={18} />
                            </div>
                        </button>
                    ))}

                    {data.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No hay instructores disponibles.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

/* ============================== DETALLE PAGE ============================== */
export function InstructorDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { instructors, assignmentsByInstructor } = useInstructors();

    const instructor = instructors.find((i) => String(i.id) === String(id));
    const asignaciones = assignmentsByInstructor[instructor?.id] || [];

    // Demo: 2h por asignación para mostrar progreso
    const horasTotales = 165;
    const horasCompletadas = Math.min(asignaciones.length * 2, horasTotales);
    const progreso = (horasCompletadas / horasTotales) * 100;

    if (!instructor) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-500 to-white p-6 text-white">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition"
                    >
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <p className="mt-6 text-lg">Instructor no encontrado.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-500 to-white">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-green-600 text-white">
                <div className="h-14 px-4 md:px-6 flex items-center justify-between">
                    <img src={logoGafis} alt="GAFIS" className="h-6" />
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="h-8 w-8 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition"
                            aria-label="Volver"
                            title="Volver"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Top cards */}
            <section className="px-4 md:px-6 pt-5">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Nombre */}
                    <div className="rounded-2xl bg-white shadow ring-1 ring-black/10 p-4">
                        <p className="text-green-700 font-bold text-center">
                            {instructor.nombre}
                        </p>
                    </div>

                    {/* Progreso */}
                    <div className="rounded-2xl bg-white shadow ring-1 ring-black/10 p-4">
                        <p className="text-green-700 font-bold text-center">
                            HORAS COMPLETADAS: {horasCompletadas} de {horasTotales}
                        </p>
                        <div className="mt-2">
                            <Progress value={progreso} />
                        </div>
                    </div>

                    {/* Horario / export */}
                    <div className="rounded-2xl bg-white shadow ring-1 ring-black/10 p-4">
                        <p className="text-green-700 font-bold flex items-center justify-center gap-2">
                            HORARIO <Calendar size={18} />
                        </p>
                        <button
                            className="mt-3 mx-auto flex items-center gap-2 px-3 py-1.5 rounded-md text-red-600 ring-1 ring-red-200 hover:bg-red-50"
                            title="Exportar horario (PDF)"
                        >
                            <FileDown size={16} />
                            <span className="text-xs font-semibold">EXPORTAR HORARIO</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Formaciones asignadas */}
            <section className="px-4 md:px-6 py-6">
                <div className="max-w-6xl mx-auto rounded-2xl bg-white shadow ring-1 ring-black/10">
                    <h2 className="text-center text-green-700 font-bold py-4 border-b border-gray-200">
                        FORMACIONES ASIGNADAS
                    </h2>

                    {asignaciones.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Aún no hay formaciones asignadas para este instructor.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {asignaciones.map((a, idx) => (
                                <li key={idx} className="p-4">
                                    <p className="text-green-700 font-semibold">
                                        {a.formationNombre || "Formación"}
                                    </p>
                                    <p className="text-green-600 text-sm">
                                        Ficha {a.formationFicha || "—"}
                                    </p>
                                    <p className="text-green-600 text-sm">
                                        Ambiente de formación {a.ambienteNombre || "—"}
                                    </p>
                                    <p className="text-green-600 text-sm">
                                        Jornada: {a.jornada ? a.jornada[0].toUpperCase() + a.jornada.slice(1) : "—"}
                                    </p>
                                    {a.nota && (
                                        <p className="mt-1 text-gray-500 text-sm">Nota: {a.nota}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>

            {/* Enlace a asignaciones por si quieres seguir editando */}
            <div className="px-4 md:px-6 pb-10">
                <div className="max-w-6xl mx-auto flex justify-end">
                    <Link
                        to="/admin/asignaciones"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow"
                    >
                        Ir a Asignaciones
                        <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InstructoresPage;
