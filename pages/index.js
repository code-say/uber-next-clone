import { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SiteHeader from '../components/SiteHeader'

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <div className="map-loading" aria-label="Loading map" />,
})

const quickDestinations = ['Salt Lake', 'Howrah Station', 'New Town']

export default function Home() {
  const router = useRouter()
  const [pickup, setPickup] = useState('Kolkata')
  const [destination, setDestination] = useState('')
  const [error, setError] = useState('')

  function startRide(event) {
    event.preventDefault()
    const nextDestination = destination.trim()
    if (!nextDestination) {
      setError('Add a destination to see your ride options.')
      return
    }
    setError('')
    router.push({ pathname: '/search', query: { pickup: pickup.trim() || 'Kolkata', destination: nextDestination } })
  }

  return (
    <>
      <Head>
        <title>UrbanRide — Move through your city</title>
        <meta name="description" content="Explore a polished ride-booking demo for Kolkata. Choose your pickup, set a destination and compare ride options." />
        <meta name="theme-color" content="#f6f6f2" />
      </Head>
      <div className="site-frame">
        <SiteHeader />
        <main className="booking-layout">
          <section className="booking-panel" aria-labelledby="home-title">
            <div className="eyebrow"><span className="eyebrow-dot" /> ONE COMPLETE RIDE DEMO · KOLKATA</div>
            <h1 id="home-title">Your city.<br />Your ride.</h1>
            <p className="intro-copy">Try one complete ride experience: choose a route, select a vehicle, and finish with a saved demo receipt.</p>

            <div className="ride-tabs" role="group" aria-label="Ride type">
              <button className="ride-tab is-active" type="button" aria-pressed="true"><span aria-hidden="true">↗</span> Ride</button>
              <button className="ride-tab" type="button" disabled title="Scheduled rides are not part of this demo"><span aria-hidden="true">◷</span> Reserve</button>
            </div>

            <form className="route-form" onSubmit={startRide}>
              <label className="route-field">
                <span className="route-marker pickup-marker" aria-hidden="true" />
                <span className="route-label">Pickup location</span>
                <input value={pickup} onChange={event => setPickup(event.target.value)} placeholder="Enter pickup location" autoComplete="street-address" />
              </label>
              <div className="route-connector" aria-hidden="true" />
              <label className="route-field">
                <span className="route-marker dropoff-marker" aria-hidden="true" />
                <span className="route-label">Where to?</span>
                <input value={destination} onChange={event => { setDestination(event.target.value); setError('') }} placeholder="Add a destination" autoComplete="off" />
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-dark button-wide" type="submit">Start demo ride <span aria-hidden="true">→</span></button>
            </form>

            <div className="quick-picks">
              <span className="section-kicker">POPULAR AROUND YOU</span>
              <div className="quick-pick-list">
                {quickDestinations.map(place => (
                  <button key={place} type="button" className="quick-pick" onClick={() => setDestination(place)}>
                    <span className="quick-pick-icon" aria-hidden="true">⌖</span>{place}<span className="quick-pick-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="demo-note" id="demo-note"><span aria-hidden="true">✳</span> Demo only. A local profile saves your sample receipt; no real ride is booked.</p>
          </section>

          <section className="map-panel" aria-label="Map preview">
            <Map />
            <div className="map-top-card"><span className="live-dot" /> <span>YOUR CITY, IN VIEW</span><span className="map-weather">Kolkata · India</span></div>
            <div className="map-bottom-card">
              <div className="map-bottom-icon" aria-hidden="true">↗</div>
              <div><strong>Plan your next trip</strong><span>Pick a place and we’ll show the way.</span></div>
              <span className="map-bottom-arrow" aria-hidden="true">→</span>
            </div>
          </section>
        </main>

        <section className="below-fold" id="how-it-works">
          <div className="section-heading"><span className="section-kicker">SIMPLE FROM THE START</span><h2>Three steps. Zero guesswork.</h2></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><h3>Choose your route</h3><p>Set a pickup and destination to get started.</p></article>
            <article className="step-card"><span className="step-number">02</span><h3>Compare ride options</h3><p>See sample vehicle types, arrival times and fares.</p></article>
            <article className="step-card"><span className="step-number">03</span><h3>Complete the demo</h3><p>Sign in with a local demo profile and get your sample trip receipt.</p></article>
          </div>
        </section>
        <footer className="site-footer"><span>UrbanRide <span className="footer-mark">/</span> a ride-booking concept</span><a href="#home-title">Back to top ↑</a></footer>
      </div>
    </>
  )
}
