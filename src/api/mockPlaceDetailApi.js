import delay from './delay';

import hotel from './json/hotel.json'; 

class PlaceDetailApi {
	static getPlace(id, type) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign([], hotel));
			}, delay);
		});
	}
}

export default PlaceDetailApi;