import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function getLocalData() {
  return JSON.parse(localStorage.getItem('my_data') || '[]');
}

async function uploadData(token: string, data: any) {
  const res = await fetch('https://api.tu-servidor.com/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  return res.ok;
}

const UploadData = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleUpload = async () => {
    setUploading(true);
    setUploadResult(null);
    const token = localStorage.getItem('ms_token');
    if (!token) {
      setUploadResult('No hay token disponible.');
      setUploading(false);
      return;
    }
    const data = getLocalData();
    try {
      const ok = await uploadData(token, data);
      setUploadResult(ok ? 'Datos subidos correctamente.' : 'Error al subir datos.');
    } catch (e) {
      setUploadResult('Error al subir datos.');
    }
    setUploading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('my_data')) {
      localStorage.setItem('my_data', JSON.stringify([{ ejemplo: 'dato1' }, { ejemplo: 'dato2' }]));
    }
  }, []);

  return (
    <section style={{ padding: 20, position: 'relative' }}>
      <Link to="/" style={{ position: 'absolute', top: 12, left: 12, textDecoration: 'none' }}>
        <button type="button" style={{ padding: '6px 10px' }}>Volver</button>
      </Link>
      <h2>Upload Data</h2>
      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading}
        style={{ padding: '10px 20px', fontSize: 16 }}
      >
        {uploading ? 'Subiendo...' : 'Subir datos a servidor (SSO)'}
      </button>
      {uploadResult && <div style={{ marginTop: 12 }}>{uploadResult}</div>}
    </section>
  );
};

export default UploadData;
