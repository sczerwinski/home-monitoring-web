import * as React from "react";

import { Typography } from '@material-ui/core';

export default class PaperTitle extends React.Component {

  render() {
    return (
      <Typography component="h2" variant="h6" color="textPrimary" gutterBottom>
            {this.props.children}
      </Typography>
    );
  }
}
