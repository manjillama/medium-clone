import React from 'react';
import Header from './Header';
import LoginModal from './modals/LoginModal';

export default class App extends React.Component{
  render(){
    return (
      <div className="mjl-container">
        <Header/>
        {this.props.children}
        <LoginModal />
      </div>
    )
  }
};
