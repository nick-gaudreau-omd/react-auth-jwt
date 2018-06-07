import * as React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { MuiThemeProvider } from 'material-ui/styles';


const HomePage = () => (
  <MuiThemeProvider>
  <Card className="container">
    <CardTitle title="React Test Authentication App" subtitle="Using JWT, Bcrypt, Material UI." />
  </Card>
  </MuiThemeProvider>
);

export default HomePage;
