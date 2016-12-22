import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActions from '../../actions/searchActions';
import AutoComplete from '../common/autocomplete';
import {browserHistory} from 'react-router';

class SearchComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { searchUrl: '' };
    this.onSubmitRedirect = this.onSubmitRedirect.bind(this);
    this.handleSearchNameClick = this.handleSearchNameClick.bind(this);
    this.handleSearchUrlClick = this.handleSearchUrlClick.bind(this);
  }

  handleSearchUrlClick(value) {
    this.setState({
      searchUrl: value
    });
  }

  handleSearchNameClick(value) {
    this.setState({
      searchValue: value
    });
  }

  onSubmitRedirect(event) {
    event.preventDefault();
    if (this.state.searchValue.length > 2) {
      if (this.state.searchUrl.length > 0) {
        browserHistory.push(this.state.searchUrl);
      }
      else {
        browserHistory.push('/search-result?q=' + this.state.searchValue);
      }
    }
  }

  render() {

    return (
      <div className="search-tabs search-tabs-bg search-tabs-to-top">
        <div className="tabbable">
          <div className="tab-content">
            <div className="tab-pane fade in active" id="tab-1">
              <h2 className="text-xs-center">Explore, Plan &amp; Book</h2>
              <p className="text-xs-center">Get the best deals from the top travel websites, plus reviews on the best hotels, restaurants, attractions &amp; more</p>
              <p>&nbsp;</p>
              <form >
                <div className="row">
                  <div className="col-md-3 text-xs-center">&nbsp;</div>
                  <div className="col-md-6 text-xs-center">
                    <div className="input-group">
                      <div className="form-group form-group-lg form-group-icon-left homeSearch"><i className="fa fa-search input-icon homeSearchIcon"></i>
                        <AutoComplete changeValue={this.handleSearchNameClick} changeUrl={this.handleSearchUrlClick} searchType="all" placeholder="Search anywhere in the world" cssClass="typeahead form-control" />
                      </div>
                      <span className="input-group-btn">
                        <button className="btn btn-primary btnSearch" type="button" onClick={this.onSubmitRedirect}>Search</button>
                      </span>                        
                    </div>
                  </div>
                  <div className="col-md-3 text-xs-center">&nbsp;</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchComponent;