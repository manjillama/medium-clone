import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

import { Provider } from 'react-redux';
import { store } from '../../index';
import SignInForm from '../forms/SignInForm';

class LoginModal extends Component{
  constructor(props){
    super(props);
    this.state = {signInModal: true};
    this.toggleContent = this.toggleContent.bind(this);
  }

  componentDidMount(){
    this.modalTarget = document.createElement('div');
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  toggleContent(){
    this.setState({
      signInModal: !this.state.signInModal
    }, () => { this._render() });
  }

  toggleModalContent(){
    if(this.state.signInModal){
      return (
        <div>
          <h1>Hi There.</h1>
          <h2>Sign in to access your personalized homepage, follow authors and topics you love.</h2>
          <div className="sm-caption">
            <div className="col-max-300">
              <SignInForm />
            </div>
            <br/>
            <p>No account? <button className="btn-chromeless text--primary" onClick={this.toggleContent}>Create One</button></p>
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <h1>Join The Thread.</h1>
          <h2>Create an account to personalize your homepage, follow your favorite authors, publications and more.</h2>
          <div className="sm-caption">
            <div className="col-max-300">
              <form>
                <div className="input-group">
                  <label>Your full name</label>
                  <input type="text" className="mjl-input input--underlined"/>
                </div>
                <div className="input-group">
                  <label>Your email</label>
                  <input type="email" className="mjl-input input--underlined"/>
                </div>
                <div className="input-group">
                  <label>Your password</label>
                  <input type="password" className="mjl-input input--underlined"/>
                </div>
                <br/>
                <button className="mjl-btn btn--dark">Sign Up</button>
              </form>
            </div>
            <br/>
            <p>Already have an account? <button className="btn-chromeless text--primary" onClick={this.toggleContent}>Sign In</button></p>
          </div>
        </div>
      );
    }
  }

  createModal(){
    return (
      <div id="loginModalWrapper" style={{display:'none'}}>
        <div className="modal-backdrop"></div>
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <svg className="closeModal" width="29" height="29">
                  <path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path>
                </svg>
                <div className="login-holder">
                  {this.toggleModalContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _render(){
    ReactDOM.render(
      <Provider store={store}>
        {this.createModal()}
      </Provider>,
      this.modalTarget
    );
  }

  render(){
    return <noscript />
  }
}

export default LoginModal;
