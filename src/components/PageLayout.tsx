import * as React from "react";

import { Toolbar, Box, Container } from '@material-ui/core';

import TopBar from './TopBar';

type PageLayoutProps = {
  onDateChange: (date: Date) => void,
  children?: React.ReactNode
}

export default class PageLayout extends React.Component<PageLayoutProps> {

  render() {
    return (
      <React.Fragment>
        <TopBar onDateChange={this.props.onDateChange} />
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
