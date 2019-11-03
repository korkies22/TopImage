import React,{useRef,useLayoutEffect} from "react";

import PropTypes from "prop-types";

const ActionModal=(props)=>{

  const firstButtonRef = useRef(null);
  const lastButtonRef = useRef(null);

  useLayoutEffect(() => {
    if (firstButtonRef.current) firstButtonRef.current.focus();
  }, [
    (() => {
      return firstButtonRef.current;
    })()
  ]);

  const handleExit = e => {
    console.log("Event",e.keyCode);
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
      props.closeModal();
    }
  };
  
  if(!props.open)
    return <div></div>;
  
  const buttons=[];
  if(props.cancelCBK && props.cancelText)
    buttons.push(
      <button className="modal__button modal__button--cancel" key={1} 
        onClick={()=>{props.cancelCBK();props.close();}}>
        {props.cancelText}
      </button>
    );
  if(props.okCBK && props.okText)
    buttons.push(
      <button className="modal__button modal__button--ok" key={0}
        onClick={()=>{props.okCBK();props.close();}}>
        {props.okText}
      </button>
    );
  

  return(
    <div className="modal">
      <div className="modal__backdrop" onClick={()=>props.close()} />
      <div className="modal__content">
        <div className="modal__header">
          <button className="modal__header__close" 
            onClick={()=>props.close()}
            ref={firstButtonRef}>
              &times;
          </button>
          <h4 className="modal__header__title">{props.modalHeaderTitle}</h4>
        </div>
        <div className="modal__body" onKeyPress={handleExit}>
          {props.modalBody}
        </div>
        <div className="modal__footer"  ref={lastButtonRef}>
          {buttons}
        </div>
      </div>
    </div>
  );
};


ActionModal.propTypes = {
  okCBK: PropTypes.any,
  cancelCBK:PropTypes.any,
  okText:PropTypes.any,
  cancelText:PropTypes.any,
  modalHeaderTitle:PropTypes.any,
  modalBody:PropTypes.any,
  closeModal: PropTypes.func,
  close: PropTypes.func,
  open: PropTypes.bool
};

export default ActionModal;