import { GEOCODE_FULFILLED } from '../constants/ActionTypes';

const initialState = {
  key: '',
  loading: false,
  places: []
}

function geocodingState (state = initialState, action) {
  switch (action.type) {
    
    case GEOCODE_FULFILLED:
      const {address, places} = action.payload;
      return {
        key: address,
        places: places
      }

   default:
     return state;
  
  }
}

export default geocodingState;