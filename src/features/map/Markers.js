import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMap } from './MapContext';
import { addMarkerToStatistics } from './mapSlice';

export default function Markers() {
  const [, setMarkers] = useState([]);
  const dispatch = useDispatch();
  const { map, place } = useMap();
  const google = window.google;

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
    if (place) updateMarkers(place);
  }, [place, updateMarkers]);

  return <></>;
}
