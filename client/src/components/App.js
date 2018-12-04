import React from 'react';
import Header from './site/includes/Header';
import LoginModal from './modals/LoginModal';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { openLoginModal: false}
  }
  triggerModal(){
    this.setState({openLoginModal: true});
  }
  closeModal(){
    this.setState({openLoginModal: false});
  }
  _renderModal(){
    if(this.state.openLoginModal){
      return <LoginModal modalState={this.state.openLoginModal} closeModal={this.closeModal.bind(this)}/>;
    }
  }
  render(){
    return (
      <div className="mjl-container">
        <Header triggerModal={this.triggerModal.bind(this)}/>
        {this.props.children}
        {this._renderModal()}
      </div>
    )
  }
};

export default App;
