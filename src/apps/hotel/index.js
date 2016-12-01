import React from 'react';
import HotelFeature from '../../components/hotel/feature';
import Search from '../../components/hotel/search';
import TopDestinations from '../../components/hotel/topDestinations';


import TrendingNow from '../../components/trendingNow';
import HotDeals from '../../components/hotDeals';
import Recommendations from '../../components/recommendations';
import LastMinuteDeal from '../../components/lastMinuteDeal';
import FacebookSignup from '../../components/facebookSignup';

// Since this component is simple and static, there's no parent container for it.
export default class SearchHotels extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  render(){
    return (
      <div>
        
        <HotelFeature />

        <div className="container">            
          <Search />
        </div>
        <div className="container">
          <TopDestinations />
          <div className="gap"></div>
          <div className="row">
              <div className="col-md-4">
                  <TrendingNow />
              </div>
              <div className="col-md-4">
                  <HotDeals />
              </div>
              <div className="col-md-4">
                  <Recommendations />
              </div>
          </div>
          <div className="gap gap-small"></div>
        </div>
        <LastMinuteDeal /> 
        <div className="container">
            <div className="gap"></div>
            <FacebookSignup />
            <div className="gap"></div>
        </div>
      </div>
  )};
};