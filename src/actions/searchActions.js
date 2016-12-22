import SearchApi from '../api/mockSearchApi';
import {beginAjaxCall} from './ajaxStatusActions';
import * as types from '../actionTypes/';

export function loadSearchesSuccess(searches) {
	return {type: types.LOAD_SEARCH_SUCCESS, searches};
}

export function clearSearches() {
	return {type: types.CLEAR_SEARCHES, searches: []};
}

export function loadSearches(value, searchType) {
	return dispatch => {
		dispatch(beginAjaxCall());
		return SearchApi.getSearch(value, searchType).then(searches => {
			dispatch(loadSearchesSuccess(searches));
		}).catch(error => {
			throw(error);
		});
	};
}
