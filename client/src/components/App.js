import React from 'react';
import Header from './site/includes/Header';
import LoginModal from './modals/LoginModal';
import { getUser } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {renderApp: true}
  }
  componentWillMount(){
    const userToken = localStorage.getItem('token');
    /*
    * Auto login user if token is present
    */
    if(userToken){
      this.setState({renderApp: false}, () => {
        this.props.getUser(userToken, () => {
          this.setState({renderApp: true});
        });
      });
    }
  }
  _renderModal(){
    if(this.props.openModal){
      return <LoginModal/>;
    }
  }
  render(){
    if(this.state.renderApp){
      return (
        <div>
          <Header/>
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

function mapStateToProps(state){
  return {openModal: state.loginModal.openModal};
}

export default withRouter(connect(mapStateToProps, {getUser})(App));
