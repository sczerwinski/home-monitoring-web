import * as React from "react";

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#ffc107'
    },
    background: {
      default: '#f5f5f5'
    }
  }
});

export default class AppTheme extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {this.props.children}
      </ThemeProvider>
    );
  }
}
