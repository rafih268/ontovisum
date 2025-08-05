import React, { useEffect, useRef, useState } from "react";
import { dia, shapes } from "@joint/plus";

interface Ontology {
  classes: { name: string }[];
  data_properties: { name: string; domain: string[]; range: string[] }[];
}

export default function DiagramCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [ontology, setOntology] = useState<Ontology | null>(null);
  const [hasDiagram, setHasDiagram] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/parsed-ontology')
      .then(res => res.json())
      .then(data => setOntology(data));
  }, []);

  useEffect(() => {
    if (!ontology) {
      setHasDiagram(false);
      return;
    }

    const graph = new dia.Graph();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paper = new dia.Paper({
      el: canvasRef.current!,
      model: graph,
      width: 1200,
      height: 600,
      gridSize: 10,
      background: { color: "#e0f2fe"},
    });
    
    const nodes: { [key: string]: dia.Element } = {};

    const startX = 100;
    const startY = 100;
    const horizontalSpacing = 500;
    const verticalSpacing = 100;

    ontology.classes.slice(0, 2).forEach((cls, classIndex) => {
      const x = startX + classIndex * horizontalSpacing;
      const y = startY;

      const classRect = new shapes.standard.Rectangle();
      classRect.position(x, y);
      classRect.resize(160, 50);
      classRect.attr({
        body: { fill: "#f0f9ff", stroke: "#0284c7", rx: 6 },
        label: { text: cls.name, fill: "#0c4a6e", fontSize: 14 },
      });
      classRect.addTo(graph);

      nodes[cls.name] = classRect;

      const clsDataPropsMap = new Map<string, Set<string>>();

      ontology.data_properties.forEach((dp) => {
        if (!dp.domain.includes(cls.name)) return;

        if (!clsDataPropsMap.has(dp.name)) {
          clsDataPropsMap.set(dp.name, new Set(dp.range));
        } else {
          const rangeSet = clsDataPropsMap.get(dp.name)!;
          dp.range.forEach((r) => rangeSet.add(r));
        }
      });

      const clsDataProps = Array.from(clsDataPropsMap.entries()).map(([name, rangeSet]) => ({
        name,
        range: Array.from(rangeSet),
      }));

      console.log(clsDataProps);

      clsDataProps.forEach((dp, dpIndex) => {
        dp.range.forEach((rangeValue, rangeIndex) => {
          const valueNode = new shapes.standard.Rectangle();
          const valueY =
            y +
            verticalSpacing +
            dpIndex * verticalSpacing +
            rangeIndex * 60;
          
          valueNode.position(x, valueY);
          valueNode.resize(160, 40);
          valueNode.attr({
            body: { fill: "#fff7ed", stroke: "#f97316", rx: 6 },
            label: { text: rangeValue, fill: "#7c2d12", fontSize: 13, },
          });
          valueNode.addTo(graph);

          const link = new shapes.standard.Link();
          link.source(classRect);
          link.target(valueNode);
          link.attr({
            line: {
              stroke: "#0284c7",
              strokeWidth: 2,
              targetMarker: {
                type: "path",
                d: "M 10 -5 0 0 10 5 z",
              },
            },
            label: {
              text: dp.name,
              fill: "#1e3a8a",
              fontSize: 10,
              fontWeight: "bold",
            },
          });
          link.labels([{ position: 0.5, attrs: { text: { text: dp.name } } }]);
          link.addTo(graph);
        });
      });
    });

    setHasDiagram(true);
  }, [ontology]);

  return (
    <div className="relative w-[1200px] h-[600px] border-none shadow rounded overflow-hidden">
      <div ref={canvasRef} />

      {!hasDiagram && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-gray-600 px-4">
          <p className="text-lg">No diagram has been rendered yet. Please upload an ontology file on the right.</p>
        </div>
      )}
    </div>
  );
  
}