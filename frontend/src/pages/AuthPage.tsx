import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './auth.css'

export type AuthMode = 'login' | 'signup' | 'reset-password'
type Field = 'name' | 'email' | 'password' | 'confirm'
const copy = {
  login: { title: 'WELCOME BACK.', intro: 'Make time for your next session.', action: 'Log in', photo: 'login', alt: 'An athlete in a gym locker room', line: 'KEEP SHOWING UP.' },
  signup: { title: 'FIND YOUR START.', intro: 'Take the first step towards your training routine.', action: 'Create account', photo: 'signup', alt: 'An athlete smiling during a gym session', line: 'BUILD FROM HERE.' },
  'reset-password': { title: 'LET’S RESET.', intro: 'Forgotten your password? Start with your email address.', action: 'Continue', photo: '', alt: '', line: '' },
}
const blank = { name: '', email: '', password: '', confirm: '' }

export function AuthPage({ mode }: { mode: AuthMode }) {
  const [values, setValues] = useState<Record<Field, string>>(blank)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [complete, setComplete] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const result = useRef<HTMLDivElement>(null)
  const content = copy[mode]
  const fields: Field[] = mode === 'signup' ? ['name', 'email', 'password', 'confirm'] : mode === 'login' ? ['email', 'password'] : ['email']
  const labels = { name: 'Full name', email: 'Email address', password: 'Password', confirm: 'Confirm password' }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Partial<Record<Field, string>> = {}
    if (mode === 'signup' && !values.name.trim()) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (mode === 'login' && !values.password.trim()) next.password = 'Enter a password.'
    if (mode === 'signup') {
      if (values.password.length < 8 || !values.password.trim()) next.password = 'Use at least 8 characters for your password.'
      if (!values.confirm || values.confirm !== values.password) next.confirm = 'Your passwords must match.'
    }
    setErrors(next)
    const first = fields.find(field => next[field])
    if (first) { form.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus(); return }
    setValues(blank)
    setShowPassword(false)
    setComplete(true)
    requestAnimationFrame(() => result.current?.focus())
  }
  return <section className={`auth-layout ${mode === 'reset-password' ? 'auth-reset' : ''}`} aria-label="Account entry">
    {content.photo && <div className="auth-visual"><img src={`/images/media/${content.photo}.jpg`} alt={content.alt} width="1200" height="1600" fetchPriority="high" /><div><p>Find your form.</p><p className="auth-statement">{content.line}</p><p>Purposeful training. A routine of your own.</p></div></div>}
    <div className="auth-content"><a className="text-link auth-back" href={mode === 'reset-password' ? '#/login' : '#home'}>{mode === 'reset-password' ? 'Back to login' : 'Back to FORM'}</a><p className="section-caption">{mode === 'signup' ? 'Join FORM' : mode === 'login' ? 'Member access' : 'Account support'}</p><h1 tabIndex={-1}>{content.title}</h1><p className="auth-intro">{content.intro}</p>
      {complete ? <div className="auth-result" ref={result} tabIndex={-1} role="status"><h2>Details checked.</h2><p>{mode === 'login' ? 'Your details are ready. Continue to your member space.' : mode === 'signup' ? 'Your details passed validation. Continue to explore FORM.' : 'Email address checked.'}</p><a className="button button-dark" href={mode === 'reset-password' ? '#/login' : '#/member'}>{mode === 'reset-password' ? 'Back to login' : 'Go to member space'}</a><button className="text-link" type="button" onClick={() => { setComplete(false); requestAnimationFrame(() => form.current?.querySelector('input')?.focus()) }}>Try again</button></div> : <form ref={form} className="auth-form" onSubmit={submit} noValidate>
        <a className="text-link" href="#/member">Go to member space</a><a className="text-link" href="#/admin">Club administration</a>
        {fields.map(field => {
          const password = field === 'password' || field === 'confirm'
          const help = field === 'password' && mode === 'signup'
          return <div className="form-field" key={field}><label htmlFor={`auth-${field}`}>{labels[field]}</label><div className={password ? 'password-input' : ''}><input id={`auth-${field}`} name={field} type={password ? showPassword ? 'text' : 'password' : field === 'email' ? 'email' : 'text'} value={values[field]} required maxLength={field === 'email' ? 254 : field === 'name' ? 100 : 128} autoComplete={password ? mode === 'signup' ? 'new-password' : 'current-password' : field === 'name' ? 'name' : 'email'} aria-invalid={!!errors[field]} aria-describedby={[errors[field] ? `${field}-error` : '', help ? 'password-help' : ''].filter(Boolean).join(' ') || undefined} onChange={event => { setValues(previous => ({ ...previous, [field]: event.target.value })); setErrors(previous => ({ ...previous, [field]: undefined, ...(field === 'password' ? { confirm: undefined } : {}) })) }} />{field === 'password' && <button type="button" aria-label={showPassword ? 'Hide passwords' : 'Show passwords'} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide' : 'Show'}</button>}</div>{help && <p className="form-note" id="password-help">Use at least 8 characters.</p>}{errors[field] && <p className="field-error" id={`${field}-error`}>{errors[field]}</p>}</div>
        })}
        {mode === 'login' && <a className="auth-forgot" href="#/reset-password">Forgot password?</a>}
        <button className="button button-dark auth-submit" type="submit">{content.action} <span aria-hidden="true">↗</span></button>
      </form>}
      {mode !== 'reset-password' && <p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to FORM?'} <a href={mode === 'signup' ? '#/login' : '#/signup'}>{mode === 'signup' ? 'Log in' : 'Create an account'}</a></p>}
    </div>
  </section>
}
