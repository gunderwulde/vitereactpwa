import '../styles/shared.css'

import { Link } from 'react-router-dom'

export default function Vibrations(){
  return (
    <div className="page-container">
      <div className="header">
        <button className="back">‹</button>
        <h3>BOMBA - Vibraciones</h3>
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

        <div style={{marginTop:10}}>
          <div style={{fontWeight:700,marginBottom:8}}>Vibraciones Cojinete bomba LA</div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:12}}>VER</div>
              <input style={{width:'70px',margin:'6px auto'}} defaultValue="1" />
              <div style={{fontSize:12}}>RMS</div>
            </div>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:12}}>HORIZ</div>
              <input style={{width:'70px',margin:'6px auto'}} defaultValue="1,5" />
              <div style={{fontSize:12}}>RMS</div>
            </div>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:12}}>AXIAL</div>
              <input style={{width:'70px',margin:'6px auto'}} defaultValue="0,9" />
              <div style={{fontSize:12}}>RMS</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:16}}>
          <div style={{fontWeight:700,marginBottom:8}}>Vibraciones Cojinete bomba LOA</div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:12}}>VER</div>
              <input style={{width:'70px',margin:'6px auto'}} defaultValue="0,8" />
              <div style={{fontSize:12}}>RMS</div>
            </div>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:12}}>HORIZ</div>
              <input style={{width:'70px',margin:'6px auto'}} defaultValue="1,1" />
              <div style={{fontSize:12}}>RMS</div>
            </div>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:12}}>AXIAL</div>
              <input style={{width:'70px',margin:'6px auto'}} defaultValue="0,7" />
              <div style={{fontSize:12}}>RMS</div>
            </div>
          </div>
        </div>

      </div>

      <div className="page-footer">
        <div className="footer-left">
          <Link to="/temperatures">
            <button className="primary">Anterior</button>
          </Link>
        </div>
        <div className="footer-right">
          <Link to="/leaks-levels">
            <button className="primary">Siguiente</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
