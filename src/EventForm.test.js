import React from 'react'
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import fetchMock from 'fetch-mock'
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import EventForm from './EventForm';

const TestProvider = ({store, children}) =>
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={store}>
      {children}
    </Provider>
  </MuiPickersUtilsProvider>

const mockStore = configureMockStore([thunk]);


describe("form should", () => {
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
        <EventForm />
      </TestProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(container).toMatchSnapshot();
  });

  it("submit", async () => {
    const onSubmit = jest.fn();
    const store = mockStore({
      isLoading: false,
      events:[]
    });
    const { container, queryByText } = render(
      <TestProvider store={store}>
        <EventForm onSubmit={onSubmit} />
      </TestProvider>
    );

    const name = container.querySelector('input[name="name"]')
    const lastName = container.querySelector('input[name="lastName"]')
    const email = container.querySelector('input[name="email"]')
    const date = container.querySelector('input[name="date"]')
    const submit = container.querySelector('button[type="submit"]')

    await act(async () => {

      await fireEvent.change(name, {
        target: {
          value: 'mockname'
        }
      })

      await fireEvent.change(lastName, {
        target: {
          value: 'mocklastname'
        }
      })

      await fireEvent.change(email, {
        target: {
          value: 'example@o2.pl'
        }
      })

      await fireEvent.change(date, {
        target: {
          value: '22/02/2022'
        }
      })

      await fireEvent.click(submit);

      expect(onSubmit).toHaveBeenCalled();
      expect(queryByText('Required*')).toBeNull()
    });
  });

});