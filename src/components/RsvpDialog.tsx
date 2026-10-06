import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MusicButton } from './InvitationIntro'

export function RsvpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [message, setMessage] = useState('')
  const [musicPlaying, setMusicPlaying] = useState(() => !document.querySelector('audio')?.paused)
  useEffect(() => {
    const audio = document.querySelector('audio')
    if (!audio) return
    const update = () => setMusicPlaying(!audio.paused)
    audio.addEventListener('play', update)
    audio.addEventListener('pause', update)
    return () => { audio.removeEventListener('play', update); audio.removeEventListener('pause', update) }
  }, [])
  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (open) {
      node.showModal()
      document.body.style.overflowY = 'hidden'
    } else node.close()
    return () => { document.body.style.overflowY = '' }
  }, [open])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const entries = JSON.parse(localStorage.getItem('sacred-garden-rsvp') || '[]')
      localStorage.setItem('sacred-garden-rsvp', JSON.stringify([...entries, { ...values, savedAt: new Date().toISOString() }]))
      setMessage('Your response is saved on this device. It has not been sent to the hosts.')
    } catch { setMessage('Unable to save your response on this device. Please try again.') }
  }
  return <dialog ref={dialog} className="rsvp-dialog" aria-labelledby="rsvp-dialog-title" onCancel={onClose}
    onClick={event => { if (event.target === dialog.current) onClose() }}>
    <div className="dialog-close-bar"><button onClick={onClose} type="button" aria-label="Close dialog window"><span /></button></div>
    <div className="rsvp-form-card">
      <h2 id="rsvp-dialog-title">Confirm Your Attendance</h2>
      <p className="rsvp-deadline">Please RSVP before August 09</p>
      {message ? <p className="rsvp-message" role="status">{message}</p> : <form onSubmit={submit}>
        <label className="form-field">Your name<input name="Your name" required autoComplete="name" /></label>
        <fieldset><legend>Will you be attending?</legend>
          <label className="radio-option"><input type="radio" name="Will you be attending?" value="Accepts with pleasure" required />Accepts with pleasure</label>
          <label className="radio-option"><input type="radio" name="Will you be attending?" value="Declines with regret" required />Declines with regret</label>
        </fieldset>
        <label className="form-field">Number of Guests Attending<input name="Number of Guests Attending" required inputMode="numeric" pattern="[0-9]+" /></label>
        <label className="form-field">A Song That Gets You Dancing<input name="A Song That Gets You Dancing" /></label>
        <label className="form-field">Children Attending<span className="field-hint">Please include names and ages.</span><input name="Children Attending" required /></label>
        <button type="submit" className="rsvp-submit">Submit<span className="button-shine" /></button>
      </form>}
    </div>
    <MusicButton playing={musicPlaying} onToggle={() => {
      const audio = document.querySelector('audio')
      if (!audio) return
      if (audio.paused) void audio.play().catch(() => setMusicPlaying(false))
      else audio.pause()
    }} />
  </dialog>
}
