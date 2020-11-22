import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

/* This context and useMap API have been created
  in order to have map and place objects in a global state for the maps, 
  Redux complains with complex items like those but Context can work
  perfectly. It lets me seperate the concepts better. As an example
  thanks to it I can have Markers into a separate file and not together 
  with Autocomplete search box */

const MapContext = createContext(null);

const MAP = 'MAP';
const PLACE = 'PLACE';

const mapContextReducer = (state, action) => {
  switch (action.type) {
    case MAP:
      return {
        ...state,
        map: action.payload,
      };
    case PLACE:
      return {
        ...state,
        place: action.payload,
      };
    default:
      return state;
  }
};

const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapContextReducer, {
    map: null,
    place: null,
  });

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

export function useMap() {
  const {
    state: { map, place },
    dispatch,
  } = useContext(MapContext);

  const loadMap = useCallback(
    map => {
      dispatch({
        type: MAP,
        payload: map,
      });
    },
    [dispatch]
  );

  const updatePlace = useCallback(
    place => {
      dispatch({
        type: PLACE,
        payload: place,
      });
    },
    [dispatch]
  );

  return { map, place, loadMap, updatePlace };
}

export default MapProvider;
