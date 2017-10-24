import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as locationsActions from '../../../../actions/location/locationsActions';
import LocationList from './locationList';
import Loader from '../../../loaders/contentLoader';
let titleCase = require('title-case');
import Toastr from 'toastr';

class TopLocations extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { loadingLocations: false };
  }

  componentWillMount() {
    this.loadLocations();
  }

  loadLocations() {
    this.setState({loadingLocations: true});
    this.props.locationsActions.loadLocationsByParentLocationId(this.props.locationId, this.props.locationType, 8, 0)
      .then(() => {
        this.setState({loadingLocations: false});
      })
      .catch(error => {
        Toastr.error(error);
        this.setState({loadingLocations: false});
      });
  }

  render(){
    if (!this.state.loadingLocations)
    {
      console.log(this.props.locations);
      return (
        <div>
          {this.props.locations.locations.length > 0 ? <h3>Things to do in {titleCase(this.props.name)}...</h3> : ''}
          <LocationList locations={this.props.locations} cssClass="col-md-3 col-12" />
        </div>
      );
    }
    else {
      return (
        <div>
          <Loader showLoader={true}/>
        </div>
      );
    }
  }
}

TopLocations.defaultProps = {
  name: '',
  searchType: '',
  locationId: 0,
  locations: {},
  isFetching: false
};

TopLocations.propTypes = {
  locationId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  locationType: PropTypes.string.isRequired,
  locations: PropTypes.object.isRequired,
  locationsActions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isFetching: state.locations.isFetching ? state.locations.isFetching : false,
    locations: state.locations.locationsList ? state.locations.locationsList : {},
    locationId: ownProps.params.placeId ? parseInt(ownProps.params.placeId) : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locationsActions: bindActionCreators(locationsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLocations);
