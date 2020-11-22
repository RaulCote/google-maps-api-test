import React, { useEffect, useRef } from 'react';
import { useMap } from './MapContext';

const countryRestrict = {
  country: 'es',
};

export default function Autocomplete() {
  const { map, updatePlace } = useMap();
  const google = window.google;
  const inputEl = useRef(null);

  useEffect(() => {
    /* Using Autocomplete instead of SearchBox as it makes
     * less calls to Google Maps */
    const autocomplete = new google.maps.places.Autocomplete(inputEl.current, {
      componentRestrictions: countryRestrict,
    });

    // Bias the SearchBox results towards current map's viewport.
    const boundsListener = map.addListener('bounds_changed', () => {
      autocomplete.setBounds(map.getBounds());
    });

    const placesListener = autocomplete.addListener('place_changed', () => {
      const newPlace = autocomplete.getPlace();

      updatePlace(newPlace);
    });

    return () => {
      google.maps.event.removeListener(boundsListener);
      google.maps.event.removeListener(placesListener);
    };
  }, [google, map, updatePlace]);

  return (
    <input
      id="autocomplete"
      type="text"
      placeholder="Search..."
      ref={inputEl}
    />
  );
}
