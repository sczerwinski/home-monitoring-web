import * as React from "react";

import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default class TopBar extends React.Component {

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Home Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
