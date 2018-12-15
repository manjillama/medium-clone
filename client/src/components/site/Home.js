import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component{
  componentDidUpdate(){
    console.log(this.props.state);
  }
  render(){
    return <section><h1>Hi there, this is home </h1></section>;
  }
}

function mapStateToProps(state){
  return { state };
}

export default connect(mapStateToProps)(Home);
