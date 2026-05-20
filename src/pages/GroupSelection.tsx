import '../styles/shared.css'
import { Link } from 'react-router-dom'


export default function GroupSelection() {

return (
  <div className="page-container">
    <div className="header">
      <button className="back">‹</button>
      <h3>Selección del SERVICIO</h3>
      <button className="close">✕</button>
    </div>

    <div className="page-content">
      <div style={{ marginBottom: 8, fontWeight: 600 }}>Planta: <span style={{ fontWeight: 400 }}>ACOSOL MARBELLA</span></div>

      <div className="form-row">
        <label>Seleccione la planta del menú desplegable</label>
        <select defaultValue="ALTA PRESION 1">
          <option>ALTA PRESION 1</option>
          <option>ALTA PRESION 2</option>
          <option>OTRO</option>
        </select>
      </div>

      <div className="form-row">
        <label>Introduzca el número de horas de funcionamiento de este servicio</label>
        <input style={{ width: 80, marginLeft: 8 }} />
      </div>
    </div>

    <div className="page-footer">
      <div className="footer-left">
        <Link to="/initial-data">
          <button className="primary">Anterior</button>
        </Link>
      </div>
      <div className="footer-right">
        <Link to="/hydraulic-data">
          <button className="primary">Siguiente</button>
        </Link>
      </div>
    </div>
  </div>
)
}
