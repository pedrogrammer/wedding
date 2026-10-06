import { type CSSProperties, type ReactNode } from 'react'
import { asset } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'

export function Reveal({ children, className = '', style, effect = 'rise', delay = 0, duration = 2 }: {
  children: ReactNode; className?: string; style?: CSSProperties;
  effect?: 'rise' | 'fade' | 'zoom' | 'left' | 'right'; delay?: number; duration?: number
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal reveal-${effect} ${visible ? 'is-visible' : ''} ${className}`}
    style={{ ...style, '--delay': `${delay}s`, '--duration': `${duration}s` } as CSSProperties}>{children}</div>
}

export function Artwork({ name, className = '', width, top, left, height, motion = '', style }: {
  name: string; className?: string; width: number; top: number; left: number;
  height?: number; motion?: string; style?: CSSProperties
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(true)
  return <div ref={ref} aria-hidden="true" className={`artwork ${className}`} style={{ width, height, top, left, ...style }}>
    <img src={asset(name)} alt="" draggable={false} className={motion ? `motion-${motion}` : undefined}
      style={{ ...(height ? { height: '100%', objectFit: 'fill' } : {}), ...(motion ? { animationPlayState: visible ? 'running' : 'paused' } : {}) }} />
  </div>
}

export function Chevron({ className = '' }: { className?: string }) {
  return <svg className={`chevron ${className}`} viewBox="0 0 25 16" aria-hidden="true">
    <path d="M1 1 12.5 14 24 1" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
}
