import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './App.css'
import { validateSession, Logout } from './utils/back4app';
import { GetSession, ClearSession } from './utils/session';
import LoginModal from './components/LoginModal';
import { Link } from 'react-router-dom';
import PhotoCapture from './components/PhotoCapture';


import { useEffect } from 'react';
import { idbGet } from './utils/indexeddb';
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<any | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    (async () => {
      const session = GetSession();
      if (session && session.sessionToken) {
        setUser(session.user);
      } else {
        ClearSession();
        setShowLogin(true);
      }
    })();
  }, []);


  const handleLoginSuccess = (session: any) => {
    setUser(session.user);
    setShowLogin(false);
  };

  useEffect(() => {
    // Simula guardar datos locales si no existen
    if (!localStorage.getItem('my_data')) {
      localStorage.setItem('my_data', JSON.stringify([{ ejemplo: 'dato1' }, { ejemplo: 'dato2' }]));
    }
  }, []);

  const generatePdf = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    // Intentar usar la foto capturada y guardada por PhotoCapture
    let imgData: string | null = null;
    try {
      imgData = await idbGet('photo_capture_image');
    } catch (err) {
      console.warn('No se pudo leer la foto de IndexedDB', err);
    }

    // Si no hay foto guardada, crear una imagen programática (canvas) como fallback
    if (!imgData) {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f4f4f8';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#222';
        ctx.font = '48px sans-serif';
        ctx.fillText('Portada esquemática', 60, 120);
        ctx.fillStyle = '#0077cc';
        ctx.fillRect(60, 160, 480, 270);
        ctx.fillStyle = '#fff';
        ctx.font = '22px sans-serif';
        ctx.fillText('Imagen de ejemplo', 80, 300);
      }
      imgData = canvas.toDataURL('image/png');
    }

    // Página de portada
    doc.setFontSize(28);
    doc.text('Documento Esquemático', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    doc.addImage(imgData, 'PNG', 20, 40, doc.internal.pageSize.getWidth() - 40, 120);

    // Página de contenido con texto e imagen
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Contenido', 20, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize('Este PDF se genera desde la aplicación. Incluye una portada, texto y una imagen esquemática generada en canvas. Es un ejemplo simple y rápido.', 170);
    doc.text(lines, 20, 40);
    doc.addImage(imgData, 'PNG', 20, 80, 80, 60);

    // Página final con otra imagen y nota
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Nota final', 20, 20);
    doc.setFontSize(11);
    doc.text('Generado desde la aplicación PWA (ejemplo esquemático).', 20, 36);
    doc.addImage(imgData, 'PNG', 20, 48, 170, 100);

    doc.save('documento-esquematico.pdf');
  };

  return (
    <>
      <section id="center">
        {showLogin && <LoginModal onSuccess={handleLoginSuccess} />}
        {user && <div>Conectado como: {user.name}</div>}
        {user && (
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={async () => {                
                try {
                  await Logout();
                  setUser(null);
                  setShowLogin(true);
                } catch (e) {
                  console.error('Logout error', e);
                }
              }}
              style={{ marginLeft: 12, padding: '6px 10px' }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <PhotoCapture />
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
        <Link to="/upload">
          <button
            type="button"
            style={{ marginTop: 24, padding: '10px 20px', fontSize: 16 }}
          >
            Subir datos a servidor (SSO)
          </button>
        </Link>
        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            onClick={generatePdf}
            style={{ padding: '10px 18px', fontSize: 16 }}
          >
            Generar PDF
          </button>
        </div>
      </section>
    </>
  );
}

export default App
