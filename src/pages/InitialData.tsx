import '../styles/shared.css'

import { useRef, useState, useEffect } from 'react'
import CanvasDraw from '../components/CanvasDraw'
import { Link } from 'react-router-dom'
import { idbGet, idbSet } from '../utils/indexeddb'
import { useNavigate } from 'react-router-dom'

export default function InitialData() {
  const canvasRef = useRef<any>(null)
  const [date] = useState<Date>(() => new Date())
  const [plants, setPlants] = useState<Array<any>>([])
  const [selectedPlant, setSelectedPlant] = useState<string>('')
  const [contractNumber, setContractNumber] = useState<string>('')
  const [motivo, setMotivo] = useState<string>('')
  const navigate = useNavigate()
  const [loadingSave, setLoadingSave] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const cached = await idbGet('staticData')
        if (cached) {
          const parsed = JSON.parse(cached)
          const lista = parsed?.plantas || []
          setPlants(lista)
          if (lista.length > 0) setSelectedPlant(lista[0].codigoPlanta)
        }
      } catch (e) {
        console.error('Error reading staticData from IndexedDB', e)
      }
    })()
  }, [])

  useEffect(() => {
    // load existing intervention for selectedPlant
    if (!selectedPlant) return
    (async () => {
      try {
        const raw = await idbGet('interventions')
        if (!raw) return
        let list = []
        try { list = JSON.parse(raw) } catch {}
        // find last intervention for this plant
        const found = list.filter((i: any) => i.codigoPlanta === selectedPlant).sort((a: any,b: any)=> b.createdAt - a.createdAt)[0]
        if (found) {
          setContractNumber(found.numeroContrato || '')
          setMotivo(found.motivo || '')
          // load signature into canvas
          try { canvasRef.current?.fromDataURL(found.firma || null) } catch {}
          setHasSaved(true)
        } else {
          // clear fields if none
          setContractNumber('')
          setMotivo('')
          try { canvasRef.current?.clear() } catch {}
          setHasSaved(false)
        }
      } catch (err) { console.error('Error loading intervention', err) }
    })()
  }, [selectedPlant])

  const formatDate = (d?: Date | null) => {
    if (!d) return ''
    return d.toLocaleDateString()
  }

  async function saveIntervention() {
    setLoadingSave(true)
    try {
      const firma = canvasRef.current?.toDataURL() || null
      const raw = await idbGet('interventions')
      let list: any[] = []
      if (raw) {
        try { list = JSON.parse(raw) } catch {}
      }

      // check if exists
      const existingIndex = list.findIndex(i => i.codigoPlanta === selectedPlant)
      const intervention = {
        id: existingIndex >= 0 ? list[existingIndex].id : 'INT-' + Date.now().toString(36),
        codigoPlanta: selectedPlant,
        fecha: date.toISOString(),
        numeroContrato: contractNumber,
        motivo,
        firma,
        createdAt: Date.now()
      }

      if (existingIndex >= 0) {
        list[existingIndex] = intervention
      } else {
        list.push(intervention)
      }

      await idbSet('interventions', JSON.stringify(list))
      setHasSaved(true)
    } catch (err) {
      console.error('Error saving intervention', err)
    } finally {
      setLoadingSave(false)
    }
  }

  async function deleteIntervention() {
    try {
      const raw = await idbGet('interventions')
      if (!raw) return
      let list = []
      try { list = JSON.parse(raw) } catch {}
      const filtered = list.filter((i: any) => i.codigoPlanta !== selectedPlant)
      await idbSet('interventions', JSON.stringify(filtered))
      setHasSaved(false)
      setContractNumber('')
      setMotivo('')
      try { canvasRef.current?.clear() } catch {}
    } catch (err) {
      console.error('Error deleting intervention', err)
    }
  }

  return (
    <div className="page-container">
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
          <select value={selectedPlant} onChange={e => setSelectedPlant(e.target.value)}>
            {plants.length === 0 && <option value="">No hay plantas</option>}
            {plants.map((p) => (
              <option key={p.codigoPlanta} value={p.codigoPlanta}>{`${p.codigoPlanta} - ${p.nombrePlanta}`}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Introduzca el número de contrato</label>
          <input placeholder="COS-26-12D-70750" value={contractNumber} onChange={e => setContractNumber(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Motivo de la asistencia</label>
          <textarea rows={4} placeholder="Describa el motivo" value={motivo} onChange={e => setMotivo(e.target.value)} />
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

        <div className="form-row">
            {hasSaved && (
              <button type="button" onClick={async () => { await deleteIntervention() }} style={{ marginLeft: 8 }}>Eliminar datos guardados</button>
            )}
        </div>

      </div>

      <div className="page-footer">
        <div className="footer-left">
          <Link to="/">
            <button className="primary">Anterior</button>
          </Link>
        </div>
        <div className="footer-right">
          <button className="primary" onClick={async () => {
            await saveIntervention()
            navigate('/group-selection')
          }}>Siguiente</button>
        </div>
      </div>
    </div>
  )
}
