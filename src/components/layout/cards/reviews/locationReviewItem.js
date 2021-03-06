import React, {PropTypes} from 'react';
import StarRating from '../../../forms/common/starRating';
import TagList from '../../../forms/common/tagList';
import ReviewHelpful from '../../../social/reviewHelpful';

class ReviewItem extends React.Component {
  constructor(props, context) {
    super(props, context);
        this.state = { showMore: false };
        this.handleTextClick = this.handleTextClick.bind(this);
        this.handleMissingImage = this.handleMissingImage.bind(this);
    }

    handleMissingImage(e) {
        e.target.src='/static/img/userProfileImg.png';
    }

    handleTextClick(e) {
        e.preventDefault();
        if (this.state.showMore) {
            this.setState({ showMore: false });
        }
        else {
            this.setState({ showMore: true });
        }
    }

  render(){
    let review = this.props.review;
    let link = '';

    let comment = this.props.review.comment;


    let showMore = 'Read Less';

    if (!this.state.showMore)
    {
        if (comment.length > 480)
        {
            comment = comment.substring(0, 480) + '...';
            showMore = 'Read More';
        }
    }

    if (comment.length > 480)
    {
      link = (
        <div className="booking-item-review-expand">
          <a className="booking-item-review-expand-more" href="#" onClick={this.handleTextClick}>{showMore} <i className="fa fa-angle-down"></i></a>
        </div>
      );
    }

    let locationName = '';

    if (this.props.showLocation)
    {
      locationName = (<h3 className="locationReviewTitle">{review.placeName}</h3>);
    }


    return (
      <li>
        <div className="row">
            <div className="col-md-2 col-2">
                <div className="booking-item-review-person">
                    <a className="booking-item-review-person-avatar round" href={review.customerProfileUrl}>
                        <img src={review.customerImageUrl ? review.customerImageUrl : '/static/img/userProfileImg.png'} alt={review.customerName} onError={this.handleMissingImage}/>
                    </a>
                    <p className="booking-item-review-person-name">
                      <a href={review.customerProfileUrl}>{review.customerName}</a>
                    </p>
                    <p className="booking-item-review-person-loc">{review.customerLocation}</p>
                </div>
            </div>
            <div className="col-md-10 col-10">
                <div className="booking-item-review-content">
                  {locationName}
                    <StarRating starRating={review.starRating} className="icon-list list-inline-block mb0 last-minute-rating"/>
                    <div className="gap gap-small"></div>
                    <p>{comment}</p>
                    {link}
                    <div className="gap gap-small"></div>
                    <TagList tags={review.tags} maxTags={10} readOnly={true} />
                    <div className="gap gap-small"></div>
                    <p className="smlText">Added {review.friendlyDate} &bull; <ReviewHelpful reviewRef={review.reviewReference} likeCount={review.likeCount} /></p>
                </div>
            </div>
        </div>
    </li>
    );
  }
}

ReviewItem.defaultProps = {
  showLocation: false
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  showLocation: PropTypes.bool
};


export default ReviewItem;
