import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component{
  componentDidUpdate(){
    console.log(this.props.state);
  }
  render(){
    return <h1>Hi there, this is home </h1>
  }
}

function mapStateToProps(state){
  return { state };
}

export default connect(mapStateToProps)(Home);
