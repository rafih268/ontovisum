import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

interface UploadProps {
  onUploadComplete: () => void;
}

export default function Upload({ onUploadComplete }: UploadProps) {
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

      onUploadComplete();
    }
  };

  return (
    <div className="p-4 w-56">
      <label
        htmlFor="file-upload"
        className="inline-flex items-baseline gap-2 cursor-pointer px-4 py-2 rounded bg-blue-200 shadow-sm hover:bg-blue-400 hover:text-gray-100 transition-colors"
      >
        <UploadCloud className="h-4 w-4" />
        Choose File
      </label>

      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      {selectedFileName && (
        <div className="text-sm text-green-600 mt-2">Selected: {selectedFileName}</div>
      )}
    </div>
  );
}