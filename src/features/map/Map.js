import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';
import MapContext from './MapContext';
import './Map.css';

const countries = {
  es: {
    center: {
      lat: 41.294856,
      lng: -4.055685,
    },
    zoom: 5,
  },
};

const mapOptions = {
  center: countries.es.center,
  zoom: countries.es.zoom,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  zoomControl: false,
};

function MapProvider({ apiKey, children, style }) {
  const [map, setMap] = useState(null);
  const [errorLoadingMaps, setErrorsLoading] = useState(false);
  const mapEl = useRef();

  useEffect(() => {
    async function loadMaps() {
      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.load();

        const google = window.google;

        const map = new google.maps.Map(mapEl.current, mapOptions);

        setMap(map);
      } catch (err) {
        console.error('Error loading maps: ', err);
        setErrorsLoading(true);
      }
    }

    loadMaps();
  }, [apiKey]);

  if (errorLoadingMaps) {
    // it should be properly styled, a nice beautiful component etc..
    return <h1>Something went wrong...</h1>;
  }

  return (
    <div id="map" ref={mapEl} style={style}>
      <MapContext.Provider value={map}>
        {map ? children : <></>}
      </MapContext.Provider>
    </div>
  );
}

MapProvider.propTypes = {
  apiKey: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object.isRequired,
};

export default MapProvider;
