import React, { useState } from "react";

export default function Upload() {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);

      const formData = new FormData();
      formData.append('file', file);

      await fetch('http://localhost:8000/upload-ontology', {
        method: 'POST',
        body: formData,
      });
    }
  };

  return (
    <div className="p-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-block px-4 py-2 rounded bg-blue-200 shadow-sm hover:bg-blue-400 transition-colors"
      >Choose File</label>

      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      {selectedFileName && (
        <div className="text-sm text-gray-600 my-2">Selected: {selectedFileName}</div>
      )}
    </div>
  );
}