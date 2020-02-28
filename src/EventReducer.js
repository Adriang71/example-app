import {
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_FAILURE,
} from './Actions'

const initialState = {
  isLoading: false,
  events: [],
  errors: null,
}

export default function eventReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_EVENT_REQUEST:
      return { ...state, isLoading: true }
   case LOAD_EVENT_SUCCESS:
      return { ...state, isLoading: false, events: action.response }
    case LOAD_EVENT_FAILURE:
      return { ...state, isLoading: false, errors: action.error }
    default:
      return state
  }
}