import React from 'react';
import CategoryNav from './includes/CategoryNav';
import { connect } from 'react-redux';

class Home extends React.Component{
  componentDidUpdate(){
    console.log(this.props.state);
  }
  render(){
    return (
      <div>
        <CategoryNav/>
        <section><h1>Hi there, this is home </h1></section>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { state };
}

export default connect(mapStateToProps)(Home);
