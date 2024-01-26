import { APIProvider, Map } from '@vis.gl/react-google-maps'
import './MapComponent.css'
import FestivalMarker from './FestivalMarker'
import DateSlider from './DateSlider'
import { useState, useEffect } from 'react'

const config = require('./../config')
const userUtils = require('./../userUtils')

const MapComponent = ({ checkedGenres, userChanged }) => {
  const berlinPosition = { lat: 52.52, lng: 13.405 }

  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState('2024-12-31')
  const [festivals, setFestivals] = useState([])

  const [currentGenres, setCurrentGenres] = useState([])
  const [favoriteFestivals, setFavoriteFestivals] = useState([])
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const handleFavoriteChange = async (festivalId, value) => {
    const user = await userUtils.getUserData()
    if (!user) return
    const token = userUtils.getTokenFromCookie('token')
    try {
      const response = await fetch(config.favoriteFestivalApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          festivalId: festivalId,
          value: value
        })
      })

      const data = await response.json()
      if (!response.ok)
        throw new Error(data.message || 'Failed to update favorite festivals')
      setFavoritesAndGenres()
      console.log('Favorite status updated successfully:', data)
    } catch (error) {
      console.error('Error updating favorite status:', error)
    }
  }

  const setDates = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
    console.log('Selected Dates:', startDate, endDate)
  }

  const fetchFestivals = async () => {
    try {
      const response = await fetch(
        `${config.festivalDateRangeApi}?startDate=${startDate}&endDate=${endDate}`
      )
      const data = await response.json()
      let filteredFestivals = data.festivals

      //only contains right genres
      filteredFestivals = filteredFestivals.filter(festival =>
        currentGenres.includes(festival.music_genre)
      )

      //only contains favorites
      if (favoritesOnly) {
        filteredFestivals = filteredFestivals.filter(festival =>
          favoriteFestivals.includes(festival.id)
        )
      }

      setFestivals(filteredFestivals)
    } catch (error) {
      console.error('Error fetching festivals:', error)
    }
  }

  const setFavoritesAndGenres = async () => {
    const user = await userUtils.getUserData()
    if (user != null && user.user != null) {
      setFavoriteFestivals(user.user.favorite_festivals)
    } else {
      setFavoriteFestivals([])
    }
    setFavoritesOnly(checkedGenres.includes('Favorites'))
    setCurrentGenres(checkedGenres)
  }

  useEffect(() => {
    setFavoritesAndGenres()
  }, [checkedGenres, userChanged])

  useEffect(() => {
    fetchFestivals()
  }, [startDate, endDate, currentGenres])

  return (
    <div className={`map-component`}>
      <APIProvider apiKey={config.googleMapsApiKey}>
        <Map
          center={berlinPosition}
          mapId={'yourfavoritemsetDatesap'}
          zoom={10}
          backgroundColor={'#000018'}
          /*styles={darkMapStyle} this woulda worked if we didnt need advanced maps :( */
        >
          {festivals.map(festival => (
            <FestivalMarker
              key={festival.id}
              id={festival.id}
              name={festival.name}
              position={{
                lat: festival.latitude,
                lng: festival.longitude
              }}
              favoriteFestivals={favoriteFestivals}
              handleFavoriteChange={handleFavoriteChange}
            />
          ))}
        </Map>
      </APIProvider>
      <DateSlider setDates={setDates} />
    </div>
  )
}
export default MapComponent
