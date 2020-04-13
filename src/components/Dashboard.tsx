import * as React from "react";

import { Snackbar, Button, Grid } from '@material-ui/core';

import Api, { Location } from './Api'
import LoadingProgress from './LoadingProgress'
import DashboardItem from './DashboardItem'

type DashboardState = {
  error?: any,
  isLoaded: boolean,
  locations: Location[]
}

export default class Dashboard extends React.Component<{}, DashboardState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      locations: []
    };
  }

  componentDidMount() {
    this.fetchLocations()
  }

  private fetchLocations() {
    Api.fetchLocations()
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            locations: result
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
    const { error, isLoaded, locations } = this.state;
    if (error) {
      return this.renderError();
    } else if (!isLoaded) {
      return this.renderProgress();
    } else {
      return this.renderItems(locations);
    }
  }

  private renderError() {
    let dashboard = this;
    return (
      <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={true}
          message="Failed to load data from server"
          action={
            <Button color="secondary" size="small" onClick={dashboard.retry.bind(this)}>
              Retry
            </Button>
          } />
    );
  }

  private retry() {
    this.setState({
      error: null,
      isLoaded: false,
      locations: []
    });
    this.fetchLocations()
  }

  private renderProgress() {
    return <LoadingProgress />;
  }

  private renderItems(locations: Location[]) {
    return (
      <Grid container direction="column" alignItems="stretch">
        {locations.map(location => (
          <Grid item key={location.id}>
            <DashboardItem location={location} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
