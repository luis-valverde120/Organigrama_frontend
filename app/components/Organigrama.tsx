"use client";

import * as go from "gojs";
import { useEffect, useRef } from "react";
import { Nodo } from "@/app/utils/Utils";
import jsPDF from "jspdf";

const Organigrama = ({ data }: { data: Nodo[] }) => {
  const diagramRef = useRef<go.Diagram | null>(null);
  const diagramDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramDivRef.current) return;
    if (diagramRef.current) {
      diagramRef.current.model = new go.TreeModel(
        data.map((nodo) => ({
          key: nodo.id,
          parent: nodo.padre_id ?? undefined, // Ensure it's not null
          nombre: nodo.nombre,
          titulo: nodo.titulo,
          tipo_cargo: nodo.tipo_cargo,
          color_bg: nodo.color_bg,
          color_border: nodo.color_border,
          color_text: nodo.color_text,
        }))
      );
      return;
    }

    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, diagramDivRef.current, {
      initialAutoScale: go.Diagram.Uniform,
      layout: $(go.TreeLayout, { angle: 90, layerSpacing: 50 }),
    });

    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        "RoundedRectangle",
        {
          name: "SHAPE",
          strokeWidth: 2,
          stroke: "black",
        },
        new go.Binding("fill", "color_bg"),
        new go.Binding("stroke", "color_border")
      ),
      $(
        go.Panel,
        "Table",
        { margin: 5 },
        $(
          go.TextBlock,
          {
            row: 0,
            column: 0,
            font: "bold 14px sans-serif",
            stroke: "black",
          },
          new go.Binding("text", "nombre"),
          new go.Binding("stroke", "color_text")
        ),
        $(
          go.TextBlock,
          {
            row: 1,
            column: 0,
            font: "12px sans-serif",
            stroke: "gray",
          },
          new go.Binding("text", "titulo"),
          new go.Binding("stroke", "color_text")
        )
      )
    );

    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal },
      $(
        go.Shape,
        { strokeWidth: 2 },
        new go.Binding("strokeDashArray", "tipo_cargo", (t) =>
          t === "asesoría" ? [4, 2] : null
        )
      )
    );

    diagram.model = new go.TreeModel(
      data.map((nodo) => ({
        key: nodo.id,
        parent: nodo.padre_id ?? undefined,
        nombre: nodo.nombre,
        titulo: nodo.titulo,
        tipo_cargo: nodo.tipo_cargo,
        color_bg: nodo.color_bg,
        color_border: nodo.color_border,
        color_text: nodo.color_text,
      }))
    );

    diagramRef.current = diagram;

    return () => {
      diagramRef.current?.div && (diagramRef.current.div = null);
      diagramRef.current = null;
    };
  }, [data]);

  const exportToPDF = () => {
    if (!diagramRef.current) return;

    const imgData = diagramRef.current.makeImageData({
      scale: 1,
      background: "white",
      type: "image/png",
    });

    if (!imgData) {
      console.error("Failed to generate image data.");
      return;
    }

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 35, 25);
    pdf.save("organigrama.pdf");
  };

  const printDiagram = (width = 700, height = 960) => {
    if (!diagramRef.current) return;

    const svgWindow = window.open();
    if (!svgWindow) return; // Failure to open a new window

    svgWindow.document.title = "GoJS Printing";
    svgWindow.document.body.style.margin = "0px";

    const printSize = new go.Size(width, height);
    const bnds = diagramRef.current.documentBounds;
    let x = bnds.x;
    let y = bnds.y;

    while (y < bnds.bottom) {
      while (x < bnds.right) {
        const svg = diagramRef.current.makeSvg({
          scale: 1.0,
          position: new go.Point(x, y),
          size: printSize,
          background: "white",
        });
        if (svg) {
          svgWindow.document.body.appendChild(svg);
        }
        x += printSize.width;
      }
      x = bnds.x;
      y += printSize.height;
    }

    setTimeout(() => {
      svgWindow.print();
      svgWindow.close();
    }, 1);
  };

  const saveAsImage = () => {
    if (!diagramRef.current) return;

    const diagramCanvas = diagramRef.current.makeImage({
      scale: 1,
      background: "white",
    });

    if (!diagramCanvas) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = diagramCanvas.width;
    canvas.height = diagramCanvas.height;

    if (context) {
      context.drawImage(diagramCanvas, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "organigrama.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      }, "image/png");
    } else {
      console.error("Failed to get canvas context.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row space-x-4">
        <button
          onClick={exportToPDF}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generar PDF
        </button>
        <button
          onClick={() => printDiagram()}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Imprimir Diagrama
        </button>
        <button
          onClick={saveAsImage}
          className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Guardar como PNG
        </button>
      </div>

      <div ref={diagramDivRef} className="w-full h-[500px] border" />
    </div>
  );
};

export default Organigrama;
