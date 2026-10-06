import { useRef, useState, type PointerEvent } from 'react'
import { asset } from '../lib/assets'

export const venueMapUrl = 'https://maps.google.com/?cid=5824723048659184494'

export function VenueMap() {
  const [expanded, setExpanded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const drag = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null)
  const pan = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || zoom === 1) return
    const limit = 335 * (zoom - 1) / 2
    setOffset({ x: Math.max(-limit, Math.min(limit, drag.current.originX + event.clientX - drag.current.x)),
      y: Math.max(-limit, Math.min(limit, drag.current.originY + event.clientY - drag.current.y)) })
  }
  return <div className={`venue-map ${expanded ? 'map-expanded' : ''}`} aria-label="Map of Islamic Center of Melville">
    <div className="map-image-window" onPointerDown={event => {
      if (zoom === 1) return
      drag.current = { x: event.clientX, y: event.clientY, originX: offset.x, originY: offset.y }
      event.currentTarget.setPointerCapture(event.pointerId)
    }} onPointerMove={pan} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}
      style={{ touchAction: zoom === 1 ? 'pan-y' : 'none' }}>
      <img src={asset('venue-map.jpg')} alt="Street map showing the Islamic Center of Melville on Old East Neck Road by the Long Island Expressway"
        draggable={false} style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} />
    </div>
    <a className="open-map" href={venueMapUrl} target="_blank" rel="noreferrer">Open in Maps <span aria-hidden="true">↗</span></a>
    <div className="map-controls">
      {expanded && <><button aria-label="Zoom in" onClick={() => setZoom(value => Math.min(3, value + 0.5))}>+</button>
        <button aria-label="Zoom out" onClick={() => { setZoom(value => Math.max(1, value - 0.5)); setOffset({ x: 0, y: 0 }) }}>−</button></>}
      <button aria-label={expanded ? 'Close map controls' : 'Map camera controls'} onClick={() => { setExpanded(value => !value); setZoom(1); setOffset({ x: 0, y: 0 }) }}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 4-4 4m12-4 4 4M4 16l4 4m12-4-4 4M12 8v8M8 12h8" /></svg>
      </button>
    </div>
  </div>
}
