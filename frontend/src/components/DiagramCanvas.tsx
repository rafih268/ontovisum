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
    if (!ontology) return;

    console.log(ontology);

    const graph = new dia.Graph();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paper = new dia.Paper({
      el: canvasRef.current!,
      model: graph,
      width: 1200,
      height: 600,
      gridSize: 10,
      background: { color: '#e0f2fe'},
    });
    
    const nodes: { [key:string]: dia.Element } = {};

    ontology.classes.forEach((cls, idx) => {
      // Find data properties belonging to this class
      const clsDataProps = ontology.data_properties
        .filter(dp => dp.domain.includes(cls.name))
        .map(dp => `${dp.name}: ${dp.range.join(', ')}`)
        .join('\n');

      const labelText = `${cls.name}\n${clsDataProps}`;

      const rect = new shapes.standard.Rectangle();
      rect.position(100 + idx * 200, 100);
      rect.resize(150, 100);
      rect.attr({
        body: { fill: '#f0f9ff', stroke: '#0284c7', rx: 6 },
        label: { text: labelText, fill: '#0c4a6e', fontSize: 12 }
      });
      rect.addTo(graph);

      nodes[cls.name] = rect;
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