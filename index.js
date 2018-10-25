const http = require('http');
/**
 * A tiny fixer io request utility.
 * This class should be used when
 * dealing with the current fixer.io api
 * At the time of this writing [2018-10-25]
 * This utility should be working.
 * Kindly raise an issue if this requires changes 
 */
class FixerIO {
  /**
   * The FixerIO class constructor function
   * @param {String} apiKey {Required} Fixer IO api key
   */
  constructor(apiKey) {
    if (apiKey === undefined) throw Error('Api key is a required value');
    if (typeof apiKey !== 'string') throw TypeError('Api key should be string value');
    this.apiKey = apiKey;
  }

  /**
   * The request to fixer io
   * @param {*} endpoint {Required} One of the avialable endpoints i.e symbol or latest
   * @param {*} query {Optional} The api query params i.e. &base, &symbol etc.
   */
  request(endpoint, query = null) {
    if (endpoint == null) throw new Error('Request endpoint missing');
    return new Promise((resolve, reject) => {
      const url = 'http://data.fixer.io/api/' + endpoint + '?access_key=' + this.apiKey + '&';
      const queryUrl = query != null ? url + query : url
      http.get(queryUrl, (res) => {
        let buffer = "";
        res.on('data', (chunk) => {
          buffer += chunk;
        });

        res.on('end', () => {
          return resolve(buffer);
        });
      }).on('error', (err) => {
        return reject({error: err.message});
      });
    })
  }
}

module.exports = FixerIO;