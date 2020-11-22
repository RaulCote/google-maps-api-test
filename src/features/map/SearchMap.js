import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMap } from './MapContext';
import { addMarkerToStatistics } from './mapSlice';

const countryRestrict = {
  country: 'es',
};

export default function SearchMap() {
  const dispatch = useDispatch();
  const map = useMap();
  const google = window.google;
  const [, setMarkers] = useState([]);
  const inputEl = useRef(null);

  const updateMarkers = useCallback(
    place => {
      if (!place || !place.geometry) {
        return;
      }

      // Get the icon, name and location of the place.
      const bounds = new google.maps.LatLngBounds();

      // Clear out old markers.
      setMarkers(prevMarkers => {
        prevMarkers.forEach(marker => {
          marker.setMap(null);
        });

        return [];
      });

      /* Only sending to redux state the necessary data to 
     recreate the markers for statistics when needed */
      dispatch(
        addMarkerToStatistics({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          title: place.name,
        })
      );

      setMarkers([
        new google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name,
        }),
      ]);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      map.fitBounds(bounds);
    },
    [dispatch, google, map]
  );

  useEffect(() => {
    /* Using Autocomplete instead of SearchBox as it makes
     * less calls to Google Maps */
    const searchBox = new google.maps.places.Autocomplete(inputEl.current, {
      componentRestrictions: countryRestrict,
    });

    // Bias the SearchBox results towards current map's viewport.
    const boundsListener = map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    const placesListener = searchBox.addListener('place_changed', () => {
      const newPlace = searchBox.getPlace();

      updateMarkers(newPlace);
    });

    return () => {
      google.maps.event.removeListener(boundsListener);
      google.maps.event.removeListener(placesListener);
    };
  }, [google, map, updateMarkers]);

  return (
    <input id="searchBox" type="text" placeholder="Search..." ref={inputEl} />
  );
}
