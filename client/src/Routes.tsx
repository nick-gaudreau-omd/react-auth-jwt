import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SignUp } from './containers/SignUp';
import { Login } from './containers/Login';
import HomePage from './components/Home';

class Routes extends React.Component<{ }, {}> {

    render() {
        return (
            <div>
                <Switch>    
                    <Route exact={true} path='/' component={HomePage} />               
                    <Route path='/signup' component={SignUp} />
                    <Route path='/login' component={Login} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;