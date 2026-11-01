import { legalTitles } from '../data/legal'
import { useRef, useState } from 'react'
import { formStorageKeys, setMotionPaused, useMotionPaused } from '../data/sitePreferences'



function ContactDetails() {
  return <p>FORM is developed by Habeeb Adewole. For project or privacy enquiries, email <a href="mailto:brightopeyemi4@gmail.com">brightopeyemi4@gmail.com</a> or use the public contact channels on <a href="https://adebola.me" target="_blank" rel="noopener noreferrer">Habeeb’s portfolio (opens in a new tab)</a>. A gym operator and its registered business details have not yet been appointed for this installation.</p>
}

export function LegalPage({ path }: { path: string }) {
  const paused = useMotionPaused()
  const [message, setMessage] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const clearButton = useRef<HTMLButtonElement>(null)
  function exportData() {
    try {
      const data = Object.fromEntries(formStorageKeys.map(key => [key, localStorage.getItem(key)]))
      const url = URL.createObjectURL(new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)], { type: 'application/json' }))
      const link = document.createElement('a'); link.href = url; link.download = 'form-browser-data.json'; link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setMessage('Browser data export requested. Keep the file private; it may contain your profile details.')
    } catch { setMessage('Browser storage is unavailable. Your data could not be exported.') }
  }
  function clearData() {
    try {
      formStorageKeys.forEach(key => localStorage.removeItem(key))
      window.location.reload()
    } catch { dialog.current?.close(); setMessage('Browser storage could not be cleared. Use your browser’s site-data settings instead.') }
  }
  return <article className="legal-page page-width section-space">
    <header><p className="section-caption">FORM · Information and choices</p><h1 tabIndex={-1}>{legalTitles[path]}</h1><p>Last updated: 1 November 2026</p></header>
    {path === '/privacy' && <>
      <section><h2>Who is responsible</h2><ContactDetails /><p>This policy covers this installation of FORM and the data it actually uses today. A future gym service will need its operator’s identity, contact details and updated processing information before accepting customers.</p></section>
      <section><h2>Information used and why</h2><p>Account and enquiry forms check the information you type in browser memory. They do not currently create an account, send an email or deliver an enquiry. Passwords are not saved by FORM. Avoid entering health information, identity documents, payment-card details or other sensitive information.</p><p>If you choose to save a profile, FORM stores your display name, optional email address, optional training focus and communication preferences in this browser. Name and email support the profile display; the training focus is optional. Bookings, membership selections and admin edits also stay in browser storage. Communication switches record preferences only; no marketing or reminder emails are sent.</p><p>The hosting provider, Vercel, receives technical request information such as IP address, browser and requested resources to deliver and secure the site. Hosting retention and access settings must be confirmed by the deployment owner. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel’s privacy policy (opens in a new tab)</a>.</p></section>
      <section><h2>Lawful use and your choices</h2><p>We use the information you enter to carry out the local action you request. Before any server-based service launches, the operator must identify and document a lawful basis for each use, including responding to enquiries and fulfilling memberships. Optional marketing must have a separate, freely given choice; withdrawing it must be as easy as giving it. Reading this notice is not consent to unrelated processing.</p><p>This installation has no advertising, behavioural profiling, analytics scripts or third-party embedded players. We do not sell the information entered into these forms. Local storage remains until you clear it or your browser removes it. FORM does not impose an automatic expiry on these saved records.</p></section>
      <section><h2>Access, correction and deletion</h2><p>Change saved profile details in <a href="#/member/profile">Profile settings</a>. Use <a href="#/settings">Privacy &amp; display settings</a> to export or clear FORM’s browser records. Other users of the same browser profile may be able to see saved details. Clearing local data does not delete hosting-provider logs.</p><p>Where the Nigeria Data Protection Act applies, you may have rights to information, access, correction, erasure, portability, objection, restriction and withdrawal of consent, subject to legal limits. Contact the project maintainer using the channels above. You may also complain to the <a href="https://ndpc.gov.ng/" target="_blank" rel="noopener noreferrer">Nigeria Data Protection Commission (opens in a new tab)</a>.</p></section>
      <section><h2>Children, providers and changes</h2><p>This installation is not intended to collect children’s information. A gym offering services to children must establish the necessary age and guardian arrangements first. No health screening or biometric data is collected. Hosting may involve processing outside Nigeria; the operator must assess provider contracts and applicable transfer safeguards before collecting customer data. Material changes to processing will require an updated notice and, where needed, a new choice.</p></section>
    </>}
    {path === '/terms' && <>
      <section><h2>About this website</h2><ContactDetails /><p>You may browse the site and explore its current functionality. FORM does not currently sell a membership, confirm a physical class reservation or process payments. Prices, staff records and schedules must be replaced with the appointed gym’s approved information before commercial launch.</p></section>
      <section><h2>Using FORM responsibly</h2><p>Use the website lawfully. Do not upload other people’s personal information without authority, enter sensitive health or card data, interfere with the site or attempt unauthorised access. Local member and admin views are not authenticated accounts.</p><p>Training descriptions are general information, not personalised medical advice. A real gym must provide appropriate supervision, safety procedures and any necessary participation arrangements. No particular fitness or health outcome is guaranteed.</p></section>
      <section><h2>Bookings, prices and purchases</h2><p>Selections currently change browser records only. A real purchase must clearly state the seller, complete price and applicable taxes, service, renewal and cancellation terms before an order is confirmed. No recurring charge is authorised by using this version. Read the <a href="#/refunds">refund policy</a> for the current position.</p></section>
      <section><h2>Content and external links</h2><p>Stock images depict training activities and do not identify actual FORM employees, members or facilities. Media and fonts remain subject to their respective licences. <a href="/licenses/media-sources.txt">View the media source register</a>. External websites have their own terms and privacy practices.</p></section>
      <section><h2>Your rights and enquiries</h2><p>Nothing on this website excludes mandatory consumer rights, liability that cannot lawfully be excluded, or access to a competent regulator or court. Business-specific service terms and applicable jurisdiction must be settled with the gym operator before trading. Contact the project maintainer using the channels above for questions or a content complaint.</p></section>
    </>}
    {path === '/cookies' && <>
      <section><h2>Cookies and tracking</h2><p>The application currently sets no cookies and includes no analytics, advertising pixels, social-media widgets or third-party embedded videos/maps. Videos, photography and fonts are served from this site. Hosting may process technical request logs; these are different from application cookies.</p><p>There is no optional tracking to accept, so FORM does not display an “accept all” cookie banner. If optional tracking or embeds are introduced, they must remain off until the required choice is made, with an equally accessible rejection and withdrawal option. This policy and the actual network behaviour must be reviewed at that time.</p></section>
      <section><h2>Browser storage</h2><p>FORM uses localStorage, which is different from cookies, to remember actions you request on this device. These records are not automatically sent to a FORM API and have no automatic expiry.</p><table><caption>FORM browser storage inventory</caption><thead><tr><th scope="col">Record</th><th scope="col">Purpose and when stored</th></tr></thead><tbody>
        <tr><td>form.preferences.v1</td><td>Your automatic-motion choice, after changing it.</td></tr>
        <tr><td>form.demo-profile.v1</td><td>Profile details and preferences, after saving a profile.</td></tr>
        <tr><td>form.demo-bookings.v1</td><td>Selected classes, after booking or cancellation.</td></tr>
        <tr><td>form.demo-membership.v1</td><td>Selected plan/status, after a membership change.</td></tr>
        <tr><td>form.admin-schedule.v1</td><td>Weekly schedule edits, after saving or cancelling.</td></tr>
        <tr><td>form.admin-trainers.v1</td><td>Trainer edits, after saving.</td></tr>
      </tbody></table><p>Use <a href="#/settings">Privacy &amp; display settings</a> or your browser’s site-data controls to remove these records. Browsing the public pages does not require saving a profile.</p></section>
    </>}
    {path === '/refunds' && <>
      <section><h2>Current payment status</h2><p>This installation does not collect card details, take payment, issue a real invoice or sell a gym membership. Checkout outcomes change local selections only. There is no FORM charge to refund from this installation.</p></section>
      <section><h2>If you have a payment question</h2><p>Contact the business named on your payment record. Do not send full card numbers, PINs, passwords or security codes. For a concern about this site, contact Habeeb Adewole through <a href="https://adebola.me" target="_blank" rel="noopener noreferrer">the portfolio contact channels (opens in a new tab)</a>.</p></section>
      <section><h2>Before paid memberships launch</h2><p>The gym must publish its cancellation procedure, treatment of unused sessions, failed or duplicate payments, gym-cancelled classes, renewal and pause terms, and refund method and timing before collecting money. These terms must preserve applicable consumer rights. This page does not impose a blanket “no refunds” rule or waive statutory rights.</p><p>In Nigeria, the Federal Competition and Consumer Protection Act includes rights relating to advance booking cancellation and reasonable cancellation charges. The operator’s final policy must reflect the law and the service actually supplied.</p></section>
    </>}
    {path === '/service-information' && <>
      <section><h2>Project contact</h2><ContactDetails /></section>
      <section><h2>Business identity and content</h2><p>FORM is being prepared for use by an independently operated gym. No gym’s legal name, registration number, premises, telephone number or opening hours have been verified for this installation. No physical venue is represented as available for visits.</p><p>Existing coach names, class schedules, prices and administration records are example content awaiting replacement with approved business information. Stock athletes and locations illustrate training; they are not named members of staff or client endorsements. There are no customer testimonials on this installation.</p></section>
      <section><h2>Accessibility</h2><p>Use a keyboard to navigate links, forms and dialogs. A skip link moves to the main content. You can pause automatic video and carousel movement from any footer or in <a href="#/settings">display settings</a>. The site also respects your device’s reduced-motion preference.</p><p>Accessibility is an ongoing review, not a certification. If a page or form blocks you, share the page and the difficulty through the project contact channels above. Do not include sensitive information.</p></section>
    </>}
    {path === '/settings' && <>
      <section><h2>Automatic motion</h2><p>Pause background videos, rotating photos and entrance animations across FORM. Your device’s reduced-motion or data-saving preferences also limit automatic media.</p><button className="button button-dark" aria-pressed={paused} onClick={() => setMotionPaused(!paused)}>{paused ? 'Resume automatic motion' : 'Pause automatic motion'}</button></section>
      <section><h2>Your browser data</h2><p>Export or remove the profile, preferences, bookings, membership choices and admin edits stored by FORM in this browser. Exports may contain personal information. Clearing these records restores the initial example data and reloads the page. It does not remove hosting logs or data held by another business.</p><div className="privacy-actions"><button className="button button-dark" onClick={exportData}>Export FORM browser data</button><button ref={clearButton} className="button" onClick={() => dialog.current?.showModal()}>Clear FORM browser data</button></div><p role="status">{message}</p></section>
      <section><h2>Optional tracking</h2><p>No optional analytics, advertising or embedded third-party content is enabled. There are no tracking permissions to accept or reject.</p><a className="text-link" href="#/cookies">Read the storage inventory</a></section>
      <dialog ref={dialog} className="class-dialog" aria-labelledby="clear-data-title" aria-describedby="clear-data-description" onClose={() => clearButton.current?.focus()}><h2 id="clear-data-title">Clear FORM browser data?</h2><p id="clear-data-description">This removes your saved profile, bookings, membership choices, admin edits and motion preference from this browser. Export first if you want a copy. This action cannot be undone.</p><div className="privacy-actions"><button className="button button-dark" autoFocus onClick={() => dialog.current?.close()}>Keep my data</button><button className="button" onClick={clearData}>Confirm clear and reload</button></div></dialog>
    </>}
  </article>
}
