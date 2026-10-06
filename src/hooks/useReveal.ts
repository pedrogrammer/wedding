import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>(observeScene = false) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.08 })
    observer.observe(observeScene ? node.closest('.scene') || node : node)
    return () => observer.disconnect()
  }, [observeScene])
  return { ref, visible }
}
