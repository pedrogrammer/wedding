import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/assets'

export function MusicButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return <button className="music-toggle" onClick={onToggle} aria-label={playing ? 'Pause music' : 'Play music'}>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {playing ? <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></>
        : <polygon points="5,3 19,12 5,21" />}
    </svg>
  </button>
}

export function InvitationIntro() {
  const [stage, setStage] = useState<'sealed' | 'playing' | 'fading' | 'open'>('sealed')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const started = useRef(false)
  const finished = useRef(false)
  const finishTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(finishTimer.current), [])

  const finish = () => {
    if (finished.current || !started.current) return
    finished.current = true
    setStage('fading')
    finishTimer.current = setTimeout(() => setStage('open'), 1400)
  }

  const open = () => {
    if (started.current) return
    started.current = true
    setStage('playing')
    void audioRef.current?.play().catch(() => setPlaying(false))
    void videoRef.current?.play().catch(finish)
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play().catch(() => setPlaying(false))
    else audio.pause()
  }

  return <>
    <audio ref={audioRef} src={asset('music.mp3')} loop preload="none"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {stage !== 'open' && <>
      <button className={`envelope ${stage !== 'sealed' ? 'envelope-opening' : ''}`} onClick={open}
        aria-label="Open your invitation" disabled={stage !== 'sealed'}>
        <img src={asset('opening-poster.png')} alt="First frame of your invitation opening video" />
        <span className="envelope-prompt"><span className="envelope-chevron" /><span>Tap to open</span></span>
      </button>
      <div className={`opening-film ${stage === 'playing' ? 'film-playing' : ''} ${stage === 'fading' ? 'film-fading' : ''}`}
        aria-hidden="true">
        <video ref={videoRef} src={asset('opening.mp4')} poster={asset('opening-poster.png')}
          muted playsInline preload="auto" onEnded={finish} onError={finish} />
      </div>
    </>}
    {(stage === 'fading' || stage === 'open') && <MusicButton playing={playing} onToggle={toggleMusic} />}
  </>
}
