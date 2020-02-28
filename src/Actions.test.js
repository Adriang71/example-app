import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  loadEvent,
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_FAILURE
} from './Actions';
import fetchMock from 'fetch-mock'

import { getAction } from './getActionUtil';

export const mockStore = configureMockStore([thunk]);

describe("loadEvent shoulde", () => {
  it("handles fetch all events ", async () => {
    const store = mockStore({
      isLoading: false,
      events: []
    });

    fetchMock.get('*', { response: 200 })

    store.dispatch(loadEvent());
    expect(await getAction(store, LOAD_EVENT_REQUEST)).toEqual({type: LOAD_EVENT_REQUEST});
    expect(await getAction(store, LOAD_EVENT_SUCCESS)).toEqual({type: LOAD_EVENT_SUCCESS, response: {response: 200}});
    fetchMock.restore();
  });

  it("handles not fetch all events ", async () => {
    const store = mockStore({
      isLoading: false,
      events: []
    });

    fetchMock.get('*',  500 )

    store.dispatch(loadEvent());
    expect(await getAction(store, LOAD_EVENT_REQUEST)).toEqual({type: LOAD_EVENT_REQUEST});
    expect(await getAction(store, LOAD_EVENT_FAILURE)).toEqual({type: LOAD_EVENT_FAILURE, error: 'invalid-json' });
    fetchMock.restore();
  });
});