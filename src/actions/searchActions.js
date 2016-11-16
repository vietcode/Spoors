import { 
  GEOCODE_PENDING, 
  GEOCODE_FULFILLED, 
  GEOCODE_REJECTED,
  VIEW_LOCATION
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
      places: places.map((place) => {
        const { position, ...rest } = place;
        return {
          position: {
            latitude: position.lat,
            longitude: position.lng
          },
          ...rest
        };
      })
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

export function viewLocation(location) {
  return {
    type: VIEW_LOCATION,
    payload: location
  }
}