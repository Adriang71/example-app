import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux'
import { loadEvent } from './Actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function EventList() {
  const isLoading = useSelector(state => state.isLoading)
  const events = useSelector(state => state.events)
  const dispatch = useDispatch()

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  React.useEffect(() => {
    dispatch(loadEvent())
  }, [dispatch]);

  if(isLoading) return <Grid item>Loading...</Grid>

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
    {isLoading && <div>Loading...</div>}
    {!isLoading && events.length > 0 &&
      events.reverse().map(event => (
        <List key={event.id}>
          <ListItem >
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {event.name} {event.lastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">

                  Event date {bull} {event.date}
                </Typography>
                <Typography variant="body2" component="p">
                  {event.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Check Event</Button>
              </CardActions>
            </Card>
          </ListItem>
        </List>
      ))
    }
    </Grid>
  );
}