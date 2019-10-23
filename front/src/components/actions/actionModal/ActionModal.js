import React from "react";

import PropTypes from "prop-types";

class ActionModal extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      hidden:true
    };
  }

    toggle = () => {
      this.setState({
        hidden:!this.state.hidden
      });
    };

    render()
    {
      if(this.state.hidden)
        return <div></div>;
      
      const buttons=[];
      if(this.props.cancelCBK && this.props.cancelText)
        buttons.push(
          <button className="modal__button modal__button--cancel" key={1} 
            onClick={()=>{this.props.cancelCBK();this.toggle();}}>
            {this.props.cancelText}
          </button>
        );
      if(this.props.okCBK && this.props.okText)
        buttons.push(
          <button className="modal__button modal__button--ok" key={0}
            onClick={()=>{this.props.okCBK();this.toggle();}}>
            {this.props.okText}
          </button>
        );
      

      return(
        <div className="modal">
          <div className="modal__backdrop" onClick={()=>this.toggle()} />
          <div className="modal__content">
            <div className="modal__header" style={{backgroundColor:this.props.modalHeaderBg,color:this.props.modalHeaderColor}}>
              <button className="modal__header__close" onClick={()=>this.toggle()}>&times;</button>
              <h4 className="modal__header__title">{this.props.modalHeaderTitle}</h4>
            </div>
            <div className="modal__body">
              {this.props.modalBody}
            </div>
            <div className="modal__footer">
              {buttons}
            </div>
          </div>
        </div>
      );
    }
}

ActionModal.propTypes = {
  okCBK: PropTypes.any,
  cancelCBK:PropTypes.any,
  okText:PropTypes.any,
  cancelText:PropTypes.any,
  modalHeaderBg:PropTypes.any,
  modalHeaderColor:PropTypes.any,
  modalHeaderTitle:PropTypes.any,
  modalBody:PropTypes.any
};

export default ActionModal;