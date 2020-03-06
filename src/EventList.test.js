import React from 'react'
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import fetchMock from 'fetch-mock'
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import EventList from './EventList';

const TestProvider = ({store, children}) =>
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={store}>
      {children}
    </Provider>
  </MuiPickersUtilsProvider>

const mockStore = configureMockStore([thunk]);


describe("list should", () => {
  let emit;

  beforeAll(() => {
    ({ emit } = window._virtualConsole);
  });

  beforeEach(() => {
    fetchMock.post('*', {response: 200}, { overwriteRoutes: false })
    fetchMock.get('*', {response: 200}, { overwriteRoutes: false })
    window._virtualConsole.emit = jest.fn();
  });

  afterAll(() => {
    window._virtualConsole.emit = emit;
    fetchMock.restore();
  });

  it("display properly", () => {
    const store = mockStore({
        isLoading: false,
        events:[]
    });
    const { asFragment, container } = render(
      <TestProvider store={store}>
        <EventList />
      </TestProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(container).toMatchSnapshot();
  });

  it("display loading", async () => {
    const store = mockStore({
        isLoading: true,
        events:[]
    });
    const {  queryByText } = render(
      <TestProvider store={store}>
        <EventList />
      </TestProvider>
    );
    await wait(() => {
      expect(queryByText('Loading...')).not.toBeNull()
    });
  });

  it("not display loading", async () => {
    const store = mockStore({
        isLoading: false,
        events:[]
    });
    const {  queryByText } = render(
      <TestProvider store={store}>
        <EventList />
      </TestProvider>
    );
    await wait(() => {
      expect(queryByText('Loading...')).toBeNull()
    });
  });

  it("not display events", async () => {
    const store = mockStore({
        isLoading: false,
        events:[]
    });
    const {  queryByText } = render(
      <TestProvider store={store}>
        <EventList />
      </TestProvider>
    );
    await wait(() => {
      expect(queryByText('Check Event')).toBeNull()
    });
  });

  it("display events", async () => {
    const store = mockStore({
        isLoading: false,
        events:[
          {id:1, name: 'foo', lastName: 'Bar', email: 'foo@bar.pl', date: '22/22/22'},
          {id:2, name: 'foo', lastName: 'Bar', email: 'foo@bar.pl', date: '22/22/22'},
          {id:3, name: 'foo', lastName: 'Bar', email: 'foo@bar.pl', date: '22/22/22'}
        ]
    });
    const { queryAllByText } = render(
      <TestProvider store={store}>
        <EventList />
      </TestProvider>
    );
    await wait(() => {
      expect(queryAllByText('Check Event')).not.toBeNull()
    });
  });
});


