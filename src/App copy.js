import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  KmlLayer,
  Marker,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '96vh',
};

const center = {
  lat: 41.876,
  lng: -87.624,
};

const onLoad = (marker) => {
  console.log('marker: ', marker);
};

const handleKmlError = (error) => {
  console.error('KML layer error:', error);
};

function MyComponent() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem('markers'));
    if (savedMarkers) {
      setMarkers(savedMarkers);
    }
  }, []);

  const handleMapClick = (event) => {
    setMarkers([
      ...markers,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem('markers', JSON.stringify(markers));
  }, [markers]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCHTBblEvzCzdWu2fIIqNjFbbuMhqKGP2k">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} onLoad={onLoad} />
        ))}
        <KmlLayer
          url="https://www.strongmotioncenter.org/map/cosmosVDC.kml"
          onUnmount={onLoad}
          onLoad={onLoad}
          onError={handleKmlError}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
