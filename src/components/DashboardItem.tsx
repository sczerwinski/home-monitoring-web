import * as React from "react";

import { Paper, Box, Grid } from '@material-ui/core';

import Api, { Location } from './Api';
import DashboardItemHeader from './DashboardItemHeader';

type DashboardItemProps = {
  location: Location
}

export default class DashboardItem extends React.Component<DashboardItemProps> {

  constructor(props: DashboardItemProps) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item lg={2} md={4} xs={12} container direction="column" spacing={2}>
              <Grid item container spacing={1} direction="row" alignItems="center">
                <DashboardItemHeader location={this.props.location} />
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <Grid item lg={10} md={8} xs={12}>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }
}
