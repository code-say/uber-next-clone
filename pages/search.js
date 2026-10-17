import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'

const Map = dynamic(() => import('../components/Map'), { ssr: false, loading: () => <div className="map-loading" /> })
const places = [
  { name: 'Howrah Station', detail: 'Railway station · Howrah', icon: '↗' },
  { name: 'New Town', detail: 'Business district · North Kolkata', icon: '⌖' },
  { name: 'Park Street', detail: 'Restaurants & nightlife · Central Kolkata', icon: '⌖' },
  { name: 'Netaji Subhas Chandra Bose Airport', detail: 'Airport · Dum Dum', icon: '✈' },
]

export default function Search() {
  const router = useRouter()
  const pickup = typeof router.query.pickup === 'string' ? router.query.pickup : 'Kolkata'
  const [query, setQuery] = useState('')
  const [selectedPickup, setSelectedPickup] = useState('Kolkata')

  useEffect(() => {
    if (typeof router.query.pickup === 'string') setSelectedPickup(router.query.pickup)
  }, [router.query.pickup])

  const filteredPlaces = useMemo(() => places.filter(place => `${place.name} ${place.detail}`.toLowerCase().includes(query.toLowerCase())), [query])

  function chooseDestination(destination) {
    router.push({ pathname: '/confirm', query: { pickup: selectedPickup || pickup, destination } })
  }

  return (
    <>
      <Head><title>Choose a destination · UrbanRide</title><meta name="description" content="Choose a destination and compare ride options in this Kolkata ride-booking demo." /></Head>
      <div className="site-frame">
        <SiteHeader />
        <main className="subpage-layout">
          <section className="search-panel" aria-labelledby="search-title">
            <Link href="/" className="back-link"><span aria-hidden="true">←</span> Back to map</Link>
            <div className="eyebrow"><span className="eyebrow-dot" /> ROUTE PLANNER</div>
            <h1 id="search-title">Where are you headed?</h1>
            <p className="subpage-copy">Choose a destination to preview vehicles and trip details.</p>
            <div className="route-card">
              <label className="route-field compact-field"><span className="route-marker pickup-marker" aria-hidden="true" /><span className="route-label">Pickup</span><input value={selectedPickup} onChange={event => setSelectedPickup(event.target.value)} aria-label="Pickup location" /></label>
              <div className="route-connector" aria-hidden="true" />
              <label className="route-field compact-field"><span className="route-marker dropoff-marker" aria-hidden="true" /><span className="route-label">Destination</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a place" aria-label="Search destination" /></label>
            </div>
            <div className="places-heading"><span className="section-kicker">{query ? 'MATCHING PLACES' : 'POPULAR DESTINATIONS'}</span><span className="places-count">{filteredPlaces.length} places</span></div>
            <div className="place-list">
              {filteredPlaces.length ? filteredPlaces.map(place => <button key={place.name} className="place-option" type="button" onClick={() => chooseDestination(place.name)}><span className="place-icon" aria-hidden="true">{place.icon}</span><span className="place-copy"><strong>{place.name}</strong><small>{place.detail}</small></span><span className="place-arrow" aria-hidden="true">→</span></button>) : <p className="empty-places">No matching suggestions. Try a nearby area or landmark.</p>}
            </div>
            <p className="demo-note"><span aria-hidden="true">✳</span> Suggested places are demo data. No ride request is sent.</p>
          </section>
          <section className="map-panel subpage-map" aria-label="Map preview"><Map /><div className="map-top-card"><span className="live-dot" /> <span>ROUTE PREVIEW</span><span className="map-weather">Kolkata · India</span></div><div className="map-bottom-card"><div className="map-bottom-icon" aria-hidden="true">⌖</div><div><strong>{selectedPickup || 'Kolkata'}</strong><span>Pickup point · edit above</span></div><span className="map-bottom-arrow" aria-hidden="true">···</span></div></section>
        </main>
        <footer className="site-footer"><span>UrbanRide <span className="footer-mark">/</span> a ride-booking concept</span><Link href="/">Cancel trip setup</Link></footer>
      </div>
    </>
  )
}
