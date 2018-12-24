import React, { Component } from 'react';
import { fetchBlogger, updateBlogger } from 'actions/blogger';
import { connect } from 'react-redux';

import ProfileEditForm from './ProfileEditForm';
import ImageCropper from 'components/site/utils/ImageCropper';

import config from 'config';


class ProfileEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      error:false, loading: true, uploadedImage: null, triggerCropModal:false,userImageSrc: null,
      inputErr: {
        status: false,
        message: ''
      }
    };
  }

  componentDidMount () {
    this.token = localStorage.getItem('token');
    this.props.fetchBlogger(this.props.authUsername, (error)=>{
      if(error){
        this.setState({error:true});
      }
      this.setState({loading: false});
    });
  }


  handleImageChange = (e) => {
    if(e.target.files[0]){
      let mimeType=e.target.files[0]['type'];
      if(mimeType.split('/')[0] === 'image' && mimeType.split('/')[1] !== 'svg+xml'){
        this.setState({uploadedImage: e.target.files[0]}, () => {
          this.setState({triggerCropModal:true});
        });
      }else{
        /*
          Show Errror message
        */
        this.setState({inputErr: {message:'Please use image as your avatar.', status: true}}, () => {
          setTimeout(()=>{
            this.setState({inputErr: {status: false, message:'Please use image as your avatar.'}});
          }, 3000);
        });
      }
    }
    document.getElementById('updateUserImg').value = '';
  }

  renderCropModal(){
    if(this.state.triggerCropModal){
      return <ImageCropper closeModal={this.closeModal} uploadedImage={this.state.uploadedImage} setUploadedImage={this.setUploadedImage}/>
    }
  }

  setUploadedImage = image => {
    this.setState({uploadedImage:image, userImageSrc: URL.createObjectURL(image), triggerCropModal:false});
  }

  closeModal = () => {
    document.getElementById('updateUserImg').value = '';
    this.setState({userImageSrc: null, uploadedImage: null}, () => {
      this.setState({triggerCropModal:false});
    });
  }

  onSubmit = formProps => {
    let formData = new FormData();
    Object.keys( formProps ).forEach( key => {
      if(formProps[key]) // Don't send properties whose value is null
        formData.append(key, formProps[key]);
    });

    if (formData.get('fullname') === '') {
      this.setState({inputErr: {message:'Please enter your name.', status: true}}, () => {
        setTimeout(()=>{
          this.setState({inputErr: {status: false, message:'Please enter your name.'}});
        }, 3000);
      });
      return false;
    }
    formData.append("uploaded_image", this.state.uploadedImage);

    return this.props.updateBlogger(this.token, formData, () => {
      const redirectTo = config.BASE_URL+'/@'+formProps.username;
      window.location.href = redirectTo;
    });
  }

  render(){
    if(this.state.loading){
      return <h1>Loading...</h1>;
    }else{
      if(this.state.error){
        return <h1>Page not found :(</h1>
      }else{
        const errorAlertClass = this.state.inputErr.status ? 'bg--danger fixed--alert fixed--alert-active':'bg--danger fixed--alert';
        return (
          <div>
            <section className="container--sm">
              <p className={errorAlertClass}>{this.state.inputErr.message}</p>
              <ProfileEditForm
                onSubmit={this.onSubmit}
                initialValues={this.props.initialValues}
                handleChange={this.handleImageChange}
                userImageSrc={this.state.userImageSrc}/>
              {this.renderCropModal()}
            </section>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state){
  if(state.auth.authenticated){
    return { initialValues: state.blogger.info, authUsername: state.auth.authenticated.user.username}
  }else{
    return { initialValues: state.blogger.info, authUsername: null}
  }
}

export default connect(mapStateToProps, {fetchBlogger, updateBlogger})(ProfileEdit);
