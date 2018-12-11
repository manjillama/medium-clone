import React, { Component } from 'react';
import { fetchBlogger, updateBlogger } from '../../../actions/blogger';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';



class ProfileEdit extends Component{
  constructor(props){
    super(props);
    this.state = {error:false, loading: true, updatedProfileImage: null};
  }

  componentWillMount () {
    this.props.fetchBlogger(this.props.authUsername, (error)=>{
      if(error){
        this.setState({error:true});
      }
      this.setState({loading: false});
    });
  }

  componentWillUpdate(){
    //console.log(this.props.initialValues);
  }

  onSubmit = formProps => {
    console.log(formProps);
    updateBlogger(formProps);
  }

  /*
  * Redux form file upload issue:
  * https://github.com/erikras/redux-form/issues/1989
  */
  adaptFileEventToValue = delegate => e => {
    console.log(e.target.files[0]);
    if(e.target.files[0]){
      this.setState({
        updatedProfileImage: URL.createObjectURL(e.target.files[0])
      });
    }
    return delegate(e.target.files[0])
  };

  FileInput = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    meta: omitMeta,
    ...props
  }) => {
    return (
      <input
        onChange={this.adaptFileEventToValue(onChange)}
        onBlur={this.adaptFileEventToValue(onBlur)}
        type="file"
        {...props.input}
        {...props}
      />
    );
  };

  renderProfileImage(){
    if(this.state.updatedProfileImage){
      return <img className="user--pp" src={this.state.updatedProfileImage} alt={this.props.initialValues.fullname}/>;
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
        const { handleSubmit } = this.props;
        return (
          <section className="container--sm">
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
                      id="updateUserImg"
                      component={this.FileInput}
                      name="profile_image"
                      type="file"
                      style={{display:'none'}}
                    />
                  </label>
                </div>
              </div>
              <button type="submit" className="mjl-btn btn--p-hollow">Save</button>
              <Link style={{display: 'inline-block',marginLeft: 8+'px'}} className="mjl-btn btn--d-hollow" to={`/@${this.props.authUsername}`}>Cancel</Link>
            </form>
          </section>
        );
      }
    }
  }
}

function mapStateToProps(state){
  if(state.auth.authenticated){
    return { initialValues: state.blogger.info, authUsername: state.auth.authenticated.username}
  }else{
    return { initialValues: state.blogger.info, authUsername: null}
  }
}

function validate(values){
  const errors = {};

  return errors;
}


export default compose(
  connect(mapStateToProps, {fetchBlogger}),
  reduxForm({
    validate,
    form: 'updateProfileForm'
  }),
  withRouter
)(ProfileEdit);
