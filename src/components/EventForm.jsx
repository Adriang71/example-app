import React from "react";
import { Controller, ErrorMessage } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

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

export default function EventForm({
  control,
  errors,
  handleDateChange,
  handleSubmit,
  onSubmit,
  selectedDate,
  setSelectedDate,
  setValue,
}) {
  const classes = useStyles();

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

