export const LOAD_EVENT_REQUEST = 'LOAD_EVENT_REQUEST';
export const LOAD_EVENT_SUCCESS = 'LOAD_EVENT_SUCCESS';
export const LOAD_EVENT_FAILURE = 'LOAD_EVENT_FAILURE';

export function loadEvent() {
  return function(dispatch, getState) {
    const { events } = getState()
    if (events.length > 0 ) {
      return
    }

    dispatch({
      type: 'LOAD_EVENT_REQUEST',
    })

    fetch(`/events`).then(
      response => response.json())
      .then(response =>
        dispatch({
          type: 'LOAD_EVENT_SUCCESS',
          response
        }),
      error => {
        return dispatch({
          type: 'LOAD_EVENT_FAILURE',
          error: error.type,
        })
      }
    )
  }
}