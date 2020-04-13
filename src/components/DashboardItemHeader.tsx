import * as React from "react";

import { Grid } from '@material-ui/core';

import Api, { Location, SensorType } from './Api';
import LoadingProgress from './LoadingProgress'
import PaperTitle from './PaperTitle';

import TemperatureIcon from './icons/TemperatureIcon';
import HumidityIcon from './icons/HumidityIcon';

type DashboardItemHeaderProps = {
  location: Location
}

type DashboardItemHeaderState = {
  error?: any,
  isLoaded: boolean,
  sensorTypes: SensorType[]
}

export default class DashboardItemHeader extends React.Component<DashboardItemHeaderProps, DashboardItemHeaderState> {

  constructor(props: DashboardItemHeaderProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sensorTypes: []
    }
  }

  componentDidMount() {
    this.fetchSensorTypes()
  }

  private fetchSensorTypes() {
    Api.fetchSensorTypes(this.props.location.name)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sensorTypes: result
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

  render() {
    const { error, isLoaded, sensorTypes } = this.state;
    if (error) {
      return this.renderError();
    } else if (!isLoaded) {
      return this.renderProgress();
    } else {
      return this.renderContent(sensorTypes);
    }
  }

  private renderError() {
    let dashboard = this;
    return (
      <PaperTitle>
        {this.props.location.name}
      </PaperTitle>
    );
  }

  private reload() {
    this.setState({
      error: null,
      isLoaded: false,
      sensorTypes: []
    });
    this.fetchSensorTypes()
  }

  private renderProgress() {
    return <LoadingProgress />;
  }

  renderContent(sensorTypes: SensorType[]) {
    return (
      <Grid container spacing={1} direction="row" alignItems="center">
        <Grid item>
          <TemperatureIcon color={sensorTypes.includes(SensorType.Temperature) ? "inherit" : "disabled"} />
          <HumidityIcon color={sensorTypes.includes(SensorType.Humidity) ? "inherit" : "disabled"} />
        </Grid>
        <Grid item>
          <PaperTitle>
            {this.props.location.name}
          </PaperTitle>
        </Grid>
      </Grid>
    );
  }
}
