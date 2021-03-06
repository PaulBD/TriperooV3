import React from 'react';
import {Link} from 'react-router';
import SocialButtons from "../../components/content/static/socialButtons";
import Destinations from '../../components/content/dynamic/destinations';
import FacebookSignup from '../../components/forms/authentication/facebookSignup';
import BulletPoints from '../../components/content/static/bulletPoints';
import TrustedPartners from '../../components/content/static/trustedPartners';

const ContactPage = () => {

    window.scrollTo(0, 0);
    document.title = 'Contact Triperoo';

    let style = {
      backgroundImage: 'url(/static/img/contact-us.jpg)'
    };

    return (
      <div>
        <div className="bg-holder full text-center text-white infoPageWrapper">
            <div className="bg-mask"></div>
            <div style={style} className="bg-img infoImg" ></div>
            <div className="bg-front full-center">
                <div className="owl-cap">
                    <h1 className="owl-cap-title fittext">Contact Us</h1>
                    <div className="owl-cap-price">
                      <small>feedback@triperoo.co.uk</small>
                    </div>
                </div>
            </div>
        </div>
      <div className="container">
        <div className="row row-wrap">
            <div className="gap gap-small"></div>
            <div className="col-md-7">
              <h2 className="title">Travel Inspires Us</h2>
              <p>Triperoo is based in the beautiful location of North Wales, just on the boarder of Chester. It is
              an inspiring place to work if ever there was one.</p>

              <p>For any questions you can contact us directly at <a href="mailto:feedback@triperoo.co.uk">feedback@triperoo.co.uk</a>.</p>

              <p>Or contact us through our social networks:</p>
              <p><SocialButtons /></p>
            </div>
            <div className="col-md-5">
              <Destinations locationCount={6} cssClass="col-md-6"  />
            </div>
          </div>
        </div>
        <div className="container">
          <hr />
          <div className="gap gap-mini"></div>
          <BulletPoints />
          <div className="gap gap-mini"></div>
          <FacebookSignup />
          <TrustedPartners />
          <div className="gap gap-mini"></div>
        </div>
      </div>
    );
};

export default ContactPage;
