"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import anime from "animejs";

export default function Home() {
  const [showContent, setShowContent] = useState(false); // Para controlar cuando mostrar el contenido

  useEffect(() => {
    // Animación del grid
    anime({
      targets: ".grid-box",
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 },
      ],
      delay: anime.stagger(100, { grid: [15, 7], from: "center" }), // Grid más grande
      complete: () => {
        setTimeout(() => {
          anime({
            targets: ".grid-box",
            opacity: 0,
            scale: 0.1,
            duration: 500,
            easing: "easeInOutQuad",
            complete: () => setShowContent(true), // Mostrar contenido después de que el grid desaparezca
          });
        }, 500);
      },
    });

    // Animación del polígono
    anime({
      targets: ".svg-attributes-demo polygon",
      points: [
        "64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96", // Forma inicial
        "64 120 0 90 10 40 70 10 130 50 120 100", // Nueva forma 1
        "70 130 20 80 30 30 80 5 140 45 110 110", // Nueva forma 2
        "64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96", // Volver a la inicial
      ],
      easing: "easeInOutQuad",
      duration: 4000,
      loop: true,
      direction: "alternate",
    });
  }, []);

  useEffect(() => {
    if (showContent) {
      // Animación de aparición del texto y polígono
      anime({
        targets: [".svg-attributes-demo", "h1"],
        opacity: [0, 1],
        scale: [0.1, 1],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: 500, // Sincronizado con la desaparición del grid
      });
    }
  }, [showContent]);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-base-300 overflow-hidden">
      {/* Animación de Grid */}
      {!showContent && (
        <div className="absolute grid grid-cols-15 gap-1">
          {Array.from({ length: 105 }).map((_, index) => (
            <div
              key={index}
              className="grid-box w-8 h-8 bg-primary opacity-100" // Tamaño de las celdas del grid
            />
          ))}
        </div>
      )}

      {/* SVG de fondo con animación del polígono */}
      <svg
        className="svg-attributes-demo absolute top-1/2 -translate-y-1/2 opacity-0 z-0" // Inicialmente opaco
        viewBox="0 0 128 128"
        width="400"
        height="400"
      >
        <polygon
          points="64 128 0 96 0 32 64 0 128 32 128 96"
          className="fill-blue-900"
        />
      </svg>

      {/* Texto "Organigrama" aparece junto con el polígono */}
      {showContent && (
        <h1 className="text-9xl font-bold uppercase opacity-0 z-10">
          Organigrama
        </h1>
      )}

      {/* Botón de inicio */}
      {showContent && (
        <div className="z-10 mt-4">
          <Link className="btn btn-primary" href={"/login"}>
            Getting Started
          </Link>
        </div>
      )}
    </div>
  );
}
