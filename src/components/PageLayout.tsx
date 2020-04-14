import * as React from "react";

import { Toolbar, Box, Container } from '@material-ui/core';

import TopBar from './TopBar';

export default class PageLayout extends React.Component {

  render() {
    return (
      <React.Fragment>
        <TopBar />
        <Toolbar />
        <Box my={2}>
          <Container maxWidth="xl">
            {this.props.children}
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}
