import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react';
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



    fireEvent.change(name, {
      target: {
        value: 'mockname'
      }
    })

    fireEvent.change(lastName, {
      target: {
        value: 'mocklastname'
      }
    })

      fireEvent.change(email, {
      target: {
        value: 'example@o2.pl'
      }
    })

    fireEvent.change(date, {
      target: {
        value: '22/02/2022'
      }
    })

    fireEvent.click(submit);

    expect(onSubmit).toHaveBeenCalled();
    await wait(() => {
      expect(queryByText('Required*')).toBeNull()
    });

  });

  it("contains errors", async () => {
    const store = mockStore({
      isLoading: false,
      events:[]
    });
    const { container, getAllByText } = render(
      <TestProvider store={store}>
        <EventForm  />
      </TestProvider>
    );

    const submit = container.querySelector('button[type="submit"]')

    fireEvent.click(submit);
    await wait(() => {
      expect(getAllByText('Required*')).not.toBeNull()
    });
  });

  it("contain email format errors", async () => {
    const store = mockStore({
      isLoading: false,
      events:[]
    });
    const { container, getByText, getAllByText } = render(
      <TestProvider store={store}>
        <EventForm  />
      </TestProvider>
    );

    const email = container.querySelector('input[name="email"]')
    const submit = container.querySelector('button[type="submit"]')

    fireEvent.change(email, {
      target: {
        value: 'example'
      }
    })

    fireEvent.click(submit);
    await wait(() => {
      expect(getAllByText('Required*')).not.toBeNull()
      expect(getByText('Incorrect e-mail address.')).not.toBeNull()
    });
  });

  it("contain length input errors", async () => {
    const store = mockStore({
      isLoading: false,
      events:[]
    });
    const { container, getByText } = render(
      <TestProvider store={store}>
        <EventForm  />
      </TestProvider>
    );


    const name = container.querySelector('input[name="name"]')
    const lastName = container.querySelector('input[name="lastName"]')
    const email = container.querySelector('input[name="email"]')
    const submit = container.querySelector('button[type="submit"]')


    fireEvent.change(name, {
      target: {
        value: 'fo'
      }
    })

    fireEvent.change(lastName, {
      target: {
        value: 'fo'
      }
    })

    fireEvent.change(email, {
      target: {
        value: 'fo'
      }
    })

    fireEvent.click(submit);
    await wait(() => {
      expect(getByText('Name should contain minimum 3 leather')).not.toBeNull()
      expect(getByText('Last name should contain minimum 3 leather')).not.toBeNull()
      expect(getByText('Email should contain minimum 3 leather')).not.toBeNull()
      expect(getByText('Required*')).not.toBeNull()
    });
  });

});


