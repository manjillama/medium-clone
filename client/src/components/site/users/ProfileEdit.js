import React, { Component } from 'react';
import { fetchBlogger, updateBlogger } from '../../../actions/blogger';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import ImageCropper from '../utils/ImageCropper';
import Env from '../../../services/envs';

class ProfileEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      error:false, loading: true, userImageSrc: null, uploadedImage: null, triggerCropModal:false,
      inputErr: {
        status: false,
        message: ''
      }};
  }

  componentDidMount () {
    this.props.fetchBlogger(this.props.authUsername, (error)=>{
      if(error){
        this.setState({error:true});
      }
      this.setState({loading: false});
    });
  }

  onSubmit = formProps => {
    let formData = new FormData();
    Object.keys( formProps ).forEach( key => {
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

    return this.props.updateBlogger(formData, () => {
      const redirectTo = Env.BASE_URL+'/@'+formProps.username;
      window.location.href = redirectTo;
    });

  }

  /*
  * Redux-Form file upload issue
  * Uncaught DOMException: Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string.
  * https://stackoverflow.com/questions/43996895/react-redux-upload-file-errors
  */
  UploadFile = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
    <input type='file' {...inputProps} {...props} style={{display:'none'}} onChange={this.handleImageChange} id="updateUserImg" accept="image/x-png,image/gif,image/jpeg"/>
  );

  handleImageChange = (e) => {
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
      document.getElementById('updateUserImg').value = '';
    }
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

  renderProfileImage(){
    if(this.state.userImageSrc){
      return <img className="user--pp" src={this.state.userImageSrc} alt={this.props.initialValues.fullname}/>;
    }else{
      if(this.props.initialValues.profile_image){
        return <img className="user--pp" src={this.props.initialValues.profile_image} alt={this.props.initialValues.fullname}/>;
      }else{
        return <img className="user--pp" src="https://miro.medium.com/fit/c/240/240/0*32f1wB-hJ2cG3Va5" alt={this.props.initialValues.fullname}/>;
      }
    }
  }

  render(){
    if(this.state.loading){
      return <h1>Loading...</h1>;
    }else{
      if(this.state.error){
        return <h1>Page not found :(</h1>
      }else{
        const { handleSubmit, submitting, invalid } = this.props;
        const errorAlertClass = this.state.inputErr.status ? 'bg--danger fixed--alert fixed--alert-active':'bg--danger fixed--alert';
        return (
          <section className="container--sm">
            <p className={errorAlertClass}>{this.state.inputErr.message}</p>
            <form onSubmit={handleSubmit(this.onSubmit)} encType="multipart/form-data">
              <div className="d--flex flex-col-rev-sm">
                <div className="full-width">
                  <div className="d--flex">
                    <Field
                      name="fullname"
                      component="input"
                      type="input"
                      className="input-u-n"
                      placeholder="Enter your name"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <Field
                      name="bio"
                      component="textarea"
                      type="text"
                      rows="3"
                      className="textarea-u-b"
                      placeholder="Enter a short bio"
                    />
                  </div>
                </div>
                <div className="p-img-wrapper">
                  {this.renderProfileImage()}
                  <label htmlFor="updateUserImg" className="input-p-label">
                    <img style={{height: 100+'%',padding: 35+'px'}} src="/static/images/photo-camera.svg" alt="Profile input"/>
                    <Field
                      name="image_file"
                      type="file"
                      component={this.UploadFile}
                    />
                  </label>
                </div>
              </div>
              <button type="submit" disabled={invalid || submitting}  className="mjl-btn btn--p-hollow">Save</button>
              <Link style={{display: 'inline-block',marginLeft: 8+'px'}} className="mjl-btn btn--d-hollow" to={`/@${this.props.authUsername}`}>Cancel</Link>
            </form>
            {this.renderCropModal()}
          </section>
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

function validate(values){
  const errors = {};

  return errors;
}


export default compose(
  connect(mapStateToProps, {fetchBlogger, updateBlogger}),
  reduxForm({
    validate,
    form: 'updateProfileForm'
  }),
  withRouter
)(ProfileEdit);
