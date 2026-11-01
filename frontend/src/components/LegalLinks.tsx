import { setMotionPaused, useMotionPaused } from '../data/sitePreferences'

export function LegalLinks({ compact = false }: { compact?: boolean }) {
  const paused = useMotionPaused()
  return <div className="legal-footer page-width">
    <nav aria-label="Policies and preferences">
      <a href="#/privacy">Privacy policy</a><a href="#/terms">Terms &amp; conditions</a>
      <a href="#/cookies">Cookie policy</a><a href="#/refunds">Refund policy</a>
      <a href="#/settings">Privacy &amp; display settings</a><a href="#/service-information">Service information</a>
    </nav>
    {!compact && <button type="button" aria-pressed={paused} onClick={() => setMotionPaused(!paused)}>{paused ? 'Resume automatic motion' : 'Pause automatic motion'}</button>}
  </div>
}
