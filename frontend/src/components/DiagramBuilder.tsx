import React, { useState } from "react";
import Upload from "./Upload";
import DiagramCanvas from "./DiagramCanvas";

export default function DiagramBuilder() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [ontology, setOntology] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOntology = async () => {
    const response = await fetch("http://localhost:8000/parsed-ontology");
    const data = await response.json();
    setOntology(data);
  };

  const handleGenerateClick = () => {
    if (!fileUploaded) {
      setShowModal(true);
      return;
    }
    fetchOntology();
  }

  return (
    <div className="flex flex-1 items-start justify-center p-4 space-x-4 max-w-7xl mx-auto mt-15">
      <div className="flex-1">
        {/*DiagramCanvas.tsx has to be updated for this line to work.*/}
        {/*<DiagramCanvas ontology={ontology} />*/}
      </div>

      <div className="p-4 rounded shadow bg-blue-50 h-fit">
        <h2 className="text-xl font-bold">Upload your Ontology</h2>
        {/*Upload.tsx has to be updated for this line to work.*/}
        {/*<Upload onUploadComplete={() => setFileUploaded(true)} />*/}
        <button
          onClick={handleGenerateClick}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Generate Diagram
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h3 className="text-lg font semibold mb-2">Upload Required</h3>
            <p className="text-sm text-gray-600">Please uplaod an ontology file before generating a diagram.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  )
}