import React, { useEffect, useRef } from "react";
import { dia } from "@joint/core";


export default function DiagramCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const graph = new dia.Graph();
    const paper = new dia.Paper({
      el: canvasRef.current!,
      model: graph,
      width: 800,
      height: 800,
      gridSize: 10,
    });
  }, []);

  return <div ref={canvasRef} className="p-4 h-[600px] border shadow-md rounded" />;
}