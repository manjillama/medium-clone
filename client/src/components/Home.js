import React, {Component} from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount(){
    console.log('Called', this.props.auth);
  }
  componentDidUpdate(){
    console.log('Called', this.props.auth);
  }
  render(){
    return <h1>Hi this is home</h1>;
  }
}

function mapStateToProps(state){
  return {auth: state.auth};
}
export default connect(mapStateToProps)(Home);
