import React from 'react';
import Header from './site/includes/Header';
import LoginModal from './modals/LoginModal';
import { getUser } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {openLoginModal: false, renderApp: true}
  }
  componentWillMount(){
    const userToken = localStorage.getItem('token');
    if(userToken){
      this.setState({renderApp: false}, () => {
        this.props.getUser(userToken, () => {
          this.setState({renderApp: true});
        });
      });
    }
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
    if(this.state.renderApp){
      return (
        <div>
          <Header triggerModal={this.triggerModal.bind(this)}/>
          <div className="mjl-container">
            {this.props.children}
            {this._renderModal()}
          </div>
        </div>
      )
    }else{
      return <h1>Loading...</h1>
    }
  }
};

export default withRouter(connect(null, {getUser})(App));
