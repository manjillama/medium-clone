import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'index';
import { Router } from 'react-router-dom';
import { history } from 'index';
import Modal from 'components/modals/Modal';
import './StoryPublish.css';
import HandleThumbnail from './HandleThumbnail';
import HandleTags from './HandleTags';
import PropTypes from 'prop-types';

import { publishPost } from 'services/blogService';

class PublishModal extends React.Component{
  constructor(){
    super();
    this.state = {
      tags:[],
      image: null,
      formSubmitted: false
    }
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

  handleSubmit = () => {
    if(!this.state.formSubmitted){

      this.setState({formSubmitted: true}, ()=>{
        this._render();
      });

      const token = localStorage.getItem('token');
      let formData = new FormData();
      if(this.state.image){
        formData.append("storyImage", this.state.image);
      }
      formData.append("tags", this.state.tags);

      publishPost(formData, token, 2).then((res)=>{
        console.log("Submitted!");
      });
    }
  }

  handleImageChange = (image) => {
    this.setState({image}, ()=>{
      this._render();
    });
  }

  handleTagsChange = (tag) => {
    this.setState({
      tags: [...this.state.tags, tag],
    },()=>{
      this._render() ;
    });
  }

  handleTagRemove = (tags) => {
    this.setState({tags},()=>{
      this._render() ;
    });
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
              <HandleThumbnail handleImageChange={this.handleImageChange} storyImage={this.state.image}/>
            </div>

            <div className="text--left">
              <HandleTags handleTagRemove={this.handleTagRemove} handleTagsChange={this.handleTagsChange} storyTags={this.state.tags}/>
              <br/>

              {
                this.state.formSubmitted ?
                (<div className="lds-ellipsis" style={{marginTop: -25+'px', marginLeft: -6+'px'}}><div></div><div></div><div></div><div></div></div>)
                :
                (<button onClick={this.handleSubmit} className="mjl-btn btn--primary">Publish Now</button>)
              }
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

PublishModal.propTypes = {
  postId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default PublishModal;
