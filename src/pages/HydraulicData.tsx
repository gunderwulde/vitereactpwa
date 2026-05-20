import '../styles/shared.css'
import { Link } from 'react-router-dom'

export default function HydraulicData(){
  return (
    <div className="initial-data page-container">
      <div className="header">
        <button className="back">‹</button>
        <h3>BOMBA - Datos Hidráulicos</h3>
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

        <div style={{background:'#f6d9d0',padding:10,marginTop:8,borderRadius:4}}>
          <div style={{fontSize:13,fontWeight:700}}>GRUPO SIN FUNCIONAR</div>
          <div style={{fontSize:13,marginTop:6}}>REVISAR BOMBA?</div>
        </div>

        <div className="form-row">
          <label>Caudal</label>
          <div className="form-element">
            <input placeholder='m3/h'/>
          </div>
        </div>

        <div className="form-row">
          <label>Presión Aspiración</label>
          <div className="form-element">
            <input placeholder='bar(g)'/>
          </div>
        </div>

        <div className="form-row">
          <label>Presión Descarga</label>
          <div className="form-element">
            <input placeholder='bar(g)'/>
          </div>
        </div>

        <div className="form-row">
          <label>Posición Válvula Descarga</label>
          <div className="form-element">
            <input placeholder='%'/>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <div className="footer-left">
          <Link to="/group-selection">
            <button className="primary">Anterior</button>
          </Link>
        </div>
        <div className="footer-right">
          <Link to="/temperatures">
            <button className="primary">Siguiente</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
