import React, {PropTypes} from 'react';
import StarRating from '../../forms/common/starRating';
import Loader from '../../loaders/contentLoader';

class LocationHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { imageUrl : '', style: { backgroundImage: 'url(' + this.props.location.image + ')' }};
    this.backupImage = this.backupImage.bind(this);
  }

  backupImage(e) {
    if (this.props.location.photos.photoList) {
      if (this.props.location.photos.photoList.length > 0) {
        if (this.props.location.photos.photoList[0].width == 0) {
          let style = { backgroundImage:  'url(' + this.props.location.photos.photoList[0].prefix + this.props.location.photos.photoList[0].suffix + ')' };
          this.setState({style: style});
        }
        else {
          let style = { backgroundImage:  'url(' + this.props.location.photos.photoList[0].prefix + '2000x2000' + this.props.location.photos.photoList[0].suffix + ')' };
          this.setState({style: style});
        }
      }
    }
  }

  render(){

    if (this.props.hasLoaded) {

      let style = this.state.style;

      let subNav = '';
      let url = '';

      if (this.props.docType) {
        switch (this.props.docType.toLowerCase()) {
          case 'asian':
          case 'indian':
          case 'chinese':
          case 'seafood':
          case 'vegetarian / vegan':
          case 'steakhouse':
          case 'thai':
          case 'szechuan':
          case 'brazilian':
          case 'sushi':
          case 'argentinian':
          case 'tapas':
          case 'american':
          case 'english':
          case 'italian':
            url = this.props.location.parentUrl + '/restaurants';
            subNav = (
              <li className="breadcrumb-item"><a href={url}>Places to eat in {this.props.location.parentRegionName}</a>
              </li>);
            break;
          case 'historic':
          case 'monument':
          case 'civic':
          case 'business':
          case 'stadium':
          case 'theater':
          case 'shopping':
          case 'casino':
          case 'tree':
          case 'golf':
            url = this.props.location.parentUrl + '/points-of-interest';
            subNav = (
              <li className="breadcrumb-item"><a href={url}>Points of interest in {this.props.location.parentRegionName}</a>
              </li>);
            break;
          case 'cultural & theme tours':
          case 'tours & sightseeing':
          case 'walking & biking tours':
            url = this.props.location.parentUrl + '/attractions';
            subNav = (
              <li className="breadcrumb-item"><a href={url}>Attractions in {this.props.location.parentRegionName}</a>
              </li>);
            break;
        }
      }

      return (
        <div className="top-area show-onload locationPage">
          <div className="bg-holder full text-white">
            <div className="bg-mask"></div>
            <div className="bg-img blur" style={style}></div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ol className="breadcrumb hidden-sm-down">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href={this.props.location.parentUrl}>{this.props.location.parentRegionNameLong}</a></li>
                    {subNav}
                    <li className="breadcrumb-item active">{this.props.location.regionName.length > 60 ? this.props.location.regionName.substr(0, 60) + '...' : this.props.location.regionName}</li>
                  </ol>
                  <h1>{this.props.location.regionName.length > 60 ? this.props.location.regionName.substr(0, 60) + '...' : this.props.location.regionName}</h1>
                  <div className="reviewsHeader">
                    <StarRating starRating={this.props.location.averageReviewScore ? this.props.location.averageReviewScore : 0}
                                className="icon-list list-inline-block mb0 last-minute-rating"
                                includeReviewCount={true}
                                reviewCount={this.props.location.reviewCount ? this.props.location.reviewCount : 0}/>
                    <img src={this.props.location.image} width="1" height="1" onError={this.backupImage} className="backup"/>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="top-area show-onload infoPage">
          <div className="bg-holder full text-white">
            <div className="bg-mask"></div>
            <div className="bg-img"></div>
            <div className="container">
              <div className="row">
                <Loader showLoader={true} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

LocationHeader.defaultProps = {
  location:{}
};

LocationHeader.propTypes = {
  location: PropTypes.object.isRequired,
  hasLoaded: PropTypes.bool,
  docType: PropTypes.string
};

export default LocationHeader;
