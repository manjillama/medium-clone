import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorPage from './404';
// ChildComponent is the component that's passed as a arguement into this function
export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      if(this.props.auth){
        return <ChildComponent {...this.props} />;
      }else{
        return <ErrorPage/>
      }
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
