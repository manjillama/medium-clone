import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'index';
import { Router } from 'react-router-dom';
import { history } from 'index';
import Modal from 'components/modals/Modal';
import './StoryPublish.css';
import HandleThumbnail from './HandleThumbnail';
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
        <section className="publish-modal-s">
          <div className="d--flex d--flex-row-md flex-sb p--row" style={{marginTop: 35+'px'}}>

            <div className="text--left">
              <HandleThumbnail/>
            </div>

            <div className="text--left">
              <h2>Prepare your story for readers</h2>
              <p>Add or change tags (up to 5) so readers know what your story is about</p>
              <p>Review Threadly’s <a target="_blank" href="/threadly/policy" style={{textDecoration:'underline'}}>rules</a> to ensure that your story meets our community standards.</p>
              <br/>
                <div contentEditable={true} className="p-add-tags"></div>
              <br/>
              <button className="mjl-btn btn--primary">Publish Now</button>
            </div>
          </div>
        </section>
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
