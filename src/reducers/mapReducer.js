import { VIEW_LOCATION } from '../constants/ActionTypes.js';

const initialState = {
  selectedMarker: null,
  waypoints: []
};

function mapState(state = initialState, { type, payload }) {
  switch (type) {
    case VIEW_LOCATION:
      return {
        ...state,
        selectedMarker: payload
      };
    default:
     return state;
  }
}

export default mapState;