import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import './MapComponent.css'

const config = require('./config');

const MapComponent = () => {
    const position = { lat: 61.2176, lng: -149.8997 };

    return (
        <div className={`map-component`}>
            <APIProvider apiKey={config.googleMapsApiKey}>
                <Map center={position} zoom={10}>
                    <Marker position={position} />
                </Map>
            </APIProvider>
        </div>
    );
}

export default MapComponent;