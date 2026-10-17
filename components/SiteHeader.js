import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="UrbanRide home"><span className="wordmark-icon" aria-hidden="true">u</span>urbanride<span className="wordmark-period">.</span></Link>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="/#how-it-works">How it works</a>
        <Link href="/search">Explore rides</Link>
        <a href="/#demo-note">About this demo</a>
      </nav>
      <div className="header-actions"><span className="header-locale"><span aria-hidden="true">◎</span> EN · IN</span><Link href="/#home-title" className="header-cta">Get moving <span aria-hidden="true">↗</span></Link></div>
    </header>
  )
}
