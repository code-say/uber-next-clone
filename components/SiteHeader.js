import { useEffect, useState } from 'react'
import Link from 'next/link'

const ACCOUNT_KEY = 'urbanride-demo-account'

export default function SiteHeader() {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    function readAccount() {
      try {
        setAccount(JSON.parse(window.localStorage.getItem(ACCOUNT_KEY) || 'null'))
      } catch {
        setAccount(null)
      }
    }

    readAccount()
    window.addEventListener('storage', readAccount)
    window.addEventListener('urbanride-account-change', readAccount)
    return () => {
      window.removeEventListener('storage', readAccount)
      window.removeEventListener('urbanride-account-change', readAccount)
    }
  }, [])

  function signOut() {
    window.localStorage.removeItem(ACCOUNT_KEY)
    window.dispatchEvent(new Event('urbanride-account-change'))
  }

  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="UrbanRide home"><span className="wordmark-icon" aria-hidden="true">u</span>urbanride<span className="wordmark-period">.</span></Link>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="/#how-it-works">How it works</a>
        <Link href="/search">Explore rides</Link>
        <a href="/#demo-note">About this demo</a>
      </nav>
      <div className="header-actions"><span className="header-locale"><span aria-hidden="true">◎</span> EN · IN</span>{account ? <><Link href="/login" className="header-account">Hi, {account.name.split(' ')[0]}</Link><button className="header-login" type="button" onClick={signOut}>Sign out</button></> : <Link href="/login" className="header-login">Sign in</Link>}<Link href="/#home-title" className="header-cta">Get moving <span aria-hidden="true">↗</span></Link></div>
    </header>
  )
}
