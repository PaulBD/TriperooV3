import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lastMinuteActions from '../../actions/lastMinuteActions';
import StarRating from '../common/starRating';
import Loader from '../common/loadingDots';

class LastMinuteDeal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isLoading: 1 };
  }

  componentDidMount() {
    this.props.actions.loadFeatures(this.props.featureType);
    this.state = { isLoading: 0 };
  }

  render() {

    const {lastMinute} = this.props;

    if (lastMinute.length > 0)
    {

      let style = {
        backgroundImage: 'url(' + lastMinute[0].backgroundImage + ')'
      };

      let price = lastMinute[0].price;

      if (price !== '') {
        price = <h5>{price}</h5>;
      }

      return (
        <div className="bg-holder">
          <div className="bg-mask"></div>
          <div className="bg-parallax" style={style}></div>
          <div className="bg-content">
            <div className="container">
              <div className="gap gap-big text-xs-center text-white">
                  <h2 className="text-uc mb20">{lastMinute[0].headline}</h2>
                  <StarRating starRating={lastMinute[0].starRating} className="icon-list list-inline-block mb0 last-minute-rating" />
                  <h5 className="last-minute-title">{lastMinute[0].title}</h5>
                  <p className="last-minute-date">{lastMinute[0].subTitle}</p>
                  <p className="mb20">{lastMinute[0].price}</p><a className="btn btn-lg btn-white btn-ghost" href={lastMinute[0].url}>{lastMinute[0].buttonText} <i className="fa fa-angle-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else { 
      return (
            <Loader showLoader={this.state.isLoading} />
      );
    }
  }
}

LastMinuteDeal.propTypes = {
  lastMinute: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  featureType: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    lastMinute: state.lastMinute
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(lastMinuteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LastMinuteDeal);