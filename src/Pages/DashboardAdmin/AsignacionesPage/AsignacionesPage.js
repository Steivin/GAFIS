// src/Pages/DashboardAdmin/AsignacionesPage/AsignacionesPage.js
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Search, X, ArrowLeft, Menu, ChevronDown } from "lucide-react";
import logo from "../../img/logo.png";
import Calendar from "../../components/Calendar";
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    parse,
} from "date-fns";

const fromKey = (key) => parse(key, "yyyy-MM-dd", new Date());

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

    // Calendario
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // 🔹 Emojis por fecha (yyyy-MM-dd -> '🌞' | '🌙' | '🌞🌙')
    const [highlights, setHighlights] = useState({});
    // 🔹 Asignación completa por fecha (yyyy-MM-dd -> payload)
    const [assignments, setAssignments] = useState({});

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
        setShowPicker(false); // cerramos el picker
        setShowCalendar(true); // mostramos el calendario
    };

    return (
        <div className="flex-1 bg-gradient-to-b from-green-500 to-white p-4">
            {/* Header */}
            <header className="bg-green-600 text-white p-4 flex justify-between items-center rounded-md shadow">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="GAFIS Logo" className="h-6" />
                </div>
                <button onClick={() => setShowSidebar(true)}>
                    <FiMenu size={28} />
                </button>
            </header>

            {/* Sidebar */}
            {showSidebar && (
                <div className="fixed inset-0 z-50">
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
                        ASIGNACIONES
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
                                onOpenMenu={() =>
                                    setMenuOpenId(menuOpenId === item.id ? null : item.id)
                                }
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
                    onPick={(formation) => handleChooseFormation(formation)}
                />
            )}

            {/* Modal Calendario */}
            {showCalendar && (
                <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
                    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/10">
                        <div className="flex items-center justify-between p-4 border-b">
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

                        <div className="p-4">
                            <Calendar
                                selectedDate={selectedDate}
                                highlights={highlights}
                                onDayClick={(dateKey) => {
                                    // Si el día ya tiene asignación, abrimos precargado
                                    setSelectedDate(fromKey(dateKey));
                                    setSelectedDayKey(dateKey);
                                    setShowCalendar(false);
                                    setShowAssignPanel(true);
                                }}
                                onDayDoubleClick={(dateKey) => {
                                    setSelectedDate(fromKey(dateKey));
                                    setShowCalendar(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Panel de asignación */}
            {showAssignPanel && (
                <AssignPanel
                    dateKey={selectedDayKey}
                    initialValues={assignments[selectedDayKey]} // ← precarga si ya existía
                    onClose={() => setShowAssignPanel(false)}
                    onAssign={({
                        dateKey,
                        competenciaId,
                        ambienteId,
                        dias,
                        jornada,
                        nota,
                    }) => {
                        const baseDate = fromKey(dateKey);

                        // 1) volver al calendario en el mes correcto
                        setSelectedDate(baseDate);
                        setSelectedDayKey(dateKey);
                        setShowAssignPanel(false);
                        setShowCalendar(true);

                        // 2) días activos del patrón
                        const dayMap = {
                            lunes: 1,
                            martes: 2,
                            miercoles: 3,
                            jueves: 4,
                            viernes: 5,
                            sabado: 6,
                        };
                        const enabledDays = dias.todos
                            ? [1, 2, 3, 4, 5, 6]
                            : Object.keys(dayMap)
                                .filter((k) => dias[k])
                                .map((k) => dayMap[k]);

                        const addSymbol = jornada === "noche" ? "🌙" : "🌞";

                        // 3) Emojis y asignaciones para TODO el mes
                        setHighlights((prev) => {
                            const start = startOfMonth(baseDate);
                            const end = endOfMonth(baseDate);
                            const days = eachDayOfInterval({ start, end });

                            const next = { ...prev };

                            days.forEach((d) => {
                                const dow = d.getDay(); // 0..6
                                if (enabledDays.includes(dow)) {
                                    const key = format(d, "yyyy-MM-dd");
                                    const prevSym = next[key] || "";
                                    let combined = prevSym || addSymbol;
                                    if (
                                        (prevSym === "🌞" && addSymbol === "🌙") ||
                                        (prevSym === "🌙" && addSymbol === "🌞")
                                    ) {
                                        combined = "🌞🌙";
                                    }
                                    next[key] = combined;
                                }
                            });

                            return next;
                        });

                        // Guardar los datos completos por cada fecha afectada
                        setAssignments((prev) => {
                            const start = startOfMonth(baseDate);
                            const end = endOfMonth(baseDate);
                            const days = eachDayOfInterval({ start, end });

                            const next = { ...prev };
                            const payload = {
                                competenciaId,
                                ambienteId,
                                dias, // snapshot del patrón
                                jornada,
                                nota,
                            };

                            days.forEach((d) => {
                                const dow = d.getDay();
                                if (enabledDays.includes(dow)) {
                                    const key = format(d, "yyyy-MM-dd");
                                    next[key] = payload;
                                }
                            });

                            return next;
                        });
                    }}
                    onDelete={() => {
                        // Eliminar SOLO el día actualmente seleccionado
                        if (!selectedDayKey) return;
                        setHighlights((prev) => {
                            const cp = { ...prev };
                            delete cp[selectedDayKey];
                            return cp;
                        });
                        setAssignments((prev) => {
                            const cp = { ...prev };
                            delete cp[selectedDayKey];
                            return cp;
                        });
                        setShowAssignPanel(false);
                        setShowCalendar(true);
                    }}
                />
            )}
        </div>
    );
}

/* ---- Fila con menú ---- */
function Row({
    name,
    selected,
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
                <span className="h-6 w-6 rounded-full border-2 border-gray-300 grid place-items-center">
                    {selected && <span className="h-3 w-3 rounded-full bg-green-600" />}
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
        {
            id: 101,
            nombre: "Tecnólogo en Análisis y Desarrollo de Software 2873817",
            etiqueta: "PROGRAMACIÓN",
        },
        { id: 102, nombre: "Gestión de Proyectos TI", etiqueta: "PROGRAMACIÓN" },
        { id: 103, nombre: "Diseño UX/UI", etiqueta: "PROGRAMACIÓN" },
        { id: 104, nombre: "Redes y Telecomunicaciones", etiqueta: "PROGRAMACIÓN" },
    ];

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return formaciones;
        return formaciones.filter(
            (f) =>
                f.nombre.toLowerCase().includes(t) ||
                f.etiqueta.toLowerCase().includes(t)
        );
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
                            <div
                                key={f.id}
                                className={`h-12 flex items-center justify-between ${idx > 0 ? "border-t border-gray-200" : ""
                                    }`}
                            >
                                <button
                                    onClick={() => setSelectedId(f.id)}
                                    className="flex items-center gap-3 pl-4 pr-2 w-full text-left"
                                >
                                    <span className="h-6 w-6 rounded-full border-2 border-gray-300 grid place-items-center">
                                        {selectedId === f.id && (
                                            <span className="h-3 w-3 rounded-full bg-green-600" />
                                        )}
                                    </span>
                                    <span className="font-semibold text-green-700 tracking-wide text-sm">
                                        {f.nombre}
                                    </span>
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
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            disabled={!selectedId}
                            onClick={() => {
                                const sel = formaciones.find((f) => f.id === selectedId);
                                if (sel) onPick(sel);
                            }}
                            className={`px-4 py-2 rounded-lg text-white ${selectedId
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-green-300 cursor-not-allowed"
                                }`}
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
   PANEL: Asignación (plegable) — con precarga (initialValues)
   =========================================================== */
function AssignPanel({ dateKey, initialValues, onClose, onAssign, onDelete }) {
    const [nota, setNota] = React.useState(initialValues?.nota || "");

    // Secciones colapsables
    const [openCompetencia, setOpenCompetencia] = React.useState(true);
    const [openAmbiente, setOpenAmbiente] = React.useState(true);

    // ------------------ Datos demo ------------------
    const competencias = [
        { id: 1, nombre: "DISEÑO DE SOFTWARE", codigo: "2844213335" },
        { id: 2, nombre: "DESARROLLO DE SOFTWARE", codigo: "2565665645" },
    ];
    const ambientes = [
        { id: 101, nombre: "104" },
        { id: 102, nombre: "201" },
        { id: 103, nombre: "302" },
    ];

    // ------------------ Selecciones ------------------
    // Competencia
    const [competenciaSearch, setCompetenciaSearch] = React.useState("");
    const [selectedCompetenciaId, setSelectedCompetenciaId] = React.useState(
        initialValues?.competenciaId ?? null
    );

    // Ambiente
    const [ambienteSearch, setAmbienteSearch] = React.useState("");
    const [selectedAmbienteId, setSelectedAmbienteId] = React.useState(
        initialValues?.ambienteId ?? null
    );

    // DÍAS
    const [dias, setDias] = React.useState(
        initialValues?.dias ?? {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            todos: false,
        }
    );

    // JORNADA
    const [jornada, setJornada] = React.useState(initialValues?.jornada ?? ""); // 'mañana' | 'tarde' | 'noche'

    // Refrescar si cambian los initialValues
    React.useEffect(() => {
        if (!initialValues) return;
        setNota(initialValues.nota || "");
        setSelectedCompetenciaId(initialValues.competenciaId ?? null);
        setSelectedAmbienteId(initialValues.ambienteId ?? null);
        setJornada(initialValues.jornada ?? "");
        setDias(
            initialValues.dias ?? {
                lunes: false,
                martes: false,
                miercoles: false,
                jueves: false,
                viernes: false,
                sabado: false,
                todos: false,
            }
        );
    }, [initialValues]);

    // ------------------ Filtrados ------------------
    const competenciasFiltradas = React.useMemo(() => {
        const t = competenciaSearch.trim().toLowerCase();
        if (!t) return competencias;
        return competencias.filter(
            (c) =>
                c.nombre.toLowerCase().includes(t) || c.codigo.toLowerCase().includes(t)
        );
    }, [competenciaSearch, competencias]);

    const ambientesFiltrados = React.useMemo(() => {
        const t = ambienteSearch.trim().toLowerCase();
        if (!t) return ambientes;
        return ambientes.filter((a) => a.nombre.toLowerCase().includes(t));
    }, [ambienteSearch, ambientes]);

    // ------------------ Helpers UI ------------------
    const d = dateKey ? new Date(dateKey) : new Date();
    const labelFecha = d.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    const RowItem = ({ active, children, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full text-left px-3 py-2 border-b border-gray-300 hover:bg-gray-100 transition ${active ? "bg-green-50" : "bg-white"
                }`}
        >
            {children}
        </button>
    );

    const toggleDia = (k) => {
        if (k === "todos") {
            const v = !dias.todos;
            setDias({
                lunes: v,
                martes: v,
                miercoles: v,
                jueves: v,
                viernes: v,
                sabado: v,
                todos: v,
            });
        } else {
            const next = { ...dias, [k]: !dias[k] };
            next.todos =
                next.lunes &&
                next.martes &&
                next.miercoles &&
                next.jueves &&
                next.viernes &&
                next.sabado;
            setDias(next);
        }
    };

    const anyDia =
        dias.todos || Object.values({ ...dias, todos: undefined }).some(Boolean);

    const disabledAssign =
        !selectedCompetenciaId || !selectedAmbienteId || !anyDia || !jornada;

    return (
        <div className="fixed inset-0 z-[70] bg-black/40 flex items-start justify-center p-4">
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
                    {/* ================== COMPETENCIA (lista + días) ================== */}
                    <section className="rounded-xl ring-1 ring-slate-200 overflow-hidden">
                        <button
                            onClick={() => setOpenCompetencia((s) => !s)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100"
                        >
                            <h3 className="text-green-700 font-semibold tracking-wide">
                                COMPETENCIA
                            </h3>
                            <ChevronDown
                                className={`text-black/80 transition-transform ${openCompetencia ? "rotate-180" : ""
                                    }`}
                                size={18}
                            />
                        </button>

                        <div
                            className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${openCompetencia ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                            style={{ gridTemplateColumns: "1fr" }}
                        >
                            <div className="overflow-hidden">
                                {/* Buscador */}
                                <div className="px-3 pt-3 pb-2">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/80">
                                            <Search size={16} />
                                        </span>
                                        <input
                                            value={competenciaSearch}
                                            onChange={(e) => setCompetenciaSearch(e.target.value)}
                                            placeholder="Buscar competencia..."
                                            className="w-full pl-8 pr-3 py-1.5 rounded bg-white ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>

                                {/* Lista competencias */}
                                <div className="px-2 pb-2">
                                    <div className="rounded bg-white ring-1 ring-gray-300 max-h-56 overflow-y-auto">
                                        {competenciasFiltradas.map((c) => (
                                            <RowItem
                                                key={c.id}
                                                active={selectedCompetenciaId === c.id}
                                                onClick={() => setSelectedCompetenciaId(c.id)}
                                            >
                                                <div className="flex justify-between gap-3">
                                                    <span className="font-semibold text-gray-800">
                                                        {c.nombre}
                                                    </span>
                                                    <span className="text-black font-semibold">
                                                        {c.codigo}
                                                    </span>
                                                </div>
                                            </RowItem>
                                        ))}
                                        {competenciasFiltradas.length === 0 && (
                                            <div className="px-3 py-4 text-sm text-gray-500">
                                                Sin resultados
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* DÍAS */}
                                <div className="px-4 pt-3 pb-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            ["lunes", "LUNES"],
                                            ["martes", "MARTES"],
                                            ["miercoles", "MIÉRCOLES"],
                                            ["jueves", "JUEVES"],
                                            ["viernes", "VIERNES"],
                                            ["sabado", "SÁBADO"],
                                            ["todos", "TODOS"],
                                        ].map(([key, label]) => (
                                            <label
                                                key={key}
                                                className="flex items-center gap-3 cursor-pointer select-none"
                                            >
                                                <span
                                                    onClick={() => toggleDia(key)}
                                                    className={`h-6 w-6 rounded-full border-2 grid place-items-center ${dias[key] ? "border-green-600" : "border-gray-300"
                                                        }`}
                                                >
                                                    {dias[key] && (
                                                        <span className="h-3 w-3 rounded-full bg-green-600" />
                                                    )}
                                                </span>
                                                <span className="text-green-700 font-semibold">
                                                    {label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================== AMBIENTE (lista) + JORNADA ================== */}
                    <section className="rounded-xl ring-1 ring-slate-200 overflow-hidden">
                        <button
                            onClick={() => setOpenAmbiente((s) => !s)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100"
                        >
                            <h3 className="text-green-700 font-semibold tracking-wide">
                                AMBIENTE DE FORMACION
                            </h3>
                            <ChevronDown
                                className={`text-black/80 transition-transform ${openAmbiente ? "rotate-180" : ""
                                    }`}
                                size={18}
                            />
                        </button>

                        <div
                            className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${openAmbiente ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                            style={{ gridTemplateColumns: "1fr" }}
                        >
                            <div className="overflow-hidden">
                                {/* Buscador ambientes */}
                                <div className="px-3 pt-3 pb-2">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/80">
                                            <Search size={16} />
                                        </span>
                                        <input
                                            value={ambienteSearch}
                                            onChange={(e) => setAmbienteSearch(e.target.value)}
                                            placeholder="Buscar ambiente..."
                                            className="w-full pl-8 pr-3 py-1.5 rounded bg-white ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>

                                {/* Lista ambientes */}
                                <div className="px-2 pb-2">
                                    <div className="rounded bg-white ring-1 ring-gray-300 max-h-56 overflow-y-auto">
                                        {ambientesFiltrados.map((a) => (
                                            <RowItem
                                                key={a.id}
                                                active={selectedAmbienteId === a.id}
                                                onClick={() => setSelectedAmbienteId(a.id)}
                                            >
                                                <div className="flex justify-between gap-3">
                                                    <span className="font-semibold text-gray-800">
                                                        {a.nombre}
                                                    </span>
                                                </div>
                                            </RowItem>
                                        ))}
                                        {ambientesFiltrados.length === 0 && (
                                            <div className="px-3 py-4 text-sm text-gray-500">
                                                Sin resultados
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* JORNADA */}
                                <div className="px-4 pt-3 pb-4">
                                    <div className="grid grid-cols-3 gap-3 max-w-md">
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
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tarjeta informativa + Nota */}
                    <div className="rounded-xl ring-1 ring-slate-200 p-4 max-w-lg">
                        <div className="text-xs text-slate-600 space-y-0.5">
                            <div>🌞 🌙</div>
                            <div>
                                COMPETENCIA:{" "}
                                <strong>
                                    {competencias.find((c) => c.id === selectedCompetenciaId)
                                        ?.nombre || "—"}
                                </strong>{" "}
                                (
                                {competencias.find((c) => c.id === selectedCompetenciaId)
                                    ?.codigo || "—"}
                                )
                            </div>
                            <div>
                                AMBIENTE:{" "}
                                <strong>
                                    {ambientes.find((a) => a.id === selectedAmbienteId)?.nombre ||
                                        "—"}
                                </strong>
                            </div>
                            <div>
                                JORNADA: <strong>{jornada || "—"}</strong>
                            </div>
                            <div>
                                DÍAS:{" "}
                                <strong>
                                    {dias.todos
                                        ? "TODOS"
                                        : ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
                                            .filter((k) => dias[k])
                                            .map((k) => k.toUpperCase())
                                            .join(", ") || "—"}
                                </strong>
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
                            placeholder="Observaciones..."
                            className="mt-3 w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() =>
                                onAssign({
                                    dateKey,
                                    competenciaId: selectedCompetenciaId,
                                    ambienteId: selectedAmbienteId,
                                    dias,
                                    jornada,
                                    nota,
                                })
                            }
                            disabled={
                                !selectedCompetenciaId ||
                                !selectedAmbienteId ||
                                !(dias.todos ||
                                    Object.values({ ...dias, todos: undefined }).some(Boolean)) ||
                                !jornada
                            }
                            className={`px-6 py-3 rounded-lg font-semibold ${!selectedCompetenciaId ||
                                    !selectedAmbienteId ||
                                    !(dias.todos ||
                                        Object.values({ ...dias, todos: undefined }).some(Boolean)) ||
                                    !jornada
                                    ? "bg-green-300 cursor-not-allowed text-white"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
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
