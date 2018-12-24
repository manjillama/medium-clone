import React, { Component } from 'react';
import requireAuth from 'components/requireAuth';

class Settings extends Component{
  render(){
    return <h1>Settings</h1>
  }
}

export default requireAuth(Settings);
