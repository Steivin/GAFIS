// src/Pages/DashboardAdmin/AsignacionesPage/AsignacionesPage.js
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Search, X, ArrowLeft, Menu } from "lucide-react";
import logo from "../../img/logo.png";
import { useInstructors } from "../../../context/InstructorsContext";

// ----------------------------------------------------------------------------------
// Página
// ----------------------------------------------------------------------------------
export default function AsignacionesPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [q, setQ] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null);

    // Modal de asignación directa
    const [showAssignDirect, setShowAssignDirect] = useState(false);
    const [currentInstructor, setCurrentInstructor] = useState(null);

    // ⬇️ del contexto global
    const { instructors, assignmentsByInstructor } = useInstructors();

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return instructors;
        return instructors.filter((i) => i.nombre.toLowerCase().includes(t));
    }, [q, instructors]);

    const openAssignForInstructor = (instructor) => {
        setCurrentInstructor(instructor);
        setShowAssignDirect(true);
        setMenuOpenId(null);
        setSelectedId(instructor.id);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-500 to-white">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-green-600 text-white">
                <div className="h-14 px-3 md:px-5 flex items-center justify-between">
                    <img src={logo} alt="GAFIS" className="h-6" />
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 grid place-items-center rounded-full bg-white/20 ring-1 ring-white/30">
                            <div className="h-5 w-5 rounded-full bg-white/80" />
                        </div>
                        <button
                            onClick={() => setShowSidebar(true)}
                            className="h-8 w-8 grid place-items-center rounded-md bg-white/10 hover:bg-white/20"
                            aria-label="Abrir menú"
                        >
                            <FiMenu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            {showSidebar && (
                <div className="fixed inset-0 z-40">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowSidebar(false)}
                    />
                    <div className="relative ml-auto h-full w-64 bg-green-700 text-white p-4 shadow-xl">
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="ml-auto mb-4 px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                        >
                            Cerrar
                        </button>
                        <nav className="space-y-3">
                            <Link to="/admin" className="block hover:underline">
                                Inicio
                            </Link>
                            <Link to="/profileAdmin" className="block hover:underline">
                                Perfil
                            </Link>
                            <Link to="/crud" className="block hover:underline">
                                CRUD
                            </Link>
                            <Link to="/" className="block hover:underline">
                                Cerrar sesión
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

            {/* Contenido */}
            <main className="flex-1 px-4 md:px-6 py-4">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <button className="px-6 py-2 rounded-full bg-white text-green-700 font-semibold shadow-sm ring-1 ring-black/5">
                        INSTRUCTORES
                    </button>

                    {/* Buscador */}
                    <div className="flex-1 min-w-[260px] max-w-2xl mx-auto">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-green-700 drop-shadow-sm">
                                <Search size={18} />
                            </span>
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Buscar..."
                                className="w-full pl-9 pr-10 py-2 rounded-full bg-white/90 ring-1 ring-black/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow"
                            />
                            {q && (
                                <button
                                    onClick={() => setQ("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5"
                                    aria-label="Limpiar"
                                >
                                    <X size={18} className="text-green-700" />
                                </button>
                            )}
                        </div>
                    </div>

                    <Link to="/admin" className="shrink-0">
                        <div className="h-10 w-10 grid place-items-center rounded-full bg-white ring-1 ring-black/10 shadow">
                            <ArrowLeft className="text-black" size={20} />
                        </div>
                    </Link>
                </div>

                {/* Tarjeta lista */}
                <section className="mt-6 max-w-4xl mx-auto">
                    <div className="rounded-2xl bg-white shadow ring-1 ring-black/10 overflow-hidden">
                        {list.map((item, idx) => (
                            <Row
                                key={item.id}
                                name={item.nombre}
                                selected={selectedId === item.id}
                                asignado={!!(assignmentsByInstructor[item.id]?.length)}
                                onSelect={() => openAssignForInstructor(item)}
                                onOpenMenu={() =>
                                    setMenuOpenId(menuOpenId === item.id ? null : item.id)
                                }
                                menuOpen={menuOpenId === item.id}
                                onPickFormacion={() => openAssignForInstructor(item)}
                                showTopDivider={idx > 0}
                            />
                        ))}

                        {list.length < 8 &&
                            Array.from({ length: 8 - list.length }).map((_, idx) => (
                                <EmptyRow key={`empty-${idx}`} />
                            ))}
                    </div>
                </section>
            </main>

            {/* Modal: Asignación directa */}
            {showAssignDirect && currentInstructor && (
                <AssignDirectModal
                    instructor={currentInstructor}
                    onClose={() => setShowAssignDirect(false)}
                />
            )}
        </div>
    );
}

// ----------------------------------------------------------------------------------
// Fila de lista
// ----------------------------------------------------------------------------------
function Row({
    name,
    selected,
    asignado,
    onSelect,
    onOpenMenu,
    menuOpen,
    onPickFormacion,
    showTopDivider = true,
}) {
    return (
        <div
            className={`relative h-12 flex items-center justify-between ${showTopDivider ? "border-t border-gray-200" : ""
                }`}
        >
            {/* Izquierda */}
            <button
                onClick={onSelect}
                className="flex items-center gap-3 pl-4 pr-2 w-full text-left"
            >
                <span
                    className={`h-6 w-6 rounded-full border-2 grid place-items-center ${asignado ? "border-green-600" : "border-gray-300"
                        }`}
                >
                    {(selected || asignado) && (
                        <span className="h-3 w-3 rounded-full bg-green-600" />
                    )}
                </span>
                <span className="font-semibold text-green-700 uppercase tracking-wide text-sm">
                    {name}
                </span>
            </button>

            {/* Menú por fila */}
            <div className="pr-4 relative">
                <button
                    onClick={onOpenMenu}
                    className="p-1 rounded hover:bg-black/5"
                    aria-label="Menú de acciones"
                >
                    <Menu className="text-green-600" size={18} />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                            onClick={onPickFormacion}
                            className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-gray-50"
                        >
                            Asignar…
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyRow() {
    return <div className="h-12 border-t border-gray-200" />;
}

// ----------------------------------------------------------------------------------
// Modal de Asignación Directa + tarjeta resumen (usa contexto global)
// ----------------------------------------------------------------------------------
function AssignDirectModal({ instructor, onClose }) {
    const { addAssignment, removeAllAssignments, catalogs } = useInstructors();

    const formaciones = catalogs.formaciones;
    const ambientes = catalogs.ambientes;

    // Estado del formulario
    const [searchF, setSearchF] = useState("");
    const [searchA, setSearchA] = useState("");

    const [formationId, setFormationId] = useState(null);
    const [jornada, setJornada] = useState("mañana");
    const [ambienteId, setAmbienteId] = useState(null);
    const [nota, setNota] = useState("");

    const filteredF = useMemo(() => {
        const t = searchF.trim().toLowerCase();
        if (!t) return formaciones;
        return formaciones.filter(
            (f) =>
                f.nombre.toLowerCase().includes(t) ||
                f.etiqueta.toLowerCase().includes(t)
        );
    }, [searchF, formaciones]);

    const filteredA = useMemo(() => {
        const t = searchA.trim().toLowerCase();
        if (!t) return ambientes;
        return ambientes.filter((a) => a.nombre.toLowerCase().includes(t));
    }, [searchA, ambientes]);

    const selectedF = formaciones.find((f) => f.id === formationId);
    const selectedA = ambientes.find((a) => a.id === ambienteId);

    const disabledAssign = !formationId || !ambienteId || !jornada;

    const handleAssign = () => {
        // Guardamos la asignación enriquecida (para que Instructores la muestre igual)
        addAssignment(instructor.id, {
            formationId,
            formationNombre: selectedF?.nombre ?? "",
            formationFicha: selectedF?.etiqueta ?? "",
            ambienteId,
            ambienteNombre: selectedA?.nombre ?? "",
            jornada,
            nota,
        });
        onClose();
    };

    const handleDeleteAll = () => {
        removeAllAssignments(instructor.id); // 🔥 limpia y apaga el círculo verde
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/10">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-green-700 font-extrabold tracking-wide text-lg md:text-xl">
                        {instructor?.nombre}
                    </h2>
                    <button
                        onClick={onClose}
                        className="h-9 w-9 grid place-items-center rounded-full bg-gray-100 hover:bg-gray-200"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>

                {/* Body (scrollable) */}
                <div className="p-4 max-h-[78vh] overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Columna izquierda: Selectores */}
                        <div className="space-y-4">
                            {/* Formación */}
                            <section className="rounded-xl ring-1 ring-slate-200 overflow-hidden">
                                <div className="px-4 py-3 bg-gray-100 flex items-center justify-between">
                                    <h3 className="text-green-700 font-semibold tracking-wide">
                                        ELIGA LA FORMACIÓN
                                    </h3>
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700">
                                            <Search size={16} />
                                        </span>
                                        <input
                                            value={searchF}
                                            onChange={(e) => setSearchF(e.target.value)}
                                            placeholder="Buscar formación…"
                                            className="w-full pl-8 pr-3 py-2 rounded bg-white ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div className="rounded bg-white ring-1 ring-gray-300 max-h-48 overflow-y-auto">
                                        {filteredF.map((f) => (
                                            <button
                                                key={f.id}
                                                onClick={() => setFormationId(f.id)}
                                                className={`w-full text-left px-3 py-2 border-b last:border-b-0 ${formationId === f.id ? "bg-green-50" : "bg-white"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="font-semibold text-gray-800">
                                                        {f.nombre}
                                                    </span>
                                                    <span className="text-xs font-semibold text-green-700 bg-green-50 ring-1 ring-green-200 px-2 py-0.5 rounded">
                                                        {f.etiqueta}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                        {filteredF.length === 0 && (
                                            <div className="px-3 py-4 text-sm text-gray-500">
                                                Sin resultados
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Ambiente */}
                            <section className="rounded-xl ring-1 ring-slate-200 overflow-hidden">
                                <div className="px-4 py-3 bg-gray-100 flex items-center justify-between">
                                    <h3 className="text-green-700 font-semibold tracking-wide">
                                        ELIGA EL AMBIENTE DE FORMACIÓN
                                    </h3>
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700">
                                            <Search size={16} />
                                        </span>
                                        <input
                                            value={searchA}
                                            onChange={(e) => setSearchA(e.target.value)}
                                            placeholder="Buscar ambiente…"
                                            className="w-full pl-8 pr-3 py-2 rounded bg-white ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div className="rounded bg-white ring-1 ring-gray-300 max-h-40 overflow-y-auto">
                                        {filteredA.map((a) => (
                                            <button
                                                key={a.id}
                                                onClick={() => setAmbienteId(a.id)}
                                                className={`w-full text-left px-3 py-2 border-b last:border-b-0 ${ambienteId === a.id ? "bg-green-50" : "bg-white"
                                                    }`}
                                            >
                                                <span className="font-semibold text-gray-800">
                                                    {a.nombre}
                                                </span>
                                            </button>
                                        ))}
                                        {filteredA.length === 0 && (
                                            <div className="px-3 py-4 text-sm text-gray-500">
                                                Sin resultados
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Jornada */}
                            <section className="rounded-xl ring-1 ring-slate-200 overflow-hidden">
                                <div className="px-4 py-3 bg-gray-100">
                                    <h3 className="text-green-700 font-semibold tracking-wide">
                                        ELIJA JORNADA
                                    </h3>
                                </div>
                                <div className="p-4 grid grid-cols-3 gap-3 max-w-lg">
                                    {[
                                        ["mañana", "MAÑANA"],
                                        ["tarde", "TARDE"],
                                        ["noche", "NOCHE"],
                                    ].map(([key, label]) => (
                                        <label
                                            key={key}
                                            className="flex items-center gap-3 cursor-pointer select-none"
                                        >
                                            <span
                                                onClick={() => setJornada(key)}
                                                className={`h-6 w-6 rounded-full border-2 grid place-items-center ${jornada === key ? "border-green-600" : "border-gray-300"
                                                    }`}
                                            >
                                                {jornada === key && (
                                                    <span className="h-3 w-3 rounded-full bg-green-600" />
                                                )}
                                            </span>
                                            <span className="text-green-700 font-semibold">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Columna derecha: Tarjeta resumen */}
                        <div className="rounded-xl ring-1 ring-slate-200 p-4">
                            <div className="text-xs text-slate-600 space-y-1">
                                <div>🌞 🌙</div>
                                <div>
                                    FORMACIÓN: <strong>{selectedF?.nombre ?? "—"}</strong>
                                </div>
                                <div>
                                    FICHA: <strong>{selectedF?.etiqueta ?? "—"}</strong>
                                </div>
                                <div>
                                    AMBIENTE: <strong>{selectedA?.nombre ?? "—"}</strong>
                                </div>
                                <div>
                                    JORNADA: <strong>{jornada || "—"}</strong>
                                </div>

                                <div className="mt-3 font-semibold">
                                    AMBIENTE DE FORMACIÓN ASIGNADA
                                </div>
                                <div className="mt-2 h-2 w-full rounded-full bg-green-100 ring-1 ring-green-200">
                                    <div className="h-2 rounded-full bg-green-600 w-[0%]" />
                                </div>
                            </div>

                            <textarea
                                value={nota}
                                onChange={(e) => setNota(e.target.value)}
                                placeholder="Observaciones…"
                                className="mt-3 w-full min-h-[120px] border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            disabled={disabledAssign}
                            onClick={handleAssign}
                            className={`px-6 py-3 rounded-lg font-semibold ${disabledAssign
                                    ? "bg-green-300 cursor-not-allowed text-white"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                        >
                            ASIGNAR
                        </button>

                        <button
                            onClick={handleDeleteAll}
                            className="px-6 py-3 rounded-lg font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800"
                        >
                            ELIMINAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
