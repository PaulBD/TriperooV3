import {beginAjaxCall} from './ajaxStatusActions';
import * as types from '../actionTypes/';

export function saveCurrencySuccess(currency) {
	return {type: types.SAVE_CURRENCY_SUCCESS, currency};
}

export function saveCurrency(currency) {
	return dispatch => {
		localStorage.setItem('currency', currency);
		return dispatch(saveCurrencySuccess(currency));
	};
}

