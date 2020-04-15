import * as React from "react";

import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';

import DateControls from './DateControls';

type TopBarProps = {
  onDateChange: (date: Date) => void
}

export default class TopBar extends React.Component<TopBarProps> {

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h6" noWrap>
              Home Monitoring
            </Typography>
          </Box>
          <DateControls onDateChange={this.props.onDateChange} />
        </Toolbar>
      </AppBar>
    );
  }
}
