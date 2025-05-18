import { useState } from 'react';
const VITE_REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // 🔄 Loader state

  const handleUpload = async () => {
    if (!file || loading) return;

    setLoading(true); // ⏳ Start loader
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${VITE_REACT_APP_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ File uploaded and processed successfully!');
      } else {
        setMessage(data.message || '❌ Upload failed');
      }
    } catch (error) {
      setMessage('❌ Upload error. Try again.');
    } finally {
      setLoading(false); // ✅ Stop loader
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Upload PDF or Word File</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'}`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}
