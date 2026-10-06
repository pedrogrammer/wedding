import { Fragment, useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

// Preserve the countdown target used by the published reference.
const eventDate = new Date(2026, 11, 8, 16, 0, 0).getTime()
function timeRemaining() {
  const distance = Math.max(0, eventDate - Date.now())
  return [Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24,
    Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60]
    .map((value, index) => index ? String(value).padStart(2, '0') : String(value))
}

function Digit({ value }: { value: string }) {
  const [display, setDisplay] = useState(value)
  const [changing, setChanging] = useState(false)
  const previous = useRef(value)
  useEffect(() => {
    if (previous.current === value) return
    previous.current = value
    const start = setTimeout(() => setChanging(true), 0)
    const finish = setTimeout(() => { setDisplay(value); setChanging(false) }, 520)
    return () => { clearTimeout(start); clearTimeout(finish) }
  }, [value])
  return <span className="number-window"><span className={`countdown-digit ${changing ? 'digit-out' : ''}`}>{display}</span></span>
}

export function Countdown() {
  const [values, setValues] = useState(timeRemaining)
  const { ref, visible } = useReveal<HTMLDivElement>()
  useEffect(() => {
    const interval = setInterval(() => setValues(timeRemaining()), 1000)
    return () => clearInterval(interval)
  }, [])
  return <section className="scene countdown-scene" aria-labelledby="countdown-heading">
    <h2 id="countdown-heading" className="script-title countdown-title">The Celebration Begins In</h2>
    <div ref={ref} className={`countdown ${visible ? 'countdown-revealed' : ''}`} role="timer" aria-label="Time until the celebration">
      {values.map((value, index) => <Fragment key={index}>
        {index > 0 && <span className={`countdown-separator separator-${index}`}>:</span>}
        <div className={`countdown-unit unit-${index}`}><Digit value={value} /><span className="countdown-label">{['Days', 'Hours', 'Minutes', 'Seconds'][index]}</span></div>
      </Fragment>)}
    </div>
  </section>
}
