import React from 'react';
import MapProvider from './features/map/MapContext';
import Autocomplete from './features/map/Autocomplete';
import Map from './features/map/Map';
import Markers from './features/map/Markers';
import { API_KEY } from './constants';

function App() {
  return (
    <MapProvider>
      <Map apiKey={API_KEY} style={{ width: '100%', height: '100vh' }}>
        <Autocomplete />
        <Markers />
      </Map>
    </MapProvider>
  );
}

export default App;
