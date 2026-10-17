import { useEffect, useRef, useState } from 'react'

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export default function Map({ className = '' }) {
  const container = useRef(null)
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [mapFailed, setMapFailed] = useState(false)

  useEffect(() => {
    if (!token || !container.current) return undefined
    let cancelled = false

    import('mapbox-gl').then(module => {
      if (cancelled || !container.current) return
      const mapboxgl = module.default || module
      mapboxgl.accessToken = token
      const map = new mapboxgl.Map({
        container: container.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [88.3639, 22.5726],
        zoom: 11.3,
        attributionControl: false,
        cooperativeGestures: true,
      })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')
      map.on('load', () => {
        if (cancelled) return
        new mapboxgl.Marker({ color: '#111310' }).setLngLat([88.3639, 22.5726]).addTo(map)
        setMapReady(true)
      })
      map.on('error', () => { if (!cancelled) setMapFailed(true) })
    }).catch(() => { if (!cancelled) setMapFailed(true) })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className={`map-canvas-shell ${className}`}>
      <div ref={container} className="map-canvas" aria-label="Map centered on Kolkata" />
      {(!token || !mapReady || mapFailed) && <div className="map-illustration" aria-hidden="true">
        <svg className="city-map" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
          <rect width="1200" height="900" fill="#e9eee8" />
          <path className="map-water" d="M-60 710 C150 650 168 526 296 490 C431 453 512 552 647 516 C781 480 826 360 964 346 C1082 333 1109 268 1260 226 L1260 960 -60 960Z" />
          <g className="map-parks"><path d="M122 155h192v118H122z"/><path d="M824 98h205v106H824z"/><path d="M838 586h174v130H838z"/><path d="M338 703h174v97H338z"/></g>
          <g className="map-roads">
            <path d="M-50 225 250 300 475 226 698 300 930 190 1240 236"/><path d="M-40 454 187 383 377 430 554 359 752 424 960 357 1240 397"/>
            <path d="M-45 625 176 548 344 586 532 503 744 568 927 496 1240 540"/><path d="M80 -30 136 222 226 407 262 614 336 928"/>
            <path d="M348 -20 400 189 488 366 519 536 607 908"/><path d="M615 -20 644 220 740 391 757 601 849 920"/>
            <path d="M899 -10 855 183 946 366 1000 536 1078 913"/><path d="M1096 -20 1030 244 1109 408 1162 645"/>
            <path className="map-road-major" d="M-25 334 222 320 420 276 623 333 837 277 1047 311 1230 278"/>
            <path className="map-road-major" d="M210 -25 284 198 365 361 448 527 477 928"/>
            <path className="map-road-major" d="M-40 530 194 467 407 483 606 442 790 486 989 425 1240 468"/>
          </g>
          <path className="map-route" d="M175 640 C272 600 283 504 402 464 S548 414 632 344 S775 285 846 222" />
          <circle className="route-halo" cx="175" cy="640" r="19"/><circle className="route-start" cx="175" cy="640" r="7"/>
          <circle className="route-halo" cx="846" cy="222" r="20"/><rect className="route-end" x="840" y="216" width="12" height="12" rx="2"/>
          <g className="map-labels"><text x="356" y="322">PARK STREET</text><text x="699" y="261">BIDHAN NAGAR</text><text x="511" y="600">KOLKATA</text><text x="926" y="565">SALT LAKE</text><text x="185" y="760">HOWRAH</text></g>
        </svg>
        <div className="map-credit">Illustrated city map · Kolkata</div>
      </div>}
      {!mapReady && <div className="map-loading-indicator" role="status">{mapFailed ? 'Map preview' : token ? 'Loading live map…' : 'Preview map'}</div>}
    </div>
  )
}
