import ReviewApi from '../api/reviewApi';
import {beginAjaxCall} from './ajaxStatusActions';
import * as types from '../actionTypes/';


export function receiveReview(review) {
	return {type: types.REVIEW_REQUEST, isSending: true, hasPosted: false, review};
}

export function reviewSuccess() {
	return {type: types.POST_REVIEW_SUCCESS, isSending: false, hasPosted: true};
}

export function reviewError(message) {
	return {type: types.POST_REVIEW_FAILURE, isSending: false, hasPosted: false, message};
}

export function postReview(review, state, event, node) {

	return dispatch => {
		dispatch(receiveReview(review));
		dispatch(beginAjaxCall());
		if ((review.comment.length > 0) && (review.reference.length))
    	{
			return ReviewApi.postReview(review).then(review => {
				dispatch(reviewSuccess());
				state.setState({ wizardStep: 1, searchName: '', searchId: '', errors:'', searchType: '', selectedTags: [], rating: 0, comment: '' });    

				if (event != null && node != null)
				{
					node.dispatchEvent(event); 
				}
			}).catch(error => {
				dispatch(reviewError(error.response.data));
			});
		}
		else {
			dispatch(reviewError("Please complete the review form"));
		}
	};
}