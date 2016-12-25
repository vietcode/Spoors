import { TOGGLE_GEOLOCATION, GEOLOCATED } from '../constants/ActionTypes';

export function toggle() {
  return {
    type: TOGGLE_GEOLOCATION
  }
}

export function geolocate (location) {
  return {
    type: GEOLOCATED,
    payload: location
  }
}