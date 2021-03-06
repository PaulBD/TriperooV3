import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../actions/common/modalActions';

import Header from '../components/layout/common/header';
import Footer from '../components/layout/common/footer';
import Modal from '../components/popups/modalPopup';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.modalActions.closeModal();
  }

  render(){

    if (this.props.isAdmin)
    {
      return (
        <div className="global-wrap">
          {this.props.children}
        </div>
      );
    }
    else {
      return (
        <div className="global-wrap">
          <Header showHeader={true} />
          {this.props.children}
          <Footer />
          <Modal modalName={this.props.modalName} modalType={this.props.modalType} modalContent={this.props.modalContent} modalIsOpen={this.props.modalIsOpen} closeModal={this.closeModal}/>
        </div>
      );
    }
  }
}

App.defaultProps = {
  modalContent: {},
  modalName: '',
  modalType: '',
  modalIsOpen: false,
  wizardStep: 1
};

App.propTypes = {
  isAdmin: PropTypes.bool,
  children: PropTypes.element,
  modalContent: PropTypes.object,
  modalName: PropTypes.string,
  modalType: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  modalActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {

  let isAdmin = false;
  if (ownProps.location.pathname.includes('admin-console'))
  {
    isAdmin = true;
  }

  return {
    isAdmin: isAdmin,
    modalContent: state.modal.modalContent ? state.modal.modalContent : {},
    modalName: state.modal.modalName ? state.modal.modalName : '',
    modalType: state.modal.modalType ? state.modal.modalType : '',
    modalIsOpen: state.modal.modalIsOpen ? state.modal.modalIsOpen : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
