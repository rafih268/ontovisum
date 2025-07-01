import React from "react";

export default function Upload() {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}