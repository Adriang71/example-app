import React, { useState } from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { postEvent } from './Actions';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(5),
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

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
  const dispatch = useDispatch()

  const classes = useStyles();
  const onSubmit = data =>
    dispatch(postEvent(data))

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    registerValidationSchema(validationSchema, register)
  }, [register]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item className={classes.wrapper}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={<TextField />}
            name="name"
            label="Name"
            control={control}
            defaultValue=""
            error={Boolean(errors.name)}
            helperText={
              <ErrorMessage errors={errors} name="name"/>
            }
          />

          <Controller
            as={<TextField />}
            name="lastName"
            label="Lastname"
            control={control}
            defaultValue=""
            error={Boolean(errors.lastName)}
            helperText={
              <ErrorMessage errors={errors} name="lastName"/>
            }
          />

          <Controller
            as={<TextField />}
            name="email"
            label="Email"
            control={control}
            defaultValue=""
            error={Boolean(errors.email)}
            helperText={
              <ErrorMessage errors={errors} name="email"/>
            }
            />

          <DatePicker
            value={selectedDate}
            format="YYYY/MM/DD"
            label="Date"
            error={Boolean(errors.date)}
            onChange={moment => {
              handleDateChange(moment.format("YYYY/MM/DD"));
              setValue("date", moment.format("YYYY/MM/DD"))
            }}
            helperText={
              <ErrorMessage errors={errors} name="date"/>
            }
          />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

