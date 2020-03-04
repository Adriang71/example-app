import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { postEvent } from '../Actions';
import EventForm from '../components/EventForm';

const validationSchema = {
  name: {
    required: { value: true, message: "Required*" },
    minLength: { value: 3, message: "Name should contain minimum 3 leather" }
  },
  lastName: {
    required: { value: true, message: "Required*" },
    minLength: { value: 3, message: "Last name should contain minimum 3 leather" }
  },
  email: {
    required: { value: true, message: "Required*" },
    minLength: { value: 3, message: "Email should contain minimum 3 leather" },
    pattern: {
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Incorrect e-mail address."
    }
  },
  date: {
    required: { value: true, message: "Required*" },
  }
}

const registerValidationSchema = (schema, register) =>
  Object.keys(schema).forEach(name =>  register({ name }, schema[name]));

export default function App() {
  const { register, control, handleSubmit, setValue, errors } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = data =>
    dispatch(postEvent(data))

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    registerValidationSchema(validationSchema, register)
  }, [register]);

  return (
    <EventForm
      control={control}
      errors={errors}
      handleDateChange={handleDateChange}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      setValue={setValue}
    />
  );
}

