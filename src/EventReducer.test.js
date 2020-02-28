import reducer from './EventReducer'
import * as actions from './Actions'

describe('envnt reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      errors: null,
      events: [],
      isLoading: false,
    });
  });

  it('should handle load action', () => {
    const loadAction = {
      type: actions.LOAD_EVENT_REQUEST
    };
    expect(reducer({}, loadAction)).toEqual({ isLoading: true });
  });

  it('should handle LOAD_EVENT_SUCCESS', () => {
    const successAction = {
      type: actions.LOAD_EVENT_SUCCESS,
      response: ['foo'],
    };
    expect(reducer({}, successAction)).toEqual({ isLoading: false, events: ['foo'] });
  });

  it('should handle LOAD_EVENT_FAILURE', () => {
    const failureAction = {
      type: actions.LOAD_EVENT_FAILURE,
      error: 'invalid-json',
    };
    expect(reducer({}, failureAction)).toEqual({ isLoading: false, errors: 'invalid-json' });
  });
});