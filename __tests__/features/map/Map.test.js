import React from 'react';
import Map from '../../../src/features/map/Map';
import { render, screen } from '@testing-library/react';
import MapProvider from '../../../src/features/map/MapContext';
import * as GoogleMaps from '@googlemaps/js-api-loader';

const Loader = jest.spyOn(GoogleMaps, 'Loader');

describe('Map Component', () => {
  window.google = {
    maps: {
      Map: jest.fn().mockImplementation(() => ({ mapObject: 'GoogleMaps' })),
    },
  };

  function renderComponent() {
    render(
      <MapProvider>
        <Map apiKey="superSecretKey" style={{ width: '100%', height: '100vh' }}>
          <div>Hello</div>
        </Map>
      </MapProvider>
    );
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`it should call the Google Maps API and upload the map object to
the context, it should show children components once the map is loaded`, async () => {
    Loader.mockImplementationOnce(() => ({
      load: () => {},
    }));

    renderComponent();

    expect(Loader).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Hello')).toBeInTheDocument();
  });

  test(`it should show an error component if the google maps api 
  fails to load`, async () => {
    Loader.mockImplementationOnce(() => ({
      load: () => {
        throw new Error();
      },
    }));

    renderComponent();

    expect(
      await screen.findByText('Something went wrong...')
    ).toBeInTheDocument();
  });
});
