import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogger } from '../../../actions/blogger';

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

  render(){
    if(this.state.loading){
      return <h1>Loading...</h1>;
    }else{
      if(this.state.error){
        return <h1>Page not found :(</h1>
      }else{
        return (
          <div>
            <h1>Hello {this.props.blogger.info.fullname}</h1>
            <article>
              <p>{this.props.blogger.info.bio}</p>
            </article>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state){
  return { blogger: state.blogger }
}
export default connect(mapStateToProps, {fetchBlogger})(Profile);
