import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  KmlLayer,
  Marker,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '90vh',
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
  const [markers, setMarkers] = useState([
    { lat: 41.851587179281076, lng: -87.62039511108398 },
  ]);
  const [kmlData, setKmlData] = useState(null);

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setKmlData('http://45.76.146.132:3100/s1kml.kml');
  //   }, 3000);
  // }, []);

  const handleKml = () => {
    setKmlData('http://45.76.146.132:3100/s1kml.kml');
    console.log('KML Click');
  };
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyCHTBblEvzCzdWu2fIIqNjFbbuMhqKGP2k">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          onClick={handleMapClick}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} onLoad={onLoad} />
          ))}
          {kmlData && (
            <KmlLayer
              url={kmlData}
              // url="https://www.strongmotioncenter.org/map/cosmosVDC.kml"
              onUnmount={onLoad}
              onLoad={onLoad}
              onError={handleKmlError}
              preserveViewport={true}
            />
          )}

          {/* <KmlLayer
          // url="http://45.76.146.132:3100/s1kml.kml"
          url="https://www.strongmotioncenter.org/map/cosmosVDC.kml"
          onUnmount={onLoad}
          onLoad={onLoad}
          onError={handleKmlError}
          preserveViewport={true}
        /> */}
          {/* {kmlData && <KmlLayer url={kmlData} />} */}
        </GoogleMap>
      </LoadScript>
      <div className="row">
        <button onClick={handleKml}>Show kml</button>
      </div>
    </>
  );
}

export default React.memo(MyComponent);
