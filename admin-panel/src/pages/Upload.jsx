import { useState } from 'react';
const VITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${VITE_REACT_APP_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('File uploaded and processed successfully!');
    } else {
      setMessage(data.message || 'Upload failed');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Upload PDF or Word File</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <button onClick={handleUpload} className="bg-green-600 text-white px-4 py-2">Upload</button>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}
