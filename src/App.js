import React from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import eventReducer from './EventReducer'
import EventFormContainer from './containers/EventFormContainer';
import EventList from './EventList';

const store = createStore(eventReducer, applyMiddleware(thunkMiddleware))

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <EventFormContainer />
        <EventList />
      </Provider>
    </MuiPickersUtilsProvider>
  );
}