//https://github.com/visgl/react-google-maps/blob/main/examples/markers-and-infowindows/src/marker-with-infowindow.tsx

import React, { useState } from 'react'
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'

const FestivalMarker = ({ id, name, position, genre }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false)
  const [markerRef, marker] = useAdvancedMarkerRef()

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position}
        title={'AdvancedMarker that opens an Infowindow when clicked.'}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <div>
            <p>
              Festival ID {id} : {name}\n genre : {genre}
            </p>
            <img
              src={process.env.PUBLIC_URL + '/logo192.png'}
              alt=''
              style={{ maxWidth: '20%' }}
            />
          </div>
        </InfoWindow>
      )}
    </>
  )
}

export default FestivalMarker
