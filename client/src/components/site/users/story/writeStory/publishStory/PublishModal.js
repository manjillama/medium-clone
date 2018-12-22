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
import { connect } from 'react-redux';
import config from 'config';
import { publishPost } from 'services/blogService';

class PublishModal extends React.Component{
  constructor(){
    super();
    this.state = {
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
      const {id}  = this.props.blog;

      this.setState({formSubmitted: true}, ()=>{
        this._render();
      });

      const token = localStorage.getItem('token');
      let formData = new FormData();
      if(this.state.image)
        formData.append("storyImage", this.state.image);


      publishPost(formData, token, id).then((res)=>{
        const redirectTo = config.BASE_URL+'/@'+this.props.username+'/'+id;
        window.location.href = redirectTo;
      });
    }
  }

  handleImageChange = (image) => {
    this.setState({image}, ()=>{
      this._render();
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
              <HandleThumbnail handleImageChange={this.handleImageChange} imagePreview={this.props.blog.story_thumbnail}/>
            </div>

            <div className="text--left">
              <HandleTags blogId={this.props.blog.id}/>
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
  blog: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {username: state.auth.authenticated.user.username};
}

export default connect(mapStateToProps, null)(PublishModal);
