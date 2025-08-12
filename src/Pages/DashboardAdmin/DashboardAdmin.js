import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import logo from '../img/logo.png';
import gden from '../img/gden.png';
import gobierno from '../img/gobierno.png';
import logosena from '../img/logosena.png';
import mintrabajo from '../img/mintrabajo.png';
import slide1 from '../img/Slide1.webp';
import slide2 from '../img/Slide2.webp';
import slide3 from '../img/Slide3.png';

export default function DashboardAdmin() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Lista de imágenes vacías como marcadores de posición
    const slides = [slide1, slide2, slide3];



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Sidebar lateral */}
            {showSidebar && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowSidebar(false)}></div>
                    <div className="relative z-50 w-64 h-full bg-green-700 text-white shadow-lg p-4">
                        <button className="mb-4 text-white text-right w-full" onClick={() => setShowSidebar(false)}>X</button>
                        <ul className="space-y-4">
                            <li><a href="/admin" className="hover:underline">Inicio</a></li>
                            <li><a href="/profileAdmin" className="hover:underline">Perfil</a></li>
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
                            <a href="/profileAdmin"> <FaUserCircle size={20} /></a>
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


                {/* Botones centrados */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-[100px] px-4">
                    <Link
                        to="/admin/asignaciones"
                        className="bg-white text-green-600 px-8 py-6 text-lg rounded-xl font-semibold shadow w-full max-w-[300px] sm:w-[200px] text-center"
                    >
                        ASIGNACIONES
                    </Link>

                    <Link
                        to="/admin/instructores"
                        className="bg-white text-green-600 px-8 py-6 text-lg rounded-xl font-semibold shadow w-full max-w-[300px] sm:w-[200px] text-center"
                    >
                        INSTRUCTORES
                    </Link>

                    <button className="bg-white text-green-600 px-8 py-6 text-lg rounded-xl font-semibold shadow w-full max-w-[300px] sm:w-[200px]">
                        FORMACIONES
                    </button>

                    <Link
                        to="/crud"
                        className="bg-white text-green-600 px-8 py-6 text-lg rounded-xl font-semibold shadow w-full max-w-[300px] sm:w-[200px] text-center"
                    >
                        CRUD
                    </Link>
                </div>

                {/* Slider de tarjetas */}
                <div className="mt-8 w-full flex flex-col items-center gap-4">
                    <div className="relative w-full aspect-video max-w-6xl h-[400px] max-sm:h-[220px]  rounded-xl overflow-hidden shadow-lg">
                        {slides.map((slide, index) => (
                            <img
                                key={index}
                                src={slide}
                                alt={`Slide ${index}`}
                                className={`absolute top-0 left-0 w-full h-full sm:h-auto object-cover transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}
                        <div className="absolute inset-0 flex justify-between items-center px-4">
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                                className="bg-white bg-opacity-60 hover:bg-opacity-90 text-green-700 font-bold p-3 rounded-full shadow transition"
                            >
                                ◀
                            </button>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                                className="bg-white bg-opacity-60 hover:bg-opacity-90 text-green-700 font-bold p-3 rounded-full shadow transition"
                            >
                                ▶
                            </button>
                        </div>
                        <div className="absolute bottom-4 w-full flex justify-center gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-green-600' : 'bg-white'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </main>

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
