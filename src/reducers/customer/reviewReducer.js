import * as types from '../../actionTypes/';

export default function reviewReducer(state = { isSending: false, hasPosted: false }, action) {
  switch(action.type) {
    case types.POST_REVIEW_REQUEST:
      return Object.assign({}, state, { isSending: true, hasPosted: false, review: action.review });
    case types.POST_REVIEW_SUCCESS:
      return Object.assign({}, state, { isSending: false, hasPosted: true, errorMessage: '' });
    case types.POST_REVIEW_FAILURE:
      return Object.assign({}, state, { isSending: false, hasPosted: false, errorMessage: action.message });

    case types.UPDATE_REVIEW_REQUEST:
      return Object.assign({}, state, { isSending: true, hasPosted: false, review: action.review });
    case types.UPDATE_REVIEW_SUCCESS:
      return Object.assign({}, state, { isSending: false, hasPosted: true, errorMessage: '' });
    case types.UPDATE_REVIEW_FAILURE:
      return Object.assign({}, state, { isSending: false, hasPosted: false, errorMessage: action.message });

    case types.REMOVE_REVIEW_REQUEST:
      return Object.assign({}, state, { isSending: true, hasPosted: false });
    case types.REMOVE_REVIEW_SUCCESS:
      return Object.assign({}, state, { isSending: false, hasPosted: true, errorMessage: '' });
    case types.REMOVE_REVIEW_FAILURE:
      return Object.assign({}, state, { isSending: false, hasPosted: false, errorMessage: action.message });


    case types.LIKE_REVIEW_REQUEST:
      return Object.assign({}, state, { isSending: true, hasPosted: false, reviewReference: action.reviewReference });
    case types.LIKE_REVIEW_SUCCESS:
      return Object.assign({}, state, { isSending: false, hasPosted: true, errorMessage: '' });
    case types.LIKE_REVIEW_FAILURE:
      return Object.assign({}, state, { isSending: false, hasPosted: false, errorMessage: action.message });

    case types.CUSTOMER_REVIEWS_REQUEST:
      return Object.assign({}, state, { isSending: true, hasPosted: false, customerReference: action.customerReference });
    case types.CUSTOMER_REVIEWS_SUCCESS:
      return Object.assign({}, state, { isSending: false, hasPosted: true, errorMessage: '', reviews: action.reviews });
    case types.CUSTOMER_REVIEWS_FAILURE:
      return Object.assign({}, state, { isSending: false, hasPosted: false, errorMessage: action.message });


    case types.CLEAR_REVIEW:
      return Object.assign({}, state, { isSending: false, hasPosted: false, reviewReference: '' });
    default:
      return state;
  }
}
