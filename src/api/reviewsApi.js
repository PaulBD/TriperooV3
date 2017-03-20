import axios from 'axios';
import baseUrl from './baseApi';


class ReviewsApi {
  static getReviews(id, type, limit, offset) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url:  baseUrl + '/reviews/' + type + '?id=' + id + '&limit=' + limit + '&offset=' + offset
      })
      .then(response => {
        resolve(Object.assign([], response.data));
      })
      .catch(function (error) {
        reject(error);
      });
    });
  };
}

export default ReviewsApi;