import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as locationActions from '../../actions/location/locationActions';
import * as pointOfInterestActions from '../../actions/location/travelContent/pointofinterestActions';
import FacebookSignup from '../../components/forms/authentication/facebookSignup';
import TriperooLoader from '../../components/loaders/globalLoader';
import MapSideBar from '../../components/maps/mapSideBar';
import FilterPointOfInterest from '../../components/forms/searchForms/filterPointOfInterests';
import TrustedPartners from '../../components/content/static/trustedPartners';
import Toastr from 'toastr';

import SubPageHeader from '../../components/content/headers/locationCategory';
import PointsOfInterest from '../../components/layout/cards/location/locationListWrapper';

let titleCase = require('title-case');

class PointOfInterestContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.changePage = this.changePage.bind(this);
    this.filterPointOfInterests = this.filterPointOfInterests.bind(this);
    this.state = {
      searchValue: ''
      , isLoadingCategoryList: true
      , isLoadingLocation: true
      , isLoadingPointOfInterestList: true
      , pointOfInterestType: ''
      , pointOfInterestFriendlyName: ''
      , pointOfInterestSearch: ''
      , pageSize: 24
      , pageNumber: 0
      , activePage: 1 };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.loadLocation();
  }

  loadLocation() {
    this.props.locationActions.loadLocationById(this.props.locationId, true)
      .then(() => {
        this.setState({isLoadingCategoryList: true});
        this.loadPointOfInterests(this.props.locationId, this.state.pointOfInterestType, this.state.pointOfInterestSearch, this.state.pageSize, this.state.pageNumber);

      })
      .catch(error => {
        Toastr.error(error);
        this.setState({isLoadingLocation: false});
      });
  }

  changePage(value){
    this.loadPointOfInterests(this.props.locationId, this.state.pointOfInterestType, this.state.pointOfInterestSearch, this.state.pageSize, value - 1);
  }

  loadPointOfInterests(locationId, pointOfInterestType, pointOfInterestName, pageSize, pageNumber) {
    this.setState({isLoadingLocation: false, isLoadingPointOfInterestList: true});

    this.props.pointOfInterestActions.loadPointOfInterestsByParentLocationId(locationId, pointOfInterestType, pointOfInterestName, pageSize, pageNumber)
      .then(() => this.setState({isLoadingPointOfInterestList: false, isLoadingCategoryList:false}))
      .catch(error => {
        Toastr.error(error);
        this.setState({isLoadingPointOfInterestList: false});
      });
  }

  filterPointOfInterests(pointOfInterestCategory, filteredName) {
    this.setState({ pointOfInterestType: pointOfInterestCategory, pointOfInterestFriendlyName: pointOfInterestCategory, pointOfInterestSearch: filteredName});
    this.loadPointOfInterests(this.props.locationId, pointOfInterestCategory, filteredName, this.state.pageSize, this.state.pageNumber);
  }

  render(){
    let title = 'Points of Interest in ' + titleCase(this.props.location.regionName);

    document.title = title;

    if (! this.state.isLoadingLocation)
    {
      if (!this.state.isLoadingCategoryList) {

        if (this.props.pointOfInterestsCount > 0) {
          return (
            <div>
              <SubPageHeader location={this.props.location} contentType="pointOfInterest" title={title}/>
              <div className="gap gap-small"></div>
              <div className="container">
                <div className="row row-wrap">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3 sideBar">
                        <MapSideBar
                          latitude={this.props.location.locationCoordinates ? this.props.location.locationCoordinates.latitude : 0}
                          longitude={this.props.location.locationCoordinates ? this.props.location.locationCoordinates.longitude : 0}
                          text={title} zoom={13} markerArray={this.props.mapPointOfInterests}
                          isLoading={this.state.isLoadingCategoryList} locationType={this.props.location.subClass}/>
                        <FilterPointOfInterest searchName="" locationId={this.props.locationId}
                                               pageSize={this.state.pageSize} pageNumber={this.state.pageNumber}
                                               categories={this.props.pointOfInterestsCategories}
                                               filterPointOfInterests={this.filterPointOfInterests}
                                               isFetching={this.state.isLoadingCategoryList}/>
                      </div>
                      <div className="col-md-9 restaurantList">
                        <PointsOfInterest useMinHeight={false} location={this.props.location}
                                          locationId={this.props.locationId} locations={this.props.pointOfInterests}
                                          locationCount={this.props.pointOfInterestsCount} changePage={this.changePage}
                                          isFetching={this.props.isFetching} contentType="pointOfInterest"/>
                      </div>
                    </div>
                    <div className="gap gap-small"></div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="gap gap-mini"></div>
                <FacebookSignup showLines={true}/>
                <TrustedPartners />
                <div className="gap gap-mini"></div>
              </div>

            </div>
          );
        }
        else {

          let editUrl = this.props.location.url + '/add';

          return (
            <div>
              <SubPageHeader location={this.props.location} contentType="pointOfInterest" title={title}/>
              <div className="gap gap-small"></div>
              <div className="container">
                <div className="row row-wrap">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h4>We Need Your Help!!</h4>
                        <p>We want to supply the best local content for {titleCase(this.props.location.regionName)} so
                          we
                          need you
                          to submit the best attractions, hotels and restaurants to Triperoo!</p>
                        <p>Simply, click the button below and add your favourite location so we can review and add to
                          our
                          growing
                          database. Our mission is provide the best guide
                          to {titleCase(this.props.location.regionName)}.</p>
                        <p><a href={editUrl} className="btn btn-primary" title="Suggest Location">Suggest Location</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="gap gap-mini"></div>
                <FacebookSignup showLines={true}/>
                <TrustedPartners />
                <div className="gap gap-mini"></div>
              </div>
            </div>
          );
        }
      }
      else {
        return (<TriperooLoader />);
      }
    }
    else {
      return (<TriperooLoader />);
    }
  }
}

PointOfInterestContent.defaultProps = {
  attractionType: '',
  mapAttractions: [],
  attractionCategories: []
};

PointOfInterestContent.propTypes = {
  locationId: PropTypes.number,
  location: PropTypes.object,
  locationActions: PropTypes.object.isRequired,
  pointOfInterestActions: PropTypes.object.isRequired,
  pointOfInterestsCount: PropTypes.number.isRequired,
  mapPointOfInterests: PropTypes.array.isRequired,
  pointOfInterestsCategories: PropTypes.array.isRequired,
  pointOfInterests: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pointOfInterestType: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    location: state.location.location ? state.location.location : {},
    locationId: ownProps.params.placeId ? parseInt(ownProps.params.placeId) : 0,
    isFetching: state.pointOfInterests.isFetching,
    pointOfInterests: state.pointOfInterests.pointOfInterestsList ? state.pointOfInterests.pointOfInterestsList : {},
    mapPointOfInterests: state.pointOfInterests.pointOfInterestsList ? state.pointOfInterests.pointOfInterestsList.mapLocations : [],
    pointOfInterestsCategories: state.pointOfInterests.pointOfInterestsList ? state.pointOfInterests.pointOfInterestsList.categories : [],
    pointOfInterestsCount:  state.pointOfInterests.pointOfInterestsList ? state.pointOfInterests.pointOfInterestsList.locationCount : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locationActions: bindActionCreators(locationActions, dispatch),
    pointOfInterestActions: bindActionCreators(pointOfInterestActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PointOfInterestContent);
