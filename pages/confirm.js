import { useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'

const Map = dynamic(() => import('../components/Map'), { ssr: false, loading: () => <div className="map-loading" /> })
const vehicles = [
  { id: 'everyday', name: 'Everyday', detail: 'Affordable rides for up to 4', eta: '3 min', price: 245, icon: '↗' },
  { id: 'comfort', name: 'Comfort', detail: 'Newer cars with extra legroom', eta: '5 min', price: 345, icon: '✳' },
  { id: 'xl', name: 'XL', detail: 'Room for groups up to 6', eta: '7 min', price: 515, icon: '▦' },
]
const ACCOUNT_KEY = 'urbanride-demo-account'
const RIDES_KEY = 'urbanride-demo-rides'

export default function Confirm() {
  const router = useRouter()
  const pickup = typeof router.query.pickup === 'string' ? router.query.pickup : 'Kolkata'
  const destination = typeof router.query.destination === 'string' ? router.query.destination : 'Howrah Station'
  const [selected, setSelected] = useState('everyday')
  const [account, setAccount] = useState(null)
  const [accountReady, setAccountReady] = useState(false)
  const [completedRide, setCompletedRide] = useState(null)
  const vehicle = vehicles.find(item => item.id === selected) || vehicles[0]

  useEffect(() => {
    if (!router.isReady) return
    try {
      setAccount(JSON.parse(window.localStorage.getItem(ACCOUNT_KEY) || 'null'))
      const rides = JSON.parse(window.localStorage.getItem(RIDES_KEY) || '[]')
      const matchingRide = rides.find(item => item.pickup === pickup && item.destination === destination)
      setCompletedRide(matchingRide || null)
    } catch {
      setAccount(null)
    } finally {
      setAccountReady(true)
    }
  }, [router.isReady, pickup, destination])

  function completeDemoRide() {
    if (!account) {
      router.push({ pathname: '/login', query: { returnTo: router.asPath } })
      return
    }
    const ride = { id: `UR-${Date.now().toString().slice(-8)}`, pickup, destination, vehicle: vehicle.name, price: vehicle.price, email: account.email, completedAt: new Date().toISOString() }
    let rides = []
    try {
      rides = JSON.parse(window.localStorage.getItem(RIDES_KEY) || '[]')
    } catch {
      rides = []
    }
    window.localStorage.setItem(RIDES_KEY, JSON.stringify([ride, ...rides.filter(item => item.id !== ride.id)].slice(0, 20)))
    setCompletedRide(ride)
  }

  return (
    <>
      <Head><title>Review your ride · UrbanRide</title><meta name="description" content="Review sample vehicle options and a trip estimate in this ride-booking demo." /></Head>
      <div className="site-frame">
        <SiteHeader />
        <main className="subpage-layout confirm-layout">
          <section className="confirm-panel" aria-labelledby="confirm-title">
            <Link href={{ pathname: '/search', query: { pickup, destination } }} className="back-link"><span aria-hidden="true">←</span> Edit route</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> {completedRide ? 'DEMO RIDE COMPLETE' : 'YOUR TRIP · FINAL STEP'}</div>
            <h1 id="confirm-title">{completedRide ? 'You’re all set.' : 'Choose your ride.'}</h1>
            {completedRide && <p className="subpage-copy">Your sample ride is complete. The receipt is saved to this browser’s demo profile.</p>}
            <div className="trip-route-card">
              <div className="trip-stop"><span className="route-marker pickup-marker" aria-hidden="true" /><div><small>Pickup</small><strong>{pickup}</strong></div></div>
              <div className="route-connector" aria-hidden="true" />
              <div className="trip-stop"><span className="route-marker dropoff-marker" aria-hidden="true" /><div><small>Destination</small><strong>{destination}</strong></div></div>
              <div className="trip-meta"><span>↗ &nbsp; Sample trip estimate</span><span>·</span><span>Demo data</span></div>
            </div>
            {completedRide ? <div className="receipt-card" role="status"><div className="receipt-success"><span aria-hidden="true">✓</span><div><strong>Demo ride confirmed</strong><small>Reference {completedRide.id}</small></div></div><div className="receipt-row"><span>Vehicle</span><strong>{completedRide.vehicle}</strong></div><div className="receipt-row"><span>Sample fare</span><strong>₹{completedRide.price}</strong></div><div className="receipt-row"><span>Account</span><strong>{completedRide.email}</strong></div><p>This is a completed demo only. No driver, payment, or ride provider was contacted.</p></div> : <>
            <div className="vehicle-heading"><span className="section-kicker">SAMPLE RIDE OPTIONS</span><span>Estimated fares · INR</span></div>
            <div className="vehicle-list" role="group" aria-label="Choose a ride type">
              {vehicles.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} className={`vehicle-option${selected === item.id ? ' is-selected' : ''}`} onClick={() => setSelected(item.id)}><span className="vehicle-icon" aria-hidden="true">{item.icon}</span><span className="vehicle-copy"><strong>{item.name}</strong><small>{item.detail}</small><em>Pickup in {item.eta}</em></span><span className="vehicle-price">₹{item.price}</span><span className="vehicle-check" aria-hidden="true">{selected === item.id ? '●' : '○'}</span></button>)}
            </div>
            <div className="payment-row"><span className="payment-icon" aria-hidden="true">▣</span><span><strong>Cash</strong><small>Payment method · demo</small></span><span className="payment-change">Sample</span></div>
            <button className="button button-dark button-wide confirm-cta" type="button" disabled={!accountReady} onClick={completeDemoRide}>{!accountReady ? 'Loading profile…' : account ? `Complete demo ride · ₹${vehicle.price}` : 'Sign in to complete demo ride'} <span aria-hidden="true">→</span></button>
            {!account && <p className="demo-note"><span aria-hidden="true">✳</span> A demo profile is required to save this sample ride on this browser.</p>}
            <p className="demo-note"><span aria-hidden="true">✳</span> Fare and timing are illustrative. No real ride or payment is made.</p>
            </>}
          </section>
          <section className="map-panel subpage-map" aria-label="Trip area map preview"><Map /><div className="map-top-card"><span className="live-dot" /> <span>TRIP AREA</span><span className="map-weather">Kolkata · India</span></div><div className="map-bottom-card"><div className="map-bottom-icon" aria-hidden="true">↗</div><div><strong>{pickup} → {destination}</strong><span>Illustrative route · distance not calculated</span></div><span className="map-bottom-arrow" aria-hidden="true">⌖</span></div></section>
        </main>
        <footer className="site-footer"><span>UrbanRide <span className="footer-mark">/</span> a ride-booking concept</span><Link href="/">{completedRide ? 'Start another demo' : 'Start over'}</Link></footer>
      </div>
    </>
  )
}
