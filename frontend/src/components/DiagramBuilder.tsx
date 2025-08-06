import React, { useState } from "react";
import Upload from "./Upload";
import DiagramCanvas from "./DiagramCanvas";
import AlertMsg from "./AlertMsg";

export default function DiagramBuilder() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [ontology, setOntology] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const fetchOntology = async () => {
    const response = await fetch("http://localhost:8000/parsed-ontology");
    const data = await response.json();
    setOntology(data);
  };

  const handleGenerateClick = () => {
    if (!fileUploaded) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    fetchOntology();
  }

  return (
    <>
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 z-50
        ${showAlert ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
        <AlertMsg />
      </div>
      <div className="flex flex-1 items-start justify-center p-4 space-x-4 max-w-7xl mx-auto mt-15">
        <div className="flex-1">
          <DiagramCanvas ontology={ontology} />
        </div>
  
        <div className="p-4 rounded shadow bg-blue-50 h-fit">
          <h2 className="text-xl font-bold">Upload your Ontology</h2>
          <Upload onUploadComplete={() => setFileUploaded(true)} />
          <button
            onClick={handleGenerateClick}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Generate Diagram
          </button>
        </div>
      </div>
    </>
  )
}