import React, { useEffect, useRef, useState } from 'react'
import { idbGet, idbSet, idbRemove } from '../utils/indexeddb';

const LOCAL_KEY = 'photo_capture_image'

export default function PhotoCapture() {
  const [photo, setPhoto] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const stored = await idbGet(LOCAL_KEY);
        if (stored) setPhoto(stored);
      } catch (e) {
        console.warn('No se pudo leer la foto local', e);
      }
    })();
  }, [])

  const openPicker = () => inputRef.current?.click()

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const result = reader.result as string
      try {
        await idbSet(LOCAL_KEY, result)
      } catch (err) {
        console.warn('No se pudo guardar la foto local', err)
      }
      setPhoto(result)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    (async () => {
      try { await idbRemove(LOCAL_KEY) } catch (err) { console.warn('No se pudo eliminar foto', err) }
      setPhoto(null)
    })();
  }

  // Camera controls
  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      streamRef.current = s
      if (videoRef.current) {
        videoRef.current.srcObject = s
        await videoRef.current.play()
      }
      setCameraActive(true)
    } catch (err) {
      console.error('No se pudo acceder a la cámara', err)
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    try {
      streamRef.current?.getTracks().forEach(t => t.stop())
    } catch {}
    streamRef.current = null
    if (videoRef.current) {
      try { videoRef.current.pause(); videoRef.current.srcObject = null } catch {}
    }
    setCameraActive(false)
  }

  const captureFromCamera = async () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const w = video.videoWidth || video.clientWidth || 640
    const h = video.videoHeight || video.clientHeight || 480
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, w, h)
    const data = canvas.toDataURL('image/png')
    try { await idbSet(LOCAL_KEY, data) } catch (err) { console.warn('No se pudo guardar la foto local', err) }
    setPhoto(data)
    stopCamera()
  }

  useEffect(() => {
    return () => { stopCamera() }
  }, [])

  return (
    <div className="photo-capture">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onFile}
        style={{ display: 'none' }}
      />

      <div className="photo-box" role="button" aria-label="Tomar foto" style={{ position: 'relative' }}>
        {/* Video preview when camera active and no saved photo */}
        {cameraActive && !photo ? (
          <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : photo ? (
          <img src={photo} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H7L9 4H15L17 7H20C21.1046 7 22 7.89543 22 9V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="placeholder-text">Tocar para abrir cámara</div>
          </div>
        )}

        {/* Overlay controls: capture, gallery, toggle camera */}
        <div style={{ position: 'absolute', right: 8, top: 8, display: 'flex', gap: 8 }}>
          <button onClick={(e) => { e.stopPropagation(); openPicker() }} style={{ padding: '6px 8px' }}>Galería</button>
          {!cameraActive ? (
            <button onClick={(e) => { e.stopPropagation(); startCamera() }} style={{ padding: '6px 8px' }}>Cámara</button>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); stopCamera() }} style={{ padding: '6px 8px' }}>Detener</button>
          )}
        </div>

        {/* Capture button at bottom center when camera active */}
        {cameraActive && !photo && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 12 }}>
            <button onClick={(e) => { e.stopPropagation(); captureFromCamera() }} className="primary">Capturar</button>
          </div>
        )}

        {/* Remove button when photo exists */}
        {photo && (
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation()
              removePhoto()
            }}
            aria-label="Eliminar foto"
            style={{ position: 'absolute', right: 8, bottom: 8 }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}
