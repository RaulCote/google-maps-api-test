import './Map.css';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@googlemaps/js-api-loader';
import { useMap } from './MapContext';

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
  gestureHandling: 'cooperative',
};

function Map({ apiKey, children, style }) {
  const [errorLoadingMaps, setErrorsLoading] = useState(false);
  const mapEl = useRef();
  const { map, loadMap } = useMap();

  useEffect(() => {
    async function initMap() {
      try {
        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.load();

        const google = window.google;

        const map = new google.maps.Map(mapEl.current, mapOptions);

        loadMap(map);
      } catch (err) {
        setErrorsLoading(true);
      }
    }

    initMap();
  }, [apiKey, loadMap]);

  if (errorLoadingMaps) {
    // this error should be properly styled, a nice beautiful component
    // to show when the maps api fails
    return <h1>Something went wrong...</h1>;
  }

  return (
    <div id="map" ref={mapEl} style={style}>
      {map ? children : <></>}
    </div>
  );
}

Map.propTypes = {
  apiKey: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object.isRequired,
};

export default Map;
