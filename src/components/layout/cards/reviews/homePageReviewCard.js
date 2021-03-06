import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StarRating from '../../../forms/common/starRating';
import TagList from '../../../forms/common/tagList';
import * as modalActions from '../../../../actions/common/modalActions';
import * as userReviewActions from '../../../../actions/customer/userReviewActions';

class ReviewCard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleMissingImage = this.handleMissingImage.bind(this);
    this.editReview = this.editReview.bind(this);
    this.removeReview = this.removeReview.bind(this);
  }

  handleMissingImage(e) {
    e.target.src='/static/img/userProfileImg.png';
  }

  editReview(e, reference, locationId, locationName, locationType, locationAddress, starRating, comment, tags) {
    e.preventDefault();
    this.props.modalActions.openEditReview(reference, locationId, locationName, locationType, locationAddress, starRating, comment, tags, this.props.currentUserId);
  }

  removeReview(e, reference) {
    e.preventDefault();
    if (confirm('Are you sure you would like to remove this review?'))
    {
      this.props.userReviewActions.removeReview(reference)
        .then(() =>{
          this.props.refreshData();
        });
    }
  }

  render() {
    return (
      <div className={this.props.cssClass}>
        {
          this.props.reviews.map(function (review, i) {

            let style = {
              backgroundImage: 'url(' + review.place.imageUrl + ')'
            };

            return (
              <div className="card text-xs-left mb-4" key={i}>
                <div className="cardBg reviewBg" style={style} ></div>
                <div className="card-block testimonial">
                  <h4 className="card-title"><a href={review.placeUrl}>{review.placeNameShort != null && review.placeNameShort.length > 35 ? review.placeNameShort.substring(0, 35) + '...' : review.placeNameShort}</a></h4>
                  <p className="card-subtitle text-muted cardAddress">{review.placeAddress}</p>
                  <div className="testimonial-author commentCardTestimonial">
                    <img src={review.profile.imageUrl ? review.profile.imageUrl : '/static/img/userProfileImg.png'} alt={review.profile.name} className="origin round profileImgLge" onError={this.handleMissingImage} />
                    <p className="testimonial-author-name"><a href={review.customerProfileUrl}>{review.profile.name ? review.profile.name + '\'s' : 'Anonymous'}</a> review</p>
                    <StarRating starRating={review.starRating} className="icon-list list-inline-block mb0 last-minute-rating"/>
                  </div>
                  <p className="card-text" dangerouslySetInnerHTML={{__html:this.props.showAllReview ? review.comment.replace('\n', '<br /><br />') : review.comment.length > 220 ? review.comment.substring(0, 220) + '...' : review.comment.replace('\n', '<br /><br />')}}>

                  </p>
                  <TagList tags={review.tags} maxTags={this.props.maxTags} readOnly={true} />
                </div>
                <div className={!this.props.showEdit ? "hide" : "card-footer text-muted"}>
                  <a href="#" className="card-link" onClick={(e) => this.editReview(e, review.reviewReference, review.inventoryReference, review.placeName, review.placeType, review.placeAddress, review.starRating, review.comment, review.tags)}><i className="fa fa-pencil"></i> Edit Review</a>
                  <a href="#" className="card-link" onClick={(e) => this.removeReview(e, review.reviewReference)}><i className="fa fa-trash"></i> Remove Review</a>
                </div>
              </div>
            );
          }, this)
        }
      </div>
    );
  }
}

ReviewCard.defaultProps = {
  reviews: [],
  maxTags: 5,
  cssClass: 'card-deck',
  showEdit: false,
  showAllReview: false
};

ReviewCard.propTypes = {
  reviews: PropTypes.array.isRequired,
  maxTags: PropTypes.number.isRequired,
  cssClass: PropTypes.string.isRequired,
  modalActions: PropTypes.object.isRequired,
  userReviewActions: PropTypes.object.isRequired,
  showEdit: PropTypes.bool,
  refreshData: PropTypes.func,
  currentUserId: PropTypes.string,
  showAllReview: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    userReviewActions: bindActionCreators(userReviewActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);
