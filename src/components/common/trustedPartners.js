import React from "react";

export default class TrustedPartners extends React.Component {
    render(){
    return (
        <div className="row">
            <div className="col-md-6 text-xs-left">
                <h5 className="trustedPartner">Trusted Providers</h5>
                <img src="/static/img/laterooms.png" className="partners" />
                <img src="/static/img/skyscanner.png" className="partners" />
            </div>
            <div className="col-md-6 text-xs-right">
                <h5 className="trustedPartner">Secure Payment Providers</h5>
                <img src="/static/img/payment/maestro-straight-64px.png" className="cards" />
                <img src="/static/img/payment/visa-straight-64px.png" className="cards" />
                <img src="/static/img/payment/mastercard-straight-64px.png" className="cards" />
                <img src="/static/img/payment/visa-electron-straight-64px.png" className="cards" />
                <img src="/static/img/payment/solo-straight-64px.png" className="cards" />
            </div>
        </div>  
        );
    }
}