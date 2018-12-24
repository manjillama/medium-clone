import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import PropTypes from 'prop-types';

class ConfirmBox extends React.Component {

  submit = () => {
    if(this.props.onMount){
      this.props.onMount();
    }

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>{this.props.text}</h1>
            <p style={{marginTop:8+'px', marginBottom:16+'px'}}>{this.props.msg}</p>
            <button className="mjl-btn btn-danger-hollow btn--dead-hollow" onClick={() => {
                this.props.handleConfirm(this.props.actionId)
                onClose()
            }}>{this.props.text}</button>
            <button style={{marginLeft: 10+'px'}} className="mjl-btn btn--d-hollow" onClick={onClose}>Cancel</button>
          </div>
        )
      }
    });
  };

  render() {
    return (
      <span onClick={this.submit}>{this.props.text}</span>
    );
  }
}

ConfirmBox.propTypes = {
  onMount: PropTypes.func,  // This function is executed when dialog box is opened
  text: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  actionId: PropTypes.node, // Can to anything to be returned as an arguement
  handleConfirm: PropTypes.func.isRequired
}

export default ConfirmBox;
