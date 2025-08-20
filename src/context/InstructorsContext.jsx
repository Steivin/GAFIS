// src/context/InstructorsContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Catálogos (pueden venir de Supabase luego).
 * Los exporto por si quieres reutilizarlos en otras pantallas.
 */
export const CATALOGOS = {
    formaciones: [
        { id: 101, nombre: "Tecnólogo en A.D.S.", etiqueta: "2873817" },
        { id: 102, nombre: "Gestión de Proyectos TI", etiqueta: "1252674" },
        { id: 103, nombre: "Diseño UX/UI", etiqueta: "546212" },
        { id: 104, nombre: "Redes y Telecomunicaciones", etiqueta: "422313" },
    ],
    ambientes: [
        { id: 201, nombre: "104" },
        { id: 202, nombre: "201" },
        { id: 203, nombre: "302" },
    ],
};

/**
 * Instructores base (mismos que usas en Asignaciones).
 * Más adelante podrás reemplazar esto por datos de Supabase.
 */
const BASE_INSTRUCTORES = [
    { id: 1, nombre: "JORGE EMILIO CLARO BAYONA" },
    { id: 2, nombre: "ANA MARÍA RUIZ" },
    { id: 3, nombre: "LUIS PÉREZ" },
    { id: 4, nombre: "MARCELA GÓMEZ" },
];

/**
 * assignmentsByInstructor:
 * {
 *   [instructorId]: [
 *      {
 *        id,              // uid local
 *        formationId,
 *        formationNombre,
 *        formationFicha,
 *        ambienteId,
 *        ambienteNombre,
 *        jornada,         // 'mañana' | 'tarde' | 'noche'
 *        nota,
 *        createdAt
 *      },
 *      ...
 *   ]
 * }
 */
const InstructorsContext = createContext(null);

export const InstructorsProvider = ({ children }) => {
    const [instructors] = useState(BASE_INSTRUCTORES);
    const [assignmentsByInstructor, setAssignmentsByInstructor] = useState({});

    // Utilidad simple para uid local
    const uid = () => Math.random().toString(36).slice(2, 9);

    const addAssignment = (instructorId, payload) => {
        setAssignmentsByInstructor(prev => {
            const list = prev[instructorId] ?? [];
            const next = {
                id: uid(),
                createdAt: Date.now(),
                ...payload,
            };
            return { ...prev, [instructorId]: [...list, next] };
        });
    };

    const removeAllAssignments = (instructorId) => {
        setAssignmentsByInstructor(prev => {
            const cp = { ...prev };
            delete cp[instructorId];
            return cp;
        });
    };

    // Si luego quieres eliminar una sola, también dejo esta:
    const removeAssignment = (instructorId, assignmentId) => {
        setAssignmentsByInstructor(prev => {
            const list = prev[instructorId] ?? [];
            const filtered = list.filter(a => a.id !== assignmentId);
            return { ...prev, [instructorId]: filtered };
        });
    };

    const value = useMemo(
        () => ({
            instructors,
            assignmentsByInstructor,
            addAssignment,
            removeAllAssignments,
            removeAssignment,
            catalogs: CATALOGOS,
        }),
        [instructors, assignmentsByInstructor]
    );

    return (
        <InstructorsContext.Provider value={value}>
            {children}
        </InstructorsContext.Provider>
    );
};

export const useInstructors = () => {
    const ctx = useContext(InstructorsContext);
    if (!ctx) throw new Error("useInstructors debe usarse dentro de <InstructorsProvider>");
    return ctx;
};
