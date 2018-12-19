import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'index';
import { Router } from 'react-router-dom';
import { history } from 'index';
import Modal from 'components/modals/Modal';


export default class PublishModal extends React.Component{
  componentDidMount(){
    this.modalTarget = document.createElement('div');
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  createModal(){
    return (
      <Modal
      modalBackgroundColor='#fff'
      modalOverlayColor='#fff'
      modalMaxWidth='1040px'
      modalHeight='100%'
      modalWidth='100%'
      modalNoShadow={true}
      displayCloseBtn={true}
      closeModal={this.props.closeModal}
      >
        <h1>Hello</h1>
      </Modal>
    );
  }

  _render(){
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          {this.createModal()}
        </Router>
      </Provider>,
      this.modalTarget,
    );
  }
  render(){
    return <noscript/>
  }
}
