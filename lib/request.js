var axios = require('axios').default;

module.exports = {
  get: async (url, headers = {}) => {
    let options = {
      method: 'GET',
      url: url,
      headers: headers
    };
  
    let resp = await axios(options).catch(error => { throw error; });
    return resp.data;
  },

  post: async (url, data, headers = {}) => {
    let options = {
      method: 'POST',
      url: url,
      data: data,
      headers: headers
    };
  
    let resp = await axios(options).catch(error => { throw error; });
    return resp.data;
  }
}