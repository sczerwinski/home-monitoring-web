import * as React from "react";

import { Grid, CircularProgress } from '@material-ui/core';

export default class LoadingProgress extends React.Component {

  render() {
    return (
      <Grid container spacing={0} alignItems="center" alignContent="center" justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
}
