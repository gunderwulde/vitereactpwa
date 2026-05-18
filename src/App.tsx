import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


import { useEffect } from 'react';

function getLocalData() {
  // Simula obtener datos locales
  return JSON.parse(localStorage.getItem('my_data') || '[]');
}

async function uploadData(token: string, data: any) {
  // Reemplaza la URL por la de tu API
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

function App() {
  const [count, setCount] = useState(0);
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
    // Simula guardar datos locales si no existen
    if (!localStorage.getItem('my_data')) {
      localStorage.setItem('my_data', JSON.stringify([{ ejemplo: 'dato1' }, { ejemplo: 'dato2' }]));
    }
  }, []);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <button
          type="button"
          style={{ marginTop: 24, padding: '10px 20px', fontSize: 16 }}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'Subir datos a servidor (SSO)'}
        </button>
        {uploadResult && <div style={{ marginTop: 12 }}>{uploadResult}</div>}
      </section>
    </>
  );
}

export default App
