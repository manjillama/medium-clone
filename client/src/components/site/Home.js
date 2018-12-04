import React from 'react';
import { connect } from 'react-redux';
class Home extends React.Component{
  componentDidUpdate(){
    console.log(this.props.auth);
  }
  render(){
    return <h1>Hi this is home</h1>
  }
}

function mapStateToProps(state){
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Home);
