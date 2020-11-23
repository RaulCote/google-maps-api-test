import React from 'react';
import Autocomplete from '../../../src/features/map/Autocomplete';
import { render } from '@testing-library/react';
import * as MapContext from '../../../src/features/map/MapContext';

const useMap = jest.spyOn(MapContext, 'useMap');

describe('Autocomplete Component', () => {
  const map = {};

  const listenerMockValue = { title: 'Barcelona' };

  const mockAddListener = jest.fn((event, callback) => {
    map[event] = callback;
  });

  const mockBoundListener = jest.fn((event, callback) => {
    map[event] = callback;
  });

  const updatePlaceMock = jest.fn();

  useMap.mockImplementation(() => ({
    map: {
      mapObject: 'google',
      addListener: mockBoundListener,
      getBounds: jest.fn(),
    },
    updatePlace: updatePlaceMock,
  }));

  window.google = {
    maps: {
      places: {
        Autocomplete: jest.fn().mockImplementation(() => ({
          addListener: mockAddListener,
          getPlace: () => listenerMockValue,
          setBounds: jest.fn(),
        })),
      },
    },
  };

  test(`it calls updatePlace when google maps api communicate
  a place has changed`, async () => {
    render(<Autocomplete />);
    map.place_changed(() => listenerMockValue);

    expect(window.google.maps.places.Autocomplete).toHaveBeenCalledTimes(1);
    expect(mockAddListener).toHaveBeenCalledTimes(1);
    expect(mockBoundListener).toHaveBeenCalledTimes(1);
    expect(updatePlaceMock).toHaveBeenCalledTimes(1);
    expect(updatePlaceMock).toHaveBeenCalledWith(listenerMockValue);
  });
});
