import * as React from "react";

import PageLayout from './components/PageLayout';
import Dashboard from './components/Dashboard';

type AppState = {date: Date}

export default class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {date: new Date()}
  }

  render() {
    return (
      <PageLayout onDateChange={this.handleDateChange.bind(this)}>
        <Dashboard date={this.state.date} />
      </PageLayout>
    );
  }

  private handleDateChange(date: Date) {
    this.setState({date: date});
  }
}
