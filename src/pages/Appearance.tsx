import '../styles/shared.css'

import { Link } from 'react-router-dom'

export default function Appearance(){
  return (
    <div className="page-container">
      <div className="header">
        <button className="back">‹</button>
        <h3>BOMBA - Aspecto</h3>
        <button className="close">✕</button>
      </div>

      <div className="page-content">
        <div style={{background:'#cfe3f8',padding:'8px 12px',display:'flex',alignItems:'center',gap:12}}>
          <div style={{flex:1}}>
            <div style={{fontSize:12,color:'#333'}}>Planta:</div>
            <div style={{fontWeight:700}}>ACOSOL MARBELLA</div>
          </div>
          <div style={{flex:2,textAlign:'left'}}>
            <div style={{fontSize:12,color:'#333'}}>Servicio</div>
            <div style={{fontWeight:700}}>ALTA PRESION 1</div>
            <div style={{fontSize:12,marginTop:6}}>Modelo Bomba <strong>8X13 DA-5</strong></div>
            <div style={{fontSize:12}}>N/S Bomba <strong>19E6185</strong></div>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontWeight:700}}>Estado pintura</div>
          <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
            <label style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="radio" name="pintura" defaultChecked /> Correcto
            </label>
            <label style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="radio" name="pintura" /> Deficiente
            </label>
          </div>
        </div>

        <div style={{marginTop:16}}>
          <div style={{fontWeight:700}}>Limpieza máquina</div>
          <div style={{border:'1px solid #123a6b',padding:12,borderRadius:4,marginTop:8}}>
            <label style={{display:'flex',alignItems:'center',gap:8}}>
              <input type="radio" name="limpieza" defaultChecked /> Correcto
            </label>
            <label style={{display:'flex',alignItems:'center',gap:8,marginLeft:12}}>
              <input type="radio" name="limpieza" /> Deficiente
            </label>
          </div>
        </div>

      </div>

      <div className="page-footer">
        <div className="footer-left">
          <Link to="/hydraulic-data">
            <button className="primary">Anterior</button>
          </Link>
        </div>
        <div style={{flex:1,textAlign:'center'}}>
          <Link to="/leaks-levels">
            <button className="primary">Siguiente</button>
          </Link>
        </div>
        <div className="footer-right" />
      </div>
    </div>
  )
}
