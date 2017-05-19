import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userQuestionActions from '../../actions/customer/userQuestionActions';

class QuestionPopup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.closeModal = this.closeModal.bind(this);
   
    this.state = { question: '' };
  }

  handleQuestionChange(e) {
    this.setState({ question: e.target.value });
  }

  closeModal(e) {
    e.preventDefault();
    this.props.closeModal();
  }

  submitQuestion(e) {
    e.preventDefault();

    const question = { "inventoryReference": this.props.locationId, "question": this.refs.question.value.trim() };
    console.log(question);
    this.props.userQuestionActions.postQuestion(question);
  }

  render(){
    return (
        <div className="modal-dialog modelReviewAuthentication" role="document">
          <div className="modal-content">
            <div className={!this.props.hasPosted ? "modal-body" : "modal-body hide"}>
              <div className="row">
                <form className="modalForm" onSubmit={this.submitQuestion}>
                  <div className={this.props.errorMessage != undefined && this.props.errorMessage.length > 0 ? 'col-md-12' : 'col-md-12 hide'}>
                    <div className="bg-danger form-danger">
                    {this.props.errorMessage}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h3>Ask a Question</h3>
                    <p>Ask a question to the community and get the best travel tips from people that have been to <strong>{this.props.locationName}</strong>.</p>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                        <label>Question</label>
                        <textarea ref="question" className="form-control" rows="6" value={this.state.question} onChange={this.handleQuestionChange}></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 text-xs-center">
                      <input className="btn btn-primary" type="submit" value="Ask Question" />
                  </div>
                </form>
              </div>
            </div>
            <div className={this.props.hasPosted ? "modal-body" : "modal-body hide"}>
              <div className="row">
                <div className="col-md-12">
                  <h3>Thanks for the Question</h3>
                  <p>Thank you for posting your question. Please click <a href="#" onClick={this.closeModal}>here</a> to close the window.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer text-xs-center">
              <a href="#" onClick={this.closeModal}>Close</a>
            </div>
          </div>
        </div>
    );
  }
}

QuestionPopup.defaultProps = {
  locationId: 0,
  locationName: '',
  isSending: false,
  hasPosted: false
};

QuestionPopup.propTypes = {
  locationId: PropTypes.number,
  locationName: PropTypes.string,
  locationType: PropTypes.string,
  userQuestionActions: PropTypes.object.isRequired,
  isSending: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  hasPosted: PropTypes.bool,
  closeModal: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    isSending: state.question.isFetching,
    errorMessage: state.question.errorMessage,
    hasPosted: state.question.hasPosted 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userQuestionActions: bindActionCreators(userQuestionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPopup);