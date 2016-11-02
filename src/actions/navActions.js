import { POP_ROUTE, PUSH_ROUTE } from '../constants/ActionTypes';

export function push (route) {
  return {
    type: PUSH_ROUTE,
    payload: route
  }
}

export function pop () {
  return {
    type: POP_ROUTE
  }
}