import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../../actions/common/modalActions';
let Carousel = require('react-responsive-carousel').Carousel;

class Photos extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem(position){
    this.props.modalActions.openLocationImage(this.props.photos.photoList, position);

  }


  render() {
    if (this.props.photos && this.props.photos.photoList && this.props.photos.photoList.length > 0) {
      console.log(this.props.photos);
      return (
        <div>
          <Carousel axis="horizontal" onClickItem={this.onClickItem}  showArrows={true} showStatus={false} showThumbs={true} autoPlay={false} showIndicators={false} >
            {
              this.props.photos.photoList.map(photo => {

                var url = photo.prefix + '400x400' + photo.suffix;
                return (
                  <div key={url}>
                    <img src={url}/>
                  </div>
                );
              })
            }
          </Carousel>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

Photos.propTypes = {
  photos: PropTypes.object,
  modalActions: PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Photos);