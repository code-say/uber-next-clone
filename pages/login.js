import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SiteHeader from '../components/SiteHeader'

const ACCOUNT_KEY = 'urbanride-demo-account'

export default function Login() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!router.isReady) return
    try {
      const account = JSON.parse(window.localStorage.getItem(ACCOUNT_KEY) || 'null')
      if (account) setEmail(account.email || '')
    } catch {
      window.localStorage.removeItem(ACCOUNT_KEY)
    }
  }, [router.isReady])

  function signIn(event) {
    event.preventDefault()
    const displayName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()
    if (!displayName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter your name and a valid email address to start the demo.')
      return
    }

    window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ name: displayName, email: normalizedEmail }))
    window.dispatchEvent(new Event('urbanride-account-change'))
    const requestedReturn = typeof router.query.returnTo === 'string' ? router.query.returnTo : '/'
    const returnTo = requestedReturn.startsWith('/') && !requestedReturn.startsWith('//') ? requestedReturn : '/'
    router.push(returnTo)
  }

  return (
    <>
      <Head><title>Sign in · UrbanRide</title><meta name="description" content="Create a local demo profile to complete a sample UrbanRide trip." /></Head>
      <div className="site-frame">
        <SiteHeader />
        <main className="login-layout">
          <section className="login-card" aria-labelledby="login-title">
            <Link href="/" className="back-link"><span aria-hidden="true">←</span> Back to UrbanRide</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR DEMO PROFILE</div>
            <h1 id="login-title">Sign in to ride.</h1>
            <p className="subpage-copy">Use a demo profile to finish the sample ride and keep its summary on this device.</p>
            <form className="login-form" onSubmit={signIn}>
              <label className="login-field"><span>Your name</span><input value={name} onChange={event => { setName(event.target.value); setError('') }} autoComplete="name" placeholder="Alex Morgan" required /></label>
              <label className="login-field"><span>Email address</span><input type="email" value={email} onChange={event => { setEmail(event.target.value); setError('') }} autoComplete="email" placeholder="you@example.com" required /></label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-dark button-wide" type="submit">Continue with demo profile <span aria-hidden="true">→</span></button>
            </form>
            <p className="demo-note"><span aria-hidden="true">✳</span> Demo sign-in only. No password, server account, or real authentication is used. Your profile stays in this browser.</p>
          </section>
          <aside className="login-aside"><div className="login-aside-icon" aria-hidden="true">u<span>.</span></div><span className="section-kicker">ONE SIMPLE DEMO</span><h2>Plan it.<br />Pick a ride.<br />See it through.</h2><p>Sign in with a local demo profile, choose a sample vehicle, and see a completed trip summary.</p><div className="login-progress"><span>01</span><div><strong>Choose a route</strong><small>Pick any destination around Kolkata.</small></div></div><div className="login-progress"><span>02</span><div><strong>Complete the demo ride</strong><small>Review a sample fare and ride receipt.</small></div></div></aside>
        </main>
        <footer className="site-footer"><span>UrbanRide <span className="footer-mark">/</span> a ride-booking concept</span><Link href="/">Return home</Link></footer>
      </div>
    </>
  )
}
