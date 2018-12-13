import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogger } from '../../../services/blogger-service';

import { Link } from 'react-router-dom';
import './Profile.css';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {error:false, loading: true, blogger: null};
  }
  componentDidMount () {
    // Listening to url change
    this.unlisten = this.props.history.listen((location, action) => {
      const param = location.pathname.split('@')[1];
      /*
      *To prevent
        - Can't perform a React state update on an unmounted component.
        - This is a no-op, but it indicates a memory leak in your application.
        - To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        - asynchronous fetchBlogger function won't set state if routed to another url***
      */
      if(param)
        this.fetchBlogger(param);
    });
    this.fetchBlogger();
  }

  componentWillUnmount() {
    this.unlisten();
  }

  fetchBlogger(param){
    const username  = param ? param : this.props.match.params.username;
    fetchBlogger(username)
      .then(response =>{
        if(response.error){
          this.setState({error:true, loading:false});
        }else{
          this.setState({blogger: response, loading: false, error:false});
        }
      });
  }



  renderEditLink(){
    if(this.props.match.params.username === this.props.authUsername){
      return (
        <div>
          <Link className="p-edit-btn mjl-btn btn--d-hollow" to="/profile/edit">Edit Profile</Link>
        </div>
      );
    }
  }

  renderProfileImage(){
    if(this.state.blogger.profile_image){
      return <img className="user--pp" src={this.state.blogger.profile_image} alt={this.state.blogger.fullname}/>;
    }else{
      return <img className="user--pp" src="https://miro.medium.com/fit/c/240/240/0*32f1wB-hJ2cG3Va5" alt={this.state.blogger.fullname}/>;
    }
  }

  render(){
    if(this.state.loading){
      return <h1>Loading...</h1>;
    }else{
      if(this.state.error){
        return <h1>Page not found :(</h1>
      }else{
        return (
          <section className="container--sm">
            <div className="">
              <div className="d--flex flex-col-rev-sm blogger-panel">
                <div className="full-width">
                  <div className="d--flex">
                    <h1>{this.state.blogger.fullname}</h1>
                    {this.renderEditLink()}
                  </div>
                  <div>
                    <p className="text--muted textarea-u-b">
                      {this.state.blogger.bio}
                    </p>
                  </div>
                </div>
                <div className="p-img-wrapper">
                  {this.renderProfileImage()}
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
  }
}

function mapStateToProps(state){
  if(state.auth.authenticated){
    return { authUsername: state.auth.authenticated.user.username}
  }else{
    return { authUsername: null}
  }
}
export default connect(mapStateToProps, {fetchBlogger})(Profile);
