export const LOAD_EVENT_REQUEST = 'LOAD_EVENT_REQUEST';
export const LOAD_EVENT_SUCCESS = 'LOAD_EVENT_SUCCESS';
export const LOAD_EVENT_FAILURE = 'LOAD_EVENT_FAILURE';
export const POST_EVENT_REQUEST = 'POST_EVENT_REQUEST';
export const POST_EVENT_SUCCESS = 'POST_EVENT_SUCCESS';
export const POST_EVENT_FAILURE = 'POST_EVENT_FAILURE';

export function loadEvent() {
  return (dispatch, getState) => {
    const { events } = getState()
    if (events.length > 0 ) {
      return
    }

    dispatch({
      type: 'LOAD_EVENT_REQUEST',
    })

    fetch(`api/events`).then(
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

export function postEvent(event) {
  return dispatch => {
    dispatch({
      type: 'POST_EVENT_REQUEST',
    })

    fetch('api/new/event', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(event)
    }).then(
      response => response.json())
      .then(response =>
        dispatch({
          type: 'POST_EVENT_SUCCESS',
          response
        }),
      error => {
        return dispatch({
          type: 'POST_EVENT_FAILURE',
          error: error.type,
        })
      }
    );

  }
}