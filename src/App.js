import React from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import EventForm from './EventForm';
import EventList from './EventList';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import eventReducer from './EventReducer'
import thunkMiddleware from 'redux-thunk'

const store = createStore(eventReducer, applyMiddleware(thunkMiddleware))

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <EventForm />
        <EventList />
      </Provider>
    </MuiPickersUtilsProvider>
  );
}