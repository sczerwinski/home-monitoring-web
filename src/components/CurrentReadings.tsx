import * as React from "react";

import { Grid, Typography } from '@material-ui/core';

import Api, { Location, SensorType, SensorReading } from './Api';
import LoadingProgress from './LoadingProgress'

type CurrentReadingsProps = {
  location: Location
}

type CurrentReadingsState = {
  error?: any,
  isLoaded: boolean,
  readings: Map<SensorType, SensorReading>
}

export default class CurrentReadings extends React.Component<CurrentReadingsProps, CurrentReadingsState> {

  interval: any = null;

  constructor(props: CurrentReadingsProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      readings: new Map<SensorType, SensorReading>()
    }
  }

  componentDidMount() {
    this.fetchSensorReadings()
    this.interval = setInterval(() => this.reload(), 10000);
  }

  private fetchSensorReadings() {
    Promise.all([
      Api.fetchLatestReading(this.props.location.name, SensorType.Temperature),
      Api.fetchLatestReading(this.props.location.name, SensorType.Humidity)
    ])
      .then(
        (result) => {
          let readings = new Map<SensorType, SensorReading>();
          readings.set(SensorType.Temperature, result[0]);
          readings.set(SensorType.Humidity, result[1]);
          this.setState({
            isLoaded: true,
            readings: readings
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  private reload() {
    this.fetchSensorReadings()
  }

  render() {
    const { error, isLoaded, readings } = this.state;
    if (error) {
      return this.renderError();
    } else if (!isLoaded) {
      return this.renderProgress();
    } else {
      return this.renderContent(readings);
    }
  }

  private renderError() {
    let dashboard = this;
    return (
      <Typography component="p" variant="subtitle2" color="error" gutterBottom>
        Error loading latest readings
      </Typography>
    );
  }

  private renderProgress() {
    return <LoadingProgress />;
  }

  renderContent(readings: Map<SensorType, SensorReading>) {
    return (
      <Grid container spacing={1} direction="row">
        <Grid item xs={6}>
          <Typography component="p" variant="subtitle2" color="textPrimary" gutterBottom>
            Temperature
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
            {readings.get(SensorType.Temperature).value.toFixed(1)}&deg;C
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="subtitle2" color="textPrimary" gutterBottom>
            Humidity
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
            {readings.get(SensorType.Humidity).value.toFixed(1)}%
          </Typography>
        </Grid>
      </Grid>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
