import React, { useEffect, useRef, useState } from 'react'

const LOCAL_KEY = 'photo_capture_image'

export default function PhotoCapture() {
  const [photo, setPhoto] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_KEY)
      if (stored) setPhoto(stored)
    } catch (e) {
      console.warn('No se pudo leer la foto local', e)
    }
  }, [])

  const openPicker = () => inputRef.current?.click()

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      try {
        localStorage.setItem(LOCAL_KEY, result)
      } catch (err) {
        console.warn('No se pudo guardar la foto local', err)
      }
      setPhoto(result)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    try { localStorage.removeItem(LOCAL_KEY) } catch {}
    setPhoto(null)
  }

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

      <div className="photo-box" onClick={openPicker} role="button" aria-label="Tomar foto">
        {photo ? (
          <img src={photo} alt="Foto" />
        ) : (
          <div className="placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H7L9 4H15L17 7H20C21.1046 7 22 7.89543 22 9V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V9C2 7.89543 2.89543 7 4 7Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="placeholder-text">Tocar para tomar foto</div>
          </div>
        )}

        {photo && (
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation()
              removePhoto()
            }}
            aria-label="Eliminar foto"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}
