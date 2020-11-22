# Google Maps Api Test

Exercise to practice with the Google Maps API. It follows the examples
given in their documentation. It uses the Places API with the Autocomplete
component. To start of Create React App was used with the Redux Toolkit.

In order to show off how to manage the API properly and how to break the
code into components I have chosen to go with the basic google maps package to
just connect the script via javascript instead of the CDN script tag.
There are some good packages that simplify using Google Maps a lot but it didn't
make sense for learn purposes.

To separate Google Maps API into components I decided to create a Map Context as
the map object and place object are very complex for the Redux Store, but
over the Context API they can be managed safely. Once we have the Google Maps
objects available on our "Global State" it's easier to break the code down into
components as they will be dependant on those global shared objects. I created the
context, a Map component, an Autocomplete component and the Markers component.
Redux store has only been kept to "fake" statistics. Markers are saved in the store
for the future posibility of displying all markers by a user in another Map
component / application.

## How to Run

yarn install
yarn start

## Link

[Link App](https://raulcote.github.io/google-maps-api-test/)
