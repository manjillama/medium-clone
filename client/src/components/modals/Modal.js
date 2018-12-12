import React from 'react';
import './Modal.css';

export default (props) => {
  return (
    <div id="modalWrapper">
      <div className="modal-backdrop" style={{backgroundColor: props.modalOverlayColor}}></div>
      <div className="modal">
        <div className="modal-dialog" style={{backgroundColor: props.modalBackgroundColor}}>
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
