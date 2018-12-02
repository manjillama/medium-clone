import React from 'react';
import Header from './Header';
import LoginModal from './modals/LoginModal';
import { connect } from 'react-redux';

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
  componentDidUpdate(){
    console.log('Called', this.props.auth);
  }
  render(){
    return (
      <div className="mjl-container">
        <Header triggerModal={this.triggerModal.bind(this)}/>
        {this.props.children}
        <LoginModal modalState={this.state.openLoginModal} closeModal={this.closeModal.bind(this)}/>
      </div>
    )
  }
};

function mapStateToProps(state){
  return {auth: state.auth};
}
export default connect(mapStateToProps)(App);
