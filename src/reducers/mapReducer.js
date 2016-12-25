import { VIEW_LOCATION, TOGGLE_GEOLOCATION, GEOLOCATED } from '../constants/ActionTypes.js';

const initialState = {
  selectedMarker: null,
  waypoints: [],
  geolocating: false,
  geolocation: undefined
};

function mapState(state = initialState, { type, payload }) {
  switch (type) {
    case VIEW_LOCATION:
      return {
        ...state,
        selectedMarker: payload
      };
    case GEOLOCATED:
      return {
        ...state,
        geolocation: payload
      }
    case TOGGLE_GEOLOCATION:
      return {
        ...state,
        geolocating: !state.geolocating
      }
    default:
     return state;
  }
}

export default mapState;