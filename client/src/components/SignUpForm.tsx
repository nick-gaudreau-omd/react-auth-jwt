import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { MuiThemeProvider } from 'material-ui/styles';
import { IAuthFormProps } from './IAuthFormProps';

export const SignUpForm: React.SFC<IAuthFormProps> = (props) => {
  return (
    <MuiThemeProvider>
      <Card className="container">
        <form action="/" onSubmit={props.onSubmit}>
          <h2 className="card-heading">Sign Up</h2>

          {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText="Name"
              name="name"
              errorText={props.errors.name}
              onChange={props.onChange}
              value={props.user.name}
            />
          </div>

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
            <RaisedButton type="submit" label="Create New Account" primary={true} />
          </div>

          <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
        </form>
      </Card>
    </MuiThemeProvider>
  );
}

