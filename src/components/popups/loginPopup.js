import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authenticationActions from '../../actions/customer/authenticationActions';

import * as locationActions from '../../actions/location/locationActions';

import Loader from '../loaders/contentLoader';
import FacebookButton from '../layout/buttons/facebookButton';
import ForgotPasswordForm from '../forms/authentication/forgotPasswordForm';
import LoginForm from '../forms/authentication/loginForm';
import FacebookForm from '../forms/authentication/facebookForm';
import Toastr from 'toastr';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.submitStandardForm = this.submitStandardForm.bind(this);
    this.submitResetPasswordForm = this.submitResetPasswordForm.bind(this);
    this.submitFacebookForm = this.submitFacebookForm.bind(this);
    this.changeForgotPassword = this.changeForgotPassword.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showFacebookLocationForm = this.showFacebookLocationForm.bind(this);
    this.changeField = this.changeField.bind(this);
    this.onChangeAutoComplete = this.onChangeAutoComplete.bind(this);

    this.state = {
      creds: {
        accessToken: '',
        emailAddress: '',
        password: '',
        facebookId: '',
        name: '',
        imageUrl: '',
        cityId: 0,
        city: '',
        optIn: 1
      },
      errors:'',
      creatingUser: false,
      useFacebook: false,
      isLoggingIn: false,
      isLoadingLocation: false,
      isForgotPassword: false,
      isSendingPassword: false,
      hasSentPassword: false
    };
  }

  showFacebookLocationForm(response) {
    this.setState({creatingUser: true, useFacebook: false, creds: { accessToken: response.accessToken, emailAddress: response.email, facebookId: response.userID, name: response.name, imageUrl: response.picture.data.url, city: '', cityId: 0, password: '', optIn: 1}});

    this.props.actions.getFacebookUser({accessToken: this.state.creds.accessToken, emailAddress: this.state.creds.emailAddress, facebookId: this.state.creds.facebookId, name: this.state.creds.name, imageUrl: this.state.creds.imageUrl, cityId: this.state.creds.cityId, city: this.state.creds.city})
      .then(() => {
        if (this.props.user != undefined)
        {
          if (this.props.user != undefined)
          {
            if (this.props.user.profile.currentLocation == '' || this.props.user.profile.currentLocation == 0)
            {
              this.setState({useFacebook: true});
            }
            else {
              this.login();
            }
          }
          else {
            this.setState({useFacebook: true});
          }
        } else {
          this.setState({useFacebook: true});
        }
      })
      .catch(error => {
        Toastr.error(error);
        this.setState({creatingUser: false, errors: error});
      });
  }

  submitFacebookForm(e) {
    e.preventDefault();
    this.login();
  }

  login() {
    this.props.actions.loginFacebookUser({accessToken: this.state.creds.accessToken, emailAddress: this.state.creds.emailAddress, facebookId: this.state.creds.facebookId, name: this.state.creds.name, imageUrl: this.state.creds.imageUrl, cityId: this.state.creds.cityId, city: this.state.creds.city, optIn: this.state.creds.optIn})
      .then(() => {
        this.setState({creatingUser: false, errors: this.props.errorMessage});
        if (this.props.errorMessage == '' && this.props.errorMessage.length == 0)
        {
          this.closeLoginModal(null);
        }
      })
      .catch(error => {
        Toastr.error(error);
        this.setState({creatingUser: false, errors: error});
      });
  }

  submitStandardForm(e) {
    e.preventDefault();
    if ((this.state.creds.emailAddress != '' && this.state.creds.emailAddress.length > 0) && (this.state.creds.password != '' && this.state.creds.password.length > 0)) {
      this.setState({isLoggingIn: true});
      this.props.actions.loginUser(this.state.creds)
        .then(() => {
          this.setState({isLoggingIn: false, errors: this.props.errorMessage});

          if (this.props.errorMessage == '' && this.props.errorMessage.length == 0)
          {
            this.closeLoginModal(null);
          }
        })
        .catch(error => {
          Toastr.error(error);
          this.setState({isLoggingIn: false, errors: error});
        });
    }
    else {
      this.setState({isLoggingIn: false, errors: "Please supply valid login credentials"});
    }
  }

  submitResetPasswordForm(e) {
    e.preventDefault();
    if (this.state.creds.emailAddress != '' && this.state.creds.emailAddress.length > 0) {
      this.setState({isSendingPassword: true, creds: { emailAddress: this.state.creds.emailAddress, password: ''}});
      this.props.actions.resetPassword(this.state.creds)
        .then(() => {
          Toastr.success('An email with a link to reset your password has been sent to ' + this.state.creds.emailAddress);
          this.setState({isSendingPassword: false, hasSentPassword: this.props.errorMessage == '' && this.props.errorMessage.length == 0, errors: this.props.errorMessage});
          this.closeLoginModal(null);
        })
        .catch(error => {
          Toastr.error(error);
          this.setState({isSendingPassword: false, errors: error});
        });
    }
    else {
      this.setState({isSendingPassword: false, errors: "Please supply a valid email address"});
    }
  }

  changeField(event) {
    //event.preventDefault();
    const field = event.target.name;
    let creds = this.state.creds;


    if (field == 'optIn')
    {
      if (this.state.creds.optIn == 0)
      {
        creds[field] = 1;
      }
      else {
        creds[field] = 0;
      }
    }
    else {
      creds[field] = event.target.value;
    }

    this.setState({creds: creds});
  }

  changeForgotPassword(e) {
    e.preventDefault();
    this.setState({ isForgotPassword: true, errors: '' });
  }

  changeLogin(e) {
    e.preventDefault();
    this.setState({ isForgotPassword: false, errors: '' });
  }

  closeLoginModal(e) {
    if (e != null) {
      e.preventDefault();
    }
    browserHistory.push("/welcome");

    this.loadLocation();

    this.props.closeModal();
  }

  closeModal(e) {
    e.preventDefault();
    this.props.closeModal();
  }

  onChangeAutoComplete(city, cityId, cityUrl, dataType)
  {
    let creds = this.state.creds;
    creds.cityId = cityId;
    creds.city = city;
    this.setState({creds: creds});
  }

  loadLocation() {
    this.setState({ isLoadingLocation: true });
    this.props.locationActions.loadLocationById(this.props.cityId, true)
      .then(() => {
        this.setState({ isLoadingLocation: false });
      })
      .catch(error => {
        this.setState({isLoadingLocation: false});
      });
  }

  render(){
    return (
      <div>
        <div className={this.state.isForgotPassword ? "modal-dialog modelAuthentication hide" : "modal-dialog modelAuthentication"} role="document">
          <div className={!this.state.creatingUser && !this.state.isLoggingIn && !this.state.useFacebook  ? "modal-content" : "modal-content hide"}>
            <div className="modal-body">
              <div className="row">
                <div className="gap gap-mini"></div>
                <div className="col-md-12 text-center">
                  <FacebookButton onCallback={this.showFacebookLocationForm}/>
                </div>
                <div className="gap gap-mini"></div>
                <div className="col-md-12 text-center signupSeperator">
                  <strong>or</strong>
                  <hr />
                </div>
              <div className="gap gap-mini"></div>
                <LoginForm emailAddress={this.state.creds.emailAddress} password={this.state.creds.password} isLoggingIn={this.state.isLoggingIn} onSubmit={this.submitStandardForm} onChange={this.changeField} onChangeLogin={this.changeForgotPassword} errors={this.state.errors}/>
              </div>
            </div>
            <div className="modal-footer text-center">
              <p className="closeText mb-0"><a href="#" onClick={this.closeModal}>Close</a></p>
            </div>
          </div>
          <div className={(this.state.creatingUser || this.state.isLoggingIn)  && !this.state.useFacebook ? "modal-content" : "modal-content hide"}>
            <Loader showLoader={true} />
          </div>
          <div className={this.state.useFacebook ? "modal-dialog modelAuthentication " : "modal-dialog modelAuthentication hide"} role="document"><div className="modal-body">
            <div className="row">
              <div className="gap gap-mini"></div>
                <FacebookForm errors={this.state.errors} isUpdating={this.state.creatingUser} onSubmit={this.submitFacebookForm} onChangeAutoComplete={this.onChangeAutoComplete} city="" optIn={this.state.creds.optIn} onChange={this.changeField}/>
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.isForgotPassword ? "modal-dialog modelAuthentication " : "modal-dialog modelAuthentication hide"} role="document">
          <ForgotPasswordForm emailAddress={this.state.creds.emailAddress} hasSentPassword={this.state.hasSentPassword} isSendingPassword={this.state.isSendingPassword} onSubmit={this.submitResetPasswordForm} onChange={this.changeField} onChangeLogin={this.changeLogin} errors={this.state.errors}/>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {
  isAuthenticated: false,
  isFetching: false,
  hasSentPassword: false,
  user: {},
  cityId: 2114
};

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasSentPassword: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  closeModal: PropTypes.func,
  user: PropTypes.object.isRequired,
  location: PropTypes.object,
  locationActions: PropTypes.object.isRequired,
  cityId: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  return {
    isFetching: state.authentication.isFetching,
    isAuthenticated: state.authentication.isAuthenticated,
    errorMessage: state.authentication.errorMessage,
    hasSentPassword: state.authentication.hasSentPassword,
    cityId: state.authentication.currentLocationId,
    user: state.authentication.user,
    location: state.location.location ? state.location.location : {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locationActions: bindActionCreators(locationActions, dispatch),
    actions: bindActionCreators(authenticationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
