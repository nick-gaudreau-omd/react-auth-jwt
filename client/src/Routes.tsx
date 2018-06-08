import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SignUp } from './containers/SignUp';
import { Login } from './containers/Login';
import HomePage from './components/Home';
import Auth from './modules/Auth';
import Dashboard from './containers/Dashboard';

class Routes extends React.Component<{ }, {}> {

    userAllowedComponent(){
        return Auth.isUserAuthenticated() ? (<Dashboard />) : (<HomePage />);
    }

    userSignout(){
        Auth.deauthenticateUser();
        return (<Redirect to="/" />);
    }

    render() {
        return (
            <div>
                <Switch>    
                    <Route exact={true} path='/' render={this.userAllowedComponent} />               
                    <Route path='/signup' component={SignUp} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' render={this.userSignout}/>
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;