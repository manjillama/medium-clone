import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileEditForm extends Component{
  constructor(props){
    super(props);
    this.state = {bioCharCount: 0};
  }
  renderProfileImage(){
    if(this.props.userImageSrc){
      return <img className="user--pp" src={this.props.userImageSrc} alt={this.props.initialValues.fullname}/>;
    }else{
      if(this.props.initialValues.profile_image){
        return <img className="user--pp" src={this.props.initialValues.profile_image} alt={this.props.initialValues.fullname}/>;
      }else{
        const initial = this.props.initialValues.fullname.charAt(0);
        return <div className="user--pp">{initial}</div>;
      }
    }
  }

  componentDidMount(){
    if(this.props.initialValues.bio)
      this.setState({bioCharCount:this.props.initialValues.bio.length});
  }

  render(){
    const { handleSubmit, submitting, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} encType="multipart/form-data">
        <div className="d--flex flex-ai-fs flex-col-rev-sm">
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
                maxLength="160"
                onChange = {
                  e => {
                    this.setState({bioCharCount: e.target.value.length});
                  }
                }
              />
              <small style={{marginBottom: 30+'px',display: 'block'}} className="text--muted">{this.state.bioCharCount}/160</small>
            </div>
          </div>
          <div className="p-img-wrapper">
            {this.renderProfileImage()}
            <label htmlFor="updateUserImg" className="input-p-label">
              <img style={{height: 100+'%',padding: 35+'px'}} src="/static/images/photo-camera.svg" alt="Profile input"/>
              <input
                type='file'
                style={{display:'none'}}
                onChange={this.props.handleChange}
                id="updateUserImg"
                accept="image/x-png,image/gif,image/jpeg"/>
            </label>
          </div>
        </div>
        <button type="submit" disabled={invalid || submitting}  className="mjl-btn btn--p-hollow">Save</button>
        <Link
          style={{display: 'inline-block',marginLeft: 8+'px'}}
          className="mjl-btn btn--d-hollow"
          to={`/@${this.props.initialValues.username}`}
          >Cancel</Link>
      </form>
    );
  }
}

export default compose(
  reduxForm({
    form: 'updateProfileForm'
  }),
  withRouter
)(ProfileEditForm);
