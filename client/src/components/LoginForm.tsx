import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { MuiThemeProvider } from 'material-ui/styles';
import { IAuthFormProps } from './IAuthFormProps';

export const LoginForm: React.SFC<IAuthFormProps> = (props) => {
  return (
    <MuiThemeProvider>
      <Card className="container">
        <form action="/" onSubmit={props.onSubmit}>
          <h2 className="card-heading">Login</h2>

          {props.successMessage && <p className="success-message">{props.successMessage}</p>}
          {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={props.errors.email}
              onChange={props.onChange}
              value={props.user.email}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={props.onChange}
              errorText={props.errors.password}
              value={props.user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary={true} />
          </div>

          <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
        </form>
      </Card>
    </MuiThemeProvider>
  );
}

