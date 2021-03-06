import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authenticationActions from '../../actions/customer/authenticationActions';
import * as userReviewActions from '../../actions/customer/userReviewActions';
import * as modalActions from '../../actions/common/modalActions';
import * as userActions from '../../actions/customer/userActions';
import TripItem from '../../components/layout/cards/customer/tripItem';
import TriperooLoader from '../../components/loaders/globalLoader';
import CustomerHeader from '../../components/layout/customer/customerHeader';
import ReviewList from '../../components/layout/cards/reviews/homePageReviewCard';
import Toastr from 'toastr';
import GoogleMaps from '../../components/maps/googleMap';

class CustomerHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isLoading: true, loadingReviews: false, isLoadingTrips: false };
    this.refreshData = this.refreshData.bind(this);
    this.createTrip = this.createTrip.bind(this);
    this.createReview = this.createReview.bind(this);
  }

  componentWillMount() {
    document.title = 'Profile Page';
    window.scrollTo(0, 0);

    this.setState({isLoading: true, isLoadingTrips: true, loadingReviews: true});
    this.props.userActions.getUser(this.props.currentUserId)
      .then(() => {
        this.setState({isLoading: false, isLoadingTrips: true, loadingReviews: true});
        this.props.userActions.getTrips(this.props.currentUserId)
          .then(() => {
            this.setState({isLoading: false, isLoadingTrips: false, loadingReviews: true});
            this.loadReviews();
          })
          .catch(error => {
            Toastr.error(error);
            this.setState({isLoading: false, isLoadingTrips: false, loadingReviews: false});
          });
      })
      .catch(error => {
        Toastr.error(error);
        this.setState({isLoading: false, isLoadingTrips: false, loadingReviews: false});
      });

  }

  refreshData() {
    this.loadReviews();
  }

  loadReviews(){
    this.props.userReviewActions.getReviews(this.props.currentUserId, 3, 0)
      .then(() => {
        this.setState({loading: false, isLoadingTrips: false, loadingReviews: false});
      })
      .catch(error => {
        Toastr.error(error);
        this.setState({loading: false, isLoadingTrips: false, loadingReviews: false});
      });
  }

  createTrip(e) {
    e.preventDefault();
    this.props.modalActions.openBookmark(0, '', '', '', '', '', 0, '', '', '', '', '', '', false, 0, 0,'','','');
  }

  createReview(e) {
    e.preventDefault();
    this.props.modalActions.openReview(0, '', '');
  }

  render(){

    let addTrip = '';
    let moreTrip = '';
    let moreReviews = '';

    if (this.props.isActiveUser) {
      if (this.props.tripList != null && this.props.tripList.length < 3 && this.props.tripList.length > 0) {
        addTrip = (
          <div className="col-md-4">
              <div className="card text-center createTripBlank">
                <div className="card-block">
                  <a href="#" onClick={this.createTrip}><i className="fa fa-plus-circle" /></a>
                  <h4 className="card-title">Inspire Someone & Share Experiences</h4>
                  <p className="card-text">Share trips with friends and family</p>
                  <a href="#" className="btn btn-primary"  onClick={this.createTrip}>Create Trip</a>
                </div>
              </div>
          </div>
        );
      }
      if (this.props.tripList != null && this.props.tripList.length < 3 && this.props.tripList.length == 0) {
        addTrip = (
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">&nbsp;</div>
                <div className="col-md-4">
                  <div className="card text-center createPhoto">
                    <div className="card-block">
                      <a href="#" onClick={this.createTrip}><i className="fa fa-plus-circle" /></a>
                      <h4 className="card-title">Inspire Someone & Share Experiences</h4>
                      <p className="card-text">Share trips with friends and family</p>
                      <a href="#" className="btn btn-primary"  onClick={this.createTrip}>Create Trip</a>
                    </div>
                  </div>
                </div>
              <div className="col-md-4">&nbsp;</div>
            </div>
          </div>
        );
      }
    }

    if (!this.state.isLoading && !this.state.isLoadingTrips) {
      let tripUrl = this.props.user.profile.profileUrl + '/trips';
      if (this.props.tripList != null && this.props.tripList.length > 0 && this.props.tripList.length > 3 ) {
        moreTrip = (<div className="col-md-12 text-center"><p><a href={tripUrl}>Click here to see more trips</a></p></div>);
      }

      let reviewUrl = this.props.user.profile.profileUrl + '/reviews';
      if (this.props.reviews != null && this.props.reviews.length > 0 ) {
        moreReviews = (<div className="col-md-12 text-center"><p><a href={reviewUrl}>Click here to see more reviews</a></p></div>);
      }

      let markerArray = [];

      for (let i = 0; i < this.props.user.visitedLocations.length; i++) {
        markerArray.push({"url": this.props.user.visitedLocations[i].url, "regionName":this.props.user.visitedLocations[i].regionName,"subClass":this.props.user.visitedLocations[i].subClass,"locationCoordinates":{"latitude":this.props.user.visitedLocations[i].latitude,"longitude":this.props.user.visitedLocations[i].longitude }});
      }

      let profileUrl = this.props.user && this.props.user.profile ? this.props.user.profile.profileUrl : '';
      return (
        <div>
          <CustomerHeader user={this.props.user} isAuthenticated={this.props.isAuthenticated} isActiveUser={this.props.isActiveUser}/>
          <div className="container">
            <div className="gap gap-small"></div>
            <div className="row">
              <div className="col-md-12 text-center">
                <h3 className="mb20">{!this.props.isActiveUser ? 'Explore the world with ' + this.props.user.profile.name : 'Explore With Triperoo'}</h3>
                <p>{!this.props.isActiveUser ? 'Check out which trips ' + this.props.user.profile.name + ' is suggesting' : 'Build up your planned trip and share with other travellers'}</p>
                <div className="gap gap-small"></div>
              </div>
              <div className="col-md-12">
                <div className="row">
                    {
                      this.props.tripList != null && this.props.tripList.length > 0 ? this.props.tripList.map(function(trip, i)
                      {
                        if (i < 3) {
                          return (<TripItem trip={trip} key={trip.id} parentUrl={profileUrl} cssClass="col-md-4" position={i}/>);
                        }
                        else {
                          return null;
                        }
                      }) : this.props.isActiveUser ? '' : <div className="col-md-12 alert alert-info text-center" role="alert">{this.props.user.profile.name} hasn't created any trips yet.</div>
                    }

                    {addTrip}
                  {moreTrip}
                </div>
              </div>
            </div>
            <div className="gap gap-small"></div>
          </div>
          <div className="jumbotron maps">
              <GoogleMaps locationType="User" latitude={51.5074}
                          longitude={-0.141099}
                          text="" zoom={2}
                          isLoading={this.state.isLoading} markerArray={markerArray}/>
          </div>
          <div className="container">
            <div className="gap gap-small"></div>
            <div className="col-md-12 text-center">
              <h3 className="mb20">{!this.props.isActiveUser ? 'Read  ' + this.props.user.profile.name + ' Reviews': 'Your Reviews'}</h3>

              <p>Help people discover the best locations by writing reviews about where you've been</p>
              <div className="gap gap-small"></div>
            </div>
            <div className={this.props.reviews.length > 0 ? "row" : "hide"}>
              <div className="col-md-12">
                <ReviewList currentUserId={this.props.currentUserId} reviews={this.props.reviews} maxTags={5} showEdit={this.props.isActiveUser} cssClass="card-deck" refreshData={this.refreshData}/>
                {moreReviews}
              </div>
            </div>
            <div className={this.props.reviews.length == 0 ? "row" : "hide"}>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4">&nbsp;</div>
                  <div className="col-md-4">
                    <div className="card text-center createPhoto">
                      <div className="card-block">
                        <a href="#" onClick={this.createReview}><i className="fa fa-plus-circle" /></a>
                        <h4 className="card-title">Share Your Experiences</h4>
                        <p className="card-text">Tell us about the good, the bad and the ugly!</p>
                        <a href="#" className="btn btn-primary"  onClick={this.createReview}>Add Review</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">&nbsp;</div>
                </div>
                <div className="gap gap-small"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<TriperooLoader />);
    }
  }
}

CustomerHome.propTypes = {
  authActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  modalActions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userReviewActions: PropTypes.object.isRequired,
  isActiveUser: PropTypes.bool.isRequired,
  user: PropTypes.object,
  currentUserId: PropTypes.string,
  tripList: PropTypes.array,
  reviews: PropTypes.array,
  reviewCount: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  let user = localStorage.getItem('id_token') ? JSON.parse(localStorage.getItem('id_token')) : {};
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    currentUserId: ownProps.params.guid,
    isActiveUser: user ? ownProps.params.guid.trim() == user.userId.trim() : false,
    user: state.user.user ? state.user.user : {},
    tripList: state.user.trips ? state.user.trips : [],
    reviews: state.review.reviews ? state.review.reviews : [],
    reviewCount: state.review.reviewCount ? state.review.reviewCount : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    userReviewActions: bindActionCreators(userReviewActions, dispatch),
    authActions: bindActionCreators(authenticationActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
