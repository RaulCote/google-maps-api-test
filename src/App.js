import React from 'react';
import './App.css';
import SearchMap from './features/map/SearchMap';
import MapProvider from './features/map/Map';
import { API_KEY } from './constants';

function App() {
  return (
    <div className="App">
      <MapProvider apiKey={API_KEY} style={{ width: '100%', height: '100vh' }}>
        <SearchMap />
      </MapProvider>
    </div>
  );
}

export default App;
