import React, { useEffect, useRef, useState } from "react";
import { dia } from "@joint/core";


export default function DiagramCanvas() {
  const canvasRef = useRef(null);
  const [hasDiagram, setHasDiagram] = useState(false);

  useEffect(() => {
    const graph = new dia.Graph();
    const paper = new dia.Paper({
      el: canvasRef.current!,
      model: graph,
      width: 800,
      height: 800,
      gridSize: 10,
    });

    // Code for fetching parsed ontology and rendering will be added
    // Once diagram has been rendered:
    // setHasDiagram(true);
  }, []);

  return (
    <div className="relative w-full h-[600px] border-none shadow rounded">
      <div ref={canvasRef} className="w-full h-full" />

      {!hasDiagram && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-gray-600 px-4">
          <p className="text-lg">No diagram has been rendered yet. Please upload an ontology file on the right.</p>
        </div>
      )}
    </div>
  );
  
}