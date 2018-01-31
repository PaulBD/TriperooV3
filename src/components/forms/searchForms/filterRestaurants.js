import React, {PropTypes} from 'react';
import CategoryFilter from '../common/categoryFilter';
import NameFilter from '../common/nameFilter';
import Loader from '../../loaders/contentLoader';
let _ = require('lodash');

class FilterRestaurants extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      restaurantCategory: []
      , filteredName: ''
      , filterState: 'Show Filters'
    };
    this.filterRestaurant = this.filterRestaurant.bind(this);
    this.filterByName = this.filterByName.bind(this);
    this.showFilter = this.showFilter.bind(this);
  }

  filterRestaurant(filter) {
    this.setState({restaurantCategory: filter });
    this.applyFilter(filter, this.state.filteredName);
  }

  filterByName(filteredName) {
    this.setState({filteredName: filteredName});
    if (filteredName.length > 3) {
      this.applyFilter(this.state.restaurantCategory, filteredName);
    }
    else {
      if (filteredName.length == 0) {
        this.applyFilter(this.state.restaurantCategory, '');
      }
    }
  }

  applyFilter(restaurantCategory, filteredName) {
    this.props.filterRestaurant(restaurantCategory, filteredName);
  }

  showFilter(e) {
    if (this.state.filterState == 'Show Filters') {
      this.setState({filterState: 'Hide Filters'});
    }
    else {
      this.setState({filterState: 'Show Filters'});
    }
  }

  render(){
    if (!this.props.isFetching) {
      return (
      <div className="profile-usermenu">
        <div className="col-md-12 hidden-md-up mb-3 text-center">
          <a onClick={this.showFilter} data-toggle="collapse" href="#flightFilter" aria-expanded="false" aria-controls="flightFilter">{this.state.filterState}</a>
        </div>
        <div className="collapse flightFilter" id="flightFilter">
          <CategoryFilter title="Cuisine & Dishes" searchName={this.props.searchName} locationId={this.props.locationId} pageSize={this.props.pageSize} pageNumber={this.props.pageNumber} contentType="Restaurants" categories={this.props.categories} filterResults={this.filterRestaurant} numberToShow={6} />
          <NameFilter placeHolder="Enter Restaurant name" title="Filter by Name" searchName={this.state.filteredName} updateFilter={this.filterByName} />
        </div>
      </div>
      );
    }
    else {
      return (
        <div className="profile-usermenu">
          <Loader showLoader={this.props.isFetching} />
        </div>
      );
    }
  }
}

FilterRestaurants.propTypes = {
  searchName: PropTypes.string,
  locationId: PropTypes.number,
  pageSize: PropTypes.number,
  pageNumber: PropTypes.number,
  categories: PropTypes.array,
  isFetching: PropTypes.bool,
  filterRestaurant: PropTypes.func
};

export default FilterRestaurants;

