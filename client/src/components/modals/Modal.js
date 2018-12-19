import React from 'react';
import './Modal.css';
import PropTypes from 'prop-types';

const Modal = (props) => {

  const modalStyles = {
    backgroundColor: props.modalBackgroundColor
  }

  if(props.modalMaxWidth)
    modalStyles.maxWidth = props.modalMaxWidth;
  if(props.modalHeight)
    modalStyles.height = props.modalHeight;
  if(props.modalWidth)
    modalStyles.width = props.modalWidth;
  if(props.modalNoShadow)
    modalStyles.boxShadow = 'none';

  return (
    <div id="modalWrapper">
      <div className="modal--overlay" style={{backgroundColor: props.modalOverlayColor}}></div>
      <div className="modal">
        <div className="modal-dialog" style={modalStyles}>
          <div className="modal-content">
            <div className="modal-body">
              {
                props.displayCloseBtn &&
                <svg className="closeModal" width="29" height="29" onClick={props.closeModal}>
                  <path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path>
                </svg>
              }
              <div className="modal-content-holder text-center">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Modal.propTypes = {
  modalBackgroundColor: PropTypes.string.isRequired,
  modalMaxWidth: PropTypes.string,
  modalWidth: PropTypes.string,
  modalHidth: PropTypes.string,
  modalNoShadow: PropTypes.bool,
  modalOverlayColor: PropTypes.string.isRequired,
  displayCloseBtn: PropTypes.bool,
  children: PropTypes.node.isRequired
}
export default Modal;
