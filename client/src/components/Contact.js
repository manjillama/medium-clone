import React from 'react';

export default class Contact extends React.Component{
  reRoute(){
    this.props.history.push('/');
  }
  render(){
    return (
      <div>
        <button className="mjl-button" onClick={this.reRoute.bind(this)}>BIG ASS BUTTON</button>
        <h1>Contact Page</h1>
      </div>
    );
  }
}
