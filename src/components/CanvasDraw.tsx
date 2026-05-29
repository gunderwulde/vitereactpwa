import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

type CanvasHandle = {
  clear: () => void
  toDataURL: () => string | null
}

const CanvasDraw = forwardRef<CanvasHandle, { className?: string }>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawingRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctxRef.current = ctx

    const ratio = window.devicePixelRatio || 1

    const resize = () => {
      const canvas = canvasRef.current!
      const ctx = ctxRef.current!
      const data = canvas.toDataURL()
      const cssWidth = canvas.clientWidth || 300
      const cssHeight = canvas.clientHeight || 150
      canvas.width = Math.floor(cssWidth * ratio)
      canvas.height = Math.floor(cssHeight * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2
      if (data) {
        const img = new Image()
        img.onload = () => {
          ctx.clearRect(0, 0, cssWidth, cssHeight)
          ctx.drawImage(img, 0, 0, cssWidth, cssHeight)
        }
        img.src = data
      }
    }

    const getPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const onPointerDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId)
      drawingRef.current = true
      const pos = getPos(e.clientX, e.clientY)
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!drawingRef.current) return
      const pos = getPos(e.clientX, e.clientY)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!drawingRef.current) return
      drawingRef.current = false
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch (err) {}
      ctx.closePath()
    }

    canvas.style.touchAction = 'none'
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    resize()

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    clear() {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    },
    toDataURL() {
      const canvas = canvasRef.current
      if (!canvas) return null
      return canvas.toDataURL()
    },
    fromDataURL(dataUrl: string | null) {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (!canvas || !ctx || !dataUrl) return
      const ratio = window.devicePixelRatio || 1
      const cssWidth = canvas.clientWidth || 300
      const cssHeight = canvas.clientHeight || 150
      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, cssWidth, cssHeight)
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        ctx.drawImage(img, 0, 0, cssWidth, cssHeight)
      }
      img.src = dataUrl
    },
  }))

  return <canvas ref={canvasRef} className={className} />
})

export default CanvasDraw
