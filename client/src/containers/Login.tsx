import * as React from 'react';
import IAuthContainerState from './IAuthContainerState';
import { LoginForm } from '../components/LoginForm';
import Auth from '../modules/Auth';
import { Constants } from '../Constants';
import { IContainerProps } from './IContainerProps';

export class Login extends React.Component<IContainerProps, IAuthContainerState> {

  constructor(props:any) {
    super(props);

    this.state = {
      errors: {},
      successMessage : '',
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount(){
    const storedMessage = localStorage.getItem('successMessage');
    let message = '';

    if (storedMessage) {
      message = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.setState({successMessage: message});
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event:any) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event:any) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    const endpoint = `${Constants.api_url}/auth/login`;

    fetch(endpoint, {
      method: 'POST', 
      body: formData, 
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      res.json().then( (body) => {         
        
        if(res.ok) {
          // change the component-container state
          this.setState({
            errors: {}
          });      
          // save the token
          Auth.authenticateUser(body.token);

          const { history } = this.props;
          history.push('/');
          console.log('The login form is valid');
        } else {                      
          const errors = body.errors ? body.errors : {};
          errors.summary = body.message;
          this.setState({
            errors
          });          
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // console.log('email:', this.state.user.email);
    // console.log('password:', this.state.user.password);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}
