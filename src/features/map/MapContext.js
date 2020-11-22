import { useContext, createContext } from 'react';

const MapContext = createContext(null);

export function useMap() {
  const map = useContext(MapContext);

  return map;
}

export default MapContext;
