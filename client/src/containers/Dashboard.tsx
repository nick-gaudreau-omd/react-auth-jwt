import * as React from 'react';
import { DashboardContent } from '../components/DashboardContent';
import { Constants } from '../Constants';
import Auth from '../modules/Auth';
import { IDashboardState } from './IDashboardState';

export default class Dashboard extends React.Component<{}, IDashboardState> {

  constructor(props:any){
    super(props);
    this.state = {
      secretData : ''
    };
  }

  componentDidMount(){
    const endpoint = `${Constants.api_url}/api/dashboard/`;

    fetch(endpoint, {
      method: 'GET', 
      credentials: 'include',
      headers: new Headers({
        'Authorization': `Bearer ${Auth.getToken()}`, 
        'content-type': 'application/x-www-form-urlencoded'
      })
    }).then(res => {  
        if(res.ok) {
          res.json().then( (body) => {    
            this.setState({
              secretData: body.message
            });
          });
        }      
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  render() {
    return (<DashboardContent secretData={this.state.secretData} />);
  }
}