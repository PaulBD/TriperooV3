import React, {PropTypes} from 'react';
let _ = require('lodash');

class FlightFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sort: this.props.sort
      , isDirectFlights: this.props.isDirectFlights
      , selectedAirlines: _.cloneDeep(this.props.selectedAirlines)
      , departureTimeFrom: this.props.departureTimeFrom
      , departureTimeTo: this.props.departureTimeTo
      , returnTimeFrom: this.props.returnTimeFrom
      , returnTimeTo: this.props.returnTimeTo
      , departureSelection: '0'
      , returnSelection: '0'
      , filterState: 'Show Filters'
    };
    this.handleSortFlights = this.handleSortFlights.bind(this);
    this.handleFilterDepartureTime = this.handleFilterDepartureTime.bind(this);
    this.handleFilterReturnTime = this.handleFilterReturnTime.bind(this);
    this.handleFilterStopsFlights = this.handleFilterStopsFlights.bind(this);
    this.handleFilterAirlines = this.handleFilterAirlines.bind(this);
    this.showFilter = this.showFilter.bind(this);
  }

  showFilter(e) {
    if (this.state.filterState == 'Show Filters') {
      this.setState({filterState: 'Hide Filters'});
    }
    else {
      this.setState({filterState: 'Show Filters'});
    }
  }

  handleSortFlights(e) {
    this.setState({sort: e.target.value});
    this.props.filterFlights(e.target.value, this.state.isDirectFlights, this.state.selectedAirlines, this.state.departureTimeFrom, this.state.departureTimeTo, this.state.returnTimeFrom, this.state.returnTimeTo);
  }

  handleFilterDepartureTime(e) {

    let departureTimeFrom = '00:00';
    let departureTimeTo = '23:59';

    switch(e.target.value)
    {
      case '0':
        departureTimeFrom = '00:00';
        departureTimeTo = '23:59';
        break;
      case '1':
        departureTimeFrom = '05:00';
        departureTimeTo = '11:59';
        break;
      case '2':
        departureTimeFrom = '12:00';
        departureTimeTo = '17:59';
        break;
      case '3':
        departureTimeFrom = '18:00';
        departureTimeTo = '23:59';
        break;
    }

    this.setState({departureTimeFrom: departureTimeFrom, departureTimeTo: departureTimeTo, departureSelection: e.target.value});
    this.props.filterFlights(this.state.sort, this.state.isDirectFlights, this.state.selectedAirlines, departureTimeFrom, departureTimeTo, this.state.returnTimeFrom, this.state.returnTimeTo);
  }

  handleFilterReturnTime(e) {

    let returnTimeFrom = '00:00';
    let returnTimeTo = '23:59';

    switch(e.target.value)
    {
      case '0':
        returnTimeFrom = '00:00';
        returnTimeTo = '23:59';
        break;
      case '1':
        returnTimeFrom = '05:00';
        returnTimeTo = '11:59';
        break;
      case '2':
        returnTimeFrom = '12:00';
        returnTimeTo = '17:59';
        break;
      case '3':
        returnTimeFrom = '18:00';
        returnTimeTo = '23:59';
        break;
    }

    this.setState({returnTimeFrom: returnTimeFrom, returnTimeTo: returnTimeTo, returnSelection: e.target.value});
    this.props.filterFlights(this.state.sort, this.state.isDirectFlights, this.state.selectedAirlines, this.state.departureTimeFrom, this.state.departureTimeTo, returnTimeFrom, returnTimeTo);
  }

  handleFilterStopsFlights(e) {
    this.setState({isDirectFlights: e.target.value});
    this.props.filterFlights(this.state.sort, parseInt(e.target.value), this.state.selectedAirlines, this.state.departureTimeFrom, this.state.departureTimeTo, this.state.returnTimeFrom, this.state.returnTimeTo);
  }

  handleFilterAirlines(e) {
    let selectedAirlines = this.state.selectedAirlines;
    let isAlreadyInList = false;
    let newAirline = e.target.getAttribute('data-airline');

    if (selectedAirlines != null) {
      for (let i = 0; i < selectedAirlines.length; i++) {
        if (selectedAirlines[i] == newAirline) {
          isAlreadyInList = true;
          selectedAirlines.splice(i, 1);
        }
      }
    }

    if (!isAlreadyInList)
    {
      selectedAirlines.push(newAirline);
    }

    this.setState({selectedAirlines: selectedAirlines});
    this.props.filterFlights(this.state.sort, this.state.isDirectFlights, selectedAirlines);
  }

  render() {
    return (
      <div className="profile-usermenu">
        <div className="col-md-12 hidden-md-up mb-3 text-center">
        <a onClick={this.showFilter} data-toggle="collapse" href="#flightFilter" aria-expanded="false" aria-controls="flightFilter">{this.state.filterState}</a>
        </div>
        <div className="collapse flightFilter" id="flightFilter">
        <h5>Filter Flights</h5>
        <ul className="nav flex-column list booking-filters-list">
          <li>
            <div className="checkbox">
              <label>
                <input className="i-radio" type="radio" checked={this.state.sort == 'quality' ? true : false} radioGroup="flightPreference" value="quality" onChange={this.handleSortFlights}/>Recommended
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-radio" type="radio"  checked={this.state.sort == 'price' ? true : false}radioGroup="flightPreference" value="price" onChange={this.handleSortFlights}/>Cheapest
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-radio" type="radio" checked={this.state.sort == 'duration' ? true : false} radioGroup="flightPreference" value="duration" onChange={this.handleSortFlights}/>Shortest
              </label>
            </div>
          </li>
          <li>
            <h5 className="booking-filters-title">Stops</h5>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.isDirectFlights == '0' ? true : false} radioGroup="stops" value="0" onChange={this.handleFilterStopsFlights}/>Any
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.isDirectFlights == '1' ? true : false} radioGroup="stops" value="1" onChange={this.handleFilterStopsFlights}/>Nonstop (direct flights)
              </label>
            </div>
          </li>
          <li className={this.props.airlines != undefined ? this.props.airlines.length > 0 ? "" : "hide" : "hide"}>
            <h5 className={this.props.airlines ? "booking-filters-title" : "hide"}>Airlines
            </h5>
            {
              this.props.airlines ? this.props.airlines.map((airline, index) => {
                return (
                  <div className="checkbox" key={index}>
                    <label>
                      <input className="i-check" type="checkbox" checked={this.state.selectedAirlines.includes(airline.airlineCode) ? false : true} data-airline={airline.airlineCode} onChange={this.handleFilterAirlines}/>{airline.airlineName}
                    </label>
                  </div>
                );
              }) : ''
            }
          </li>
          <li>
            <h5 className="booking-filters-title">Departure Time
            </h5>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.departureSelection == '0' ? true : false} radioGroup="departureTime" value="0" onChange={this.handleFilterDepartureTime}/>Any
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.departureSelection == '1' ? true : false} radioGroup="departureTime" value="1" onChange={this.handleFilterDepartureTime}/>Morning (5:00am - 11:59am)
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.departureSelection == '2' ? true : false} radioGroup="departureTime" value="2" onChange={this.handleFilterDepartureTime}/>Afternoon (12:00pm - 5:59pm)
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.departureSelection == '3' ? true : false} radioGroup="departureTime" value="3" onChange={this.handleFilterDepartureTime}/>Evening (6:00pm - 11:59pm)
              </label>
            </div>
          </li>
          <li className={this.props.journeyType != 'round' ? "hide" : ""}>
            <h5 className="booking-filters-title">Return Time</h5>

            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.returnSelection == '0' ? true : false} radioGroup="returnTime" value="0" onChange={this.handleFilterReturnTime}/>Any
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.returnSelection == '1' ? true : false} radioGroup="returnTime" value="1" onChange={this.handleFilterReturnTime}/>Morning (5:00am - 11:59am)
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.returnSelection == '2' ? true : false} radioGroup="returnTime" value="2" onChange={this.handleFilterReturnTime}/>Afternoon (12:00pm - 5:59pm)
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input className="i-check" type="radio" checked={this.state.returnSelection == '3' ? true : false} radioGroup="returnTime" value="3" onChange={this.handleFilterReturnTime}/>Evening (6:00pm - 11:59pm)
              </label>
            </div>
          </li>
        </ul>
        </div>
      </div>
    );
  }
}

FlightFilter.propTypes = {
  sort: PropTypes.string.isRequired,
  isDirectFlights: PropTypes.number.isRequired,
  airlines:PropTypes.array.isRequired,
  selectedAirlines:PropTypes.array.isRequired,
  departureTimeFrom: PropTypes.string.isRequired,
  departureTimeTo: PropTypes.string.isRequired,
  returnTimeFrom: PropTypes.string.isRequired,
  returnTimeTo: PropTypes.string.isRequired,
  journeyType: PropTypes.string.isRequired,
  filterFlights: PropTypes.func
};

export default FlightFilter;
