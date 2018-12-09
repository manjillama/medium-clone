import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogger } from '../../../actions/blogger';
import { Link } from 'react-router-dom';
import './Profile.css';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {error:false, loading: true};
  }
  componentWillMount () {
    const { username } = this.props.match.params;
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
                    <h1>{this.props.blogger.fullname}</h1>
                    {this.renderEditLink()}
                  </div>
                  <div>
                    <p className="text--muted textarea-u-b">
                      {this.props.blogger.bio}
                    </p>
                  </div>
                </div>
                <div>
                  <img className="user--pp" src="https://miro.medium.com/fit/c/240/240/0*32f1wB-hJ2cG3Va5" alt={this.props.blogger.fullname}/>
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
    return { blogger: state.blogger.info , authUsername: state.auth.authenticated.username}
  }else{
    return { blogger: state.blogger.info , authUsername: null}
  }
}
export default connect(mapStateToProps, {fetchBlogger})(Profile);
