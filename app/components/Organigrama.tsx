"use client";

import * as go from "gojs";
import { useEffect, useRef } from "react";
import { Nodo } from "@/app/utils/Utils";

const Organigrama = ({ data }: { data: Nodo[] }) => {
  const diagramRef = useRef<go.Diagram | null>(null);
  const diagramDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramDivRef.current) return;
    if (diagramRef.current) {
      diagramRef.current.model = new go.TreeModel(
        data.map((nodo) => ({
          key: nodo.id,
          parent: nodo.padre_id ?? undefined, // Asegura que no sea null
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
      $(go.Shape, { strokeWidth: 2 },
        new go.Binding("strokeDashArray", "tipo_cargo", (t) => t === "asesoría" ? [4, 2] : null)
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
      console.log(data);
    };
  }, [data]);

  return <div ref={diagramDivRef} className="w-full h-[500px] border" />;
};

export default Organigrama;
