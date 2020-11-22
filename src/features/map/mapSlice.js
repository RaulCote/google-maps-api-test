import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    markers: [],
  },
  reducers: {
    /* as redux toolkit uses immer library we 
      can use inside the reducers mutable js methods, 
      immer will produce internally a new array */

    addMarkerToStatistics: (state, action) => {
      state.markers.push(action.payload);
    },
  },
});

/* actions */
export const { addMarkerToStatistics } = mapSlice.actions;

/* selectors */
export const selectMarkers = state => state.map.markers;

/* reducer */
export default mapSlice.reducer;
