import React, { useRef, useLayoutEffect } from "react";

import PropTypes from "prop-types";

const ActionModal = props => {
  const firstButtonRef = useRef(null);
  const lastButtonRef = useRef(null);

  useLayoutEffect(() => {
    if (firstButtonRef.current) firstButtonRef.current.focus();
  }, [
    firstButtonRef
  ]);

  const handleExit = e => {
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstButtonRef.current) {
          e.preventDefault();
          lastButtonRef.current.focus();
        }
      } else {
        if (document.activeElement === lastButtonRef.current) {
          e.preventDefault();
          firstButtonRef.current.focus();
        }
      }
    }
    if (e.key === "Escape") {
      props.close();
    }
  };

  const buttons = [];
  if (props.cancelCBK && props.cancelText)
    buttons.push(
      <button
        className="modal__button modal__button--cancel"
        key={1}
        onClick={() => {
          props.cancelCBK();
          if(props.close)
            props.close();
        }}
      >
        {props.cancelText}
      </button>
    );
  if (props.okCBK && props.okText)
    buttons.push(
      <button
        className="modal__button modal__button--ok"
        key={0}
        onClick={() => {
          props.okCBK();
          if(props.close)
            props.close();
        }}
      >
        {props.okText}
      </button>
    );

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={() => props.close?props.close():null} />
      <div className="modal__content" onKeyDown={handleExit} tabIndex="0">
        <div className="modal__header">
          {
            props.close?
              <button
                className="modal__header__close"
                onClick={() => props.close()}
                ref={firstButtonRef}
              >
                &times;
              </button>
            :null
          }
          <h4 className="modal__header__title">{props.modalHeaderTitle}</h4>
        </div>
        <div className="modal__body">{props.modalBody}</div>
        <div className="modal__footer" ref={lastButtonRef} tabIndex="0">
          {buttons}
        </div>
      </div>
    </div>
  );
};

ActionModal.propTypes = {
  okCBK: PropTypes.any,
  cancelCBK: PropTypes.any,
  okText: PropTypes.any,
  cancelText: PropTypes.any,
  modalHeaderTitle: PropTypes.any,
  modalBody: PropTypes.any,
  close: PropTypes.func,
};

export default ActionModal;
