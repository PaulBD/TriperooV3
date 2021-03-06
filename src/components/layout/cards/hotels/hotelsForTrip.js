import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as hotelActions from '../../../../actions/location/travelContent/hotelActions';
import Loader from '../../../loaders/contentLoader';
let moment = require('moment');

import HotelThumb from './thumb';

class HotelsForTrip extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isLoading: false };
  }

  componentWillMount() {
    this.loadHotels(this.props.locationId, this.props.latitude, this.props.longitude, this.props.radius, this.props.arrivalDate, this.props.nights, this.props.locale, this.props.currencyCode, this.props.rooms1, 0, 0, this.props.locationName, this.props.filters, this.props.sortBy, this.props.pageSize, this.props.pageNumber, this.props.exclude);
  }

  loadHotels(locationId, latitude, longitude, radius, arrivalDate, nights, locale, currencyCode, rooms1, rooms2, rooms3, location, filters, sortBy, pageSize, pageNumber, exclude) {
    this.setState({isLoading: true});
    if (latitude == 0 && longitude == 0)
    {
      this.props.hotelActions.loadHotelsByLocation(locationId, arrivalDate, nights, locale, currencyCode, rooms1, rooms2, rooms3, location, filters, sortBy, pageSize, pageNumber, exclude, false)
        .then(() => this.setState({isLoading: false}))
        .catch(error => {
          this.setState({isLoading: false});
        });
    }
    else {
      this.props.hotelActions.loadHotelsByProximty(locationId, latitude, longitude, radius, arrivalDate, nights, locale, currencyCode, rooms1, rooms2, rooms3, location, filters, sortBy, pageSize, pageNumber, exclude, false)
        .then(() => this.setState({isLoading: false}))
        .catch(error => {
          this.setState({isLoading: false});
        });
    }
  }

  render()
  {
    if (!this.state.isLoading) {
      if (this.props.hotels.hotelListResponse != undefined) {
        if (this.props.hotels.hotelListResponse.hotelList.size > 0) {
          return (

                  <div className="col-md-12">
                    <div className="row">
                      {
                        this.props.hotels.hotelListResponse.hotelList.hotelSummary.map((hotel, index) => {
                          if (index < this.props.pageSize) {
                            return (
                              <HotelThumb hotel={hotel} hotelUrl={this.props.url} queryString={this.props.queryString} key={hotel.hotelId} cssClass="col-md-3 mb-2" nameLength={20}/>
                            );
                          }
                        })
                      }
                    </div>
                  </div>
          );
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
    else {
      return (

              <div className="col-md-12">
                <div className="row">
                  <Loader showLoader={true}/>
                </div>
              </div>
      );
    }
  }
}

HotelsForTrip.defaultProps = {
  hotels: {},
  exclude: 0,
  radius: 5,
  locale: 'en_en',
  currencyCode: 'GBP',
  arrivalDate: moment().add(7, 'days').format('YYYY-MM-DD'),
  queryString: '?arrivalDate=' + moment().add(7, 'days').format('YYYY-MM-DD') + '&nights=1&rooms=1&guests=1',
  filters: {
    minRate: 1
    , maxRate: 300
    , minStarRating: 1
    , maxStarRating: 5
    , minTripAdvisorRating: 0
    , maxTripAdvisorRating: 0
    , facilityList: []
    , propertyCategory: []
  }
};

HotelsForTrip.propTypes = {
  exclude: PropTypes.number.isRequired,
  locationId: PropTypes.number.isRequired,
  locationName: PropTypes.string.isRequired,
  locationType: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  currencyCode: PropTypes.string.isRequired,
  hotels: PropTypes.object.isRequired,
  hotelActions: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  arrivalDate: PropTypes.string.isRequired,
  nights: PropTypes.number,
  rooms1: PropTypes.number,
  guests: PropTypes.number,
  sortBy: PropTypes.string,
  filters: PropTypes.object,
  queryString: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    hotels: state.hotels.hotels ? state.hotels.hotels : {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hotelActions: bindActionCreators(hotelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelsForTrip);

