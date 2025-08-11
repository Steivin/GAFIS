function AssignPanel({ dateKey, onClose, onAssign, onDelete }) {
    const [dias, setDias] = React.useState({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        todos: false,
    });
    const [jornada, setJornada] = React.useState(""); // 'mañana' | 'tarde' | 'noche'
    const [nota, setNota] = React.useState("");

    // Secciones plegables
    const [openCompetencia, setOpenCompetencia] = React.useState(true);
    const [openAmbiente, setOpenAmbiente] = React.useState(true);

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

    const disabledAssign =
        !jornada ||
        (!dias.todos &&
            !Object.values({ ...dias, todos: undefined }).some(Boolean));

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
                    {/* ============== COMPETENCIA ============== */}
                    <section className="rounded-xl ring-1 ring-slate-200">
                        <button
                            onClick={() => setOpenCompetencia((s) => !s)}
                            className="w-full flex items-center justify-between px-4 py-3"
                        >
                            <h3 className="text-green-700 font-semibold tracking-wide">
                                COMPETENCIA
                            </h3>
                            <ChevronDown
                                className={`text-slate-500 transition-transform ${openCompetencia ? "rotate-180" : ""
                                    }`}
                                size={18}
                            />
                        </button>

                        <div
                            className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out ${openCompetencia ? "grid-rows-[1fr]" : ""
                                }`}
                        >
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

                    {/* ============== AMBIENTE DE FORMACIÓN ============== */}
                    <section className="rounded-xl ring-1 ring-slate-200">
                        <button
                            onClick={() => setOpenAmbiente((s) => !s)}
                            className="w-full flex items-center justify-between px-4 py-3"
                        >
                            <h3 className="text-green-700 font-semibold tracking-wide">
                                AMBIENTE DE FORMACIÓN
                            </h3>
                            <ChevronDown
                                className={`text-slate-500 transition-transform ${openAmbiente ? "rotate-180" : ""
                                    }`}
                                size={18}
                            />
                        </button>

                        <div
                            className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out ${openAmbiente ? "grid-rows-[1fr]" : ""
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div className="px-4 pb-4">
                                    {/* Radios de jornada */}
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
                                                    className={`h-6 w-6 rounded-full border-2 grid place-items-center ${jornada === key
                                                            ? "border-green-600"
                                                            : "border-gray-300"
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

                                    {/* Tarjeta informativa + barra de progreso + nota */}
                                    <div className="mt-6">
                                        <div className="rounded-xl ring-1 ring-slate-200 p-4 max-w-lg">
                                            <div className="text-xs text-slate-600 space-y-0.5">
                                                <div>🌞 🌙</div>
                                                <div>JORNADA</div>
                                                <div>COMPETENCIA</div>
                                                <div>N° FICHA</div>
                                                <div>2873817</div>
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
                            className={`px-6 py-3 rounded-lg font-semibold ${disabledAssign
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
