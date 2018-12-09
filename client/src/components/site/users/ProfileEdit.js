import React, { Component } from 'react';
import { fetchBlogger } from '../../../actions/blogger';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';

class ProfileEdit extends Component{
  constructor(props){
    super(props);
    this.state = {error:false, loading: true};
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
            <form onSubmit={handleSubmit(this.onSubmit)}>
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
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <img className="user--pp" src="https://miro.medium.com/fit/c/240/240/0*32f1wB-hJ2cG3Va5" alt="this.props.blogger.fullname}"/>
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
