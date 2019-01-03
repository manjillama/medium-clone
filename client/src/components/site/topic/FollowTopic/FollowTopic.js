import React from 'react';
import { connect } from 'react-redux';
import { openModal } from 'actions/loginModal';

const FollowTopic = (props) => {
  function handleOpenModal(){
    props.openModal();
  }
  /*
  * If user is authenticated then continue
  * Else open login modal when clicked
  */
  if(props.auth){
    return (
      <button className="mjl-btn btn--p-hollow">Follow</button>
    );
  }else{
    return (
      <button className="mjl-btn btn--p-hollow" onClick={handleOpenModal}>Follow</button>
    );
  }
}

function mapStateToProps(state){
  return {auth: state.auth.authenticated};
}
export default connect(mapStateToProps, { openModal })(FollowTopic);
