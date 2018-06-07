import * as React from 'react';
import { Nav } from './components/Nav';
import Routes from './Routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <div>
      <Nav />
      <Routes />
    </div>
  </MuiThemeProvider>
);

export default App;
