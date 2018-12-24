import React, { Component } from 'react';
import { fetchBlogger } from 'services/bloggerService';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Profile.css';
import UserState from './includes/UserState';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      error:false,
      loading: true,
      blogger: null,
      paramUsername: null
    };
  }
  componentDidMount () {
    this.setState({paramUsername: this.props.match.params.username}, ()=>{
      this.getBlogger(this.state.paramUsername);
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({error:false});

    this.setState({paramUsername: nextProps.match.params.username}, ()=>{
      this.getBlogger(this.state.paramUsername);
    });
  }

  getBlogger(username){
    fetchBlogger(username).then(res => {
      if(res.data.error){
        this.setState({error:true});
      }else{
        this.setState({blogger: res.data});
      }
      this.setState({loading: false});
    });
  }

  renderEditLink(){
    if(this.state.paramUsername === this.props.username){
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
      const initial = this.state.blogger.fullname.charAt(0);
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
            <section className="container--sm">
                <div style={{marginBottom: 30+'px'}} className="d--flex flex-ai-fs flex-col-rev-sm blogger-panel">
                  <div className="full-width">
                    <div className="d--flex">
                      <h1>{this.state.blogger.fullname}</h1>
                      {this.renderEditLink()}
                    </div>
                    <div>
                      <p className="textarea-u-b">
                        {this.state.blogger.bio}
                      </p>
                    </div>
                  </div>
                  <div className="p-img-wrapper">
                    {this.renderProfileImage()}
                  </div>
                </div>
                <UserState blogger={this.state.blogger}/>
            </section>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state){
  if(state.auth.authenticated){
    return { username: state.auth.authenticated.user.username}
  }else{
    return { username: null}
  }
}

export default connect(mapStateToProps, null) (Profile);
