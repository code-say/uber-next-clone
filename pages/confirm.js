import { useState } from 'react'
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

export default function Confirm() {
  const router = useRouter()
  const pickup = typeof router.query.pickup === 'string' ? router.query.pickup : 'Kolkata'
  const destination = typeof router.query.destination === 'string' ? router.query.destination : 'Howrah Station'
  const [selected, setSelected] = useState('everyday')
  const [confirmed, setConfirmed] = useState(false)
  const vehicle = vehicles.find(item => item.id === selected) || vehicles[0]

  return (
    <>
      <Head><title>Review your ride · UrbanRide</title><meta name="description" content="Review sample vehicle options and a trip estimate in this ride-booking demo." /></Head>
      <div className="site-frame">
        <SiteHeader />
        <main className="subpage-layout confirm-layout">
          <section className="confirm-panel" aria-labelledby="confirm-title">
            <Link href={{ pathname: '/search', query: { pickup, destination } }} className="back-link"><span aria-hidden="true">←</span> Edit route</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR TRIP · STEP 2 OF 2</div>
            <h1 id="confirm-title">Choose your ride.</h1>
            <div className="trip-route-card">
              <div className="trip-stop"><span className="route-marker pickup-marker" aria-hidden="true" /><div><small>Pickup</small><strong>{pickup}</strong></div></div>
              <div className="route-connector" aria-hidden="true" />
              <div className="trip-stop"><span className="route-marker dropoff-marker" aria-hidden="true" /><div><small>Destination</small><strong>{destination}</strong></div></div>
              <div className="trip-meta"><span>↗ &nbsp; Sample trip estimate</span><span>·</span><span>Demo data</span></div>
            </div>
            <div className="vehicle-heading"><span className="section-kicker">SAMPLE RIDE OPTIONS</span><span>Estimated fares · INR</span></div>
            <div className="vehicle-list" role="group" aria-label="Choose a ride type">
              {vehicles.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} className={`vehicle-option${selected === item.id ? ' is-selected' : ''}`} onClick={() => { setSelected(item.id); setConfirmed(false) }}><span className="vehicle-icon" aria-hidden="true">{item.icon}</span><span className="vehicle-copy"><strong>{item.name}</strong><small>{item.detail}</small><em>Pickup in {item.eta}</em></span><span className="vehicle-price">₹{item.price}</span><span className="vehicle-check" aria-hidden="true">{selected === item.id ? '●' : '○'}</span></button>)}
            </div>
            <div className="payment-row"><span className="payment-icon" aria-hidden="true">▣</span><span><strong>Cash</strong><small>Payment method · demo</small></span><span className="payment-change">Change</span></div>
            <button className="button button-dark button-wide confirm-cta" type="button" onClick={() => setConfirmed(true)}>{confirmed ? 'Demo ride selected ✓' : `Continue with ${vehicle.name}`} <span aria-hidden="true">→</span></button>
            <p className="demo-note"><span aria-hidden="true">✳</span> Fare and timing are illustrative. This prototype does not book a real ride.</p>
            {confirmed && <p className="confirmation-message" role="status">Your {vehicle.name} option is ready to review. No driver or payment has been contacted.</p>}
          </section>
          <section className="map-panel subpage-map" aria-label="Trip area map preview"><Map /><div className="map-top-card"><span className="live-dot" /> <span>TRIP AREA</span><span className="map-weather">Kolkata · India</span></div><div className="map-bottom-card"><div className="map-bottom-icon" aria-hidden="true">↗</div><div><strong>{pickup} → {destination}</strong><span>Illustrative route · distance not calculated</span></div><span className="map-bottom-arrow" aria-hidden="true">⌖</span></div></section>
        </main>
        <footer className="site-footer"><span>UrbanRide <span className="footer-mark">/</span> a ride-booking concept</span><Link href="/">Start over</Link></footer>
      </div>
    </>
  )
}
