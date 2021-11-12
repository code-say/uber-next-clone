import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Map from './components/Map'

const Confirm = () => {

    const [ PickupCoordinates, setPickupCoordinates ] = useState()
    const [ dropoffCoordinates, setDropoffCoordinates ] = useState()


    const getPickupCoordinates = () => {
        const pickuup = "kolkata";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickuup}.json?` +
            new URLSearchParams({
                access_token: "eyJ1IjoiY29kZXNheSIsImEiOiJja3Z0NXBjODgwamxzMm5rM3hkNzY5eHFnIn0",
                limit: 1,
            })
        )
        .then(response => response.json())
        .then(data => {
            setPickupCoordinates(data.features[0].center)
        })
        //?access_token= 
    }

    const getDropoffCoordinates = () => {
            const dropoff = "haldia";
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
                new URLSearchParams({
                    access_token: "eyJ1IjoiY29kZXNheSIsImEiOiJja3Z0NXBjODgwamxzMm5rM3hkNzY5eHFnIn0",
                    limit: 1
                })
            )
            .then(response => response.json())
            .then(data => {
                setDropoffCoordinates(data.features[0].center);
            })
    }

    useEffect(()=> {
        getPickupCoordinates();
        getDropoffCoordinates();
    }, [])

    return (
        <Wrapper>
            <Map />
            <RideContainer>
                Ride Selector
                confirm Button
                {PickupCoordinates}
                {dropoffCoordinates}
                
            </RideContainer>
        </Wrapper>
    )
}

export default Confirm


const Wrapper = tw.div`
flex h-screen flex-col
`
const RideContainer = tw.div`
flex-1
`