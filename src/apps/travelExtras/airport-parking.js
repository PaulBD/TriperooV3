import React from 'react';
import AirportParkingFeature from '../../components/travelExtras/airportParkingFeature';
import FacebookSignup from '../../components/common/facebookSignup';

export default class AirportParking extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }
    render(){
      return (
        <div>
          
          <AirportParkingFeature />
          
          <div className="container">
              <div className="gap"></div>
              <FacebookSignup />
              <div className="gap"></div>
          </div>
        </div>
      );
   }
}