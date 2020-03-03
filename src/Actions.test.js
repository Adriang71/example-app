import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  loadEvent,
  postEvent,
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_FAILURE,
  POST_EVENT_REQUEST,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE
} from './Actions';
import fetchMock from 'fetch-mock'

import { getAction } from './getActionUtil';

export const mockStore = configureMockStore([thunk]);

describe("form  shoulde", () => {
  it("handles fetch all events ", async () => {
    const store = mockStore({
      isLoading: false,
      events: []
    });

    fetchMock.get('/events', {response: 200} )

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

    fetchMock.get('/events',  500, { overwriteRoutes: false })

    store.dispatch(loadEvent());
    expect(await getAction(store, LOAD_EVENT_REQUEST)).toEqual({type: LOAD_EVENT_REQUEST});
    expect(await getAction(store, LOAD_EVENT_FAILURE)).toEqual({type: LOAD_EVENT_FAILURE, error: 'invalid-json' });
    fetchMock.restore();
  });

  it("handles POST events ", async () => {
    const store = mockStore({});

    fetchMock.post('*', { response: 200 })

    store.dispatch(postEvent({name: 'foo', lastName: 'bar', email: 'foo@bar.pl', date: '22/02/22'}));
    expect(await getAction(store, POST_EVENT_REQUEST)).toEqual({type: POST_EVENT_REQUEST});
    expect(await getAction(store, POST_EVENT_SUCCESS)).toEqual({type: POST_EVENT_SUCCESS, response: {response: 200}});
    fetchMock.restore();
  });

  it("handles not POST event", async () => {
    const store = mockStore({});

    fetchMock.post('/new/event',  500, { overwriteRoutes: false } )

    store.dispatch(postEvent({name: 'foo', lastName: 'bar', email: 'foo@bar.pl', date: '22/02/22'}));
    expect(await getAction(store, POST_EVENT_REQUEST)).toEqual({type: POST_EVENT_REQUEST});
    expect(await getAction(store, POST_EVENT_FAILURE)).toEqual({type: POST_EVENT_FAILURE, error: 'invalid-json' });
    fetchMock.restore();
  });
});
