import * as React from "react";

import { Box, Container } from '@material-ui/core';

import TopBar from './TopBar';

export default class PageLayout extends React.Component {

  render() {
    return (
      <React.Fragment>
        <TopBar />
        <Box my={2}>
          <Container maxWidth="xl">
            {this.props.children}
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}
