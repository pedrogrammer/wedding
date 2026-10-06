import { useEffect, useRef } from 'react'
import { asset } from '../lib/assets'

// The reference moves between these positions over four 100px scroll intervals.
const positions = [0, 80, 169, 247, 309]

export function ScheduleRose() {
  const anchor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = anchor.current
    if (!node) return
    let frame = 0

    const update = () => {
      frame = 0
      // Measure the stationary wrapper so the rose's transform cannot feed back
      // into its scroll progress. Movement starts at the viewport's midpoint.
      const distance = Math.max(0, Math.min(400, window.innerHeight / 2 - node.getBoundingClientRect().top))
      const segment = Math.min(3, Math.floor(distance / 100))
      const progress = (distance - segment * 100) / 100
      const y = positions[segment] + (positions[segment + 1] - positions[segment]) * progress
      node.style.setProperty('--rose-offset', `${y}px`)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={anchor} className="schedule-rose positioned" aria-hidden="true">
    <img src={asset('rose.webp')} alt="" draggable={false} />
  </div>
}
