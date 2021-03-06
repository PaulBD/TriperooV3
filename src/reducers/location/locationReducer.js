import * as types from '../../actionTypes/';

export default function locationReducer(state = { isFetching: false }, action) {
	switch(action.type) {
		case types.LOCATION_CONTENT_REQUEST:
			return Object.assign({}, state, { isFetching: true });
		case types.LOCATION_CONTENT_SUCCESS:
			return Object.assign({}, state, { isFetching: false, errorMessage: '', location: action.location });
		case types.LOCATION_CONTENT_FAILURE:
			return Object.assign({}, state, { isFetching: false, errorMessage: action.message });

    case types.LIKE_LOCATION_CONTENT_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case types.LIKE_LOCATION_CONTENT_SUCCESS:
      return Object.assign({}, state, { isFetching: false, errorMessage: '', location: action.location  });
    case types.LIKE_LOCATION_CONTENT_FAILURE:
      return Object.assign({}, state, { isFetching: false, errorMessage: action.message });

    case types.UPLOAD_PHOTO_LOCATION_REQUEST:
      return Object.assign({}, state, { isFetching: true, hasPosted: false });
    case types.UPLOAD_PHOTO_LOCATION_SUCCESS:
      return Object.assign({}, state, { isFetching: false, errorMessage: '', hasPosted: true  });
    case types.UPLOAD_PHOTO_LOCATION_FAILURE:
      return Object.assign({}, state, { isFetching: false, errorMessage: action.message, hasPosted: false });

		default:
			return state;
	}
}
