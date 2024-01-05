import { APIProvider, Map } from '@vis.gl/react-google-maps'
import './MapComponent.css'
import FestivalMarker from './FestivalMarker'
import DateSlider from './DateSlider'
import { useState, useEffect, useCallback } from 'react'

const config = require('./../config')

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
]

const MapComponent = () => {
  const berlinPosition = { lat: 52.52, lng: 13.405 }

  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState('2024-12-31')
  const [festivals, setFestivals] = useState([])

  const setDates = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
    console.log('Selected Dates:', startDate, endDate)
  }

  const fetchFestivals = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `${config.festivalDateRangeApi}?startDate=${startDate}&endDate=${endDate}`
      )
      const data = await response.json()
      setFestivals(data.festivals)
      console.log(`Festivals after`, festivals)
    } catch (error) {
      console.error('Error fetching festivals:', error)
    }
  }

  const fetchFestivalsCallback = useCallback(() => {
    fetchFestivals(startDate, endDate)
  }, [startDate, endDate])

  useEffect(() => {
    fetchFestivalsCallback()
  }, [fetchFestivalsCallback])

  return (
    <div className={`map-component`}>
      <APIProvider apiKey={config.googleMapsApiKey}>
        <Map
          center={berlinPosition}
          mapId={'yourfavoritemsetDatesap'}
          zoom={10}
          backgroundColor={'#000018'}
          styles={darkMapStyle}
        >
          {festivals.map(festival => (
            <FestivalMarker
              id={festival.id}
              name={festival.name}
              position={{
                lat: festival.latitude,
                lng: festival.longitude
              }}
            />
          ))}
        </Map>
      </APIProvider>
      <DateSlider setDates={setDates} />
    </div>
  )
}
export default MapComponent
