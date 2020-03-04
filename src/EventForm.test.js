import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import fetchMock from 'fetch-mock'
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import EventForm from './EventForm';


const mockStore = configureMockStore([thunk]);

beforeAll(() => {
  fetchMock.get('*', {response: 200} )
});

afterEach(() => {
  fetchMock.restore();
});

describe("form should", () => {
  it("display properly", async () => {
    const store = mockStore({
      isLoading: false,
      events: []
    });

    const { asFragment, container } = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>
          <EventForm />
        </Provider>
      </MuiPickersUtilsProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(container).toMatchSnapshot();
  });

  it("submit", async () => {
    const store = mockStore({
      isLoading: false,
      events: []
    });
    const onSubmit = jest.fn();
    const { getByText  } = render(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store}>
          <EventForm onSubmit={onSubmit} />
        </Provider>
      </MuiPickersUtilsProvider>
    );

    fireEvent.click(getByText("Submit"));

    expect(onSubmit).toHaveBeenCalled();
  });


});