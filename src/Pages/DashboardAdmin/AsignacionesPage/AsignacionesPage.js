// src/Pages/DashboardAdmin/AsignacionesPage/AsignacionesPage.js
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Search, X, ArrowLeft, Menu, ChevronDown } from "lucide-react"; // <- unificado
import logo from "../../img/logo.png";
import Calendar from "../../components/Calendar"; // tu calendario

export default function AsignacionesPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [q, setQ] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null);

    // Panel de asignación (después del calendario)
    const [showAssignPanel, setShowAssignPanel] = useState(false);
    const [selectedDayKey, setSelectedDayKey] = useState(null); // 'yyyy-MM-dd'

    // Picker de formaciones
    const [showPicker, setShowPicker] = useState(false);
    const [pickerTarget, setPickerTarget] = useState(null);
    const [selectedFormation, setSelectedFormation] = useState(null);

    // Calendario (usando tu Calendar.js)
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [highlights] = useState({ /* '2025-09-05': '🌞' */ });

    // Demo data
    const instructores = [
        { id: 1, nombre: "JORGE EMILIO CLARO BAYONA" },
        { id: 2, nombre: "ANA MARÍA RUIZ" },
        { id: 3, nombre: "LUIS PÉREZ" },
        { id: 4, nombre: "MARCELA GÓMEZ" },
    ];

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return instructores;
        return instructores.filter((i) => i.nombre.toLowerCase().includes(t));
    }, [q, instructores]);

    const openPicker = (instructorId) => {
        setPickerTarget(instructorId);
        setShowPicker(true);
        setMenuOpenId(null);
    };

    const handleChooseFormation = (formation) => {
        setSelectedFormation(formation); // guardamos la formación elegida
        setShowPicker(false);            // cerramos el picker
        setShowCalendar(true);           // mostramos el calendario
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
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowSidebar(false)} />
                    <div className="relative ml-auto h-full w-64 bg-green-700 text-white p-4 shadow-xl">
                        <button onClick={() => setShowSidebar(false)} className="ml-auto mb-4 px-3 py-1 rounded bg-white/10 hover:bg-white/20">
                            Cerrar
                        </button>
                        <nav className="space-y-3">
                            <Link to="/admin" className="block hover:underline">Inicio</Link>
                            <Link to="/profileAdmin" className="block hover:underline">Perfil</Link>
                            <Link to="/crud" className="block hover:underline">CRUD</Link>
                            <Link to="/" className="block hover:underline">Cerrar sesión</Link>
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
                                onSelect={() => setSelectedId(item.id)}
                                onOpenMenu={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}
                                menuOpen={menuOpenId === item.id}
                                onPickFormacion={() => openPicker(item.id)}
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

            {/* Picker de Formaciones */}
            {showPicker && (
                <FormacionesPicker
                    onClose={() => setShowPicker(false)}
                    onPick={(formation) => handleChooseFormation(formation)} // abre el calendario
                />
            )}

            {/* Modal Calendario (TU componente) */}
            {showCalendar && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-5 py-2 rounded-full bg-green-600 text-white font-semibold shadow-sm">
                                CALENDARIO
                            </span>
                            <button
                                onClick={() => setShowCalendar(false)}
                                className="h-9 w-9 grid place-items-center rounded-full bg-gray-100 hover:bg-gray-200"
                                aria-label="Cerrar"
                            >
                                ✕
                            </button>
                        </div>

                        <Calendar
                            selectedDate={selectedDate}
                            highlights={highlights}
                            onDayClick={(dateKey) => {
                                setSelectedDate(new Date(dateKey));
                                setSelectedDayKey(dateKey); // Guarda la fecha como string
                                setShowCalendar(false);     // Cierra calendario
                                setShowAssignPanel(true);   // Abre el panel de asignación
                            }}
                            onDayDoubleClick={(dateKey) => {
                                setSelectedDate(new Date(dateKey));
                                setShowCalendar(false);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Panel de asignación */}
            {showAssignPanel && (
                <AssignPanel
                    dateKey={selectedDayKey}
                    onClose={() => setShowAssignPanel(false)}
                    onAssign={(payload) => {
                        // Aquí haces tu POST/PUT a la API
                        console.log("Asignar:", {
                            instructorId: pickerTarget,
                            formacion: selectedFormation,
                            ...payload, // { dias, jornada, nota }
                        });
                        setShowAssignPanel(false);
                    }}
                    onDelete={() => {
                        // Lógica de eliminar (si aplica)
                        console.log("Eliminar asignación del día", selectedDayKey);
                        setShowAssignPanel(false);
                    }}
                />
            )}
        </div>
    );
}

/* ---- Fila con menú ---- */
function Row({ name, selected, onSelect, onOpenMenu, menuOpen, onPickFormacion, showTopDivider = true }) {
    return (
        <div className={`relative h-12 flex items-center justify-between ${showTopDivider ? "border-t border-gray-200" : ""}`}>
            {/* Izquierda */}
            <button onClick={onSelect} className="flex items-center gap-3 pl-4 pr-2 w-full text-left">
                <span className="h-6 w-6 rounded-full border-2 border-gray-300 grid place-items-center">
                    {selected && <span className="h-3 w-3 rounded-full bg-green-600" />}
                </span>
                <span className="font-semibold text-green-700 uppercase tracking-wide text-sm">
                    {name}
                </span>
            </button>

            {/* Menú por fila */}
            <div className="pr-4 relative">
                <button onClick={onOpenMenu} className="p-1 rounded hover:bg-black/5" aria-label="Menú de acciones">
                    <Menu className="text-green-600" size={18} />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                            onClick={onPickFormacion}
                            className="block w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-gray-50"
                        >
                            Elegir formación…
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

/* ===========================================================
   MODAL: Selector de Formaciones
   =========================================================== */
function FormacionesPicker({ onClose, onPick }) {
    const [q, setQ] = useState("");

    const formaciones = [
        { id: 101, nombre: "Tecnólogo en Análisis y Desarrollo de Software 2873817", etiqueta: "PROGRAMACIÓN" },
        { id: 102, nombre: "Gestión de Proyectos TI", etiqueta: "PROGRAMACIÓN" },
        { id: 103, nombre: "Diseño UX/UI", etiqueta: "PROGRAMACIÓN" },
        { id: 104, nombre: "Redes y Telecomunicaciones", etiqueta: "PROGRAMACIÓN" },
    ];

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return formaciones;
        return formaciones.filter((f) => f.nombre.toLowerCase().includes(t) || f.etiqueta.toLowerCase().includes(t));
    }, [q]);

    const [selectedId, setSelectedId] = useState(formaciones[0]?.id ?? null);

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4">
            <div className="mt-6 w-full max-w-4xl rounded-2xl bg-gradient-to-b from-green-600 to-green-200/30 shadow-xl ring-1 ring-black/10">
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                    <span className="px-5 py-2 rounded-full bg-white text-green-700 font-semibold shadow-sm ring-1 ring-black/5">
                        FORMACIONES
                    </span>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 grid place-items-center rounded-full bg-white ring-1 ring-black/10 shadow"
                        aria-label="Cerrar"
                    >
                        <X className="text-black" size={20} />
                    </button>
                </div>

                {/* Buscador */}
                <div className="px-4">
                    <div className="relative max-w-2xl mx-auto">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700">
                            <Search size={18} />
                        </span>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Buscar..."
                            className="w-full pl-9 pr-10 py-2 rounded-full bg-white/85 ring-1 ring-black/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow"
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

                {/* Lista */}
                <div className="p-4">
                    <div className="rounded-2xl bg-white shadow ring-1 ring-black/10 overflow-hidden">
                        {list.map((f, idx) => (
                            <div key={f.id} className={`h-12 flex items-center justify-between ${idx > 0 ? "border-t border-gray-200" : ""}`}>
                                <button
                                    onClick={() => setSelectedId(f.id)}
                                    className="flex items-center gap-3 pl-4 pr-2 w-full text-left"
                                >
                                    <span className="h-6 w-6 rounded-full border-2 border-gray-300 grid place-items-center">
                                        {selectedId === f.id && <span className="h-3 w-3 rounded-full bg-green-600" />}
                                    </span>
                                    <span className="font-semibold text-green-700 tracking-wide text-sm">{f.nombre}</span>
                                </button>
                                <div className="pr-4">
                                    <span className="px-3 py-1 rounded-md text-xs font-semibold text-green-700 bg-green-50 ring-1 ring-green-200">
                                        {f.etiqueta}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {list.length < 6 &&
                            Array.from({ length: 6 - list.length }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="h-12 border-t border-gray-200" />
                            ))}
                    </div>

                    {/* Acciones */}
                    <div className="mt-4 flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancelar</button>
                        <button
                            disabled={!selectedId}
                            onClick={() => {
                                const sel = formaciones.find((f) => f.id === selectedId);
                                if (sel) onPick(sel); // abre el calendario
                            }}
                            className={`px-4 py-2 rounded-lg text-white ${selectedId ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"}`}
                        >
                            Elegir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ===========================================================
   PANEL: Asignación (plegable)
   =========================================================== */
function AssignPanel({ dateKey, onClose, onAssign, onDelete }) {
    const [dias, setDias] = useState({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        todos: false,
    });
    const [jornada, setJornada] = useState(""); // 'mañana' | 'tarde' | 'noche'
    const [nota, setNota] = useState("");

    // Secciones plegables
    const [openCompetencia, setOpenCompetencia] = useState(true);
    const [openAmbiente, setOpenAmbiente] = useState(true);

    const d = dateKey ? new Date(dateKey) : new Date();
    const labelFecha = d.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    const toggleDia = (k) => {
        if (k === "todos") {
            const v = !dias.todos;
            setDias({
                lunes: v, martes: v, miercoles: v, jueves: v, viernes: v, sabado: v, todos: v,
            });
        } else {
            const next = { ...dias, [k]: !dias[k] };
            next.todos = next.lunes && next.martes && next.miercoles && next.jueves && next.viernes && next.sabado;
            setDias(next);
        }
    };

    const disabledAssign =
        !jornada ||
        (!dias.todos && !Object.values({ ...dias, todos: undefined }).some(Boolean));

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4">
            <div className="mt-4 w-full max-w-3xl bg-white rounded-2xl shadow-xl ring-1 ring-black/10 overflow-hidden">
                {/* Header con fecha y volver */}
                <div className="p-3 flex items-center justify-between">
                    <span className="px-5 py-2 rounded-lg bg-green-50 text-green-700 font-semibold ring-1 ring-green-200">
                        {labelFecha}
                    </span>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 grid place-items-center rounded-full bg-white ring-1 ring-black/10 shadow"
                        aria-label="Volver"
                    >
                        <ArrowLeft className="text-black" size={18} />
                    </button>
                </div>

                <div className="p-4 space-y-6">
                    {/* ============== COMPETENCIA (PLEGABLE) ============== */}
                    <section className="rounded-xl ring-1 ring-slate-200">
                        <button
                            onClick={() => setOpenCompetencia((s) => !s)}
                            className="w-full flex items-center justify-between px-4 py-3"
                        >
                            <h3 className="text-green-700 font-semibold tracking-wide">COMPETENCIA</h3>
                            <ChevronDown
                                className={`text-slate-500 transition-transform ${openCompetencia ? "rotate-180" : ""}`}
                                size={18}
                            />
                        </button>

                        <div className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out ${openCompetencia ? "grid-rows-[1fr]" : ""}`}>
                            <div className="overflow-hidden">
                                <div className="px-4 pb-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            ["lunes", "LUNES"],
                                            ["martes", "MARTES"],
                                            ["miercoles", "MIERCOLES"],
                                            ["jueves", "JUEVES"],
                                            ["viernes", "VIERNES"],
                                            ["sabado", "SABADO"],
                                            ["todos", "TODOS"],
                                        ].map(([key, label]) => (
                                            <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
                                                <span
                                                    onClick={() => toggleDia(key)}
                                                    className={`h-6 w-6 rounded-full border-2 grid place-items-center ${dias[key] ? "border-green-600" : "border-gray-300"}`}
                                                >
                                                    {dias[key] && <span className="h-3 w-3 rounded-full bg-green-600" />}
                                                </span>
                                                <span className="text-green-700 font-semibold">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ============== AMBIENTE DE FORMACIÓN (PLEGABLE) ============== */}
                    <section className="rounded-xl ring-1 ring-slate-200">
                        <button
                            onClick={() => setOpenAmbiente((s) => !s)}
                            className="w-full flex items-center justify-between px-4 py-3"
                        >
                            <h3 className="text-green-700 font-semibold tracking-wide">AMBIENTE DE FORMACIÓN</h3>
                            <ChevronDown
                                className={`text-slate-500 transition-transform ${openAmbiente ? "rotate-180" : ""}`}
                                size={18}
                            />
                        </button>

                        <div className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out ${openAmbiente ? "grid-rows-[1fr]" : ""}`}>
                            <div className="overflow-hidden">
                                <div className="px-4 pb-4">
                                    {/* Radios de jornada */}
                                    <div className="grid grid-cols-3 gap-3 max-w-md">
                                        {[
                                            ["mañana", "MAÑANA"],
                                            ["tarde", "TARDE"],
                                            ["noche", "NOCHE"],
                                        ].map(([key, label]) => (
                                            <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
                                                <span
                                                    onClick={() => setJornada(key)}
                                                    className={`h-6 w-6 rounded-full border-2 grid place-items-center ${jornada === key ? "border-green-600" : "border-gray-300"}`}
                                                >
                                                    {jornada === key && <span className="h-3 w-3 rounded-full bg-green-600" />}
                                                </span>
                                                <span className="text-green-700 font-semibold">{label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Tarjeta informativa + barra de progreso + nota */}
                                    <div className="mt-6">
                                        <div className="rounded-xl ring-1 ring-slate-200 p-4 max-w-lg">
                                            <div className="text-xs text-slate-600 space-y-0.5">
                                                <div>🌞 🌙</div>
                                                <div>JORNADA</div>
                                                <div>COMPETENCIA</div>
                                                <div>N° FICHA</div>
                                                <div>2873817</div>
                                                <div className="mt-3 font-semibold">AMBIENTE DE FORMACIÓN ASIGNADA</div>
                                                <div className="mt-2 h-2 w-full rounded-full bg-green-100 ring-1 ring-green-200">
                                                    <div className="h-2 rounded-full bg-green-600 w-[0%]" />
                                                </div>
                                            </div>

                                            <textarea
                                                value={nota}
                                                onChange={(e) => setNota(e.target.value)}
                                                placeholder="Observaciones..."
                                                className="mt-3 w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ============== Acciones ============== */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => onAssign({ dateKey, dias, jornada, nota })}
                            disabled={disabledAssign}
                            className={`px-6 py-3 rounded-lg font-semibold ${disabledAssign ? "bg-green-300 cursor-not-allowed text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}
                        >
                            ASIGNAR
                        </button>
                        <button
                            onClick={onDelete}
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
