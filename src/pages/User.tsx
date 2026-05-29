import '../styles/shared.css'
import { useEffect, useState } from 'react';
import { GetSession, ClearSession } from '../utils/session';
import { GetStaticData, Logout } from '../utils/back4app';
import { idbGet, idbSet } from '../utils/indexeddb';
import { Link, useNavigate } from 'react-router-dom'

export default function UserPage() {
  const [user, setUser] = useState<any | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [fromCache, setFromCache] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const session = GetSession();
    if (session && session.sessionToken) setUser(session.user);
    (async () => {
      const cached = await idbGet('staticData');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const plantNames = parsed?.plantas?.map((p: any) => `${p.codigoPlanta} - ${p.nombrePlanta}`) || [];
          setData(plantNames);
          setFromCache(true);
        } catch {}
      }
    })();
  }, []);

  const fetchStatic = async () => {
    setLoading(true);
    setFromCache(false);
    try {
      const res = await GetStaticData();
      await idbSet('staticData', JSON.stringify(res));
      const plantNames = res?.plantas?.map((p: any) => `${p.codigoPlanta} - ${p.nombrePlanta}`) || [];
      setData(plantNames);
    } catch (e) {
      console.error('Error fetching static data', e);
      alert('Error al obtener datos estáticos: ' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async () => {
    await idbSet('staticData', '');
    setData(null);
    setFromCache(false);
  };

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (e) {
      console.error('Logout error', e);
    }
    ClearSession();
    setUser(null);
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="header">
        <button className="back" onClick={() => navigate(-1)}>‹</button>
        <h3>Usuario</h3>
        <button className="close" onClick={() => navigate('/')}>✕</button>
      </div>

      <div className="page-content">
        <div className="form-row">
          <label>Conectado como</label>
          <div>{user ? user.name : 'No autenticado'}</div>
        </div>

        <div className="form-row">
          <label>Acciones</label>
          <div className="form-element">
            <button className="primary" onClick={fetchStatic} disabled={loading}>
              {loading ? 'Cargando...' : 'Cargar datos estáticos'}
            </button>
            <button onClick={clearCache}>Borrar caché</button>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>

        <div className="form-row">
          <label>Datos</label>
          <div>
            {fromCache && <div>Plantas disponibles</div>}
              {data ? (
                <div>{Array.isArray(data) ? data.join(', ') : String(data)}</div>
            ) : (
              <div>No hay datos cargados.</div>
            )}
          </div>
        </div>
      </div>

      <div className="page-footer">
        <div className="footer-left">
          <Link to="/">
            <button className="primary">Volver</button>
          </Link>
        </div>
        <div className="footer-right">
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}
