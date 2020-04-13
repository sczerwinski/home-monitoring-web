import * as React from "react";

import { Paper, Box, Grid, Typography } from '@material-ui/core';

import Api, { Location } from './Api';

type DashboardItemProps = {
  location: Location
}

export default class DashboardItem extends React.Component<DashboardItemProps> {

  constructor(props: DashboardItemProps) {
    super(props);
  }

  render() {
    return (
      <Paper elevation={2}>
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant="subtitle1">
                {this.props.location.name}
              </Typography>
            </Grid>
            <Grid item xs={10}>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }
}
