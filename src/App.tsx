import * as React from "react";

import PageLayout from './components/PageLayout';
import Dashboard from './components/Dashboard';

export default class App extends React.Component {

  render() {
    return (
      <PageLayout>
        <Dashboard />
      </PageLayout>
    );
  }
}
