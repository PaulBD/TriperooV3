import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventsActions from '../../actions/eventsActions';
import EventList from '../../components/events/eventList';
import EventCategories from '../../components/locations/categorySideBar';
import Pagination from "react-js-pagination";
import Loader from '../../components/common/loadingDots';
import * as locationActions from '../../actions/locationActions';
import SubPageHeader from '../../components/locations/subPageHeader';
let titleCase = require('title-case');

class EventHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.changeEvent = this.changeEvent.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = { pageSize: 9, pageNumber: 0, activePageNumber: 1, categoryName: 'all', friendlyCategory: '' };
  }

  componentWillMount() {
    this.props.locationActions.loadLocationById(this.props.locationId);
    this.props.eventActions.loadEventsByCategory(this.props.locationId, this.state.categoryName, this.state.pageSize, this.state.pageNumber);
  }

  changeEvent(categoryId, catgeoryName) {
    window.scrollTo(0, 0);
    this.setState({ categoryName: categoryId, friendlyCategory: catgeoryName });
    this.props.eventActions.loadEventsByCategory(this.props.locationId, categoryId, this.state.pageSize, this.state.pageNumber);  
  }

  changePage(value) {
    window.scrollTo(0, 0);
    this.setState({ pageNumber: value - 1, activePageNumber: value });
    this.props.eventActions.loadEventsByCategory(this.props.locationId, this.state.categoryName, this.state.pageSize, value - 1);
  }

  render() {
    document.title = 'All events this week in ' + this.props.locationName;

    let intro = '';
    let totalItems = 0;

    if (!this.props.isFetchingLocation)
    {
      totalItems = this.props.totalItems;

      if (this.state.friendlyCategory != '') {
        if (this.state.friendlyCategory == 'all')
        { 
          intro = 'We found ' + totalItems + ' events matching all categories.';
        }
        else
        {
          intro = 'We found ' + totalItems + ' events matching ' + this.state.friendlyCategory + '.';
        }
      } 
      else {
        intro = 'We found ' + totalItems + ' events in total.';
      }
    }

    let style = {
      backgroundImage: 'url(/static/img/community.jpg)'
    };

    let resultCount =  this.props.totalItems + ' Results ';

    if (this.state.friendlyCategory != '') {
      resultCount += ' - filtered by ' + titleCase(this.state.friendlyCategory);
    }

    if (this.props.isFetchingLocationEvents)
    {
      resultCount = '';
    }


return (
    <div>   
      <SubPageHeader id={this.props.locationId} location={this.props.location} contentType="events" />
      <div className="container">
        <div className="row row-wrap">
          <div className="gap gap-small"></div>
          <div className="col-md-9">
            <div className="nav-drop booking-sort">
              {resultCount}
            </div>
            <EventList locationEvents={this.props.locationEvents} cssClass="col-md-4" isFetching={this.props.isFetchingLocationEvents} />
          </div>
          <div className="col-md-3">
            <EventCategories changeCategory={this.changeEvent} contentType="events" />
          </div>
        </div>
        <div className="gap gap-small"></div>
        <div className="row text-xs-center">
          <Pagination innerClass={totalItems > this.state.pageSize ? "pagination text-xs-center" : "hide"} activePage={this.state.activePageNumber} itemsCountPerPage={this.props.pageSize} totalItemsCount={this.props.totalItems} pageRangeDisplayed={10} onChange={this.changePage} />
        </div>
        <div className="gap gap-small"></div>
      </div>
    </div>
    );
  }
}

EventHome.defaultProps = {
  locationEvents: [],
  pageCount: 0,
  pageSize: 0,
  totalItems: 0,
  pageNumber: 0,
  isFetching: false,
  locationName: '',
  isFetchingLocation: false,
  isFetchingLocationEvents: false
};

EventHome.propTypes = {
  locationId: PropTypes.number,
  pageCount: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  pageNumber: PropTypes.number,
  locationEvents: PropTypes.array.isRequired,
  eventActions: PropTypes.object.isRequired,
  locationName: PropTypes.string,
  location: PropTypes.object,
  locationActions: PropTypes.object.isRequired,
  isFetchingLocation: PropTypes.bool.isRequired,
  isFetchingLocationEvents: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isFetchingLocation: state.location.isFetching ? state.location.isFetching : false,
    location: state.location.location ? state.location.location : {},
    locationName: state.location.location ? state.location.location.regionName : "",
    pageSize: state.locationEvents.locationEvents ? parseInt(state.locationEvents.locationEvents.page_size) : 0,
    pageNumber: state.locationEvents.locationEvents ? parseInt(state.locationEvents.locationEvents.page_number) : 0,
    totalItems: state.locationEvents.locationEvents ? parseInt(state.locationEvents.locationEvents.total_items) : 0,
    pageCount: state.locationEvents.locationEvents ? parseInt(state.locationEvents.locationEvents.page_count) : 0,
    isFetchingLocationEvents: state.locationEvents.isFetching ? state.locationEvents.isFetching : false,
    locationEvents: state.locationEvents.locationEvents && state.locationEvents.locationEvents.events ? state.locationEvents.locationEvents.events.event : [],
    locationId: ownProps.params.placeId ? parseInt(ownProps.params.placeId) : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locationActions: bindActionCreators(locationActions, dispatch),
    eventActions: bindActionCreators(eventsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventHome);