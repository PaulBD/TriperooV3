import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as locationActions from '../../actions/location/locationActions';

import FacebookSignup from '../../components/forms/authentication/facebookSignup';
import Header from '../../components/content/headers/locationCategory';

import ReviewList from '../../components/layout/cards/reviews/locationReviewList';
import LocationStats from '../../components/layout/location/stats';
import WeatherForcast from '../../components/layout/weather/forecast';
import ReviewButton from '../../components/layout/buttons/reviewButton';
import TriperooLoader from '../../components/loaders/globalLoader';
import Toastr from 'toastr';

let titleCase = require('title-case');

class ReviewsByLocation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isLoadingLocation: false };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.setState({isLoadingLocation: true});
    this.loadLocation();
  }

  loadLocation() {
    this.props.locationActions.loadLocationById(this.props.locationId, true)
      .then(() => this.DoSomething())
      .catch(error => {
        Toastr.error(error);
        this.setState({isLoadingLocation: false});
      });
  }

  DoSomething() {
    this.setState({isLoadingLocation: false});
  }

  render(){
    document.title = titleCase(this.props.location.regionName) + ' reviews';

    if (! this.state.isLoadingLocation)
    {
      return (
        <div>
          <Header location={this.props.location} contentType="reviews" title="Reviews" />
          <div className="container">
            <div className="row row-wrap">
              <div className="gap gap-small"></div>
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <ReviewList locationId={this.props.locationId} locationName={this.props.location.regionName} locationType={this.props.location.regionType} pageSize={3} pageNumber={0} showTitle={false} showLocation={true}/>
                  </div>
                  <div className="col-md-4">
                    <ReviewButton name="sidePanel" locationId={this.props.locationId} locationName={this.props.location.regionName} locationNameLong={this.props.location.regionNameLong} locationType={this.props.location.regionType} pageSize={3} pageNumber={0} />
                    <LocationStats locationId={this.props.locationId} stats={this.props.location.stats} locationUrl={this.props.location.url} locationName={this.props.location.regionName}  />
                    <div className="gap gap-small"></div>
                    <WeatherForcast locationId={this.props.locationId} />
                  </div>
                </div>
              </div>
              <div className="gap"></div>
            </div>
          </div>
          <FacebookSignup />
        </div>
      );
    }
    else {
      return (<TriperooLoader />);
    }
  }
}

ReviewsByLocation.defaultProps = {
  isFetching: false
};

ReviewsByLocation.propTypes = {
  locationId: PropTypes.number,
  location: PropTypes.object,
  locationActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    location: state.location.location ? state.location.location : {},
    locationId: ownProps.params.placeId ? parseInt(ownProps.params.placeId) : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locationActions: bindActionCreators(locationActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsByLocation);
