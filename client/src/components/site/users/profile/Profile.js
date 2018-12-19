import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogger } from 'actions/blogger';
import CategoryNav from 'components/site/includes/CategoryNav';

import { Link } from 'react-router-dom';
import './Profile.css';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {error:false, loading: true};
  }
  componentDidMount () {
    // Listening to url change
    this.unlisten = this.props.history.listen((location, action) => {
      /*
      *To prevent
        - Can't perform a React state update on an unmounted component.
        - This is a no-op, but it indicates a memory leak in your application.
        - To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        - asynchronous fetchBlogger function won't set state if routed to another url***
      */
      const param = location.pathname.split('@')[1];
      if(param)
        this.fetchBlogger(param);
    });
    //const username  = this.props.match.params.username;
    this.fetchBlogger()
  }

  componentWillUnmount() {
    this.unlisten();
  }

  fetchBlogger(param){
    const username  = param ? param : this.props.match.params.username;
    this.props.fetchBlogger(username, (error)=>{
      if(error){
        this.setState({error:true});
      }
      this.setState({loading: false});
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
    if(this.props.blogger.profile_image){
      return <img className="user--pp" src={this.props.blogger.profile_image} alt={this.props.blogger.fullname}/>;
    }else{
      const initial = this.props.blogger.fullname.charAt(0);
      return <div className="user--pp">{initial}</div>;
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
          <div>
            <CategoryNav/>
            <section className="container--sm">
                <div className="d--flex flex-ai-fs flex-col-rev-sm blogger-panel">
                  <div className="full-width">
                    <div className="d--flex">
                      <h1>{this.props.blogger.fullname}</h1>
                      {this.renderEditLink()}
                    </div>
                    <div>
                      <p className="text--muted textarea-u-b">
                        {this.props.blogger.bio}
                      </p>
                    </div>
                  </div>
                  <div className="p-img-wrapper">
                    {this.renderProfileImage()}
                  </div>
                </div>
            </section>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state){
  if(state.auth.authenticated){
    return { authUsername: state.auth.authenticated.user.username, blogger:state.blogger.info}
  }else{
    return { authUsername: null}
  }
}
export default connect(mapStateToProps, {fetchBlogger})(Profile);
