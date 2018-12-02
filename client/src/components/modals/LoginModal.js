import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

import { Provider } from 'react-redux';
import { store } from '../../index';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';

import { BrowserRouter, Route } from 'react-router-dom';
class LoginModal extends Component{
  constructor(props){
    super(props);
    /*
     States
      - signInModal: change modal content between signin form and signup form
      - modalState: open and close modal
    */
    this.state = {signInModal: true, modalState:this.props.modalState};
    this.toggleContent = this.toggleContent.bind(this);
  }

  componentDidMount(){
    this.modalTarget = document.createElement('div');
    document.body.appendChild(this.modalTarget);

    document.addEventListener('click', this.handleBlur, true);
    this._render();
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
    document.removeEventListener('click', this.handleBlur, true);
  }

  componentWillReceiveProps(nextProps){
    this.setState({modalState: nextProps.modalState},()=>{
      this._render();
    })
  }

  toggleContent(){
    this.setState({signInModal: !this.state.signInModal}, () => { this._render() });
  }

  handleBlur = e => {
    let modalContent = document.getElementsByClassName('modal-dialog')[0];
    if(modalContent){
      if(!modalContent.contains(e.target)){
        this.props.closeModal();
      }
    }
  }

  toggleModalContent(){
    if(this.state.signInModal){
      return (
        <div>
          <h1>Hi There.</h1>
          <h2>Sign in to access your personalized homepage, follow authors and topics you love.</h2>
          <div className="sm-caption">
            <div className="col-max-300">
              <SignInForm/>
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
              <SignUpForm/>
            </div>
            <br/>
            <p>Already have an account? <button className="btn-chromeless text--primary" onClick={this.toggleContent}>Sign In</button></p>
          </div>
        </div>
      );
    }
  }

  createModal(){
    const background = this.state.signInModal ? '#D7EFEE' : '#E8F3EC';
    if(this.state.modalState){
      return (
        <div id="loginModalWrapper">
          <div className="modal-backdrop"></div>
          <div className="modal">
            <div className="modal-dialog" style={{backgroundColor: background}}>
              <div className="modal-content">
                <div className="modal-body">
                  <svg className="closeModal" width="29" height="29" onClick={this.props.closeModal}>
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
    }else{
      return <noscript/>;
    }
  }

  _render(){
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={this.createModal.bind(this)} />
        </BrowserRouter>
      </Provider>,
      this.modalTarget,
    );
  }

  render(){
    return <noscript />
  }
}

export default LoginModal;
