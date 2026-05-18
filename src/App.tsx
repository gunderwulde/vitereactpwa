import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './App.css'
import { validateSession, Logout, clearClientSessionCookie, getClientSessionToken } from './utils/back4app';
import LoginModal from './components/LoginModal';
import { Link } from 'react-router-dom';


import { useEffect } from 'react';
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<any | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    (async () => {
      const valid = await validateSession();
      if (valid && valid.sessionToken) {
        setUser(valid.user);
      } else {
        setShowLogin(true);
      }
    })();
  }, []);


  const handleLoginSuccess = (u: any) => {
    setUser(u);
    setShowLogin(false);
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
        {showLogin && <LoginModal onSuccess={handleLoginSuccess} />}
        {user && <div>Conectado como: {user && (user.name || user.email || user.objectId)}</div>}
        {user && (
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={async () => {
                const token = getClientSessionToken();
                try {
                  if (token) await Logout(token);
                } catch (e) {
                  console.error('Logout error', e);
                }
                clearClientSessionCookie();
                try { localStorage.removeItem('sessionToken'); } catch {}
                setUser(null);
                setShowLogin(true);
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
      </section>
    </>
  );
}

export default App
