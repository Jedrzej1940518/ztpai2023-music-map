import React, { useState, useEffect } from 'react'
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

//onAddToFavorites

const FestivalMarker = ({
  id,
  name,
  position,
  favoriteFestivals,
  handleFavoriteChange
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false)
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [isFavorited, setIsFavortied] = useState(favoriteFestivals.includes(id))

  const handleAddToFavorites = () => {
    const newVal = !isFavorited
    setIsFavortied(newVal)
    handleFavoriteChange(id, newVal)
  }

  useEffect(() => {
    setIsFavortied(favoriteFestivals.includes(id))
  }, [favoriteFestivals])

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position}
        title={name}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              padding: '10px',
              backgroundColor: 'black',
              color: 'white'
            }}
          >
            <button
              onClick={handleAddToFavorites}
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isFavorited ? 'yellow' : 'white'
              }}
            >
              <FontAwesomeIcon
                icon={isFavorited ? faStarSolid : faStarRegular}
              />
            </button>
            <p>
              Festival ID {id} : {name}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

export default FestivalMarker
