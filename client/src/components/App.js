import React from 'react';
import Header from './Header';
import LoginModal from './utils/LoginModal'

export default class App extends React.Component{
  render(){
    return (
      <div className="mjl-container">
        <Header/>
        <LoginModal />
        {this.props.children}
      </div>
    )
  }
};
