import LocationsApi from '../api/locationsApi';
import * as types from '../actionTypes/';

// ****************************************
// Load Location by parent location id
// ****************************************
export function requestChildLocationsContent() {
	return {type: types.CHILD_LOCATION_CONTENT_REQUEST, isFetching: true };
}

export function childLocationContentSuccess(locationsList) {
	return {type: types.CHILD_LOCATION_CONTENT_SUCCESS, isFetching: false, locationsList};
}

export function childLocationContentError(errorMessage) {
	return {type: types.CHILD_LOCATION_CONTENT_FAILURE, isFetching: false,  errorMessage};
}

export function loadLocationsByParentLocationId(parentLocationId, type, pageSize, pageNumber) {
	return dispatch => {
		dispatch(requestChildLocationsContent());
		return LocationsApi.getLocationsByParentId(parentLocationId, type, pageSize, pageNumber).then(locationsList => {
			dispatch(childLocationContentSuccess(locationsList));
		}).catch(error => {
			dispatch(childLocationContentError(error.response.data));
		});
	};
}