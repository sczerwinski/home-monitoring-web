import * as React from "react";
import * as ReactDOM from "react-dom";

import App from './App';
import AppTheme from './AppTheme';

ReactDOM.render(
  <AppTheme>
    <App />
  </AppTheme>,
  document.querySelector('#app'),
);
