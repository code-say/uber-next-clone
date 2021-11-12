import { useEffect } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl'


mapboxgl.accessToken =
 'pk.eyJ1IjoiY29kZXNheSIsImEiOiJja3Z0NXBjODgwamxzMm5rM3hkNzY5eHFnIn0.V-EVMOQ7xKiz1D2GxJwB-g';

const Map = () => {

    useEffect(() => {
        const map = new mapboxgl.Map({
          container: "map",
          style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
          center: [87.747803, 22.978624],  ///[lng, lat],
          zoom: 6,
      })

      addToMap(map)
      
    })


    const addToMap = (map) => {
        const marker1 = new mapboxgl.Marker()
        .setLngLat([87.747803, 22.978624])
        .addTo(map);
    }


    return (
        <Wrapper id="map"></Wrapper>
    )
}

export default Map

const Wrapper = tw.div`
    flex-1
`
