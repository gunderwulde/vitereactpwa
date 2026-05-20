import React from 'react'
import '../styles/shared.css'
import './InitialData.css'
import { Link } from 'react-router-dom'

export default function LeaksLevels(){
  return (
    <div className="initial-data page-container">
      <div className="header">
        <button className="back">‹</button>
        <h3>BOMBA - Fugas y niveles</h3>
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
          <div style={{fontWeight:700}}>Nivel de aceite cojinete bomba lado LA</div>
          <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
            <label style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="radio" name="nivel-la" defaultChecked /> OK
            </label>
            <label style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="radio" name="nivel-la" /> Insuficiente
            </label>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontWeight:700}}>Nivel de aceite cojinete bomba lado LOA</div>
          <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
            <label style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="radio" name="nivel-loa" defaultChecked /> OK
            </label>
            <label style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="radio" name="nivel-loa" /> Insuficiente
            </label>
          </div>
        </div>

        <div style={{marginTop:16}}>
          <div style={{fontWeight:700}}>Fugas en Cierres</div>
          <div style={{display:'flex',gap:12,marginTop:8}}>
            <label style={{display:'flex',alignItems:'center',gap:6}}><input type="checkbox" /> LA</label>
            <label style={{display:'flex',alignItems:'center',gap:6}}><input type="checkbox" /> LOA</label>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontWeight:700}}>Fugas de aceite</div>
          <div style={{display:'flex',gap:12,marginTop:8}}>
            <label style={{display:'flex',alignItems:'center',gap:6}}><input type="checkbox" defaultChecked /> LA</label>
            <label style={{display:'flex',alignItems:'center',gap:6}}><input type="checkbox" /> LOA</label>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <div className="footer-left">
          <Link to="/vibrations">
            <button className="primary">Anterior</button>
          </Link>
        </div>
        <div className="footer-right">
          <Link to="/appearance">
            <button className="primary">Siguiente</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
