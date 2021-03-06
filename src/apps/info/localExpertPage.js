import React from 'react';
import {Link} from 'react-router';
import SocialButtons from "../../components/content/static/socialButtons";

const LocalExpertPage = () => {

    window.scrollTo(0, 0);
    document.title = 'Become a Triperoo Agent! Earn money and respect from your travel recommendations.';

    let style = {
      backgroundImage: 'url(/static/img/community.jpg)'
    };

    return (
      <div>
        <div className="bg-holder full text-center text-white infoPageWrapper">
          <div className="bg-mask"></div>
          <div style={style} className="bg-img infoImg" ></div>
          <div className="bg-front full-center">
            <div className="owl-cap">
                <h1 className="owl-cap-title fittext">Become a Triperoo Agent</h1>
                <div className="owl-cap-price">
                  <small>Earn commission and respect from your travel recommendations</small>
                </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row row-wrap">
            <div className="gap gap-small"></div>
            <div className="col-md-7">
                <h4>Become A Triperoo Agent!</h4>
                <p><strong>STEP 1</strong><br />
                Sign up to Triperoo and add 5 reviews to qualify to become a Triperoo Agent.</p>

                <p><strong>STEP 2</strong><br />
                Start to earn commission by booking hotels and flights for friends and family, just like a travel agent.</p>

                <p><strong>STEP 3</strong><br />
                Increase your commission by signing up friends and family as agents and help fellow travelers from across the globe with your local recommendations.</p>

              <h4>What You Can Earn As An Agent</h4>
              <p>Some examples of what you can earn as a Triperoo Agent.</p>
              <div className="row row-wrap">
                  <div className="col-md-6">
                      <div className="thumb">
                          <a className="hover-img" href="/2114/visit/london-england-united-kingdom">
                              <img src="/static/img/locations/london-england-united-kingdom.png" alt="London" />
                              <h5 className="hover-title hover-hold exampleTrip">
                                Weekend Break to London<br />3 nights - 2 people
                                <span className="price">£50.00</span>
                              </h5>
                          </a>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="thumb">
                          <a className="hover-img" href="/6053839/visit/dubai-united-arab-emirates">
                              <img src="/static/img/locations/dubai-united-arab-emirates.png" alt="Dubai" />
                              <h5 className="hover-title hover-hold exampleTrip">
                                Short Break to Dubai<br />5 nights - 2 people
                                <span className="price">£120.00</span>
                              </h5>
                          </a>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="thumb">
                          <a className="hover-img" href="/place/indian-ocean/maldives">
                              <img src="/static/img/locations/maldives.png" alt="Maldives" />
                              <h5 className="hover-title hover-hold exampleTrip">
                                Long Haul to Maldives<br />14 nights - 2 people
                                <span className="price">£200.00</span>
                              </h5>
                          </a>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="thumb">
                          <a className="hover-img" href="/2734/visit/paris-france">
                              <img src="static/img/locations/paris-france.png" alt="Paris" />
                              <h5 className="hover-title hover-hold exampleTrip">
                                Business Trip to Paris<br />2 nights - 1 person
                                <span className="price">£20.00</span>
                              </h5>
                          </a>
                      </div>
                  </div>
              </div>
            </div>

            <div className="col-md-5">
              <h4>Benefits of being a Triperoo Agent</h4>

              <p>Your personalized recommendations will help other travelers find the ideal hotel in the best
              neighborhood. They save huge amounts of time and end up with a better trip, you earn a
              commission. You both share a great experience.</p>
              <div className="gap gap-small"></div>
              <div className="row row-wrap">
                <div className="col-md-2">
                  <i className="fa fa-credit-card box-icon-left round box-icon-big box-icon-border animate-icon-top-to-bottom"></i>
                </div>
                <div className="col-md-8">
                  <h5>EXTRA INCOME</h5>
                  <p>As a Triperoo Agent you will have access to Triperoo's inventory of 1.4 million hotels. You
                  can recommend, share, publish and book hotels for others and even for yourself and
                  earn a commission per booking. Just like a travel agent.</p>
                </div>
              </div>
              <div className="row row-wrap">
                <div className="col-md-2">
                  <i className="fa fa-whatsapp box-icon-left round box-icon-big box-icon-border animate-icon-top-to-bottom"></i>
                </div>
                <div className="col-md-8">
                  <h5>FLEXIBILITY</h5>
                  <p>You can create and share travel recommendations whenever you want, wherever you are. When
                  you qualify as a Local Expert, you will receive questions from other travelers on your
                  mobile phone, adding even more flexibility.</p>
                </div>
              </div>
              <div className="row row-wrap">
                <div className="col-md-2">
                  <i className="fa fa-suitcase box-icon-left round box-icon-big box-icon-border animate-icon-top-to-bottom"></i>
                </div>
                <div className="col-md-8">
                  <h5>POWER TO THE TRAVELER!</h5>
                  <p>You will be helping friends and fellow travelers from across the world by matching them to
                  their ideal hotel, based on their wishes, budget and taste. You will take the stress out
                  of travel research and put the fun back in.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LocalExpertPage;
