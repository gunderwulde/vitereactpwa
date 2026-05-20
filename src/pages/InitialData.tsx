import { useRef, useState } from 'react'
import './InitialData.css'
import '../styles/shared.css'
import CanvasDraw from '../components/CanvasDraw'
import { Link } from 'react-router-dom'

export default function InitialData() {
  const canvasRef = useRef<any>(null)
  const [date] = useState<Date>(() => new Date())

  const formatDate = (d?: Date | null) => {
    if (!d) return ''
    return d.toLocaleDateString()
  }

  return (
    <div className="initial-data page-container">
      <div className="header">
        <button className="back">‹</button>
        <h3>Datos Iniciales</h3>
        <button className="close">✕</button>
      </div>

      <div className="page-content">
        <div className="form-row date-row">
          <label>Fecha de la intervención</label>
          <div className="date-field" style={{ position: 'relative' }}>
            <div className="date-display">{formatDate(date)}</div>
          </div>
        </div>

        <div className="form-row">
          <label>Seleccione la planta del menú desplegable</label>
          <select defaultValue="ACOSOL MARBELLA">
            <option>ACOSOL MARBELLA</option>
            <option>Planta 2</option>
            <option>Planta 3</option>
          </select>
        </div>

        <div className="form-row">
          <label>Introduzca el número de contrato</label>
          <input placeholder="COS-26-12D-70750" />
        </div>

        <div className="form-row">
          <label>Motivo de la asistencia</label>
          <textarea rows={4} placeholder="Describa el motivo" />
        </div>

        <div className="form-row">
          <label>Firma</label>
          <div className="signature">
            <CanvasDraw ref={canvasRef} />
            <div className="sig-actions">
              <button type="button" onClick={() => canvasRef.current?.clear()}>Limpiar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <div className="footer-left">
          <Link to="/">
            <button className="primary">Anterior</button>
          </Link>
        </div>
        <div className="footer-right">
          <Link to="/group-selection">
            <button className="primary">Siguiente</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
