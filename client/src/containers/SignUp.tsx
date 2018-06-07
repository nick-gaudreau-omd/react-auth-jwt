import * as React from 'react';
import IAuthContainerState from './IAuthContainerState';
import { SignUpForm } from '../components/SignUpForm';

const api_url = "http://localhost:3000";

export class SignUp extends React.Component<{}, IAuthContainerState> {

  constructor(props:any) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    const endpoint = `${api_url}/auth/signup`;

    fetch(endpoint, {
      method: 'POST', 
      body: formData, 
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
        if(res.ok) {
          // change the component-container state
          this.setState({
            errors: {}
          });          
          console.log('The form is valid');
        } else {
          res.json().then( (error) => {            
            const errors = error.errors ? error.errors : {};
            errors.summary = error.message;

            this.setState({
              errors
            });
          });
        }
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // console.log('name:', this.state.user.name);
    // console.log('email:', this.state.user.email);
    // console.log('password:', this.state.user.password);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}
