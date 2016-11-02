import { 
  GEOCODE_PENDING, 
  GEOCODE_FULFILLED, 
  GEOCODE_REJECTED 
} from '../constants/ActionTypes';

export function geocoding(address) {
  return {
    type: GEOCODE_PENDING,
    payload: address
  }
}

export function geocoded(address, places) {
  return {
    type: GEOCODE_FULFILLED,
    payload: {
      address,
      places
    },
    error: false
  }
}

export function failedGeocoding(error) {
  return {
    type: GEOCODE_REJECTED,
    payload: error,
    error: true
  }
}