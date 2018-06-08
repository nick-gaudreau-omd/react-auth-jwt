import * as React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { MuiThemeProvider } from 'material-ui/styles';
import { IDashboardContentProps } from './IDashboardContentProps';

export const DashboardContent: React.SFC<IDashboardContentProps> = (props) => {
  return (
    <MuiThemeProvider>
      <Card className="container">
        <CardTitle
          title="Dashboard"
          subtitle="You should get access to this page only after authentication."
        />

        {props.secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{props.secretData}</CardText>}
      </Card>
    </MuiThemeProvider>
  );
}

